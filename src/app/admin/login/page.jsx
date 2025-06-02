// src/app/admin/login/page.jsx
'use client';

import React, { useState, useEffect, Suspense } from 'react'; // Import Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '@/lib/firebaseConfig';

// Define allowedAdminUIDs outside the component for stable reference
const allowedAdminUIDs = [
    'Lc2qRorT0zWMcEiIetpIHI5yOg73', // Cam's UID
    'P3yQFO4uHyY0YywDa3PwWnFELXy1' // Replace with Michelle's actual UID - REMEMBER TO REPLACE THIS
];

// Style constants
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


// Inner component that uses useSearchParams
function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams(); // This hook requires Suspense

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // Get redirectUrl once, it won't change unless searchParams changes,
    // which would re-render this component anyway due to Suspense.
    const redirectUrl = searchParams.get('redirect') || '/admin/blog';

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // allowedAdminUIDs is stable from the outer scope
                if (allowedAdminUIDs.includes(user.uid)) {
                    router.replace(redirectUrl);
                } else {
                    // If logged in but not admin, they shouldn't be here.
                    // Can optionally sign them out or show a message before login form appears.
                    setIsCheckingAuth(false); // Allow login form to show for re-attempt or different user
                }
            } else {
                setIsCheckingAuth(false); // No user, show login form
            }
        });
        return () => unsubscribe();
    }, [router, redirectUrl]); // redirectUrl depends on searchParams, which is handled by Suspense

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const auth = getAuth(firebaseApp);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Check UID again after login attempt
            if (!allowedAdminUIDs.includes(userCredential.user.uid)) {
                setError("Login successful, but you are not authorized for the admin panel.");
                await auth.signOut(); // Sign out non-admin users immediately
            } else {
                // onAuthStateChanged will usually handle the redirect, but can do it explicitly too
                router.replace(redirectUrl);
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
                <button type="submit" style={{ ...buttonStyle, backgroundColor: isLoading ? '#ccc' : '#37b048' }} disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

// Main page component wraps LoginForm in Suspense
export default function AdminLoginPage() {
    // Fallback UI can be a simple loading message or a skeleton screen
    const fallbackUI = <p style={{ textAlign: 'center', marginTop: '5rem', fontSize: '1.2rem' }}>Loading login form...</p>;

    return (
        <Suspense fallback={fallbackUI}>
            <LoginForm />
        </Suspense>
    );
}