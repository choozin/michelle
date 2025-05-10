'use client';

import { useState } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    Anchor,
    Box,
    Container,
    Group,
    Burger,
    Title,
    Text,
    Button,
    Blockquote,
    Grid,
    Center,
    Divider,
    TextInput,
    Radio,
    RadioGroup,
    Modal,
    Space,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Calendar } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
    FaBars,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaArrowRight,
    FaComment,
    FaIdCard,
    FaBriefcase,
    FaCheckSquare,
    FaArrowUp,
    FaChevronDown,
} from 'react-icons/fa';

import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';

import { motion } from 'framer-motion';

export default function Header({ currentSlug, navOpened, setNavOpened }) {

    const isMobile = useMediaQuery('(max-width: 768px)');

    // define your navigation items with slugs matching paths
    const navLinks = [
        { label: 'Home', href: '/', slug: 'home' },
        { label: 'About Me', href: '/about', slug: 'about' },
        { label: 'Change Your Life', href: '/change-your-life', slug: 'change-your-life' },
        { label: 'Workshops', href: '/workshops', slug: 'workshops' },
        { label: 'Blog', href: '/blog', slug: 'blog' },
        { label: 'Meet Me', href: '/meet-me', slug: 'meet-me' },
    ];

    return (
        <div>
            <div style={{
                width: '100%',
                height: '64px',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem',
            }}>
                <div style={{
                    height: '100%',
                    width: '300px',
                    maxWidth: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div style={{
                        width: '100%',
                        textDecoration: 'uppercase',
                        lineHeight: '1',
                        // slight golden glow around text
                        textShadow: '0px 0px 2px #655',
                        color: '#655',
                        fontSize: '2rem',
                        fontWeight: '900',
                    }}>
                        BRAVE CHANGE COACHING
                    </div>{/*
                    <div style={{
                        width: '100%',
                        fontSize: '0.75rem',
                        fontFamily: '"Lato", sans-serif',
                    }}>
                        Your Journey to Brilliance
                    </div>*/}
                </div>
                <div style={{
                    height: '100%',
                    width: '100%',
                    maxWidth: '10%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}>
                    <Group
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                            gap: '16px',
                            fontSize: '10px',
                            color: '#646464',
                            fontFamily: '"Lato", sans-serif',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            paddingRight: '2rem',
                        }}
                    >
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <FaEnvelope /> michelle@outlook.com
                        </span>
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <FaPhone /> 519‑222‑7995
                        </span>
                    </Group>
                    <div style={{ width: '768px', marginRight: '2rem',}}>
                        {/* Desktop Links */}
                        <Group
                            style={{
                                display: isMobile ? 'none' : 'flex',
                                justifyContent: 'end',
                                gap: '20px',
                                width: '100%',
                            }}
                        >
                            {navLinks.map((link) => (
                                <motion.Anchor key={link.slug} href={link.href}
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ y: -3, }}
                                    style={{
                                        color: '#444',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        fontFamily: '"Lato", sans-serif',
                                        fontWeight: '700',
                                        fontSize: '12px',
                                        paddingBottom: currentSlug === link.slug ? '4px' : '0',
                                        borderBottom:
                                            currentSlug === link.slug
                                                ? '3px solid #37b048'
                                                : 'none',
                                        cursor: 'pointer',
                                    }}
                                    underline={false}
                                >
                                    {link.label}
                                </motion.Anchor>
                            ))}
                        </Group>

                        {/* Mobile Burger */}
                        <div style={{
                            display: isMobile ? 'flex' : 'none',
                            justifyContent: 'end',
                            width: '100%',
                        }}>
                            <FaBars style={{
                                display: isMobile ? 'flex' : 'none',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#444',
                                fontSize: '30px',
                                marginRight: '16px',
                                cursor: 'pointer',
                            }}
                                onClick={() => setNavOpened(true)}
                            />
                            {/* Mobile Links */}
                            {navOpened && (
                                <div style={{
                                    position: 'fixed',
                                    top: '0',
                                    left: '0',
                                    width: '100vw',
                                    height: '100vh',
                                    backgroundColor: '#fff',
                                    zIndex: 999,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'start',
                                    gap: '24px',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                }}>
                                    <div style={{
                                        color: '#222',
                                        textTransform: 'uppercase',
                                        fontFamily: '"Lato", sans-serif',
                                        fontWeight: '700',
                                        fontSize: '32px',
                                        marginTop: '128px',
                                        marginBottom: '24px',
                                        paddingBottom: '8px',
                                    }}>
                                        Menu
                                    </div>
                                    {navLinks.map((link) => (
                                        <div
                                            style={{
                                                color: '#444',
                                                textDecoration: 'none',
                                                textTransform: 'uppercase',
                                                fontFamily: '"Lato", sans-serif',
                                                fontWeight: '500',
                                                fontSize: '16px',
                                                cursor: 'pointer',
                                                borderBottom:
                                                    currentSlug === link.slug
                                                        ? '3px solid #37b048'
                                                        : 'none',
                                            }}
                                            key={link.slug}
                                            href={link.href}
                                            passHref
                                            onClick={() => setNavOpened(false)}
                                        >
                                            {link.label}
                                        </div>
                                    ))}
                                    <div
                                        style={{
                                            color: '#B00',
                                            textDecoration: 'none',
                                            textTransform: 'uppercase',
                                            fontFamily: '"Lato", sans-serif',
                                            fontWeight: '900',
                                            fontSize: '20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => setNavOpened(false)}
                                    >
                                        Exit
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};