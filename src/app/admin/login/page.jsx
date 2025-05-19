// src/app/admin/login/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { app as firebaseApp } from '@/lib/firebaseConfig';

// Inline Styles
const containerStyle = {
    maxWidth: '400px',
    margin: '5rem auto',
    padding: '2rem',
    fontFamily: '"Lato", sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
};
const formRowStyle = { marginBottom: '15px', display: 'flex', flexDirection: 'column' };
const labelStyle = { marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem', color: '#333', textAlign: 'left' };
const inputStyle = { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem', width: '100%', boxSizing: 'border-box' };
const buttonStyle = { padding: '12px 20px', backgroundColor: '#37b048', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.2s ease' };
const errorStyle = { color: 'red', marginBottom: '1rem', fontSize: '0.9rem' };

const allowedAdminUIDs = [
    'Lc2qRorT0zWMcEiIetpIHI5yOg73', // Cam's UID
    'MICHELLES_UID_HERE' // Replace with Michelle's actual UID
];

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const redirectUrl = searchParams.get('redirect') || '/admin/blog';

    // Check if user is already logged in and an admin, then redirect
    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && allowedAdminUIDs.includes(user.uid)) {
                router.replace(redirectUrl); // User is admin, redirect them
            } else {
                setIsCheckingAuth(false); // Not an admin or not logged in, show login form
            }
        });
        return () => unsubscribe();
    }, [router, redirectUrl, allowedAdminUIDs]);


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const auth = getAuth(firebaseApp);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged will handle the redirect if successful and admin
            // If not an admin, they will stay here or be redirected by the main admin page's auth check
            if (!allowedAdminUIDs.includes(userCredential.user.uid)) {
                setError("Login successful, but you are not authorized for the admin panel.");
                auth.signOut(); // Sign out non-admin users
            } else {
                 router.replace(redirectUrl); // Explicit redirect on successful admin login
            }
        } catch (err) {
            setError("Login failed: " + err.message);
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isCheckingAuth) {
        return <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem' }}>Checking authentication...</p>;
    }

    return (
        <div style={containerStyle}>
            <h1 style={{ color: '#37b048', marginBottom: '1.5rem' }}>Admin Login</h1>
            {error && <p style={errorStyle}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div style={formRowStyle}>
                    <label htmlFor="email" style={labelStyle}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <div style={formRowStyle}>
                    <label htmlFor="password" style={labelStyle}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                </div>
                <button type="submit" style={{...buttonStyle, backgroundColor: isLoading ? '#ccc' : '#37b048'}} disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}