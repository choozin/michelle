// src/app/admin/blog/page.jsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAllBlogPostsForAdmin, deleteBlogPost, generateSamplePost } from '@/lib/blogDataService';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from '@/lib/firebaseConfig'; // Corrected import

// --- Style Constants (keep as they are in your file) ---
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem', fontSize: '0.9rem' };
const thStyle = { border: '1px solid #ddd', padding: '10px', textAlign: 'left', backgroundColor: '#f0f0f0', color: '#333', fontWeight: 'bold' };
const tdStyle = { border: '1px solid #ddd', padding: '10px', color: '#444' };
const actionLinkStyle = { color: '#37b048', textDecoration: 'none', marginRight: '10px', fontWeight: '500' };
const deleteButtonStyle = { color: '#dc3545', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontWeight: '500', padding: 0 };
const buttonStyle = { padding: '10px 18px', backgroundColor: '#37b048', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' };
const secondaryButtonStyle = { ...buttonStyle, backgroundColor: '#6c757d', marginLeft: '10px' };
const containerStyle = { maxWidth: '1000px', margin: '2rem auto', padding: '2rem', fontFamily: '"Lato", sans-serif', backgroundColor: '#fff' };
const reminderNoteStyle = { backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeeba', padding: '1rem', borderRadius: '4px', marginTop: '1.5rem', fontSize: '0.9rem', lineHeight: '1.5' };
const uidReminderStyle = { ...reminderNoteStyle, backgroundColor: '#d1ecf1', color: '#0c5460', border: '1px solid #bee5eb', marginTop: '0.5rem' };

// SOLUTION for exhaustive-deps: Define allowedAdminUIDs outside the component
const allowedAdminUIDs = [
    'Lc2qRorT0zWMcEiIetpIHI5yOg73',
    'Lc2qRorT0zWMcEiIetpIHI5yOg73' // REMEMBER TO REPLACE THIS
];

export default function AdminBlogDashboard() {
    const [posts, setPosts] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    // currentSlug is not used in this component for auth or data fetching logic.
    // If it were needed for something else, it would come from useParams or usePathname.
    // For now, assuming it's not critically needed for the effects being linted.

    const [authStatus, setAuthStatus] = useState({
        loading: true,
        isAdmin: false,
        user: null,
    });

    const fetchPosts = useCallback(async () => {
        setIsLoadingPosts(true);
        setError('');
        try {
            const adminPosts = await getAllBlogPostsForAdmin();
            setPosts(adminPosts);
        } catch (err) {
            console.error(err);
            setError('Failed to load posts: ' + err.message);
        } finally {
            setIsLoadingPosts(false);
        }
    }, []); // Empty dependency array for fetchPosts as it has no external dependencies itself

    // Authentication Effect (line 71 in your log referred to this effect)
    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (allowedAdminUIDs.includes(currentUser.uid)) {
                    setAuthStatus({ loading: false, isAdmin: true, user: currentUser });
                } else {
                    setAuthStatus({ loading: false, isAdmin: false, user: currentUser });
                    router.replace('/admin/login?error=unauthorized&redirect=/admin/blog');
                }
            } else {
                setAuthStatus({ loading: false, isAdmin: false, user: null });
                router.replace('/admin/login?redirect=/admin/blog');
            }
        });
        return () => unsubscribe();
    }, [router]); // allowedAdminUIDs is stable. currentSlug was correctly identified as unnecessary.

    useEffect(() => {
        if (authStatus.isAdmin && !authStatus.loading) { // Ensure auth is done
            fetchPosts();
        }
    }, [authStatus.isAdmin, authStatus.loading, fetchPosts]);

    const handleDelete = async (slug, title) => {
        if (window.confirm(`Are you sure you want to delete the post: "${title}"? This cannot be undone.`)) {
            try {
                await deleteBlogPost(slug);
                alert(`Post "${title}" deleted successfully.`);
                fetchPosts();
            } catch (err) {
                alert('Failed to delete post: ' + err.message);
                console.error(err);
            }
        }
    };

    const handleGenerateSample = async () => {
        if (window.confirm("Generate a new sample draft post?")) {
            setIsLoadingPosts(true);
            try {
                const newSlug = await generateSamplePost();
                alert(`Sample post "${newSlug}" created as a draft.`);
                fetchPosts();
            } catch (err) {
                alert('Failed to generate sample post: ' + err.message);
                console.error(err);
                // setIsLoadingPosts(false); // Covered by fetchPosts finally block
            }
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
                        If you are not redirected, please <Link href="/admin/login?redirect=/admin/blog" style={{ color: '#37b048' }}>click here to login</Link>.
                    </p>
                )}
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
                <h1 style={{ color: '#37b048', margin: 0, fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Blog Admin Dashboard</h1>
                <div>
                    <Link href="/admin/blog/new" style={buttonStyle}>
                        Create New Post
                    </Link>
                    <button onClick={handleGenerateSample} style={secondaryButtonStyle} disabled={isLoadingPosts}>
                        {isLoadingPosts && posts.length === 0 ? 'Processing...' : 'Generate Sample Post'}
                    </button>
                </div>
            </div>

            {isLoadingPosts && posts.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading posts...</p>
            ) : error && posts.length === 0 ? (
                <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Error loading posts: {error}</p>
            ) : !isLoadingPosts && posts.length === 0 && !error ? (
                <p style={{ marginTop: '1rem' }}>No blog posts yet. <Link href="/admin/blog/new" style={{ color: '#37b048' }}>Create one!</Link> or generate a sample.</p>
            ) : posts.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Title</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Published Date</th>
                                <th style={thStyle}>Last Updated</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.slug}>
                                    <td style={tdStyle}>{post.title}</td>
                                    <td style={{ ...tdStyle, color: post.status === 'published' ? 'green' : '#c67c00', textTransform: 'capitalize', fontWeight: 'bold' }}>{post.status}</td>
                                    <td style={tdStyle}>{new Date(post.publicationDate).toLocaleDateString()}</td>
                                    <td style={tdStyle}>{new Date(post.updatedDate).toLocaleDateString()}</td>
                                    <td style={tdStyle}>
                                        <Link href={`/admin/blog/edit/${post.slug}`} style={actionLinkStyle}>Edit</Link>
                                        {post.status === 'published' && (
                                            <Link href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" style={{ ...actionLinkStyle, color: '#007bff' }}>View Public</Link>
                                        )}
                                        <button onClick={() => handleDelete(post.slug, post.title)} style={deleteButtonStyle}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}

            {/* Reminder Notes Section */}
            {/* Line 190 area */}
            <div style={uidReminderStyle}>
                <p><strong>Admin UID Configuration:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '0.5rem 0' }}>
                    {/* SOLUTION for unescaped entities */}
                    <li>Ensure Michelle&apos;s Firebase UID is added to the `allowedAdminUIDs` array in:</li>
                    <li style={{ marginLeft: '15px' }}><code>src/app/admin/blog/page.jsx</code> (this file)</li>
                    <li style={{ marginLeft: '15px' }}><code>src/app/admin/blog/new/page.jsx</code></li>
                    <li style={{ marginLeft: '15px' }}><code>src/app/admin/blog/edit/[slug]/page.jsx</code> (when created)</li>
                </ul>
            </div>

            {/* Line 202 area */}
            <div style={reminderNoteStyle}>
                <p><strong>Future Enhancements Reminder:</strong></p>
                <ul>
                    <li><strong>Image Uploads:</strong> Currently, image URLs (e.g., <code>/images/blog/your-image.jpg</code> for files in <code>public/images/blog/</code>) must be entered manually. For easier image management by Michelle, integrate Firebase Storage for direct uploads from this admin panel (Option B).</li>
                    {/* Assuming the error at 202:79 was for "blog's search" */}
                    <li><strong>Search Functionality:</strong> The public blog&apos;s search (when implemented) will be client-side. For a larger number of posts or more advanced search capabilities, consider migrating blog data to Firebase Firestore which offers better querying, or integrate a dedicated search service.</li>
                </ul>
            </div>
        </div>
    );
}