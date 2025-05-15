'use client';

import React from 'react';
import Image from 'next/image'; // Still used for card images
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi'; // Icons for list and button

const WorkingMind = () => {
  // Motion variants for simple fade-in and stagger effects
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const contentWrapperVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const programHighlights = [
    'Leadership Training: Equip managers with skills to recognize and support team mental health.',
    'Data-Driven Insights: Track engagement metrics, absenteeism reduction, and ROI.',
    'Peer Support Networks: Foster a culture of open dialogue and mutual accountability.',
    'Resilience Building Workshops: Practical tools for stress management and mental fitness for all employees.' // Added another highlight
  ];

  const featureCards = [
    {
      title: 'Executive Resilience',
      img: '/images/blue_book.png', // Ensure these paths are correct or use fallbacks
      desc: 'Structured modules for leadership mindfulness, stress management, and strategic decision-making under pressure.',
    },
    {
      title: 'Team Wellbeing & Cohesion',
      img: '/images/red_hammer.png',
      desc: 'Interactive workshops that reduce stigma, encourage support, and improve overall team collaboration and morale.',
    },
    {
      title: 'Measurable Performance ROI',
      img: '/images/green_heart.png',
      desc: 'Analytics-driven approach to measure program impact on productivity, retention, and key business outcomes.',
    },
  ];

  return (
    <motion.section
      style={{ // Full-width outer section for background
        width: '100%',
        padding: 'clamp(3rem, 7vw, 5rem) 0', // Vertical padding, horizontal handled by inner
        fontFamily: '"Lato", sans-serif',
        backgroundColor: '#f0eee9', // Light beige flat background
        color: '#4a4a4a', // Default text color for the section
        overflowX: 'hidden', // Prevent horizontal scroll from animations
      }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div
        style={{ // Inner div to constrain content width and center it
          maxWidth: '1100px', // Consistent max width
          margin: '0 auto',
          padding: '0 clamp(1rem, 5vw, 2rem)', // Horizontal padding for content
        }}
        variants={contentWrapperVariants}
      >
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.8rem)', // Responsive font size
            color: '#37b048', // Accent green for title
            marginBottom: '1.5rem', // Adjusted margin
            textAlign: 'center',
            fontWeight: 'bold', // Bolder
            letterSpacing: '-0.03em',
          }}
        >
          The Working Mind Program
        </motion.h2>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)', // Responsive font size
            lineHeight: '1.75',
            maxWidth: '800px',
            margin: '0 auto 2.5rem', // Adjusted margin
            textAlign: 'center',
            color: '#5f6c7b', // Softer text color
          }}
        >
          Empower your workplace with The Working Mind (TWM), an evidence-based program from the Mental Health Commission of Canada. We provide tailored coaching and facilitation to help your teams and leadership build resilience, reduce stigma, and enhance mental performance.
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{
            maxWidth: '750px',
            margin: '0 auto 3rem',
            textAlign: 'left',
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Subtle background for highlight section
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ // Changed from p to h3 for semantics
            margin: '0 0 1.25rem',
            fontSize: 'clamp(1.1rem, 2.2vw, 1.3rem)',
            fontWeight: 'bold', // Bolder
            color: '#333'
          }}>
            Program Highlights:
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {programHighlights.map((text, i) => (
              <motion.li
                key={i}
                variants={itemVariants} // Stagger list items
                style={{
                  position: 'relative',
                  paddingLeft: '2rem', // More space for icon
                  marginBottom: '1rem',
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                  lineHeight: '1.65',
                  color: '#4a4a4a',
                }}
              >
                <FiCheckCircle
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '4px', // Adjust vertical alignment
                    color: '#37b048', // Accent green for checkmark
                    fontSize: '1.2rem',
                  }}
                />
                {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          // variants={itemVariants} // Container itself doesn't need item variant if children are animated
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(270px, 30vw, 340px), 1fr))', // Responsive cards
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: '3rem', // Adjusted margin
          }}
        >
          {featureCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants} // Each card animates as an item
              style={{
                backgroundColor: '#ffffff', // Clean white background for cards
                borderRadius: '12px', // Consistent rounded corners
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                boxShadow: '0 5px 20px rgba(0,0,0,0.07)', // Subtle, modern shadow
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              whileHover={{
                y: -6,
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
              }}
            >
              <div
                style={{ // Image container
                  margin: '0 auto 1.25rem',
                  width: '90px', // Slightly larger icon/image container
                  height: '90px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid #37b048', // Accent border
                  backgroundColor: '#e6f8ec', // Light green background for image placeholder
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  width={90} // Match container
                  height={90} // Match container
                  style={{ objectFit: 'cover' }}
                  // Basic error handling for placeholder images
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/90x90/e6f8ec/37b048?text=${card.title.substring(0, 1)}&font=lato`; e.currentTarget.onerror = null; }}
                />
              </div>
              <h3 style={{
                margin: '0 0 0.75rem',
                color: '#37b048',
                fontSize: 'clamp(1.15rem, 2.2vw, 1.35rem)',
                fontWeight: 'bold' // Bolder
              }}>
                {card.title}
              </h3>
              <p style={{
                margin: 0,
                lineHeight: '1.65',
                color: '#555',
                fontSize: 'clamp(0.9rem, 1.7vw, 1rem)'
              }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
          <motion.a
            href="/programs/the-working-mind" // Update this link if necessary
            style={{
              display: 'inline-flex', // For aligning icon and text
              alignItems: 'center',
              padding: '0.85rem 2.5rem',
              backgroundColor: '#37b048',
              color: '#fff',
              borderRadius: '50px', // Pill shape
              textDecoration: 'none',
              fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
              fontWeight: 'bold', // Bolder
              boxShadow: '0 5px 15px rgba(55, 176, 72, 0.25)',
              transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
            }}
            whileHover={{
              backgroundColor: '#2f9a36', // Darker green
              y: -3,
              boxShadow: '0 7px 18px rgba(55, 176, 72, 0.3)'
            }}
            whileTap={{ scale: 0.97 }}
          >
            Learn More About TWM
            <FiArrowRight style={{ marginLeft: '0.75rem', fontSize: '1.2em' }} />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default WorkingMind;
