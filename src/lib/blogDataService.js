// src/lib/blogDataService.js
import { db } from './firebaseConfig';
import { ref, get, query, orderByChild, equalTo, limitToLast, orderByKey, set, update, remove, serverTimestamp } from "firebase/database";

// Helper to convert Firebase object to array and sort for public view
const formatPostsForPublic = (postsObject) => {
    if (!postsObject) return [];
    return Object.entries(postsObject)
        .map(([slug, post]) => ({ ...post, slug }))
        .filter(post => post.status === 'published')
        .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
};

// Helper to convert Firebase object to array and sort for admin view (includes drafts)
const formatPostsForAdmin = (postsObject) => {
    if (!postsObject) return [];
    return Object.entries(postsObject)
        .map(([slug, post]) => ({ ...post, slug }))
        .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
};

export async function getAllBlogPosts() { // For public blog listing
    try {
        const postsRef = ref(db, 'blogPosts');
        const snapshot = await get(query(postsRef, orderByChild('status'), equalTo('published'))); // More efficient if indexed by status
        // If not indexing by status, or to ensure date sorting for all published:
        // const snapshot = await get(query(postsRef, orderByKey())); // Then filter and sort client-side via formatPostsForPublic

        if (snapshot.exists()) {
            // If using orderByChild('status'), snapshot.val() might need direct sorting by date
            // For simplicity if above query works, formatPostsForPublic will handle it if it gets all published posts.
            // A more robust query if you have many posts and indexed on status and date:
            // query(postsRef, orderByChild('status_publicationDate'), startAt('published_'), endAt('published_\uf8ff'))
            // This requires a composite key. For now, let's stick to simpler fetch and client sort.
            return formatPostsForPublic(snapshot.val());
        }
        return [];
    } catch (error) {
        console.error("Error fetching all blog posts:", error);
        return [];
    }
}

export async function getBlogPostBySlug(slug) { // For public post view
    try {
        const postRef = ref(db, `blogPosts/${slug}`);
        const snapshot = await get(postRef);
        if (snapshot.exists()) {
            const post = snapshot.val();
            // For public view, only return if published. Admin can fetch directly.
            if (post.status === 'published') {
                return { ...post, slug };
            }
        }
        return null;
    } catch (error) {
        console.error(`Error fetching blog post by slug ${slug}:`, error);
        return null;
    }
}

export async function getRecentBlogPosts(count = 3) { // For public display
    try {
        const postsRef = ref(db, 'blogPosts');
        // Fetching last N published posts, ordered by publicationDate descending
        // RTDB sorts ascending, so limitToLast gets "latest" if ordered by date.
        // We also need to filter by status. Combining these efficiently in RTDB needs careful indexing or client filtering.
        // Simplest for now: get a slightly larger set ordered by date and filter client-side.
        const q = query(postsRef, orderByChild('publicationDate'), limitToLast(count * 2 + 5)); // Fetch a bit more
        const snapshot = await get(q);

        if (snapshot.exists()) {
            const allFetchedAndFormatted = formatPostsForPublic(snapshot.val()); // This filters by published and sorts by date
            return allFetchedAndFormatted.slice(0, count); // Then take the top 'count'
        }
        return [];
    } catch (error) {
        console.error("Error fetching recent blog posts:", error);
        return [];
    }
}

// --- Admin Functions ---

export const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export async function createBlogPost(postData) {
  const slug = postData.slug || generateSlug(postData.title);
  if (!slug) throw new Error("Title (to generate slug) or a manual slug is required.");

  const newPostRef = ref(db, `blogPosts/${slug}`);
  const now = new Date().toISOString();

  // Check if slug already exists to prevent overwriting
  const existingPostSnapshot = await get(newPostRef);
  if (existingPostSnapshot.exists()) {
    throw new Error(`A post with slug "${slug}" already exists. Please use a unique slug or title.`);
  }

  const finalPostData = {
    title: postData.title || "Untitled Post",
    authorName: postData.authorName || "Michelle Harding",
    publicationDate: postData.publicationDate || now,
    updatedDate: now,
    status: postData.status || 'draft',
    excerpt: postData.excerpt || "",
    contentHTML: postData.contentHTML || "<p>Start writing your amazing post!</p>",
    featuredImageURL: postData.featuredImageURL || "",
    tags: postData.tags || [],
    categories: postData.categories || [],
    seoMetaDescription: postData.seoMetaDescription || postData.excerpt || "",
    socialMedia: postData.socialMedia || {
        twitterText: `Check out: ${postData.title || "New Post"} [URL_PLACEHOLDER]`,
        facebookText: `Read our new post: ${postData.title || "New Post"} [URL_PLACEHOLDER]`,
        instagramCaption: `New blog post: ${postData.title || "New Post"}! Link in bio. #BraveChangeCoaching [URL_PLACEHOLDER]`
    }
    // slug is the key, so not stored inside the object itself unless desired for some reason
  };

  try {
    await set(newPostRef, finalPostData);
    return slug; // Return the slug of the created post
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
}

export async function updateBlogPost(slug, postData) {
  if (!slug) throw new Error("Slug is required to update a post.");
  const postRef = ref(db, `blogPosts/${slug}`);
  const now = new Date().toISOString();

  // Prepare data for update, ensuring no undefined fields are accidentally removing data
  // RTDB's update can remove fields if their value is undefined.
  const updateData = {
    title: postData.title,
    authorName: postData.authorName,
    publicationDate: postData.publicationDate,
    updatedDate: now, // Always update this
    status: postData.status,
    excerpt: postData.excerpt,
    contentHTML: postData.contentHTML,
    featuredImageURL: postData.featuredImageURL,
    tags: postData.tags,
    categories: postData.categories,
    seoMetaDescription: postData.seoMetaDescription,
    socialMedia: postData.socialMedia,
  };

  // Remove any keys with undefined values to prevent Firebase from deleting them
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });


  try {
    await update(postRef, updateData);
    return slug;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
}

export async function deleteBlogPost(slug) {
  if (!slug) throw new Error("Slug is required to delete a post.");
  const postRef = ref(db, `blogPosts/${slug}`);
  try {
    await remove(postRef);
    return slug;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
}

export async function getBlogPostBySlugForAdmin(slug) { // Fetches regardless of status
    try {
        const postRef = ref(db, `blogPosts/${slug}`);
        const snapshot = await get(postRef);
        if (snapshot.exists()) {
            return { ...snapshot.val(), slug }; // Add slug to the post object
        }
        return null;
    } catch (error) {
        console.error(`Error fetching blog post by slug (admin) ${slug}:`, error);
        return null;
    }
}


export async function getAllBlogPostsForAdmin() {
    try {
        const postsRef = ref(db, 'blogPosts');
        const snapshot = await get(query(postsRef, orderByKey())); // Or orderByChild('publicationDate')
        if (snapshot.exists()) {
            return formatPostsForAdmin(snapshot.val());
        }
        return [];
    } catch (error) {
        console.error("Error fetching all blog posts for admin:", error);
        return [];
    }
}

export async function generateSamplePost() {
    const sampleTitle = `Sample Post ${new Date().toLocaleTimeString()}`;
    const slug = generateSlug(sampleTitle);
    const now = new Date().toISOString();

    const samplePostData = {
        title: sampleTitle,
        authorName: "Michelle Harding",
        publicationDate: now,
        updatedDate: now,
        status: 'draft',
        excerpt: "This is a sample excerpt for a generated post. Edit it to make it awesome!",
        contentHTML: `<h2>Welcome to ${sampleTitle}</h2><p>This is some placeholder content. You can edit this post to add your own brilliant insights. Remember to include engaging text, perhaps some lists:</p><ul><li>Point one</li><li>Point two</li></ul><p>And maybe even an image if you have one!</p>`,
        featuredImageURL: "/images/blog/default-sample.jpg", // Provide a default image in public/images/blog
        tags: ["sample", "draft"],
        categories: ["General"],
        seoMetaDescription: `A sample blog post titled "${sampleTitle}" generated for testing and demonstration.`,
        socialMedia: {
            twitterText: `Check out this sample: ${sampleTitle} [URL_PLACEHOLDER] #sample`,
            facebookText: `New sample post: ${sampleTitle} [URL_PLACEHOLDER]`,
            instagramCaption: `Working on a new post: ${sampleTitle}! #sampleblog [URL_PLACEHOLDER]`
        }
        // slug will be the key
    };
    try {
        await set(ref(db, `blogPosts/${slug}`), samplePostData);
        return slug;
    } catch (error) {
        console.error("Error generating sample post:", error);
        throw error;
    }
}