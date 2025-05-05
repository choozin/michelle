// File: src/app/components/AboutMe.jsx
'use client';

import React from 'react';
import Image from 'next/image';

const AboutMe = () => {
    const stats = [
        { label: 'Nurse Interns Mentored', value: 168 },
        { label: 'Workshops Delivered', value: 45 },
        { label: 'Coaching Certificates', value: 12 }
    ];

    const imageSrc = '/assets/img/michelle.jpg';

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

    return (
        <div
            className="about-container"
            style={{
                width: '100%',
                backgroundColor: '#fff',
                padding: '6rem 0',
                fontFamily: '"Lato", sans-serif',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    maxWidth: '1200px',
                    width: '100%',
                    gap: '4rem'           // increased spacing between columns
                }}
            >
                {/* Left: Heading and Profile Image */}
                <div
                    style={{
                        width: isMobile ? '100%' : '40%',
                        maxWidth: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between', // space between heading and image
                        textAlign: 'left'
                    }}
                >
                    <h2
                        style={{
                            fontSize: '2rem',
                            color: '#37b048',
                            margin: 0
                        }}
                    >
                        About Me
                    </h2>
                    <div
                        style={{
                            width: '100%',
                            position: 'relative',
                            aspectRatio: '1',
                            borderRadius: '50%',
                            backgroundColor: '#eaeaea',
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            src={imageSrc}
                            alt="Michelle Harding"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>

                {/* Right: Content (vertically centered) */}
                <div
                    style={{
                        width: isMobile ? '100%' : '55%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                        padding: '0 1rem',
                    }}
                >
                    <h3
                        style={{
                            fontSize: '2rem',
                            margin: '0 0 0.5rem'
                        }}
                    >
                        Michelle Harding
                    </h3>
                    <p
                        style={{
                            fontSize: '1rem',     // reduced size
                            color: '#333',
                            margin: '0 0 1rem'
                        }}
                    >
                        Wellness Coach & Mental Health Educator
                    </p>
                    <p
                        style={{
                            fontSize: '1rem',     // reduced size
                            lineHeight: 1.6,
                            color: '#555',
                            marginBottom: '2rem'
                        }}
                    >
                        Michelle Harding is a retired Registered Practical Nurse (RPN) with over 20 years of experience at London Health Sciences Centre in various management roles, most recently overseeing Nurse Interns. She now empowers workplaces and individuals to enhance well-being through personalized Wellness Coaching and comprehensive Mental Health Education programs.
                    </p>

                    {/* Stats */}
                    <div
                        style={{
                            display: 'flex',
                            borderTop: '1px solid #e0e0e0',
                            paddingTop: '1.25rem'
                        }}
                    >
                        {stats.map((item, idx) => (
                            <div
                                key={idx}
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    maxWidth: '30%',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '2.5rem',
                                        color: '#37b048',
                                        marginBottom: '0.5rem'
                                    }}
                                >
                                    {item.value}
                                </div>
                                <div
                                    style={{
                                        fontSize: '0.875rem',
                                        color: '#888'
                                    }}
                                >
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Link */}
                    <a
                        href="#"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            marginTop: '2.5rem',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            color: '#37b048',
                            textDecoration: 'none'
                        }}
                    >
                        More About Me
                        <span
                            style={{
                                marginLeft: '0.5rem',
                                fontSize: '1.125rem'
                            }}
                        >
                            →
                        </span>
                    </a>
                </div>
            </div>

            <style jsx global>{`
                @media (max-width: 550px) {
                  .about-container > div {
                    flex-direction: column !important;
                    align-items: center !important;
                  }
                }
            `}</style>
        </div>
    );
};

export default AboutMe;
