// File: src/app/components/hero_slider.jsx
'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Box, Button, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const slides = [
    {
        image: '/assets/img/blog-01.jpg',
        subhead: 'Hi, I’m Michelle Harding. A Personal Wellness Coach',
        headline: 'Uncover the Secret<br/>to Healthy Life!',
        buttonText: 'Tell Me How',
        buttonHref: '/five-steps-to-success',
    },
    {
        image: '/assets/img/blog-02.jpg',
        subhead: 'I help you to',
        headline: 'Restart Your Career<br/>To Be More Successful',
        buttonText: 'Learn More',
        buttonHref: '/change-your-life',
    },
    {
        image: '/assets/img/logo.png',
        subhead: 'Hi, I’m Jane Doe. A Personal Mentor',
        headline: 'Uncover the Secret<br/>of Successful Life!',
        buttonText: 'Tell Me How',
        buttonHref: '/five-steps-to-success',
    },
    {
        image: '/assets/img/person-02.jpg',
        subhead: 'I will tell you how to',
        headline: 'Restart Your Career<br/>To Be More Successful',
        buttonText: 'Learn More',
        buttonHref: '/change-your-life',
    },
];

export default function HeroSlider() {
    // refs for our custom buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <Box style={{
            position: 'relative',
            width: '100%',
            height: '700px',
            backgroundColor: '#888'
        }}>
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                slidesPerView={1}
                loop
                autoplay={{ delay: 8000 }}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // bind refs once swiper is ready
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                style={{
                    width: '100%',
                    height: '700px',
                    '--swiper-pagination-color': '#00BB00',
                }}
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <Box style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            fontFamily: 'Lato, sans-serif',
                        }}
                        >
                            <Image
                                src={slide.image}
                                alt={`Slide ${idx + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <Box style={{
                                position: 'absolute',
                                top: '20%',
                                // dynamic left using clamp: min 5%, ideal 15%, max 20%
                                left: 'clamp(5%, 15%, 20%)',
                                color: '#fff',
                                zIndex: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '50%',
                                justifyContent: 'space-around',
                                // optional max width so text lines break nicely
                                maxWidth: '60%',
                            }}>
                                <span
                                    style={{
                                        fontSize: '1.5rem',
                                        opacity: 0.8,
                                        color: '#444'
                                    }}
                                >{slide.subhead}</span>
                                <Title order={1} dangerouslySetInnerHTML={{ __html: slide.headline }}
                                    style={{
                                        fontSize: '3rem',
                                        lineHeight: '1.2',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        margin: '-1%',
                                    }} />
                                <Button
                                    component={Link}
                                    href={slide.buttonHref}
                                    variant="white"
                                    mt="lg"
                                    style={{
                                        textTransform: 'uppercase',
                                        fontWeight: '700', 
                                        letterSpacing: '0.01rem',
                                        textDecoration: 'none',
                                        color: '#37b048',
                                    }}
                                >
                                    {slide.buttonText}
                                    <span style={{ fontSize: '1.2rem' }}>&nbsp;→</span>
                                </Button>
                            </Box>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Prev/Next Buttons */}
            <Button
                ref={prevRef}
                variant="outline"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)',
                    zIndex: 30,
                    width: '4rem',
                    height: '4rem',
                    fontSize: '2.5em',
                    border: 'none',
                    color: '#57D068',
                    backgroundColor: 'rgba(0,0,0,0)',
                    cursor: 'pointer',
                    opacity: '0.8',
                }}
            >
                <FaArrowLeft />
            </Button>
            <Button
                ref={nextRef}
                variant="outline"
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                    zIndex: 30,
                    width: '4rem',
                    height: '4rem',
                    fontSize: '2.5em',
                    border: 'none',
                    color: '#37b048',
                    backgroundColor: 'rgba(0,0,0,0)',
                    cursor: 'pointer',
                    opacity: '0.7',
                }}
            >
                <FaArrowRight />
            </Button>
        </Box>
    );
}
