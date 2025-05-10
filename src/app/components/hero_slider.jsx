'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link'; // Next.js Link component
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

const slidesData = [
    {
        image: '/assets/img/blog-01.jpg',
        subhead: 'Hi, I’m Michelle Harding. Your Personal Wellness Coach',
        headline: 'Unlock Your Potential,<br/>Elevate Your Wellbeing!',
        buttonText: 'Discover How',
        buttonHref: '/five-steps-to-success',
    },
    {
        image: '/assets/img/blog-02.jpg',
        subhead: 'Together, We Can Achieve',
        headline: 'Resilient Teams,<br/>Thriving Workplaces',
        buttonText: 'Explore Solutions',
        buttonHref: '/workplace-wellness',
    },
    {
        image: '/assets/img/hero-placeholder-3.jpg',
        subhead: 'Mental Fitness for Modern Challenges',
        headline: 'The Working Mind:<br/>Empower Your Organization',
        buttonText: 'Learn About TWM',
        buttonHref: '/programs/the-working-mind',
    },
    {
        image: '/assets/img/hero-placeholder-4.jpg',
        subhead: 'Invest in Your Most Valuable Asset',
        headline: 'Cultivate a Culture<br/>of Mental Wellness',
        buttonText: 'Get Started',
        buttonHref: '/contact',
    },
];

export default function HeroSlider() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const sliderContentVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: "circOut", // MODIFIED: Changed to a standard named easing
                staggerChildren: 0.2
            }
        }
    };

    const textItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <motion.section
            style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(600px, 85vh, 750px)',
                backgroundColor: '#e9ecef',
                boxShadow: '0 5px 15px rgba(0,0,0,0.07)',
                overflow: 'hidden',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                slidesPerView={1}
                loop
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet hero-slider-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active hero-slider-bullet-active',
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // Ensure Swiper uses the refs for navigation after initialization
                    if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                // Added onInit to re-initialize navigation after Swiper fully initializes
                onInit={(swiper) => {
                    if (swiper.navigation) {
                        swiper.navigation.update();
                    }
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    '--swiper-pagination-color': '#37b048',
                    '--swiper-pagination-bullet-inactive-color': '#FFFFFF',
                    '--swiper-pagination-bullet-inactive-opacity': '0.5',
                    '--swiper-pagination-bullet-size': '10px',
                    '--swiper-pagination-bullet-horizontal-gap': '6px',
                    '--swiper-pagination-bottom': '30px',
                }}
            >
                {slidesData.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            fontFamily: '"Lato", sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Image
                                src={slide.image || `https://placehold.co/1920x750/cccccc/999999?text=Slide+${idx + 1}&font=lato`}
                                alt={`Slide ${idx + 1}: ${slide.headline.replace(/<br\/>/g, ' ')}`}
                                fill
                                style={{ objectFit: 'cover', zIndex: 1 }}
                                priority={idx === 0}
                                onError={(e) => {
                                    e.currentTarget.src = `https://placehold.co/1920x750/cccccc/999999?text=Image+Error&font=lato`;
                                    e.currentTarget.onerror = null;
                                }}
                            />
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.15)',
                                zIndex: 2,
                            }} />

                            <motion.div
                                style={{
                                    position: 'relative',
                                    zIndex: 3,
                                    marginLeft: 'clamp(2rem, 10vw, 100px)',
                                    padding: 'clamp(1.5rem, 4vw, 3rem)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    borderRadius: '18px',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    boxShadow: '0 10px 35px rgba(0,0,0,0.25)',
                                    maxWidth: 'clamp(300px, 45%, 580px)',
                                    color: '#f0f0f0',
                                }}
                                variants={sliderContentVariants}
                                initial="hidden"
                                // Animate when the slide is active. Swiper's active class can be used
                                // or we can rely on whileInView if slides are full viewport.
                                // For simplicity, let's assume Swiper's active state triggers visibility
                                // or use whileInView if the slide itself is the trigger.
                                // Given the structure, `animate="visible"` might be too aggressive if slides
                                // are pre-rendered. Let's use `whileInView` on the panel.
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.5 }} // Animate when 50% visible, re-animate if it goes out and back in
                            >
                                <motion.span
                                    style={{
                                        fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
                                        display: 'block',
                                        marginBottom: '0.75rem',
                                        opacity: 0.9,
                                        fontWeight: '500',
                                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                    }}
                                    variants={textItemVariants}
                                >
                                    {slide.subhead}
                                </motion.span>
                                <motion.h1
                                    dangerouslySetInnerHTML={{ __html: slide.headline }}
                                    style={{
                                        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                                        lineHeight: '1.25',
                                        fontWeight: 'bold',
                                        color: '#ffffff',
                                        margin: '0 0 1.5rem 0',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                                    }}
                                    variants={textItemVariants}
                                />
                                <motion.div variants={textItemVariants}>
                                    {/* MODIFIED: Link now wraps a motion.div styled as a button */}
                                    <Link href={slide.buttonHref} style={{ textDecoration: 'none' }}>
                                        <motion.div // Changed from motion.a to motion.div
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
                                                background: 'linear-gradient(to bottom, rgba(55, 176, 72, 0.8), rgba(47, 154, 54, 0.9))',
                                                color: '#fff',
                                                borderRadius: '50px',
                                                fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
                                                fontWeight: 'bold',
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                boxShadow: '0 6px 18px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.2)',
                                                transition: 'background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                                                cursor: 'pointer',
                                            }}
                                            whileHover={{
                                                background: 'linear-gradient(to bottom, rgba(69, 204, 88, 0.9), rgba(55, 176, 72, 1))',
                                                y: -3,
                                                boxShadow: '0 8px 22px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.3)'
                                            }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            {slide.buttonText}
                                            <FiArrowRight style={{ marginLeft: '0.75rem', fontSize: '1.2em' }} />
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button
                ref={prevRef}
                aria-label="Previous slide"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 'clamp(10px, 3vw, 30px)',
                    transform: 'translateY(-50%)',
                    zIndex: 30,
                    width: 'clamp(40px, 6vw, 52px)', height: 'clamp(40px, 6vw, 52px)',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.25)',
                    backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.25)'}
            >
                <FiChevronLeft size="60%" />
            </button>
            <button
                ref={nextRef}
                aria-label="Next slide"
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: 'clamp(10px, 3vw, 30px)',
                    transform: 'translateY(-50%)',
                    zIndex: 30,
                    width: 'clamp(40px, 6vw, 52px)', height: 'clamp(40px, 6vw, 52px)',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.25)',
                    backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.25)'}
            >
                <FiChevronRight size="60%" />
            </button>
        </motion.section>
    );
}
