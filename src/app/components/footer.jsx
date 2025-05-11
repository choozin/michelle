'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'; // Using Fi icons for consistency

// Assuming Lato font is loaded globally

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
        }
    };

    const linkStyle = {
        color: '#adb5bd',
        textDecoration: 'none',
        fontSize: '0.9rem',
        display: 'inline-block',
        marginBottom: '0.5rem',
        transition: 'color 0.2s ease-in-out',
    };

    const linkHoverStyle = { // This can't be directly used in inline style for :hover
        // For actual hover, you'd use CSS or onMouseEnter/Leave if not using a UI library's hover props
    };

    const iconStyle = {
        marginRight: '0.5rem',
        verticalAlign: 'middle', // Aligns icon better with text
    };

    return (
        <motion.footer
            style={{
                backgroundColor: '#212529', // Dark charcoal background
                color: '#adb5bd', // Default light gray text
                padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem)',
                fontFamily: '"Lato", sans-serif',
                borderTop: '3px solid #37b048', // Accent green top border
            }}
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', // Responsive columns
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                alignItems: 'flex-start', // Align content of each column to the top
            }}>
                {/* Column 1: Brand and Tagline */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                        fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                        color: '#ffffff', // White for brand name
                        fontWeight: 'bold',
                        margin: '0 0 0.5rem 0',
                        fontFamily: '"Times New Roman", Times, serif', // Consistent with header logo
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        Brave Change Coaching
                    </h3>
                    <p style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: '#ced4da', // Slightly brighter gray for tagline
                    }}>
                        Empowering workplaces and individuals towards mental wellness and resilience. Your journey to brilliance starts here.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                        fontSize: '1.1rem',
                        color: '#f8f9fa',
                        fontWeight: '600',
                        marginBottom: '1rem',
                        borderBottom: '1px solid #495057',
                        paddingBottom: '0.5rem',
                    }}>
                        Quick Links
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li><Link href="/" passHref legacyBehavior><a style={linkStyle} className="footer-link">Home</a></Link></li>
                        <li><Link href="/about" passHref legacyBehavior><a style={linkStyle} className="footer-link">About Michelle</a></Link></li>
                        <li><Link href="/workshops" passHref legacyBehavior><a style={linkStyle} className="footer-link">Workshops</a></Link></li>
                        <li><Link href="/programs/the-working-mind" passHref legacyBehavior><a style={linkStyle} className="footer-link">The Working Mind</a></Link></li>
                        <li><Link href="/contact" passHref legacyBehavior><a style={linkStyle} className="footer-link">Contact</a></Link></li>
                    </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                        fontSize: '1.1rem',
                        color: '#f8f9fa',
                        fontWeight: '600',
                        marginBottom: '1rem',
                        borderBottom: '1px solid #495057',
                        paddingBottom: '0.5rem',
                    }}>
                        Get In Touch
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: '0.6rem' }}>
                            <a href="mailto:michelle@outlook.com" style={linkStyle} className="footer-link">
                                <FiMail style={iconStyle} /> michelle@outlook.com
                            </a>
                        </li>
                        <li style={{ marginBottom: '0.6rem' }}>
                            <a href="tel:519-222-7995" style={linkStyle} className="footer-link">
                                <FiPhone style={iconStyle} /> (519) 222-7995
                            </a>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <FiMapPin style={{ ...iconStyle, marginTop: '0.2em', color: '#adb5bd' }} />
                            <span style={{ fontSize: '0.9rem', color: '#adb5bd' }}>
                                London, Ontario, Canada<br />
                                (Serving clients remotely & in person)
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar: Copyright */}
            <div style={{
                textAlign: 'center',
                paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                borderTop: '1px solid #495057', // Darker gray separator
                fontSize: '0.8rem',
                color: '#868e96', // Even lighter gray for copyright
            }}>
                &copy; {currentYear} Brave Change Coaching. All Rights Reserved.
                {/* Optional: Add a link to a privacy policy or terms */}
                {/* <span style={{ margin: '0 0.5rem' }}>|</span>
                <Link href="/privacy-policy" passHref legacyBehavior><a style={{...linkStyle, fontSize: '0.8rem'}} className="footer-link">Privacy Policy</a></Link> */}
            </div>

            {/* CSS for link hover effect - since inline styles can't do :hover directly */}
            <style jsx global>{`
                .footer-link:hover {
                    color: #37b048 !important;
                    text-decoration: underline !important;
                }
            `}</style>
        </motion.footer>
    );
};

export default Footer;