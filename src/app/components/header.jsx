// File: src/app/components/header.jsx
'use client';

import { useState, useEffect } from 'react'; // Added useEffect for active slug handling
import { useMediaQuery } from '@mantine/hooks';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import Link from 'next/link'; // Added Next.js Link
// import Image from 'next/image'; // Kept from original, remove if truly not used

// Original Mantine component imports (review and remove if any are truly unused)
import {
    Anchor, Box, Container, Group, Burger, Title, Text, Button,
    Blockquote, Grid, Center, Divider, TextInput, Radio, RadioGroup, Modal, Space,
} from '@mantine/core';
// import { Carousel } from '@mantine/carousel'; // Kept from original, remove if unused
// import '@mantine/carousel/styles.css'; // Kept from original, remove if unused
// import { Calendar } from '@mantine/dates'; // Kept from original, remove if unused
import { useForm } from '@mantine/form'; // Kept from original, remove if unused

// Original react-icons (FaEnvelope, FaPhone, FaBars are used. Review others)
import {
    FaBars, FaEnvelope, FaPhone, FaCalendarAlt, FaArrowRight, FaComment,
    FaIdCard, FaBriefcase, FaCheckSquare, FaArrowUp, FaChevronDown,
} from 'react-icons/fa';

// Removed redundant Lato font imports

import { motion } from 'framer-motion';

export default function Header({ currentSlug: initialCurrentSlug, navOpened, setNavOpened }) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const pathname = usePathname();
    const router = useRouter();

    const [activeSlugForStyle, setActiveSlugForStyle] = useState(initialCurrentSlug);

    useEffect(() => {
        let slug = pathname === '/' ? 'home' : pathname.slice(1).split('/')[0];
        if (typeof window !== 'undefined' && window.location.hash) {
            slug = window.location.hash.substring(1);
        }
        setActiveSlugForStyle(slug);
    }, [pathname]);


    const navLinks = [
        { label: 'Home', href: '/', slug: 'home' },
        { label: 'About Me', href: '/#about-me-section', slug: 'about-me-section' },
        { label: 'The Working Mind', href: '/the-working-mind', slug: 'the-working-mind' }, // Added for example
        { label: 'Courses', href: '/courses', slug: 'courses' }, // Example page link
        { label: 'My Blog', href: '/blog', slug: 'blog' },
        { label: 'Online Resources', href: '/resources', slug: 'resources' },
        { label: 'Contact Me', href: '/contact', slug: 'contact' },
    ];

    const handleNavLinkClick = (href, slugForStyle) => {
        setNavOpened(false); // Close mobile nav if open
        setActiveSlugForStyle(slugForStyle);

        if (href.startsWith('/#')) {
            const sectionId = href.substring(2); // Get 'about-me-section'
            if (pathname === '/') { // If on the homepage
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Optionally update URL hash without navigating for history/bookmarking
                    router.replace(href, { scroll: false }); // Prevents full page reload, updates URL
                }
            } else {
                // If on another page, navigate to homepage then scroll
                router.push(href); // Next.js will handle the scroll to #hash if page exists
            }
        } else {
            // Regular page navigation
            router.push(href);
        }
    };

    return (
        <div
            style={{ // Original outer div styling
                width: '100vw',
                overflowX: 'hidden',
            }}
        >
            <div style={{ // Original header bar styling
                width: '99%',
                height: '64px',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem',
            }}>
                {/* Logo Area - Kept original styling */}
                <div style={{
                    height: '100%',
                    width: '300px',
                    maxWidth: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Link href="/" passHref style={{ textDecoration: 'none' }}>
                        <span onClick={(e) => { e.preventDefault(); handleNavLinkClick('/', 'home'); }}
                            style={{ textDecoration: 'none', width: '100%' }}> {/* Anchor for NextLink */}
                            <div style={{ // Original logo text styling
                                width: '100%',
                                textDecoration: 'uppercase', // Corrected from 'none' if it was there
                                lineHeight: '1',
                                textShadow: '0px 0px 2px #655',
                                color: '#655',
                                fontSize: '2rem',
                                fontWeight: '900',
                                cursor: 'pointer', // Added cursor
                            }}>
                                BRAVE CHANGE COACHING
                            </div>
                        </span>
                    </Link>
                    {/* Commented out tagline from original */}
                    {/* <div style={{ width: '100%', fontSize: '0.75rem', fontFamily: '"Lato", sans-serif', }}>
               Your Journey to Brilliance
             </div> */}
                </div>

                {/* Right side: Contact Info (Desktop) + Nav Links (Desktop) / Burger (Mobile) */}
                <div style={{ // Original right-side container
                    height: '100%',
                    // width: '100%', // This might conflict with maxWidth: '10%' below, adjusting
                    display: 'flex',
                    flexDirection: 'column', // Stack contact above nav links
                    justifyContent: 'space-between', // Distributes contact and nav
                    alignItems: 'flex-end',
                    // maxWidth: '70%', // Increased width to accommodate links
                    flexGrow: 1, // Allow it to take remaining space
                    paddingRight: '1rem', // Added some padding
                }}>
                    {/* Contact Info (Desktop) - Kept original styling */}
                    <Group
                        style={{
                            display: isMobile ? 'none' : 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end', // Aligns to the right
                            gap: '16px',
                            fontSize: '10px',
                            color: '#646464',
                            fontFamily: '"Lato", sans-serif',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            width: '100%', // Takes full width of its parent
                            // paddingRight: '2rem', // Removed, parent handles padding
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <FaEnvelope /> michelle@outlook.com
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <FaPhone /> 519‑222‑7995
                        </span>
                    </Group>

                    {/* Desktop Links - Kept original styling approach, integrated NextLink */}
                    {!isMobile && (
                        <Group
                            style={{
                                display: 'flex', // Ensure it's flex even if parent is column
                                justifyContent: 'flex-end', // Aligns links to the right
                                gap: '20px', // Spacing between links
                                width: '100%', // Takes full width
                                alignItems: 'center', // Vertically align if needed
                                // paddingRight: '2rem', // Parent handles padding
                                flexWrap: 'nowrap',
                            }}
                        >
                            {navLinks.map((link) => (
                                <Link key={link.slug} href={link.href} passHref style={{ textDecoration: 'none' }}>
                                    <motion.span
                                        href={link.href} // Keep href for accessibility/SEO
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent default anchor jump before router handles it
                                            handleNavLinkClick(link.href, link.slug);
                                        }}
                                        initial={{ opacity: 0, y: 0 }} // Original framer-motion props
                                        animate={{ opacity: 1 }}
                                        whileHover={{ y: -3 }}
                                        style={{ // Original inline styles for links
                                            color: '#444',
                                            textDecoration: 'none',
                                            textTransform: 'uppercase',
                                            fontFamily: '"Lato", sans-serif',
                                            fontWeight: '700',
                                            fontSize: '12px',
                                            paddingBottom: activeSlugForStyle === link.slug ? '4px' : '0',
                                            borderBottom: activeSlugForStyle === link.slug ? '3px solid #37b048' : 'none',
                                            cursor: 'pointer',
                                        }}
                                    // underline={false} // Not a prop for <a>, use textDecoration: 'none'
                                    >
                                        {link.label}
                                    </motion.span>
                                </Link>
                            ))}
                        </Group>
                    )}

                    {/* Mobile Burger - Kept original styling approach */}
                    {isMobile && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end', // Burger to the right
                            width: '100%', // Full width for justification
                            alignItems: 'center', // Center burger vertically
                            height: '100%' // Ensure it takes full height for alignment
                        }}>
                            <FaBars style={{
                                color: '#655',
                                fontSize: '30px',
                                // marginRight: '16px', // Padding handled by parent now
                                cursor: 'pointer',
                            }}
                                onClick={() => setNavOpened(true)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Links Menu (Overlay) - Kept original structure and styling, added NextLink */}
            {navOpened && isMobile && ( // Ensure it only shows on mobile when opened
                <div style={{ // Original mobile menu overlay styling
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: '#fff', // White background
                    zIndex: 999, // Above other content
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'start', // Align items to the start (top)
                    gap: '24px', // Spacing between links
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    paddingTop: '60px', // Add padding from top
                }}>
                    <div style={{ // Original "Menu" title styling
                        color: '#222',
                        textTransform: 'uppercase',
                        fontFamily: '"Lato", sans-serif',
                        fontWeight: '700',
                        fontSize: '32px',
                        // marginTop: '128px', // Adjusted by paddingTop of parent
                        marginBottom: '24px',
                        paddingBottom: '8px',
                    }}>
                        Menu
                    </div>
                    {navLinks.map((link) => (
                        <Link key={link.slug} href={link.href} passHref legacyBehavior style={{ textDecoration: 'none' }}>
                            <span // Using <a> tag for NextLink
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent default anchor jump
                                    handleNavLinkClick(link.href, link.slug);
                                }}
                                style={{ // Original mobile link styling
                                    color: '#444',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    fontFamily: '"Lato", sans-serif',
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    paddingBottom: activeSlugForStyle === link.slug ? '4px' : '0', // Added padding for consistency
                                    borderBottom: activeSlugForStyle === link.slug ? '3px solid #37b048' : 'none', // Active style
                                }}
                            >
                                {link.label}
                            </span>
                        </Link>
                    ))}
                    <div // Original "Exit" button styling
                        style={{
                            color: '#B00', // Red color for exit
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            fontFamily: '"Lato", sans-serif',
                            fontWeight: '900',
                            fontSize: '20px',
                            cursor: 'pointer',
                            marginTop: '24px', // Added some margin top
                        }}
                        onClick={() => setNavOpened(false)}
                    >
                        Exit
                    </div>
                    {/* Contact info in mobile menu */}
                    <div style={{ marginTop: '32px', textAlign: 'center', fontFamily: '"Lato", sans-serif' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
                            <FaEnvelope /> michelle@outlook.com
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            <FaPhone /> 519‑222‑7995
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}