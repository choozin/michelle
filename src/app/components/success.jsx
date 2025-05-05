'use client';

import React, { useState, useEffect } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

const Success = () => {
    // Define the five steps
    const steps = [
        {
            title: 'Reach Out',
            description:
                'Schedule your free consultation to explore personalized wellness and workplace resilience.'
        },
        {
            title: 'Understand',
            description:
                'Assess your current stressors, habits, and support systems for a clear starting point.'
        },
        {
            title: 'Strategize',
            description:
                'Co-create a tailored plan with mindfulness techniques, coping tools, and goal-setting.'
        },
        {
            title: 'Implement',
            description:
                'Put your plan into action with daily practices, check-ins, and necessary adjustments.'
        },
        {
            title: 'Thrive',
            description:
                'Sustain your progress with ongoing support, mental health education, and community resources.'
        }
    ];

    // Track window width for responsiveness
    const [width, setWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width < 600;

    // Compute bar heights: exponential scale (base 40, factor 1.2)
    const base = 50;
    const factor = 1.4;
    const barHeights = steps.map((_, i) => Math.round(base/2 * Math.pow(factor, i)));
    const maxBarHeight = Math.max(...barHeights);

    return (
        <div
            style={{
                width: '100%',
                backgroundColor: '#f0eee9',
                padding: '3rem 0',
                fontFamily: '"Lato", sans-serif'
            }}
        >
            <div
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {/* Heading */}
                <h2
                    style={{
                        color: '#37b048',
                        fontSize: '2rem',
                        margin: '0 0 2rem',
                        textAlign: 'center'
                    }}
                >
                    Five Steps to Your Success
                </h2>

                {/* Steps Row */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: isMobile ? 'flex-start' : 'space-around',
                        alignItems: 'flex-start',
                        width: '100%',
                        overflowX: 'scroll',
                    }}
                >
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: isMobile ? '100%' : 'auto',
                                marginBottom: isMobile ? '2rem' : 0,
                                position: 'relative',
                                padding: '0 1rem',
                            }}
                        >
                            {/* Number */}
                            <span
                                style={{
                                    fontSize: '1rem',
                                    color: '#666',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                {i + 1}.
                            </span>

                            {/* Bar and Arrow Row Container */}
                            <div
                                style={{
                                    height: `${maxBarHeight}px`,
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-around',
                                    width: `${base + 80}px`,
                                    marginBottom: '1rem',
                                }}
                            >
                                <div
                                    style={{
                                        width: `${base}px`,
                                        height: `${barHeights[i]}px`,
                                        backgroundColor: '#37b048',
                                        
                                    }}
                                />
                                <div style={{
                                    marginBottom: `${barHeights[i]-10}px`,
                                }}>
                                {!isMobile && i < steps.length - 1 && (
                                    <FiArrowUpRight
                                        style={{ color: '#444', fontSize: '1.25rem', transform: 'rotate(30deg)' }}
                                    />
                                )}
                                {isMobile && i < steps.length - 1 && (
                                    <FiArrowUpRight
                                        style={{ color: '#444', fontSize: '1.25rem', transform: 'rotate(30deg)' }}
                                    />
                                )}
                                </div>
                            </div>

                            {/* Title */}
                            <span
                                style={{
                                    fontSize: '1rem',
                                    color: '#37b048',
                                    marginBottom: '1rem',
                                    textAlign: 'center'
                                }}
                            >
                                {step.title}
                            </span>

                            {/* Divider */}
                            <hr
                                style={{
                                    border: 'none',
                                    borderTop: '1px solid #ccc',
                                    width: '80%',
                                    margin: '0.5rem 0'
                                }}
                            />

                            {/* Description */}
                            <p
                                style={{
                                    fontSize: '0.875rem',
                                    color: '#666',
                                    textAlign: 'left',
                                    maxWidth: '200px'
                                }}
                            >
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => alert('Contact Me clicked!')}
                    style={{
                        marginTop: '1rem',
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: '#37b048',
                        background: 'transparent',
                        border: '2px solid #37b048',
                        borderRadius: '999px',
                        cursor: 'pointer'
                    }}
                >
                    CONTACT ME!
                </button>
            </div>
        </div>
    );
};

export default Success;
