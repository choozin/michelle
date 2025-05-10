'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiUsers, FiAward, FiBriefcase } from 'react-icons/fi';

const AboutMe = () => {
    const [isDesktop, setIsDesktop] = useState(undefined);
    const imageWrapperRef = useRef(null);
    const [backgroundOffsetY, setBackgroundOffsetY] = useState(0);

    // Effect for parallax background
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                setBackgroundOffsetY(window.scrollY * 0.5);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateMedia = () => {
                setIsDesktop(window.innerWidth >= 769);
            };

            const makePerfectCircle = () => {
                if (imageWrapperRef.current) {
                    const width = imageWrapperRef.current.offsetWidth;
                    imageWrapperRef.current.style.height = `${width}px`;
                }
            };

            updateMedia();
            setTimeout(makePerfectCircle, 0);

            window.addEventListener('resize', updateMedia);
            window.addEventListener('resize', makePerfectCircle);

            return () => {
                window.removeEventListener('resize', updateMedia);
                window.removeEventListener('resize', makePerfectCircle);
            };
        }
    }, []);

    useEffect(() => {
        if (imageWrapperRef.current && typeof window !== 'undefined') {
            const makePerfectCircle = () => {
                if (imageWrapperRef.current) {
                    const width = imageWrapperRef.current.offsetWidth;
                    imageWrapperRef.current.style.height = `${width}px`;
                }
            };
            setTimeout(makePerfectCircle, 0);
        }
    }, [isDesktop]);


    const stats = [
        { icon: FiBriefcase, label: 'Years in Healthcare', value: '30+' },
        { icon: FiUsers, label: 'Nurse Interns Mentored', value: '160+' },
        { icon: FiAward, label: 'Specialized Certifications', value: '12' }
    ];
    const imageSrc = '/assets/img/michelle.jpg';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.90, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const currentCircleDiameter = isDesktop
        ? 'clamp(330px, 32vw, 420px)'
        : 'clamp(260px, 75vw, 350px)';

    return (
        <div style={{
            width: '100%',
            backgroundColor: 'rgba(240, 238, 233, 0.85)',
            backgroundImage: 'url(/assets/textures/soft-wallpaper.png)',
            backgroundRepeat: 'repeat',
            backgroundPosition: `0% ${backgroundOffsetY}px`,
            padding: 'clamp(3rem, 7vw, 5rem) clamp(1rem, 5vw, 3rem)',
            fontFamily: '"Lato", sans-serif', display: 'flex',
            justifyContent: 'center', boxSizing: 'border-box', overflowX: 'hidden',
            boxShadow: `
                inset 0 10px 15px -10px rgba(0,0,0,0.3), 
                inset 0 -10px 15px -10px rgba(0,0,0,0.3)
            `,
            position: 'relative',
        }}>
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                maxWidth: '1200px', width: '100%', gap: 'clamp(2rem, 4vw, 3rem)',
            }}>
                {/* Page Heading */}
                <motion.div
                    style={{ textAlign: 'center', width: '100%' }}
                    variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                >
                    <h2 style={{
                        fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', color: '#37b048',
                        margin: '0 0 0.6rem 0', fontWeight: 'bold', letterSpacing: '-0.04em',
                        textShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    }}>
                        Meet Michelle Harding
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#525860',
                        maxWidth: '700px', margin: '0 auto', lineHeight: 1.6,
                    }}>
                        Your Experienced Partner in Workplace Mental Wellness
                    </p>
                </motion.div>

                {/* Image and Text Row/Column Container */}
                <div style={{
                    display: 'flex', flexDirection: isDesktop ? 'row' : 'column',
                    alignItems: isDesktop ? 'flex-start' : 'center',
                    gap: isDesktop ? 'clamp(2.5rem, 4vw, 4rem)' : 'clamp(2rem, 5vw, 2.5rem)',
                    width: '100%',
                }}>
                    {/* Image Block Container (Motion Component) */}
                    <motion.div
                        style={{
                            width: isDesktop ? currentCircleDiameter : '100%',
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'flex-start', flexShrink: 0,
                        }}
                        variants={imageVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                    >
                        <div ref={imageWrapperRef} style={{
                            width: currentCircleDiameter,
                            height: currentCircleDiameter,
                            position: 'relative', borderRadius: '50%',
                            overflow: 'hidden',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                            border: '6px solid #fff', backgroundColor: '#e0e0e0',
                        }}>
                            <Image
                                src={imageSrc}
                                alt="Michelle Harding, Registered Nurse and Wellness Coach"
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes={currentCircleDiameter}
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Text Content Block (Motion Component) */}
                    <motion.div
                        style={{
                            flex: isDesktop ? '1' : 'none',
                            width: '100%',
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'center',
                            paddingLeft: isDesktop ? 'clamp(1rem, 2vw, 2rem)' : '0',
                            backgroundColor: isDesktop ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                            padding: isDesktop ? 'clamp(1.5rem, 2.5vw, 2.5rem)' : '0',
                            borderRadius: isDesktop ? '12px' : '0',
                            boxShadow: isDesktop ? '0 6px 20px rgba(0,0,0,0.08)' : 'none',
                        }}
                        variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                    >
                        <div style={{ textAlign: isDesktop ? 'left' : 'center' }}>
                            <p style={{ fontSize: 'clamp(1rem, 1.7vw, 1.1rem)', lineHeight: 1.7, color: '#4a4a4a', marginBottom: '1.25rem' }}>
                                With a rich career spanning over 30 years as a dedicated Registered Nurse (RN), Michelle Harding brings a profound depth of experience from the front lines of healthcare. Her tenure includes impactful leadership, management, and mentorship positions at the London Health Sciences Centre, where she was instrumental in guiding and developing nursing talent. This extensive hands-on experience has instilled in her a critical understanding of the daily stressors faced by individuals in demanding environments and the paramount importance of robust mental well-being.
                            </p>
                            <p style={{ fontSize: 'clamp(1rem, 1.7vw, 1.1rem)', lineHeight: 1.7, color: '#4a4a4a', marginBottom: '1.5rem' }}>
                                {/* CORRECTED unescaped apostrophes */}
                                Transitioning her focus, Michelle now dedicates her expertise to fostering mental resilience and wellness within workplaces and for individuals. She provides tailored Wellness Coaching, drawing on her empathetic nursing background to connect deeply with her clients. As a certified facilitator of &apos;The Working Mind&apos; (TWM) program, developed by the Mental Health Commission of Canada, she equips teams and leaders with evidence-based skills to recognize, respond to, and support mental health challenges. Her approach combines the structured, proven framework of TWM with personalized insights from her nursing career, aiming to cultivate psychologically safe, supportive, and high-performing work environments.
                            </p>
                            <p style={{ fontSize: 'clamp(1rem, 1.7vw, 1.1rem)', lineHeight: 1.7, color: '#4a4a4a', marginBottom: '2rem' }}>
                                Michelle is passionate about destigmatizing mental health conversations and empowering organizations to proactively invest in their most valuable asset: their people. Her coaching and workshops are designed to be engaging, practical, and directly applicable, leading to tangible improvements in employee well-being, team cohesion, and overall workplace culture.
                            </p>

                            <motion.div
                                variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                                style={{
                                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                                    gap: '1rem', borderTop: '1px solid rgba(0,0,0,0.08)',
                                    paddingTop: '1.5rem', marginBottom: '2rem',
                                }}
                            >
                                {stats.map((stat, idx) => (
                                    <motion.div
                                        key={stat.label || idx} variants={itemVariants}
                                        style={{ textAlign: 'center', padding: '0.25rem' }}
                                    >
                                        <stat.icon style={{ fontSize: 'clamp(2rem, 4vw, 2.2rem)', color: '#37b048', marginBottom: '0.5rem' }} />
                                        <div style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', color: '#333', fontWeight: 'bold', marginBottom: '0.2rem' }}>
                                            {stat.value}
                                        </div>
                                        <div style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.75rem)', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                                style={{
                                    marginTop: '2rem',
                                    textAlign: 'center'
                                }}
                            >
                                <button
                                    style={{
                                        display: 'inline-flex', alignItems: 'center',
                                        fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)', fontWeight: 'bold',
                                        color: '#ffffff',
                                        backgroundColor: 'rgba(55, 176, 72, 0.7)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        textDecoration: 'none',
                                        padding: '0.9rem 1.9rem',
                                        borderRadius: '50px',
                                        transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.backgroundColor = 'rgba(69, 204, 88, 0.95)';
                                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                                        e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = 'rgba(55, 176, 72, 0.7)';
                                        e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)';
                                    }}
                                    onClick={() => { console.log("CTA Clicked!"); }}
                                >
                                    Learn More About My Approach
                                    <FiArrowRight style={{ marginLeft: '0.8rem', fontSize: '1.2em' }} />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
