// src/app/admin/blog/edit/[slug]/page.jsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlugForAdmin, updateBlogPost, generateSlug } from '@/lib/blogDataService'; // Make sure generateSlug is exported if you use it here
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app as firebaseApp } from '@/lib/firebaseConfig';

// Re-use styles from NewPostPage or AdminDashboard for consistency
const formRowStyle = { marginBottom: '15px', display: 'flex', flexDirection: 'column' };
const labelStyle = { marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem', color: '#333' };
const inputStyle = { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', fontFamily: '"Lato", sans-serif', width: '100%', boxSizing: 'border-box' };
const textareaStyle = { ...inputStyle, minHeight: '200px', resize: 'vertical' };
const buttonStyle = { padding: '12px 20px', backgroundColor: '#37b048', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.2s ease' };
const containerStyle = { maxWidth: '800px', margin: '2rem auto', padding: '2rem', fontFamily: '"Lato", sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' };
const noteStyle = { marginTop: '5px', fontSize: '0.8em', color: '#555' };
const subHeadingStyle = {marginTop: '2rem', marginBottom: '1rem', color: '#37b048', borderTop: '1px solid #ddd', paddingTop: '1rem', fontSize: '1.2rem'};

export default function EditBlogPostPage() {
    const router = useRouter();
    const params = useParams();
    const currentSlug = params.slug;

    // Auth State
    const [authStatus, setAuthStatus] = useState({ loading: true, isAdmin: false, user: null });
    const allowedAdminUIDs = [
        'Lc2qRorT0zWMcEiIetpIHI5yOg73', // Cam's UID
        'MICHELLES_UID_HERE' // Placeholder for Michelle's UID
    ];

    // Form State
    const [title, setTitle] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [featuredImageURL, setFeaturedImageURL] = useState('');
    const [authorName, setAuthorName] = useState('Michelle Harding');
    const [publicationDate, setPublicationDate] = useState('');
    const [tags, setTags] = useState('');
    const [categories, setCategories] = useState('');
    const [status, setStatus] = useState('draft');
    const [seoMetaDescription, setSeoMetaDescription] = useState('');
    const [socialMedia, setSocialMedia] = useState({ twitterText: '', facebookText: '', instagramCaption: '' });

    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Authentication Effect
    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (allowedAdminUIDs.includes(currentUser.uid)) {
                    setAuthStatus({ loading: false, isAdmin: true, user: currentUser });
                    // Data fetching will be triggered by the next useEffect if isAdmin is true
                } else {
                    setAuthStatus({ loading: false, isAdmin: false, user: currentUser });
                    router.replace(`/admin/login?error=unauthorized&redirect=/admin/blog/edit/${currentSlug}`);
                }
            } else {
                setAuthStatus({ loading: false, isAdmin: false, user: null });
                router.replace(`/admin/login?redirect=/admin/blog/edit/${currentSlug}`);
            }
        });
        return () => unsubscribe();
    }, [router, currentSlug]); // allowedAdminUIDs is constant, not needed if defined outside

    // Data Fetching Effect (runs after auth is confirmed and isAdmin is true)
    const fetchPostData = useCallback(async () => {
        if (!currentSlug) {
            setError("No post slug provided.");
            setIsLoadingData(false);
            return;
        }
        setIsLoadingData(true);
        setError('');
        try {
            const postData = await getBlogPostBySlugForAdmin(currentSlug);
            if (postData) {
                setTitle(postData.title || '');
                setContentHTML(postData.contentHTML || '');
                setExcerpt(postData.excerpt || '');
                setFeaturedImageURL(postData.featuredImageURL || '');
                setAuthorName(postData.authorName || 'Michelle Harding');
                setPublicationDate(postData.publicationDate ? new Date(postData.publicationDate).toISOString().slice(0, 16) : '');
                setTags((postData.tags || []).join(', '));
                setCategories((postData.categories || []).join(', '));
                setStatus(postData.status || 'draft');
                setSeoMetaDescription(postData.seoMetaDescription || '');
                setSocialMedia(postData.socialMedia || { twitterText: '', facebookText: '', instagramCaption: '' });
            } else {
                setError('Post not found or failed to load. It may have been deleted.');
            }
        } catch (err) {
            console.error("Error fetching post for edit:", err);
            setError('Failed to load post data: ' + err.message);
        } finally {
            setIsLoadingData(false);
        }
    }, [currentSlug]);

    useEffect(() => {
        if (authStatus.isAdmin && !authStatus.loading) { // Ensure auth is done and user is admin
            fetchPostData();
        }
    }, [authStatus.isAdmin, authStatus.loading, fetchPostData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');
        setSuccessMessage('');

        if (!title.trim() || !contentHTML.trim()) {
            setError('Title and Content HTML are required.');
            setIsSaving(false);
            return;
        }

        const postDataToUpdate = {
            title: title.trim(),
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
            await updateBlogPost(currentSlug, postDataToUpdate);
            setSuccessMessage(`Post "${postDataToUpdate.title}" updated successfully!`);
            // Optionally re-fetch to confirm data consistency, though local state should reflect changes
            // fetchPostData(); 
        } catch (err) {
            console.error("Error updating post:", err);
            setError(`Failed to update post: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    if (authStatus.loading) {
        return <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem' }}>Authenticating...</p>;
    }
    if (!authStatus.isAdmin) {
        // This message might show briefly before redirect
        return <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem', color: 'red' }}>Access Denied. Attempting to redirect to login...</p>;
    }
    if (isLoadingData) {
        return <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem' }}>Loading post data for editing...</p>;
    }
    // If there was an error loading the initial post data and we don't have a title (meaning data is missing)
    if (error && !title && !isLoadingData) {
        return (
            <div style={containerStyle}>
                <h1 style={{ color: '#dc3545', textAlign:'center' }}>Error Loading Post</h1>
                <p style={{color: 'red', textAlign: 'center', marginBottom: '1rem'}}>{error}</p>
                <div style={{textAlign: 'center'}}>
                <Link href="/admin/blog" style={{...buttonStyle, backgroundColor: '#6c757d'}}>
                    &larr; Back to Admin Dashboard
                </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h1 style={{ color: '#37b048', margin: 0, fontSize: 'clamp(1.5rem, 4vw, 1.8rem)' }}>
                    Edit Post: <span style={{color: '#555'}}>{title || currentSlug}</span>
                </h1>
                <button type="button" onClick={() => router.push('/admin/blog')} style={{...buttonStyle, backgroundColor: '#6c757d', padding: '8px 15px', fontSize: '0.9rem'}}>
                    &larr; Back to Dashboard
                </button>
            </div>

            {error && !successMessage && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green', textAlign: 'center', marginBottom: '1rem', padding: '10px', border: '1px solid green', borderRadius: '4px' }}>{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div style={formRowStyle}>
                    <label htmlFor="title" style={labelStyle}>Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />
                </div>

                <div style={formRowStyle}>
                    <label htmlFor="slugDisplay" style={labelStyle}>Current Slug (URL - Cannot be changed here):</label>
                    <input type="text" id="slugDisplay" value={currentSlug} style={{...inputStyle, backgroundColor: '#e9ecef'}} readOnly />
                    <small style={noteStyle}>Changing a post's URL (slug) can affect SEO and break links. This is best handled via direct database management or by creating a new post and deleting the old one, along with setting up redirects.</small>
                </div>

                <div style={formRowStyle}>
                    <label htmlFor="contentHTML" style={labelStyle}>Content (HTML):</label>
                    <textarea id="contentHTML" value={contentHTML} onChange={(e) => setContentHTML(e.target.value)} style={textareaStyle} required />
                </div>

                <div style={formRowStyle}>
                    <label htmlFor="excerpt" style={labelStyle}>Excerpt (Short Summary):</label>
                    <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} />
                </div>

                <div style={formRowStyle}>
                    <label htmlFor="featuredImageURL" style={labelStyle}>Featured Image URL (e.g., /images/blog/your-image.jpg or https://...):</label>
                    <input type="text" id="featuredImageURL" value={featuredImageURL} onChange={(e) => setFeaturedImageURL(e.target.value)} style={inputStyle} />
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
                    <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} style={inputStyle} placeholder="e.g., wellness, coaching" />
                </div>

                <div style={formRowStyle}>
                    <label htmlFor="categories" style={labelStyle}>Categories (comma-separated):</label>
                    <input type="text" id="categories" value={categories} onChange={(e) => setCategories(e.target.value)} style={inputStyle} placeholder="e.g., Personal Development" />
                </div>

                <div style={formRowStyle}>
                    <label htmlFor="status" style={labelStyle}>Status:</label>
                    <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div style={formRowStyle}>
                    <label htmlFor="seoMetaDescription" style={labelStyle}>SEO Meta Description (~160 chars):</label>
                    <textarea id="seoMetaDescription" value={seoMetaDescription} onChange={(e) => setSeoMetaDescription(e.target.value)} style={{...inputStyle, minHeight: '60px', resize: 'vertical'}} />
                </div>

                <h3 style={subHeadingStyle}>Social Media Snippets</h3>
                <div style={formRowStyle}>
                  <label htmlFor="twitterText" style={labelStyle}>Twitter Text:</label>
                  <textarea id="twitterText" value={socialMedia.twitterText} onChange={(e) => setSocialMedia(s => ({...s, twitterText: e.target.value}))} style={{...inputStyle, minHeight: '60px', resize: 'vertical'}}/>
                </div>
                 <div style={formRowStyle}>
                  <label htmlFor="facebookText" style={labelStyle}>Facebook Text:</label>
                  <textarea id="facebookText" value={socialMedia.facebookText} onChange={(e) => setSocialMedia(s => ({...s, facebookText: e.target.value}))} style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} />
                </div>
                 <div style={formRowStyle}>
                  <label htmlFor="instagramCaption" style={labelStyle}>Instagram Caption:</label>
                  <textarea id="instagramCaption" value={socialMedia.instagramCaption} onChange={(e) => setSocialMedia(s => ({...s, instagramCaption: e.target.value}))} style={{...inputStyle, minHeight: '100px', resize: 'vertical'}} />
                </div>

                <button type="submit" disabled={isSaving} style={{...buttonStyle, backgroundColor: isSaving ? '#ccc' : '#37b048', marginTop: '1rem'}}>
                    {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}