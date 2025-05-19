// src/app/blog/[slug]/page.jsx
'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug } from '@/lib/blogDataService';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiChevronsLeft, FiTag, FiFolder } from 'react-icons/fi';
import Footer from '@/app/components/footer'; // Assuming you want the footer on these pages

// Style constants (borrowing from your existing components where applicable)
const pageContainerStyle = {
    width: '100%',
    backgroundColor: '#fdfdff', // Light, clean background
    padding: '0 0 clamp(3rem, 7vw, 5rem) 0', // No top padding, header handles it
    fontFamily: '"Lato", sans-serif',
    color: '#4A4A4A',
    overflowX: 'hidden',
    minHeight: 'calc(100vh - 64px)', // Ensure it takes at least full viewport height minus header
    display: 'flex',
    flexDirection: 'column',
};

const articleWrapperStyle = {
    maxWidth: '800px',
    margin: 'clamp(1.5rem, 4vw, 3rem) auto 0 auto', // Top margin, auto for horizontal centering
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency if against a textured body
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.07)',
    flexGrow: 1, // Allows this content to push footer down
};

const titleStyle = {
    fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
    color: '#37b048',
    marginBottom: '0.75rem',
    fontWeight: 'bold',
    lineHeight: 1.25,
    textAlign: 'center',
};

const metaInfoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem', // Increased gap
    color: '#5f6c7b',
    fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
    marginBottom: '2rem',
    flexWrap: 'wrap', // Allow wrapping on small screens
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '1.5rem',
};

const metaItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
};

const featuredImageWrapperStyle = {
    width: '100%',
    maxHeight: '450px',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '2.5rem',
    position: 'relative', // For Next/Image fill
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
};

const contentStyle = {
    fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
    lineHeight: 1.75,
    color: '#333',
    // Basic styling for HTML content - can be expanded in a global CSS or using a CSS-in-JS solution for more complex HTML
    // For now, we'll rely on the structure of your HTML from the admin input.
    // You might want to add styles for h2, h3, ul, li, blockquote, etc. within this later.
};

const tagsCategoriesStyle = {
    marginTop: '2.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e0e0e0',
    fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
    color: '#5f6c7b',
};

const tagPillStyle = {
    display: 'inline-block',
    backgroundColor: '#e9ecef',
    color: '#495057',
    padding: '0.3rem 0.75rem',
    borderRadius: '15px',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '0.8rem',
};

const backLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#37b048',
    textDecoration: 'none',
    fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
    fontWeight: '600',
    marginTop: '2rem',
    padding: '0.5rem 0',
    transition: 'color 0.2s ease',
};


// Framer Motion Variants
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};


export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;

    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (slug) {
            setIsLoading(true);
            getBlogPostBySlug(slug)
                .then(data => {
                    if (data) {
                        setPost(data);
                    } else {
                        setError('Post not found or not published.');
                    }
                })
                .catch(err => {
                    console.error("Error fetching post:", err);
                    setError('Failed to load the post.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setError('No post specified.');
            setIsLoading(false);
        }
    }, [slug]);

    if (isLoading) {
        return <div style={{ ...pageContainerStyle, textAlign: 'center', paddingTop: '5rem', fontSize: '1.2rem' }}>Loading post...</div>;
    }

    if (error) {
        return (
            <div style={pageContainerStyle}>
                <motion.div
                    style={{ ...articleWrapperStyle, textAlign: 'center' }}
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                >
                    <motion.h1 variants={itemVariants} style={{ ...titleStyle, color: '#dc3545' }}>Error</motion.h1>
                    <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem' }}>{error}</motion.p>
                    <motion.div variants={itemVariants}>
                        <Link href="/blog" style={{ ...backLinkStyle, color: '#007bff' }}>
                            <FiChevronsLeft /> Back to Blog
                        </Link>
                    </motion.div>
                </motion.div>
                <Footer />
            </div>
        );
    }

    if (!post) {
        // This case should ideally be covered by the error state if post isn't found.
        return (
          <div style={pageContainerStyle}>
            <div style={{ ...articleWrapperStyle, textAlign: 'center' }}>
                <p>Post not available.</p>
                <Link href="/blog" style={backLinkStyle}>
                    <FiChevronsLeft /> Back to Blog
                </Link>
            </div>
            <Footer />
          </div>
        );
    }

    const formattedDate = post.publicationDate
        ? new Date(post.publicationDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
        : 'Date not available';

    return (
        <div style={pageContainerStyle}>
            <motion.article
                style={articleWrapperStyle}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <motion.h1 style={titleStyle} variants={itemVariants}>
                    {post.title}
                </motion.h1>

                <motion.div style={metaInfoStyle} variants={itemVariants}>
                    <span style={metaItemStyle}>
                        <FiCalendar /> {formattedDate}
                    </span>
                    <span style={metaItemStyle}>
                        <FiUser /> {post.authorName || 'Michelle Harding'}
                    </span>
                </motion.div>

                {post.featuredImageURL && (
                    <motion.div style={featuredImageWrapperStyle} variants={itemVariants}>
                        <Image
                            src={post.featuredImageURL}
                            alt={post.title || 'Blog post featured image'}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority // Consider for LCP if this image is prominent
                            onError={(e) => { e.currentTarget.style.display = 'none'; }} // Hide if image fails to load
                        />
                    </motion.div>
                )}

                <motion.div
                    style={contentStyle}
                    dangerouslySetInnerHTML={{ __html: post.contentHTML }}
                    variants={itemVariants}
                />

                {(post.tags?.length > 0 || post.categories?.length > 0) && (
                     <motion.div style={tagsCategoriesStyle} variants={itemVariants}>
                        {post.categories?.length > 0 && (
                            <div style={{ marginBottom: '1rem'}}>
                                <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#333' }}><FiFolder /> Categories: </strong>
                                {post.categories.map((category, index) => (
                                    <Fragment key={`cat-${index}`}>
                                        <Link href={`/blog?category=${encodeURIComponent(category)}`} style={{...tagPillStyle, backgroundColor: '#d1e7dd', color: '#0f5132'}}>
                                            {category}
                                        </Link>
                                    </Fragment>
                                ))}
                            </div>
                        )}
                        {post.tags?.length > 0 && (
                             <div>
                                <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#333' }}><FiTag /> Tags: </strong>
                                {post.tags.map((tag, index) => (
                                     <Fragment key={`tag-${index}`}>
                                        <Link href={`/blog?tag=${encodeURIComponent(tag)}`} style={tagPillStyle}>
                                            {tag}
                                        </Link>
                                     </Fragment>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}


                <motion.div variants={itemVariants}>
                    <Link href="/blog" style={backLinkStyle}>
                        <FiChevronsLeft /> Back to All Posts
                    </Link>
                </motion.div>
            </motion.article>
            <Footer />
        </div>
    );
}