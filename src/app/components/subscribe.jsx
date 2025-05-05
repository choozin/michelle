'use client';

import React, { useState, useEffect } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const marginHoriz = width < 512 ? '1rem' : '3rem';

  const validateEmail = (addr) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(addr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      alert('user subscribed');
      setEmail('');
    } else {
      alert('Please enter a correct email address.');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#fff',
        padding: '3rem 0',
        fontFamily: '"Lato", sans-serif',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: '#999',
          margin: `0 ${marginHoriz}`,
          padding: '3rem',
          borderRadius: '8px',
          color: '#fff',
          textAlign: 'center',
          maxWidth: '800px',
          width: '100%'
        }}
      >
        <h2 style={{ fontSize: '2rem', margin: '0 0 1rem' }}>
          Your Daily Motivation & Wellness Insight
        </h2>
        <p style={{ fontSize: '1rem', margin: '0 0 2rem' }}>
          Subscribe to receive uplifting quotes, wellness tips, and mental health education delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'inline-flex', width: '100%', maxWidth: '600px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your e-mail"
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '4px 0 0 4px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0 1rem',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              cursor: 'pointer',
              fontSize: '1.25rem',
              lineHeight: 1,
              color: '#888'
            }}
          >
            →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
