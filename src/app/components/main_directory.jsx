'use client';

import React, { useState } from 'react'; // Removed useEffect as it's no longer needed for parallax
import {
    FiUser, FiAward, FiUsers, FiSmile,
    FiFileText, FiCalendar, FiArrowRightCircle
} from 'react-icons/fi';

export default function MainDirectory() {
    const items = [
        { icon: FiUser, title: 'Meet Michelle (Your Coach)', description: "Learn about Michelle's 30+ years as an RN, her coaching philosophy, and commitment to your well-being." },
        { icon: FiAward, title: 'The Working Mind Program', description: "Discover this leading evidence-based program to promote mental fitness and resilience in your workplace." },
        { icon: FiUsers, title: 'Workplace Wellness Solutions', description: "Tailored programs & workshops designed to cultivate a mentally healthy, supportive, and productive work environment." },
        { icon: FiSmile, title: 'Focused Wellness Coaching', description: "Targeted coaching sessions to address specific wellness goals and enhance team or individual resilience within your organization." },
        { icon: FiFileText, title: 'Resource & Learning Hub', description: "Access insightful articles, practical strategies, and resources to enhance your understanding of mental well-being." },
        { icon: FiCalendar, title: 'Book a Consultation', description: "Ready to take the next step? Schedule a complimentary consultation to discuss your organization's needs." },
    ];

    const [hoveredCard, setHoveredCard] = React.useState(null);
    // Removed backgroundOffsetY and its useEffect as background is now fixed

    return (
        <div
            style={{
                padding: 'clamp(3rem, 7vw, 5rem) clamp(1rem, 5vw, 2rem)',
                backgroundImage: 'url(/assets/textures/paper.png)',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                backgroundColor: '#212529',
                boxSizing: 'border-box',
                fontFamily: '"Lato", sans-serif',
                overflowX: 'hidden',
                position: 'relative', // Good for managing shadows and pseudo-elements if needed
                // Inset shadow to make the component look recessed
                boxShadow: `
                    inset 0 12px 18px -10px rgba(0,0,0,0.35), 
                    inset 0 -12px 18px -10px rgba(0,0,0,0.35)
                `,
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
                <h2 style={{
                    fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                    color: '#f8f9fa',
                    margin: '0 0 0.6rem 0',
                    fontWeight: 'bold',
                    letterSpacing: '-0.03em',
                    textShadow: '0 2px 5px rgba(0,0,0,0.5), 0 0 2px rgba(0,0,0,0.4)',
                }}>
                    How Can We Support You?
                </h2>
                <p style={{
                    fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                    color: '#ced4da',
                    maxWidth: '650px',
                    margin: '0 auto',
                    lineHeight: 1.6,
                    textShadow: '0 2px 4px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.3)',
                }}>
                    Explore our services designed to foster mental wellness and resilience in your workplace and personal life.
                </p>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 28vw, 310px), 1fr))',
                    gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {items.map((item, idx) => {
                    const IconComponent = item.icon;
                    const isHovered = hoveredCard === idx;

                    return (
                        <div
                            key={idx}
                            onMouseEnter={() => setHoveredCard(idx)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: 'clamp(1.2rem, 2.5vw, 2rem)',
                                backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.75)',
                                borderRadius: '16px',
                                boxShadow: isHovered
                                    ? '0 16px 35px rgba(0, 0, 0, 0.22), 0 10px 18px rgba(0, 0, 0, 0.18)'
                                    : '0 6px 15px rgba(0, 0, 0, 0.12)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                                transform: isHovered ? 'translateY(-10px)' : 'translateY(0px)',
                                cursor: 'pointer',
                                border: isHovered ? '1px solid rgba(224, 224, 224, 0.65)' : '1px solid rgba(224, 224, 224, 0.4)',
                                minHeight: '270px',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div> {/* Content wrapper */}
                                <IconComponent
                                    style={{
                                        color: '#37b048',
                                        fontSize: 'clamp(2.6rem, 5.5vw, 3.2rem)',
                                        marginBottom: '1rem',
                                        transition: 'transform 0.3s ease',
                                        transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                                    }}
                                />
                                <h3
                                    style={{
                                        color: '#212529',
                                        fontSize: 'clamp(1.2rem, 2.3vw, 1.4rem)',
                                        marginBottom: '0.6rem',
                                        fontWeight: 'bold',
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                                        color: '#343a40',
                                        lineHeight: 1.55,
                                        marginBottom: '1rem',
                                        flexGrow: 1,
                                    }}
                                >
                                    {item.description}
                                </p>
                            </div>

                            <FiArrowRightCircle
                                style={{
                                    fontSize: '1.7rem',
                                    color: isHovered ? '#278a32' : '#37b048',
                                    transition: 'color 0.3s ease, transform 0.3s ease',
                                    transform: isHovered ? 'translateX(4px) scale(1.05)' : 'translateX(0px) scale(1)',
                                    alignSelf: 'center',
                                    marginTop: 'auto',
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
