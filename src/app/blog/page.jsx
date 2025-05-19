// src/app/blog/page.jsx
'use client';

import React, { useState, useEffect, useMemo, Fragment, Suspense } from 'react'; // Import Suspense
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'; // For reading URL query params for filtering
import { getAllBlogPosts } from '@/lib/blogDataService';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRightCircle, FiSearch, FiTag, FiFolder, FiXCircle } from 'react-icons/fi';
import Footer from '@/app/components/footer';

// --- Style Constants (Keep these as they are in your file) ---
const pageContainerStyle = { /* ... */ };
const contentWrapperStyle = { /* ... */ };
const pageTitleStyle = { /* ... */ };
const controlsContainerStyle = { /* ... */ };
const searchInputContainerStyle = { /* ... */ };
const searchInputStyle = { /* ... */ };
const filterDropdownContainerStyle = { /* ... */ };
const filterDropdownStyle = { /* ... */ };
const postsGridStyle = { /* ... */ };
const postCardStyle = { /* ... */ };
const postCardHoverStyle = { /* ... */ };
const imageContainerStyle = { /* ... */ };
const cardContentStyle = { /* ... */ };
const postTitleStyle = { /* ... */ };
const postMetaStyle = { /* ... */ };
const postExcerptStyle = { /* ... */ };
const readMoreButtonStyle = { /* ... */ };
const clearButtonStyle = { /* ... */ };
// (Ensure all your style consts are here from the previous version)
pageContainerStyle = {
    width: '100%',
    minHeight: 'calc(100vh - 64px)', // Header height
    backgroundColor: '#fdfdff',
    padding: '0 0 clamp(3rem, 7vw, 5rem) 0',
    fontFamily: '"Lato", sans-serif',
    color: '#4A4A4A',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
};
contentWrapperStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1rem, 5vw, 2rem)',
    flexGrow: 1,
};
pageTitleStyle = {
    fontSize: 'clamp(2.2rem, 5vw, 3rem)',
    color: '#37b048',
    marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
    textAlign: 'center',
    fontWeight: 'bold',
};
controlsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: 'clamp(2rem, 4vw, 3rem)',
    padding: '1.5rem',
    backgroundColor: '#f7f9fc',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.05)',
};
searchInputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    position: 'relative',
};
searchInputStyle = {
    flexGrow: 1,
    padding: '0.85rem 1.25rem 0.85rem 2.5rem',
    fontSize: 'clamp(0.95rem, 1.7vw, 1.05rem)',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};
filterDropdownContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
};
filterDropdownStyle = {
    padding: '0.8rem 1rem',
    fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    backgroundColor: '#fff',
    minWidth: '180px',
    flex: '1 1 180px',
};
postsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 30vw, 340px), 1fr))',
    gap: 'clamp(1.5rem, 3vw, 2.5rem)',
};
postCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 70, 30, 0.06)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textDecoration: 'none',
    color: 'inherit',
};
postCardHoverStyle = {
    transform: 'translateY(-7px)',
    boxShadow: '0 12px 30px rgba(0, 70, 30, 0.1)',
};
imageContainerStyle = {
    width: '100%',
    paddingTop: '56.25%',
    position: 'relative',
    backgroundColor: '#e9ecef',
};
cardContentStyle = {
    padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
};
postTitleStyle = {
    fontSize: 'clamp(1.15rem, 2.3vw, 1.35rem)',
    color: '#2c3e50',
    margin: '0 0 0.6rem 0',
    fontWeight: '600',
    lineHeight: 1.3,
};
postMetaStyle = {
    fontSize: 'clamp(0.8rem, 1.4vw, 0.85rem)',
    color: '#6c757d',
    marginBottom: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
};
postExcerptStyle = {
    fontSize: 'clamp(0.9rem, 1.6vw, 0.95rem)',
    lineHeight: 1.6,
    color: '#4A4A4A',
    marginBottom: '1.25rem',
    flexGrow: 1,
};
readMoreButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#37b048',
    textDecoration: 'none',
    fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
    fontWeight: 'bold',
    marginTop: 'auto',
    padding: '0.5rem 0',
    alignSelf: 'flex-start',
};
clearButtonStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};


// Framer Motion Variants
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const gridVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

// Inner component that uses useSearchParams and contains the main logic
function BlogListing() {
    const searchParams = useSearchParams(); // This hook needs Suspense

    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        const tagFromUrl = searchParams.get('tag');
        if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
        if (tagFromUrl) setSelectedTag(tagFromUrl);
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);
        getAllBlogPosts()
            .then(data => {
                setAllPosts(data);
            })
            .catch(err => {
                console.error("Error fetching posts:", err);
                setError('Failed to load blog posts.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const uniqueCategories = useMemo(() => {
        const categories = new Set();
        allPosts.forEach(post => post.categories?.forEach(cat => categories.add(cat)));
        return Array.from(categories).sort();
    }, [allPosts]);

    const uniqueTags = useMemo(() => {
        const tags = new Set();
        allPosts.forEach(post => post.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [allPosts]);

    useEffect(() => {
        let currentPosts = [...allPosts];
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            currentPosts = currentPosts.filter(post =>
                post.title?.toLowerCase().includes(lowerSearchTerm) ||
                post.excerpt?.toLowerCase().includes(lowerSearchTerm) ||
                post.contentHTML?.toLowerCase().replace(/<[^>]+>/g, '').includes(lowerSearchTerm) ||
                post.categories?.some(cat => cat.toLowerCase().includes(lowerSearchTerm)) ||
                post.tags?.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
            );
        }
        if (selectedCategory) {
            currentPosts = currentPosts.filter(post => post.categories?.includes(selectedCategory));
        }
        if (selectedTag) {
            currentPosts = currentPosts.filter(post => post.tags?.includes(selectedTag));
        }
        setFilteredPosts(currentPosts);
    }, [searchTerm, selectedCategory, selectedTag, allPosts]);

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (isLoading && allPosts.length === 0) {
        return <div style={{ textAlign: 'center', paddingTop: '3rem', fontSize: '1.2rem' }}>Loading blog posts...</div>;
    }
    if (error) {
        return <div style={{ textAlign: 'center', paddingTop: '3rem', fontSize: '1.2rem', color: 'red' }}>{error}</div>;
    }

    return (
        <motion.div
            style={contentWrapperStyle} // This inner component now gets the contentWrapperStyle
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 style={pageTitleStyle} variants={itemVariants}>
                Brave Change Blog
            </motion.h1>

            <motion.div style={controlsContainerStyle} variants={itemVariants}>
                <div style={searchInputContainerStyle}>
                    <FiSearch style={{ position: 'absolute', left: '15px', color: '#888', fontSize: '1.2rem' }} />
                    <input
                        type="text"
                        placeholder="Search posts by keyword, tag, or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={searchInputStyle}
                        onFocus={e => e.target.style.borderColor = '#37b048'}
                        onBlur={e => e.target.style.borderColor = '#ced4da'}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            style={clearButtonStyle}
                            aria-label="Clear search"
                        >
                            <FiXCircle size="1.1rem" />
                        </button>
                    )}
                </div>
                <div style={filterDropdownContainerStyle}>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={filterDropdownStyle}
                        aria-label="Filter by category"
                    >
                        <option value="">All Categories</option>
                        {uniqueCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        style={filterDropdownStyle}
                        aria-label="Filter by tag"
                    >
                        <option value="">All Tags</option>
                        {uniqueTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
                {(selectedCategory || selectedTag || searchTerm) && (
                    <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('');
                                setSelectedTag('');
                            }}
                            style={{
                                background: 'none', border: '1px solid #6c757d', color: '#6c757d',
                                padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem'
                            }}
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </motion.div>

            {isLoading && filteredPosts.length === 0 && !error ? (
                <p style={{ textAlign: 'center', fontSize: '1rem' }}>Loading...</p>
            ) : filteredPosts.length === 0 ? (
                <motion.p
                    style={{ textAlign: 'center', fontSize: '1.1rem', color: '#555', marginTop: '3rem' }}
                    variants={itemVariants}
                >
                    No blog posts found matching your criteria. Try adjusting your search or filters.
                </motion.p>
            ) : (
                <motion.div
                    style={postsGridStyle}
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredPosts.map((post, index) => {
                        const formattedDate = post.publicationDate
                            ? new Date(post.publicationDate).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'short', day: 'numeric'
                            })
                            : 'N/A';
                        const finalCardStyle = hoveredCard === index
                            ? { ...postCardStyle, ...postCardHoverStyle }
                            : postCardStyle;
                        return (
                            <motion.div
                                key={post.slug}
                                variants={itemVariants}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <Link href={`/blog/${post.slug}`} passHref style={finalCardStyle}>
                                    {post.featuredImageURL && (
                                        <div style={imageContainerStyle}>
                                            <Image
                                                src={post.featuredImageURL}
                                                alt={post.title || 'Blog post image'}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
                                        </div>
                                    )}
                                    <div style={cardContentStyle}>
                                        <h3 style={postTitleStyle}>
                                            {truncateText(post.title, 60)}
                                        </h3>
                                        <div style={postMetaStyle}>
                                            <FiCalendar />
                                            <span>{formattedDate}</span>
                                        </div>
                                        <p style={postExcerptStyle}>
                                            {truncateText(post.excerpt || post.contentHTML.replace(/<[^>]+>/g, ''), 120)}
                                        </p>
                                        <span style={readMoreButtonStyle}>
                                            Read More <FiArrowRightCircle style={{ marginLeft: '0.4rem' }} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </motion.div>
    );
}

// Main page component wraps BlogListing in Suspense
export default function BlogPage() {
    const fallbackUI = (
        <div style={pageContainerStyle}>
            <div style={{ ...contentWrapperStyle, textAlign: 'center', paddingTop: '5rem' }}>
                <h1 style={pageTitleStyle}>Brave Change Blog</h1>
                <p style={{ fontSize: '1.2rem' }}>Loading posts and filters...</p>
            </div>
            <Footer />
        </div>
    );

    return (
        <div style={pageContainerStyle}> {/* Outer container for overall page structure including Footer */}
            <Suspense fallback={fallbackUI}>
                <BlogListing />
            </Suspense>
            <Footer />
        </div>
    );
}