'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCheckSquare, FiArrowRight } from 'react-icons/fi';

const Success = () => {
    const steps = [
        { title: 'Reach Out', description: 'Schedule your free consultation to explore personalized wellness and workplace resilience solutions tailored to your needs.' },
        { title: 'Understand', description: 'We collaboratively assess current stressors, team dynamics, and existing support systems to establish a clear baseline for our work together.' },
        { title: 'Strategize', description: 'Together, we co-create a strategic, actionable plan incorporating proven techniques and clear, measurable objectives for success.' },
        { title: 'Implement', description: 'Your tailored plan is put into action with guided support, practical workshops, and consistent progress check-ins to ensure effectiveness.' },
        { title: 'Thrive', description: 'We help you sustain positive changes and foster a culture of ongoing well-being with resources, follow-up support, and continuous improvement strategies.' },
    ];

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const updateMedia = () => setIsMobile(window.innerWidth < 768);
        if (typeof window !== 'undefined') {
            updateMedia();
            window.addEventListener('resize', updateMedia);
            return () => window.removeEventListener('resize', updateMedia);
        }
    }, []);

    const cardNominalWidth = isMobile ? 150 : 170;
    const cardGap = isMobile ? 16 : 24;

    const barWidth = isMobile ? 28 : 36;
    const baseBarHeight = 30;
    const barGrowthFactor = 1.35;
    const barHeights = steps.map((_, i) => Math.round(baseBarHeight * Math.pow(barGrowthFactor, i)));

    const numberAndTitleHeight = 65;
    const topPadding = 15;
    const bottomPadding = 20;
    const spaceBetweenBarAndNumber = 10;
    const spaceBelowTitle = 14;

    const maxBarHeight = Math.max(...barHeights);
    const cardTopSectionHeight = topPadding + maxBarHeight + spaceBetweenBarAndNumber + numberAndTitleHeight + spaceBelowTitle;
    // MODIFIED: Further increased estimated height for description by another 20% (approx)
    const estimatedDescriptionHeight = 222;
    const totalCardHeight = cardTopSectionHeight + estimatedDescriptionHeight + bottomPadding;

    // Framer Motion variants
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };
    const contentWrapperVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };
    const barVariants = (customHeight) => ({
        hidden: { height: 0, opacity: 0 },
        visible: {
            height: customHeight,
            opacity: 1,
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
        },
    });

    // Engraved text shadow style
    const engravedLightOnDarkStyle = (color = '#37b048') => ({
        color: color,
        textShadow: '0px 1px 1px rgba(0,0,0,0.2), 0px -1px 1px rgba(255,255,255,0.15)',
    });

    const engravedDarkOnLightStyle = (color = '#333333') => ({
        color: color,
        textShadow: '1px 1px 0px rgba(255,255,255,0.5), -1px -1px 0px rgba(0,0,0,0.03)',
    });


    return (
        <motion.section
            style={{
                width: '100%',
                backgroundColor: 'rgba(240, 238, 233, 0.85)',
                backgroundImage: 'url(/assets/textures/soft-wallpaper.png)',
                backgroundRepeat: 'repeat',
                padding: 'clamp(3rem, 7vw, 5rem) 0',
                fontFamily: '"Lato", sans-serif',
                color: '#444',
                overflowX: 'hidden',
                boxShadow: `
                    inset 0 10px 15px -10px rgba(0,0,0,0.25), 
                    inset 0 -10px 15px -10px rgba(0,0,0,0.25)
                `,
                position: 'relative',
            }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <motion.div
                style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    padding: '0 clamp(1rem, 4vw, 2rem)',
                }}
                variants={contentWrapperVariants}
            >
                {/* Header */}
                <motion.div
                    variants={itemVariants}
                    style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                        ...engravedLightOnDarkStyle('#37b048'),
                        margin: '0 0 1rem',
                        fontWeight: 'bold',
                        letterSpacing: '-0.03em',
                    }}>
                        Five Steps to Success
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                        lineHeight: '1.75',
                        color: '#4a5568',
                        maxWidth: '750px',
                        margin: '0 auto',
                    }}>
                        Our proven process guides your organization from initial consultation through lasting cultural change—ensuring measurable ROI and a resilient workplace.
                    </p>
                </motion.div>

                {/* Steps Container */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        width: '100%',
                        overflowX: isMobile ? 'auto' : 'visible',
                        paddingBottom: isMobile ? '1.5rem' : '0.5rem',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: isMobile ? 'flex-start' : 'center',
                            alignItems: 'flex-end',
                            gap: `clamp(${cardGap * 0.8}px, 2vw, ${cardGap}px)`,
                            minWidth: isMobile ? `${steps.length * (cardNominalWidth + cardGap)}px` : 'auto',
                            paddingLeft: isMobile ? `clamp(1rem, 4vw, 2rem)` : '0',
                            paddingRight: isMobile ? `clamp(1rem, 4vw, 2rem)` : '0',
                        }}
                    >
                        {steps.map((step, i) => (
                            <Fragment key={i}>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.03, y: -5, boxShadow: '0 14px 35px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.25)' }} // Added whileHover
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)',
                                        borderRadius: '16px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.12), inset 0 1px 0px rgba(255,255,255,0.2)',
                                        flex: `0 0 ${cardNominalWidth}px`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        height: `${totalCardHeight}px`, // Uses updated totalCardHeight
                                        boxSizing: 'border-box',
                                        textAlign: 'center',
                                        position: 'relative',
                                        border: '1px solid rgba(255,255,255,0.25)',
                                        cursor: 'pointer', // Indicate interactivity
                                    }}
                                >
                                    {/* This div contains bar, number, and title. flexGrow pushes description down. */}
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                                        {/* Bar container */}
                                        <div style={{ width: `${barWidth}px`, marginTop: `${topPadding}px`, display: 'flex', alignItems: 'flex-end', height: `${maxBarHeight}px` }}>
                                            <motion.div
                                                custom={barHeights[i]}
                                                variants={barVariants(barHeights[i])}
                                                style={{
                                                    width: '100%',
                                                    background: 'linear-gradient(to top, #37b048, #45cc58)',
                                                    borderRadius: '4px 4px 0 0',
                                                    boxShadow: '0 -2px 5px rgba(0,0,0,0.1) inset, 0 2px 3px rgba(0,0,0,0.1)',
                                                }}
                                            />
                                        </div>

                                        {/* Number and Title section */}
                                        <div style={{
                                            height: `${numberAndTitleHeight}px`,
                                            display: 'flex', flexDirection: 'column',
                                            alignItems: 'center', justifyContent: 'center',
                                            marginTop: `${spaceBetweenBarAndNumber}px`,
                                            width: '100%',
                                        }}>
                                            <div style={{
                                                width: '38px', height: '38px',
                                                borderRadius: '50%',
                                                backgroundColor: 'rgba(55, 176, 72, 0.2)',
                                                border: `1px solid rgba(55, 176, 72, 0.5)`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginBottom: '0.6rem',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                            }}>
                                                <span style={{ fontWeight: 'bold', ...engravedDarkOnLightStyle('#2a8a36'), fontSize: '1.05rem' }}>{i + 1}</span>
                                            </div>
                                            <h3 style={{
                                                margin: 0,
                                                ...engravedDarkOnLightStyle('#333333'),
                                                fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                                                fontWeight: 'bold',
                                                lineHeight: '1.25',
                                                maxHeight: '2.5em',
                                                overflow: 'hidden',
                                            }}>
                                                {step.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Card Description */}
                                    <p style={{
                                        margin: 0,
                                        marginTop: `${spaceBelowTitle}px`,
                                        color: '#303030',
                                        lineHeight: '1.55',
                                        fontSize: 'clamp(0.8rem, 1.5vw, 0.875rem)',
                                        width: '100%',
                                        paddingBottom: `${bottomPadding}px`,
                                    }}>
                                        {step.description}
                                    </p>
                                </motion.div>

                                {i < steps.length - 1 && !isMobile && (
                                    <motion.div
                                        variants={itemVariants}
                                        style={{
                                            alignSelf: 'flex-start',
                                            marginTop: `${totalCardHeight - maxBarHeight - numberAndTitleHeight - (spaceBetweenBarAndNumber / 2) - 28}px`,
                                            padding: '0 clamp(0.25rem, 1vw, 0.5rem)',
                                        }}
                                    >
                                        <FiArrowUpRight style={{ color: 'rgba(0,0,0,0.35)', fontSize: '1.8rem', transform: 'rotate(25deg) translateY(-5px)', opacity: 0.6 }} />
                                    </motion.div>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div variants={itemVariants} style={{ textAlign: 'center', marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
                    <motion.a
                        href="/contact"
                        style={{
                            display: 'inline-flex', alignItems: 'center',
                            padding: '0.9rem 2.75rem',
                            background: 'linear-gradient(to bottom, rgba(55, 176, 72, 0.85), rgba(47, 154, 54, 0.95))',
                            color: '#fff',
                            borderRadius: '50px', textDecoration: 'none',
                            fontSize: 'clamp(1rem, 1.8vw, 1.1rem)', fontWeight: 'bold',
                            border: '1px solid rgba(255,255,255,0.15)',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.25)',
                            transition: 'background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
                            textShadow: '0 1px 2px rgba(0,0,0,0.25)',
                        }}
                        whileHover={{
                            background: 'linear-gradient(to bottom, rgba(69, 204, 88, 0.9), rgba(55, 176, 72, 1))',
                            y: -3,
                            boxShadow: '0 8px 22px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.3)'
                        }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Begin Your Transformation
                        <FiArrowRight style={{ marginLeft: '0.75rem', fontSize: '1.2em' }} />
                    </motion.a>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Success;