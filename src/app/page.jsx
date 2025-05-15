// File: src/app/page.jsx
'use client';

import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
// Link and Image are not directly used here, but kept from original if sub-components might need them implicitly
// or if you plan to use them. If not, they can be removed.
// import Link from 'next/link';
// import Image from 'next/image';

// Original Mantine component imports (review and remove if any are truly unused by this page or its direct children)
import {
  Anchor, Box, Container, Group, Burger, Title, Text, Button,
  Blockquote, Grid, Center, Divider, TextInput, Radio, RadioGroup, Modal, Space,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css'; // If Carousel is used
// import { Calendar } from '@mantine/dates'; // Original was commented out
import { useForm } from '@mantine/form';

// Original react-icons imports (review and remove if any are truly unused)
import {
  FaBars, FaEnvelope, FaPhone, FaCalendarAlt, FaArrowRight, FaComment,
  FaIdCard, FaBriefcase, FaCheckSquare, FaArrowUp, FaChevronDown,
} from 'react-icons/fa';

// Removed redundant Lato font imports (they are in layout.jsx)

import Header from './components/header';
import HeroSlider from './components/hero_slider';
import MainDirectory from './components/main_directory';
import Quote from './components/quote';
import AboutMe from './components/about_me';
import Subscribe from './components/subscribe';
import Success from './components/success';
import CalendarComponent from './components/calendar'; // Renamed to avoid conflict if Mantine Calendar is ever used
import Testimonials from './components/testimonials';
import WorkingMind from './components/working_mind';
import Footer from './components/footer';

export default function HomePage() {
  const pathname = usePathname();
  // currentSlug for active link highlighting in Header.
  // This logic might need adjustment if hash links should also set an "active" state based on scroll.
  // For now, it's page-based.
  const currentSlug = pathname === '/' ? 'home' : pathname.slice(1).split('/')[0];


  const [navOpened, setNavOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false); // Kept from original
  const [date, setDate] = useState(new Date()); // Kept from original
  const [slot, setSlot] = useState('08:00'); // Kept from original

  const isMobile = useMediaQuery('(max-width: 768px)'); // Kept from original
  const quoteForm = useForm({ initialValues: { email: '' } }); // Kept from original
  const subscribeForm = useForm({ initialValues: { name: '', email: '' } }); // Kept from original

  return (
    <>
      {/* <div className="overlay" /> Removed - unused class */}
      {/* <div className="outer-wrapper"> Removed - unused class */}
      {/* <div className="page-wrapper"> Removed - unused class (or use <Box> if a simple div wrapper is needed) */}
      {/* Using a simple div as a wrapper to replace page-wrapper if needed, or remove if not */}
      <div>
        <HeroSlider />
        <MainDirectory />
        <Quote />
        {/* Added IDs for scrolling targets */}
        <div id="about-me-section">
          <AboutMe />
        </div>
        <div id="working-mind-section">
          <WorkingMind />
        </div>
        <Subscribe
          divStyle="container"
          title="Your Daily Motivation & Wellness Insight"
          content="Subscribe to receive uplifting quotes, wellness tips, and mental health education delivered straight to your inbox."
          showName={false}
          bgColor="#999" // Kept original hardcoded color
          inputPlaceholderEmail="Enter your e-mail"
          buttonText="→"
          buttonStyle="arrow"
        />
        <div id="calendar-section"> {/* Assuming calendar could be a scroll target */}
          <CalendarComponent />
        </div>
        <Success />
        <Subscribe
          divStyle="fullWidth"
          title="Discover Your True Potential"
          content="Enter your name and e-mail and I’ll send you a free guide to building lasting mental-wellness & workplace resilience."
          showName={true}
          bgColor="#f7f6f3" // Kept original hardcoded color
          inputPlaceholderName="Your Name"
          inputPlaceholderEmail="Your E-mail"
          buttonText="SEND ME"
          buttonStyle="pill"
        />
        <div id="testimonials-section"> {/* Assuming testimonials could be a scroll target */}
          <Testimonials />
        </div>
        <Footer />
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}