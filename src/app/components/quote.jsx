'use client';

import React, { useState, useEffect } from 'react';

// Array of inspirational quotes
const quotes = [
    { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { quote: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius" },
    { quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { quote: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { quote: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" }
];

// Next.js-optimized Quote component
const Quote = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Pick a random quote on mount
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setIndex(randomIndex);
    }, []);

    const { quote, author } = quotes[index];

    return (
        <div
            style={{
                width: '100%',
                padding: '6rem 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                fontFamily: '"Lato", sans-serif',
            }}
        >
            <span style={{ fontSize: '1.25rem', textAlign: 'center', color: '#444', padding: '1rem', }}>
                {quote}
            </span>
            <span
                style={{
                    fontSize: '0.8rem',
                    color: '#37b048',
                    textTransform: 'uppercase',
                    marginTop: '1rem',
                    fontWeight: 'bold',
                }}
            >
                {`- ${author}`}
            </span>
        </div>
    );
};

export default Quote;
