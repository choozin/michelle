// src/app/components/PricingSection.jsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

// Data remains the same as previously defined
const pricingPackagesData = [
    {
        id: 'starter',
        name: "Starter Spark",
        tagline: "Ignite clarity and define your path forward.",
        priceBase: 1275,
        initialSessions: 2,
        checkInSessions: 13,
        colorScheme: {
            background: '#f4f1ea',
            text: '#4A4A4A',
            accent: '#37b048',
            badgeBackground: '#37b048',
            badgeText: '#ffffff',
            headerBackground: '#e9e4d9',
            buttonText: '#FFFFFF',
        },
        badge: null,
        shortFeatures: [
            "2 Initial 60-min Sessions",
            "13 x 30-min Check-in Sessions",
            "Personalized Goal Setting",
            "Vision Statement Crafting",
        ],
        paymentNote: "Flexible payment options available",
    },
    {
        id: 'momentum',
        name: "Momentum Builder",
        tagline: "Sustain progress with consistent support & accountability.",
        priceBase: 1550,
        initialSessions: 2,
        checkInSessions: 18,
        colorScheme: {
            background: '#37b048',
            text: '#ffffff',
            accent: '#ffffff',
            badgeBackground: '#2c7a7b',
            badgeText: '#ffffff',
            headerBackground: '#2f9a36',
            buttonBackground: '#FFFFFF',
            buttonText: '#37b048',
        },
        badge: "Most Popular",
        shortFeatures: [
            "2 Initial 60-min Sessions",
            "18 x 30-min Check-in Sessions",
            "Enhanced Accountability Structure",
            "Mid-Point Progress Review",
        ],
        paymentNote: "Flexible payment options available",
    },
    {
        id: 'transformational',
        name: "Transformational Journey",
        tagline: "Deepen your growth with comprehensive, ongoing coaching.",
        priceBase: 1759,
        initialSessions: 2,
        checkInSessions: 23,
        colorScheme: {
            background: '#2c7a7b',
            text: '#ffffff',
            accent: '#ffffff',
            badgeBackground: '#37b048',
            badgeText: '#ffffff',
            headerBackground: '#256869',
            buttonBackground: '#FFFFFF',
            buttonText: '#2c7a7b',
        },
        badge: "Recommended",
        shortFeatures: [
            "2 Initial 60-min Sessions",
            "23 x 30-min Check-in Sessions",
            "Comprehensive Support System",
            "Post-Package Follow-up",
        ],
        paymentNote: "Flexible payment options available",
    },
    {
        id: 'elite',
        name: "Executive Elite",
        tagline: "Ultimate support & strategic partnership for peak performance.",
        priceBase: 3500,
        initialSessions: 3,
        checkInSessions: 30,
        colorScheme: {
            background: '#343a40',
            text: '#f8f9fa',
            accent: '#86ef90',
            badgeBackground: '#86ef90',
            badgeText: '#2c3e50',
            headerBackground: '#23272b',
            buttonBackground: '#86ef90',
            buttonText: '#2c3e50',
        },
        badge: "Premium",
        shortFeatures: [
            "3 Initial 90-min Strategy Sessions",
            "30+ Bi-weekly 45-min Check-ins",
            "Bespoke Achievement Blueprint",
            "Direct Line & Priority Access",
        ],
        paymentNote: "Custom payment plans available",
    }
];

const PricingSection = () => {
    const [hoveredCardId, setHoveredCardId] = useState(null);

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 25, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
    };

    const gridColumnCount = pricingPackagesData.length === 4 ? 2 : 'auto-fit';
    const cardMinWidth = 'clamp(240px, 100%, 290px)';

    return (
        <motion.section
            style={{
                width: '100%',
                padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 4vw, 1.5rem)',
                fontFamily: '"Lato", sans-serif',
                backgroundColor: '#fdfdff',
                color: '#4A4A4A',
                overflowX: 'hidden',
            }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
        >
            <motion.div
                style={{
                    maxWidth: pricingPackagesData.length === 4 ? '700px' : '1000px',
                    margin: '0 auto'
                }}
                variants={sectionVariants}
            >
                <motion.h2
                    variants={cardVariants}
                    style={{
                        fontSize: 'clamp(1.9rem, 4.5vw, 2.6rem)',
                        color: '#37b048',
                        marginBottom: '0.75rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Coaching Packages
                </motion.h2>
                <motion.p
                    variants={cardVariants}
                    style={{
                        fontSize: 'clamp(0.95rem, 1.7vw, 1.1rem)',
                        color: '#5f6c7b',
                        maxWidth: '700px',
                        margin: '0 auto clamp(2rem, 4vw, 3.5rem)',
                        textAlign: 'center',
                        lineHeight: 1.65,
                    }}
                >
                    Invest in your growth with a package tailored to your journey. Explore options designed to provide clarity, build momentum, and foster lasting transformation.
                </motion.p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${pricingPackagesData.length === 4 ? 2 : 'auto-fit'}, minmax(${cardMinWidth}, 1fr))`,
                        gap: 'clamp(1.25rem, 2vw, 2rem)',
                        alignItems: 'stretch',
                        justifyItems: 'center',
                    }}
                >
                    {pricingPackagesData.map((pkg) => {
                        const isHovered = hoveredCardId === pkg.id;
                        return (
                            <motion.div
                                key={pkg.id}
                                variants={cardVariants}
                                onMouseEnter={() => setHoveredCardId(pkg.id)}
                                onMouseLeave={() => setHoveredCardId(null)}
                                style={{
                                    backgroundColor: pkg.colorScheme.background,
                                    color: pkg.colorScheme.text,
                                    borderRadius: '14px',
                                    boxShadow: isHovered ? '0 12px 28px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)' : '0 6px 16px rgba(0,0,0,0.06)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden', // Important for the ribbon effect
                                    border: `1px solid ${isHovered ? pkg.colorScheme.accent : 'rgba(0,0,0,0.08)'}`,
                                    transition: 'transform 0.25s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out',
                                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0px)',
                                    width: '100%',
                                    maxWidth: '340px',
                                }}
                            >
                                {pkg.badge && (
                                    // This outer div is for positioning the ribbon's visible area and overflow
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, // Adjust if border creates a gap
                                        right: 0, // Adjust if border creates a gap
                                        width: '100px', // Width of the corner area the ribbon "occupies"
                                        height: '100px', // Height of the corner area
                                        overflow: 'hidden', // This will clip the parts of the ribbon we don't want to see
                                        zIndex: 1,
                                    }}>
                                        <motion.div
                                            initial={{ x: 40, y: -40, opacity: 0, rotate: 45 }} // Start further out
                                            animate={{ x: 0, y: 0, opacity: 1, rotate: 45 }} // Animate into place
                                            transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 12 }}
                                            style={{
                                                position: 'absolute',
                                                // To make it appear "wrapped", the ribbon needs to be positioned
                                                // such that its center is at the corner, but it's wide enough
                                                // that its ends go "off-screen" from this small container.
                                                // The rotation point is the center of this element.
                                                top: '25px',     // Pulls the ribbon down along its 45-deg axis
                                                right: '-35px',  // Pulls the ribbon left along its 45-deg axis
                                                // These values may need tweaking based on font and ribbon width

                                                width: '150px',  // Make the ribbon itself wider than its container
                                                padding: '4px 0', // Adjust padding for the text
                                                backgroundColor: pkg.colorScheme.badgeBackground || pkg.colorScheme.accent,
                                                color: pkg.colorScheme.badgeText || '#ffffff',
                                                textAlign: 'center',
                                                fontSize: '0.6rem', // Smaller font for the badge
                                                fontWeight: 'bold', // Make it bold to stand out
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                                                letterSpacing: '0.04em',
                                                textTransform: 'uppercase',
                                                // transform: 'rotate(45deg)' // Handled by Framer Motion
                                            }}
                                        >
                                            {pkg.badge}
                                        </motion.div>
                                    </div>
                                )}

                                <div style={{
                                    padding: '1.5rem 1.25rem 1.25rem 1.25rem',
                                    backgroundColor: pkg.colorScheme.headerBackground || pkg.colorScheme.background,
                                    borderBottom: `1px solid rgba(0,0,0,0.05)`
                                }}>
                                    <h3 style={{
                                        fontSize: 'clamp(1.2rem, 2.2vw, 1.4rem)',
                                        fontWeight: 'bold',
                                        margin: '0 0 0.4rem 0',
                                        color: pkg.colorScheme.text,
                                        minHeight: '2.4em',
                                    }}>
                                        {pkg.name}
                                    </h3>
                                    <p style={{
                                        fontSize: 'clamp(0.8rem, 1.4vw, 0.85rem)',
                                        lineHeight: 1.45,
                                        margin: '0 0 0.8rem 0',
                                        minHeight: '4.35em',
                                        opacity: 0.85,
                                        color: pkg.colorScheme.text,
                                    }}>
                                        {pkg.tagline}
                                    </p>
                                </div>

                                <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{
                                        fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)',
                                        fontWeight: 'bold',
                                        color: pkg.colorScheme.accent,
                                        marginBottom: '0.2rem',
                                        textAlign: 'center',
                                    }}
                                    >
                                        ${pkg.priceBase}
                                        <span style={{ fontSize: '0.45em', fontWeight: 'normal', opacity: 0.75, marginLeft: '3px' }}>+ HST</span>
                                    </div>

                                    <ul style={{
                                        listStyle: 'none', padding: 0, margin: '0.8rem 0', fontSize: '0.85rem', flexGrow: 1
                                    }}>
                                        {pkg.shortFeatures.map((feature, idx) => (
                                            <li key={idx} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                                                <FiChevronRight style={{ marginRight: '6px', color: pkg.colorScheme.accent, flexShrink: 0, fontSize: '1em' }} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <p style={{ fontSize: '0.75rem', fontStyle: 'italic', textAlign: 'center', margin: '0.8rem 0 1.25rem 0', opacity: 0.75 }}>
                                        {pkg.paymentNote}
                                    </p>

                                    {/* Button added for all cards, including Executive Elite */}
                                    <Link href={`/pricing#${pkg.id}`} passHref legacyBehavior>
                                        <motion.a
                                            style={{
                                                display: 'block',
                                                padding: '0.8rem 1.3rem',
                                                backgroundColor: pkg.colorScheme.buttonBackground || pkg.colorScheme.accent,
                                                color: pkg.colorScheme.buttonText || pkg.colorScheme.text, // Ensure button text color is dynamic
                                                borderRadius: '30px',
                                                textAlign: 'center',
                                                textDecoration: 'none',
                                                fontWeight: 'bold',
                                                fontSize: '0.9rem',
                                                border: `1.5px solid ${pkg.colorScheme.buttonBackground || pkg.colorScheme.accent}`, // Border matches button bg
                                                boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                                                transition: 'all 0.25s ease',
                                                marginTop: 'auto',
                                            }}
                                            whileHover={{
                                                transform: 'translateY(-2px) scale(1.02)',
                                                boxShadow: '0 5px 12px rgba(0,0,0,0.12)',
                                                filter: `brightness(${(pkg.colorScheme.buttonBackground || pkg.colorScheme.accent) === '#FFFFFF' ? '0.95' : '1.1'})`, // Adjust brightness logic
                                            }}
                                        >
                                            Explore This Plan
                                        </motion.a>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                <motion.div
                    variants={cardVariants}
                    style={{
                        textAlign: 'center',
                        marginTop: 'clamp(2.2rem, 4.5vw, 3rem)',
                        fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
                        color: '#555',
                        padding: '0.8rem',
                        backgroundColor: 'rgba(240, 238, 233, 0.6)',
                        borderRadius: '8px',
                    }}
                >
                    <p style={{ margin: 0 }}>Need more flexibility or have different requirements? Additional sessions and customized packages are available.
                        <Link href="/pricing#additional-sessions" style={{ color: '#37b048', fontWeight: 'bold', marginLeft: '0.5rem', textDecoration: 'underline' }}>
                            Learn More
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default PricingSection;