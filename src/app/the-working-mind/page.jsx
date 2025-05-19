// src/app/the-working-mind/page.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    FiCheckCircle, FiUsers, FiBriefcase, FiTrendingUp, FiShield,
    FiMessageSquare, FiArrowRight, FiCalendar, FiBookOpen, FiAward, FiHeart, FiZap
} from 'react-icons/fi';

// Helper function to darken a hex color (keep as is)
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(String(R * (100 + percent) / 100));
    G = parseInt(String(G * (100 + percent) / 100));
    B = parseInt(String(B * (100 + percent) / 100));

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    const RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}


const TheWorkingMindPage = () => {

    const pageTitle = "The Working Mind";

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const benefits = [
        {
            target: "For Your Organization",
            icon: FiTrendingUp,
            points: [
                "Cultivate a more positive, resilient, and supportive workplace culture.",
                "Enhance employee engagement and productivity.",
                "Reduce absenteeism and turnover related to mental health challenges.",
                "Strengthen your employer brand as a caring and responsible organization.",
            ],
            accentColor: "#37b048"
        },
        {
            target: "For Managers & Leaders",
            icon: FiBriefcase,
            points: [
                "Develop skills to recognize mental health concerns in team members.",
                "Learn to initiate supportive conversations effectively and appropriately.",
                "Understand how to manage mental health accommodations.",
                "Foster a psychologically safe team environment for open dialogue.",
            ],
            accentColor: "#2c7a7b"
        },
        {
            target: "For Employees",
            icon: FiHeart,
            points: [
                "Increase understanding of mental health and the Mental Health Continuum.",
                "Build resilience and learn practical strategies to manage stress.",
                "Reduce personal and perceived stigma around mental illness.",
                "Gain confidence in discussing mental health and supporting colleagues.",
            ],
            accentColor: "#dd6b20"
        }
    ];

    const programOfferings = [
        {
            title: "The Working Mind for Employees",
            duration: "5 Hours",
            description: "Provides foundational knowledge and skills for all staff to understand and maintain their mental health and support colleagues. Focuses on self-awareness, stigma reduction, and practical coping strategies.",
            icon: FiShield,
            image: "/images/blue_book.png",
            borderColor: "#37b048"
        },
        {
            title: "The Working Mind for Managers",
            duration: "7-8 Hours",
            description: "Builds on the employee course, equipping those in leadership roles with additional tools to support their teams' mental well-being, navigate sensitive conversations, and manage mental health situations effectively within the workplace.",
            icon: FiUsers,
            image: "/images/red_hammer.png",
            borderColor: "#2c7a7b"
        }
    ];

    return (
        <div style={{ fontFamily: '"Lato", sans-serif', color: '#4A4A4A', backgroundColor: '#fdfdff' }}>

            {/* Hero Section - Simple, Impactful */}
            <motion.section
                style={{
                    position: 'relative',
                    width: '100%',
                    minHeight: 'calc(65vh - 64px)',
                    maxHeight: '600px',
                    padding: 'clamp(3rem, 8vh, 4rem) 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#fff',
                    overflow: 'hidden',
                }}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <Image
                    src="/images/office.webp"
                    alt="Supportive Workplace Environment"
                    fill
                    style={{ objectFit: 'cover', filter: 'brightness(0.65)' }}
                    priority
                />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '750px' }}>
                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
                            fontWeight: 'bold',
                            lineHeight: 1.2,
                            marginBottom: '1rem',
                            textShadow: '0 2px 5px rgba(0,0,0,0.5)',
                        }}
                    >
                        Cultivating Resilience: Transform Your Workplace with The Working Mind
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                            marginBottom: '2rem',
                            maxWidth: '650px',
                            margin: '0 auto 2rem auto',
                            lineHeight: 1.6,
                            textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                        }}
                    >
                        {/* Corrected: Canada's -> Canada&apos;s */}
                        Empower your team with Canada&apos;s leading evidence-based mental health program, facilitated by Michelle Harding.
                    </motion.p>
                    <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                        <Link href="/contact?subject=TWM_Consultation_Request" passHref legacyBehavior>
                            <motion.a
                                style={{
                                    padding: '0.9rem 2.2rem',
                                    backgroundColor: '#37b048',
                                    color: '#fff', borderRadius: '50px', textDecoration: 'none',
                                    fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', fontWeight: 'bold',
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                                }}
                                whileHover={{ scale: 1.04, y: -2, backgroundColor: '#2f9a36', boxShadow: '0 7px 20px rgba(0,0,0,0.25)' }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                                <FiCalendar style={{ marginRight: '0.6rem', verticalAlign: 'middle' }} /> Book a Consultation
                            </motion.a>
                        </Link>
                        <Link href="/calendar" passHref legacyBehavior>
                            <motion.a
                                style={{
                                    padding: '0.9rem 2.2rem',
                                    backgroundColor: '#fff',
                                    color: '#37b048',
                                    border: '2px solid #37b048', borderRadius: '50px', textDecoration: 'none',
                                    fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', fontWeight: 'bold',
                                }}
                                whileHover={{ scale: 1.04, y: -2, }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                                <FiBookOpen style={{ marginRight: '0.6rem', verticalAlign: 'middle' }} /> See Upcoming Courses
                            </motion.a>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Introduction Section */}
            {/* Line 173 area in Vercel log (this is the approximate location) */}
            <motion.section
                id="intro-twm"
                style={{ padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)', textAlign: 'center', backgroundColor: '#fff' }}
                initial="hidden" // Changed from whileInView for initial load, or keep whileInView if preferred.
                animate="visible" // Simpler animation for the first content section after hero.
                variants={sectionVariants}
            >
                <motion.p
                    variants={itemVariants}
                    style={{ fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto 1.5rem auto', color: '#4A4A4A' }}
                >
                    {/* SOLUTION for unescaped entities at line 173:54 */}
                    In today&apos;s demanding work environments, prioritizing mental health isn&apos;t just a benefit—it&apos;s a necessity for a thriving, productive, and resilient workforce. &ldquo;The Working Mind&rdquo; (TWM), developed by the Mental Health Commission of Canada, offers a transformative approach to workplace mental wellness.
                </motion.p>
                <motion.p
                    variants={itemVariants}
                    style={{ fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto 2rem auto', color: '#4A4A4A' }}
                >
                    As a certified TWM facilitator, Michelle Harding brings her extensive healthcare and coaching experience to deliver this impactful program to your organization.
                </motion.p>
            </motion.section>

            {/* Why The Working Mind? - Benefits Section */}
            <motion.section
                id="benefits-twm"
                style={{ padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2rem)', backgroundColor: '#f7f9fc' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={sectionVariants}
            >
                <motion.h2
                    variants={itemVariants}
                    style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#37b048', marginBottom: '3rem', fontWeight: 'bold' }}
                >
                    Why Choose The Working Mind for Your Workplace?
                </motion.h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1100px',
                    margin: '0 auto',
                }}>
                    {benefits.map((benefitCategory, index) => {
                        const Icon = benefitCategory.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                style={{
                                    backgroundColor: '#ffffff',
                                    padding: '2rem 1.5rem',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 20px rgba(0, 70, 30, 0.06)',
                                    borderTop: `5px solid ${benefitCategory.accentColor}`,
                                }}
                                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 70, 30, 0.1)' }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1.25rem' }}>
                                    <Icon style={{ fontSize: '2.5rem', color: benefitCategory.accentColor, marginBottom: '0.75rem' }} />
                                    <h3 style={{ fontSize: 'clamp(1.15rem, 2.3vw, 1.35rem)', color: '#2c3e50', margin: 0, fontWeight: '600' }}>
                                        {benefitCategory.target}
                                    </h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {benefitCategory.points.map((point, i) => (
                                        <li
                                            key={i}
                                            style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem', fontSize: 'clamp(0.9rem, 1.6vw, 1rem)', lineHeight: 1.6, color: '#4A4A4A' }}
                                        >
                                            <FiCheckCircle style={{ color: benefitCategory.accentColor, marginRight: '0.6rem', marginTop: '0.25em', flexShrink: 0, fontSize: '1.1em' }} />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            {/* What is The Working Mind? Section */}
            <motion.section
                id="what-is-twm"
                style={{
                    padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2rem)',
                    backgroundColor: '#384249',
                    color: '#f0f8ff',
                    textAlign: 'center',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionVariants}
            >
                <motion.h2
                    variants={itemVariants}
                    style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', marginBottom: '1.25rem', fontWeight: 'bold' }}
                >
                    The Core of <span style={{
                        background: 'linear-gradient(120deg, #86ef90, #a2f5aa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>The Working Mind</span>
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    style={{ fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', lineHeight: 1.7, margin: '0 auto 2.5rem auto', opacity: 0.9, maxWidth: '750px' }}
                >
                    {/* Corrected: "The Working Mind" and it's */}
                    &ldquo;The Working Mind&rdquo; is more than just training; it&apos;s a catalyst for cultural change. This evidence-based program is designed to:
                </motion.p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    {[
                        { icon: FiBookOpen, title: "Elevate Understanding", text: "Deepen knowledge of mental health and tools like the Mental Health Continuum Model." },
                        { icon: FiShield, title: "Break Down Barriers", text: "Actively reduce stigma and discrimination, fostering openness and support." },
                        { icon: FiZap, title: "Enhance Coping Skills", text: "Equip with effective strategies for stress management and resilience." },
                        { icon: FiMessageSquare, title: "Promote Support", text: "Empower confident, constructive conversations about mental health." }
                    ].map((item, idx) => {
                        const ItemIcon = item.icon;
                        return (
                            <motion.div key={idx} variants={itemVariants} style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255, 0.08)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
                                <ItemIcon style={{ fontSize: '2.2rem', color: '#86ef90', marginBottom: '1rem' }} />
                                <h3 style={{ fontSize: 'clamp(1.1rem, 2.1vw, 1.2rem)', margin: '0 0 0.75rem 0', fontWeight: '600' }}>{item.title}</h3>
                                <p style={{ margin: 0, fontSize: 'clamp(0.9rem, 1.6vw, 0.95rem)', lineHeight: 1.6, opacity: 0.85 }}>{item.text}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            {/* Program Offerings Section */}
            <motion.section
                id="offerings-twm"
                style={{ padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2rem)', backgroundColor: '#fff' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionVariants}
            >
                <motion.h2
                    variants={itemVariants}
                    style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#37b048', marginBottom: '3rem', fontWeight: 'bold' }}
                >
                    Program Offerings Tailored by Michelle Harding
                </motion.h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem',
                    maxWidth: '1000px',
                    margin: '0 auto',
                }}>
                    {programOfferings.map((offering, index) => {
                        const OfferingIcon = offering.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                style={{
                                    backgroundColor: '#f9faff',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 25px rgba(60, 90, 120, 0.07)',
                                    overflow: 'hidden',
                                    display: 'flex', flexDirection: 'column',
                                    borderTop: `5px solid ${offering.borderColor}`
                                }}
                                whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(60, 90, 120, 0.1)' }}
                                transition={{ type: "spring", stiffness: 280, damping: 15 }}
                            >
                                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                                    <Image src={offering.image} alt={offering.title} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <OfferingIcon style={{ fontSize: '2.5rem', color: offering.borderColor, marginBottom: '1rem', alignSelf: 'flex-start' }} />
                                    <h3 style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.45rem)', color: '#2c3e50', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                                        {offering.title}
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '1rem', fontWeight: '500', fontStyle: 'italic' }}>Duration: {offering.duration}</p>
                                    <p style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1rem)', lineHeight: 1.65, color: '#4A4A4A', marginBottom: '1.5rem', flexGrow: 1 }}>
                                        {offering.description}
                                    </p>
                                    <Link href={`/contact?subject=${encodeURIComponent(offering.title)}_Inquiry`} passHref legacyBehavior>
                                        <motion.a
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', padding: '0.75rem 1.5rem',
                                                background: `linear-gradient(45deg, ${offering.borderColor}, ${shadeColor(offering.borderColor, -15)})`,
                                                color: '#fff', borderRadius: '8px', textDecoration: 'none',
                                                fontSize: '0.9rem', fontWeight: 'bold', alignSelf: 'flex-start'
                                            }}
                                            whileHover={{ scale: 1.03, filter: 'brightness(1.1)' }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            Learn More <FiArrowRight style={{ marginLeft: '0.5rem' }} />
                                        </motion.a>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                <motion.div
                    variants={itemVariants}
                    style={{ textAlign: 'center', marginTop: '3rem', fontSize: 'clamp(1rem, 1.9vw, 1.1rem)', lineHeight: 1.7, color: '#555', maxWidth: '800px', margin: '3rem auto 0 auto' }}
                >
                    <p>Each course features interactive scenario-based learning, powerful videos sharing lived experiences, practical reference guides, and handouts, all expertly facilitated by Michelle Harding, drawing on her deep nursing and coaching background.</p>
                </motion.div>
            </motion.section>

            {/* Final Call to Action Section */}
            {/* Line 450 area in Vercel log */}
            <motion.section
                id="cta-twm"
                style={{
                    padding: 'clamp(3.5rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem)',
                    backgroundColor: '#2c3e50',
                    color: '#f0f8ff',
                    textAlign: 'center',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionVariants}
            >
                <motion.h2
                    variants={itemVariants}
                    style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', marginBottom: '1.25rem', fontWeight: 'bold', lineHeight: 1.25, textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                >
                    Ready to Build a <span style={{ color: '#86ef90' }}>Thriving</span>, <span style={{ color: '#86ef90' }}>Resilient</span> Workplace?
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    style={{ fontSize: 'clamp(1.05rem, 2.1vw, 1.25rem)', maxWidth: '700px', margin: '0 auto 2.5rem auto', lineHeight: 1.7, opacity: 0.9 }}
                >
                    {/* SOLUTION for unescaped entities at line 450:64 and 450:82 */}
                    Partner with Michelle Harding to implement &ldquo;The Working Mind.&rdquo; Let&apos;s create a culture where every individual feels supported, understood, and empowered to bring their best self to work.
                </motion.p>
                <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <Link href="/contact?subject=TWM_Consultation_Final" passHref legacyBehavior>
                        <motion.a
                            style={{
                                padding: '0.9rem 2.2rem',
                                background: 'linear-gradient(45deg, #37b048, #56c263)',
                                color: '#fff', borderRadius: '50px', textDecoration: 'none',
                                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', fontWeight: 'bold',
                                boxShadow: '0 6px 18px rgba(55, 176, 72, 0.3)',
                            }}
                            whileHover={{ scale: 1.05, y: -3, boxShadow: '0 8px 25px rgba(55, 176, 72, 0.4)' }}
                            transition={{ type: "spring", stiffness: 300, damping: 12 }}
                        >
                            <FiCalendar style={{ marginRight: '0.75rem', verticalAlign: 'middle', fontSize: '1.1em' }} /> Book a Consultation
                        </motion.a>
                    </Link>
                    <Link href="/calendar" passHref legacyBehavior>
                        <motion.a
                            style={{
                                padding: '0.9rem 2.2rem',
                                backgroundColor: 'transparent',
                                color: '#fff', border: '2px solid #86ef90',
                                borderRadius: '50px', textDecoration: 'none',
                                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', fontWeight: 'bold',
                            }}
                            whileHover={{ scale: 1.05, y: -3, backgroundColor: 'rgba(134, 239, 144, 0.15)', borderColor: '#fff' }}
                            transition={{ type: "spring", stiffness: 300, damping: 12 }}
                        >
                            <FiBookOpen style={{ marginRight: '0.75rem', verticalAlign: 'middle', fontSize: '1.1em' }} /> See Upcoming Courses
                        </motion.a>
                    </Link>
                </motion.div>
            </motion.section>
        </div>
    );
};

export default TheWorkingMindPage;