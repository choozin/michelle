// src/app/admin/blog/new/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPost, generateSlug } from '@/lib/blogDataService';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from '@/lib/firebaseConfig'; // Corrected import
import Link from 'next/link';

// --- Style Constants (keep as they are in your file) ---
const formRowStyle = { marginBottom: '15px', display: 'flex', flexDirection: 'column' };
const labelStyle = { marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem', color: '#333' };
const inputStyle = { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', fontFamily: '"Lato", sans-serif', width: '100%', boxSizing: 'border-box' };
const textareaStyle = { ...inputStyle, minHeight: '200px', resize: 'vertical' };
const buttonStyle = { padding: '12px 20px', backgroundColor: '#37b048', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.2s ease' };
const containerStyle = { maxWidth: '800px', margin: '2rem auto', padding: '2rem', fontFamily: '"Lato", sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' };
const noteStyle = { marginTop: '5px', fontSize: '0.8em', color: '#555' };
const subHeadingStyle = {marginTop: '2rem', marginBottom: '1rem', color: '#37b048', borderTop: '1px solid #ddd', paddingTop: '1rem', fontSize: '1.2rem'};

// SOLUTION for exhaustive-deps: Define allowedAdminUIDs outside the component
const allowedAdminUIDs = [
    'Lc2qRorT0zWMcEiIetpIHI5yOg73',
    'MICHELLES_UID_HERE' // REMEMBER TO REPLACE THIS
];

export default function NewBlogPostPage() {
    const router = useRouter();
    // currentSlug is not used in this component, so we can remove its derivation if it was here.
    // const params = useParams(); // Not needed here as it's a 'new' page, not 'edit/[slug]'
    // const currentSlug = params.slug; // Not applicable

    const [authStatus, setAuthStatus] = useState({ loading: true, isAdmin: false, user: null });

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [featuredImageURL, setFeaturedImageURL] = useState('');
    const [authorName, setAuthorName] = useState('Michelle Harding');
    const [publicationDate, setPublicationDate] = useState(new Date().toISOString().slice(0, 16));
    const [tags, setTags] = useState('');
    const [categories, setCategories] = useState('');
    const [status, setStatus] = useState('draft');
    const [seoMetaDescription, setSeoMetaDescription] = useState('');
    const [socialMedia, setSocialMedia] = useState({ twitterText: '', facebookText: '', instagramCaption: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [successSlug, setSuccessSlug] = useState(''); // To store the slug for the success message

    // Authentication Effect (line 65 in your log referred to this effect)
    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (allowedAdminUIDs.includes(currentUser.uid)) {
                    setAuthStatus({ loading: false, isAdmin: true, user: currentUser });
                } else {
                    setAuthStatus({ loading: false, isAdmin: false, user: currentUser });
                    router.replace('/admin/login?error=unauthorized&redirect=/admin/blog/new');
                }
            } else {
                setAuthStatus({ loading: false, isAdmin: false, user: null });
                router.replace('/admin/login?redirect=/admin/blog/new');
            }
        });
        return () => unsubscribe();
    }, [router]); // allowedAdminUIDs is a stable module-level constant. currentSlug is not used.

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccessMessage('');
        setSuccessSlug('');


        if (!title.trim()) {
          setError('Title is required.');
          setIsSubmitting(false);
          return;
        }
        if (!contentHTML.trim()) {
            setError('Content HTML is required.');
            setIsSubmitting(false);
            return;
        }

        const finalSlug = slug.trim() || generateSlug(title.trim());
        if (!finalSlug) {
            setError('A valid slug could not be generated. Please ensure the title is not empty or provide a manual slug.');
            setIsSubmitting(false);
            return;
        }

        const postData = {
          title: title.trim(),
          slug: finalSlug, // Pass the final slug to createBlogPost
          contentHTML: contentHTML,
          excerpt: excerpt.trim(),
          featuredImageURL: featuredImageURL.trim(),
          authorName: authorName.trim() || "Michelle Harding",
          publicationDate: publicationDate ? new Date(publicationDate).toISOString() : new Date().toISOString(),
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          categories: categories.split(',').map(cat => cat.trim()).filter(Boolean),
          status: status,
          seoMetaDescription: seoMetaDescription.trim() || excerpt.trim().substring(0,160),
          socialMedia: {
            twitterText: socialMedia.twitterText.trim() || `Check out: ${title.trim()} [URL_PLACEHOLDER]`,
            facebookText: socialMedia.facebookText.trim() || `Read our new post: ${title.trim()} [URL_PLACEHOLDER]`,
            instagramCaption: socialMedia.instagramCaption.trim() || `New blog post: ${title.trim()}! Link in bio. #BraveChangeCoaching [URL_PLACEHOLDER]`
          }
        };

        try {
          const createdSlug = await createBlogPost(postData); // createBlogPost uses postData.slug
          setSuccessMessage(`Post created successfully! Form has been reset.`);
          setSuccessSlug(createdSlug); // Store slug for linking
          // Reset form
          setTitle(''); setSlug(''); setContentHTML(''); setExcerpt('');
          setFeaturedImageURL(''); setTags(''); setCategories('');
          setSeoMetaDescription('');
          setSocialMedia({ twitterText: '', facebookText: '', instagramCaption: ''});
          setStatus('draft');
          setPublicationDate(new Date().toISOString().slice(0, 16));
        } catch (err) {
          console.error(err);
          setError(`Failed to create post: ${err.message}`);
        } finally {
          setIsSubmitting(false);
        }
    };


    if (authStatus.loading) {
        return <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem' }}>Authenticating...</p>;
    }

    if (!authStatus.isAdmin) {
        return (
            <div style={containerStyle}>
                <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem', color: 'red' }}>
                    Access Denied. Attempting to redirect to login...
                </p>
                {!authStatus.user && !authStatus.loading && (
                     <p style={{ textAlign: 'center', fontSize: '1rem', color: '#555' }}>
                        If you are not redirected, please <Link href="/admin/login?redirect=/admin/blog/new" style={{color: '#37b048'}}>click here to login</Link>.
                    </p>
                )}
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h1 style={{ color: '#37b048', margin: 0 }}>Create New Blog Post</h1>
                <button type="button" onClick={() => router.push('/admin/blog')} style={{...buttonStyle, backgroundColor: '#6c757d', padding: '8px 15px', fontSize: '0.9rem'}}>
                    &larr; Back to Dashboard
                </button>
            </div>

            {/* Line 176 (approx) where successMessage is shown */}
            {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>{error}</p>}
            {successMessage && (
                <p style={{ color: 'green', textAlign: 'center', marginBottom: '1rem', padding: '10px', border: '1px solid green', borderRadius: '4px' }}>
                    {successMessage}
                    {successSlug && (
                        <span>
                            {' '}Post &ldquo;{title || 'Untitled Post'}&rdquo; (Slug: {successSlug}) created.
                            <Link href={`/admin/blog/edit/${successSlug}`} style={{color: '#37b048', fontWeight: 'bold', marginLeft: '5px'}}>
                                Edit it?
                            </Link>
                            {' '}
                            <Link href={`/blog/${successSlug}`} target="_blank" rel="noopener noreferrer" style={{color: '#007bff', fontWeight: 'bold'}}>
                                View it?
                            </Link>
                        </span>
                    )}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <div style={formRowStyle}>
                <label htmlFor="title" style={labelStyle}>Title:</label>
                <input type="text" id="title" value={title} onChange={handleTitleChange} style={inputStyle} required />
                </div>

                <div style={formRowStyle}>
                <label htmlFor="slug" style={labelStyle}>Slug (URL - auto-generated, can be edited):</label>
                <input type="text" id="slug" value={slug} onChange={(e) => setSlug(generateSlug(e.target.value))} style={inputStyle} />
                {/* SOLUTION for unescaped entities */}
                <small style={noteStyle}>If left blank, a slug will be generated from the title. Ensure it&apos;s URL-friendly (e.g., &ldquo;my-new-post&rdquo;).</small>
                </div>

                <div style={formRowStyle}>
                <label htmlFor="contentHTML" style={labelStyle}>Content (HTML):</label>
                <textarea id="contentHTML" value={contentHTML} onChange={(e) => setContentHTML(e.target.value)} style={textareaStyle} required />
                <small style={noteStyle}>Enter valid HTML. You can use an online HTML editor and paste the code here.</small>
                </div>

                <div style={formRowStyle}>
                <label htmlFor="excerpt" style={labelStyle}>Excerpt (Short Summary for blog listing):</label>
                <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} />
                </div>

                <div style={formRowStyle}>
                <label htmlFor="featuredImageURL" style={labelStyle}>Featured Image URL (e.g., /images/blog/your-image.jpg or https://...):</label>
                <input type="text" id="featuredImageURL" value={featuredImageURL} onChange={(e) => setFeaturedImageURL(e.target.value)} style={inputStyle} />
                {/* SOLUTION for unescaped entities */}
                <small style={noteStyle}>For V1, ensure image is in <code>public/images/blog/</code> and use path like <code>/images/blog/my-pic.jpg</code>.</small>
                </div>

                <div style={formRowStyle}>
                <label htmlFor="authorName" style={labelStyle}>Author Name:</label>
                <input type="text" id="authorName" value={authorName} onChange={(e) => setAuthorName(e.target.value)} style={inputStyle} />
                </div>

                <div style={formRowStyle}>
                <label htmlFor="publicationDate" style={labelStyle}>Publication Date & Time:</label>
                <input type="datetime-local" id="publicationDate" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} style={inputStyle} required/>
                </div>

                <div style={formRowStyle}>
                <label htmlFor="tags" style={labelStyle}>Tags (comma-separated):</label>
                <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} style={inputStyle} placeholder="e.g., wellness, coaching, tips" />
                </div>

                <div style={formRowStyle}>
                <label htmlFor="categories" style={labelStyle}>Categories (comma-separated):</label>
                <input type="text" id="categories" value={categories} onChange={(e) => setCategories(e.target.value)} style={inputStyle} placeholder="e.g., Personal Development, Workplace Wellness" />
                </div>

                <div style={formRowStyle}>
                <label htmlFor="status" style={labelStyle}>Status:</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                </div>

                <div style={formRowStyle}>
                <label htmlFor="seoMetaDescription" style={labelStyle}>SEO Meta Description (for search engines, ~160 chars):</label>
                <textarea id="seoMetaDescription" value={seoMetaDescription} onChange={(e) => setSeoMetaDescription(e.target.value)} style={{...inputStyle, minHeight: '60px', resize: 'vertical'}} />
                </div>

                <h3 style={subHeadingStyle}>Social Media Snippets (Optional - Auto-fills if blank)</h3>
                <div style={formRowStyle}>
                <label htmlFor="twitterText" style={labelStyle}>Twitter Text:</label>
                <textarea id="twitterText" value={socialMedia.twitterText} onChange={(e) => setSocialMedia(s => ({...s, twitterText: e.target.value}))} style={{...inputStyle, minHeight: '60px', resize: 'vertical'}} placeholder="[URL_PLACEHOLDER] will be replaced with post link."/>
                </div>
                <div style={formRowStyle}>
                <label htmlFor="facebookText" style={labelStyle}>Facebook Text:</label>
                <textarea id="facebookText" value={socialMedia.facebookText} onChange={(e) => setSocialMedia(s => ({...s, facebookText: e.target.value}))} style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} placeholder="[URL_PLACEHOLDER] will be replaced."/>
                </div>
                <div style={formRowStyle}>
                <label htmlFor="instagramCaption" style={labelStyle}>Instagram Caption:</label>
                <textarea id="instagramCaption" value={socialMedia.instagramCaption} onChange={(e) => setSocialMedia(s => ({...s, instagramCaption: e.target.value}))} style={{...inputStyle, minHeight: '100px', resize: 'vertical'}} placeholder="[URL_PLACEHOLDER_FOR_LINKINBIO_SERVICE_IF_NEEDED] will be replaced."/>
                </div>

                <button type="submit" disabled={isSubmitting} style={{...buttonStyle, backgroundColor: isSubmitting ? '#ccc' : '#37b048', marginTop: '1rem'}}>
                {isSubmitting ? 'Creating Post...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
}