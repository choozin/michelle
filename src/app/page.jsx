// File: src/app/page.jsx
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
//import { Calendar } from '@mantine/dates';
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

import Header from './components/header';
import HeroSlider from './components/hero_slider';
import MainDirectory from './components/main_directory';
import Quote from './components/quote';
import AboutMe from './components/about_me';
import Subscribe from './components/subscribe';
import Success from './components/success';
import Calendar from './components/calendar';
import Testimonials from './components/testimonials';
import WorkingMind from './components/working_mind';
import Footer from './components/footer';

export default function HomePage() {
  // determine current path slug for underline logic
  const pathname = usePathname();
  const currentSlug = pathname === '/' ? 'home' : pathname.slice(1);

  const [navOpened, setNavOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState('08:00');

  const isMobile = useMediaQuery('(max-width: 768px)');
  const quoteForm = useForm({ initialValues: { email: '' } });
  const subscribeForm = useForm({ initialValues: { name: '', email: '' } });

  return (
    <>
      <div className="overlay" />
      <div className="outer-wrapper">
        <div className="page-wrapper">
          <Header currentSlug={currentSlug} navOpened={navOpened} setNavOpened={setNavOpened} />
          <HeroSlider />
          <MainDirectory />
          <Quote />
          <AboutMe />
          <WorkingMind />
          <Subscribe
            divStyle="container"                        // dark panel inside a white wrapper
            title="Your Daily Motivation & Wellness Insight"
            content="Subscribe to receive uplifting quotes, wellness tips, and mental health education delivered straight to your inbox."
            showName={false}                             // no name field
            bgColor="#999"                               // inner panel color
            inputPlaceholderEmail="Enter your e-mail"
            buttonText="→"
            buttonStyle="arrow"                          // the small arrow button
          />
          <Calendar />
          <Success />
          <Subscribe
            divStyle="fullWidth"                         // full-bleed background
            title="Discover Your True Potential"
            content="Enter your name and e-mail and I’ll send you a free guide to building lasting mental-wellness & workplace resilience."
            showName={true}                              // renders both name + email inputs
            bgColor="#f7f6f3"                            // off-white background
            inputPlaceholderName="Your Name"
            inputPlaceholderEmail="Your E-mail"
            buttonText="SEND ME"
            buttonStyle="pill"                           // the green pill-shaped button
          />
          <Testimonials />
          <Footer />
        </div>
      </div >
    </>
  );
}