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
            <header className="navigation" id="top">
                {/* Secondary Nav */}
                <Container size="lg">
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
                            paddingRight: '16px',
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
                </Container>

                {/* Main Nav */}
                <Container size="lg">
                    <Group
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '0 1rem',
                            boxSizing: 'border-box',
                        }}
                    >
                        {/* Brand */}
                        <Link href="/" passHref>
                            <Image
                                src="/assets/img/logo.png"
                                alt="Logo"
                                width={150}
                                height={50}
                            />
                        </Link>

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
                                <Anchor key={link.slug} href={link.href}
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
                                    }}
                                    underline={false}
                                >
                                    {link.label}
                                </Anchor>
                            ))}
                        </Group>

                        {/* Mobile Burger */}
                        <div style={{
                            display: isMobile ? 'flex' : 'none',
                            justifyContent: 'end',
                            width: '100%',
                        }}>
                            <div
                                onClick={() => alert('menu')}
                            />
                            <FaBars style={{
                                display: isMobile ? 'flex' : 'none',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#444',
                                fontSize: '30px',
                                marginRight: '16px',
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

                    </Group>
                </Container>
            </header>
        </div>
    );
};