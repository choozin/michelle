// src/app/components/RecentBlogPosts.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentBlogPosts } from '@/lib/blogDataService';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRightCircle, FiEdit3 } from 'react-icons/fi'; // FiEdit3 as a placeholder for "Read more" or similar

// Style constants
const sectionStyle = {
    width: '100%',
    padding: 'clamp(3rem, 7vw, 4.5rem) clamp(1rem, 5vw, 2rem)',
    fontFamily: '"Lato", sans-serif',
    backgroundColor: '#f7f9fc', // A slightly different light background for contrast if placed on white
    color: '#4A4A4A',
    overflowX: 'hidden',
    boxSizing: 'border-box',
};

const contentWrapperStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
};

const sectionTitleStyle = {
    fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
    color: '#37b048',
    marginBottom: 'clamp(2rem, 4vw, 3rem)',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: '-0.03em',
};

const postsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 30vw, 340px), 1fr))',
    gap: 'clamp(1.5rem, 3vw, 2.5rem)',
};

const postCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 70, 30, 0.06)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textDecoration: 'none', // For the Link component
    color: 'inherit', // For the Link component
};

const postCardHoverStyle = {
    transform: 'translateY(-7px)',
    boxShadow: '0 12px 30px rgba(0, 70, 30, 0.1)',
};

const imageContainerStyle = {
    width: '100%',
    paddingTop: '56.25%', // 16:9 Aspect Ratio
    position: 'relative',
    backgroundColor: '#e9ecef', // Placeholder background
};

const cardContentStyle = {
    padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1, // Ensure content takes up space to push button to bottom
};

const postTitleStyle = {
    fontSize: 'clamp(1.15rem, 2.3vw, 1.35rem)',
    color: '#2c3e50',
    margin: '0 0 0.6rem 0',
    fontWeight: '600',
    lineHeight: 1.3,
    // For multi-line truncation (optional, works best with fixed height or line-clamp CSS)
    // display: '-webkit-box',
    // WebkitLineClamp: 2,
    // WebkitBoxOrient: 'vertical',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // minHeight: 'calc(1.3em * 2)', // Approximate height for 2 lines
};

const postMetaStyle = {
    fontSize: 'clamp(0.8rem, 1.4vw, 0.85rem)',
    color: '#6c757d',
    marginBottom: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
};

const postExcerptStyle = {
    fontSize: 'clamp(0.9rem, 1.6vw, 0.95rem)',
    lineHeight: 1.6,
    color: '#4A4A4A',
    marginBottom: '1.25rem',
    flexGrow: 1, // Allows excerpt to push button down
    // For multi-line truncation
    // display: '-webkit-box',
    // WebkitLineClamp: 3,
    // WebkitBoxOrient: 'vertical',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // minHeight: 'calc(1.6em * 3)', // Approximate height for 3 lines
};

const readMoreButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#37b048',
    textDecoration: 'none',
    fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
    fontWeight: 'bold',
    marginTop: 'auto', // Pushes button to the bottom of the card content
    padding: '0.5rem 0', // Minimal padding as it's more like a link
    alignSelf: 'flex-start', // Align to the start of the flex container
};

// Framer Motion Variants
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};


export default function RecentBlogPosts({ count = 3, title = "Recent Blog Posts" }) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);


    useEffect(() => {
        setIsLoading(true);
        getRecentBlogPosts(count)
            .then(data => {
                setPosts(data);
            })
            .catch(err => {
                console.error("Error fetching recent posts:", err);
                setError('Failed to load recent posts.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [count]);

    // Function to truncate text (optional, can also use CSS)
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (isLoading) {
        return (
            <div style={sectionStyle}>
                <div style={contentWrapperStyle}>
                    <h2 style={sectionTitleStyle}>{title}</h2>
                    <p style={{ textAlign: 'center', fontSize: '1rem' }}>Loading recent posts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={sectionStyle}>
                <div style={contentWrapperStyle}>
                    <h2 style={sectionTitleStyle}>{title}</h2>
                    <p style={{ textAlign: 'center', color: 'red', fontSize: '1rem' }}>{error}</p>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div style={sectionStyle}>
                <div style={contentWrapperStyle}>
                    <h2 style={sectionTitleStyle}>{title}</h2>
                    <p style={{ textAlign: 'center', fontSize: '1rem' }}>No recent blog posts to display.</p>
                </div>
            </div>
        );
    }

    return (
        <motion.section
            style={sectionStyle}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div style={contentWrapperStyle}>
                <motion.h2 style={sectionTitleStyle} variants={itemVariants}>
                    {title}
                </motion.h2>

                <motion.div style={postsGridStyle} variants={itemVariants}>
                    {posts.map((post, index) => {
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
                                variants={itemVariants} // Animate each card
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
                                                 onError={(e) => { e.currentTarget.style.display = 'none'; }} // Basic error handling
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
                                        <span style={readMoreButtonStyle}> {/* Changed from Link to span as parent is Link */}
                                            Read More <FiArrowRightCircle style={{ marginLeft: '0.4rem' }} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.section>
    );
}