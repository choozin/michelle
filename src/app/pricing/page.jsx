// src/app/pricing/page.jsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiChevronRight, FiInfo, FiAward, FiStar } from 'react-icons/fi';
import Link from 'next/link';
import Footer from '@/app/components/footer'; // Assuming your Footer component path

// Data (same as PricingSection, but we'll use more features here)
// Note: For a real application, this data would ideally come from a shared service or context,
// or be fetched, rather than duplicated.
const pricingPackagesData = [
  {
    id: 'starter',
    name: "Starter Spark",
    tagline: "Ignite clarity and define your path forward.",
    priceBase: 1275,
    colorScheme: { background: '#f4f1ea', text: '#4A4A4A', accent: '#37b048', headerBackground: '#e9e4d9', buttonText: '#FFFFFF', badgeBackground: '#A5D6A7', badgeText: '#1B5E20'}, // Light green badge
    badge: null,
    features: {
      "Core Sessions": [
        "2 Initial 60-min Sessions",
        "13 x 30-min Check-in Sessions"
      ],
      "Foundational Elements": [
        "Personalized Goal Setting Framework",
        "Circle of Perspective Session",
        "Vision Statement Crafting & Refinement",
        "Support Materials (worksheets, recordings)",
        "Choice of Session Delivery (Online/Phone)"
      ],
      "Support & Accountability": [
        "Standard Momentum & Accountability Structure",
        "Flexible Scheduling (Weekly/Bi-weekly)",
        "Standard Email Support",
      ],
      "Bonus Resources": [
        // "-", // Placeholder if no specific bonus
      ]
    }
  },
  {
    id: 'momentum',
    name: "Momentum Builder",
    tagline: "Sustain progress with consistent support & accountability.",
    priceBase: 1550,
    colorScheme: { background: '#37b048', text: '#ffffff', accent: '#ffffff', headerBackground: '#2f9a36', buttonBackground: '#FFFFFF', buttonText: '#37b048', badgeBackground: '#2c7a7b', badgeText: '#ffffff'},
    badge: "Most Popular",
    badgeIcon: FiStar,
    features: {
      "Core Sessions": [
        "2 Initial 60-min Sessions",
        "18 x 30-min Check-in Sessions"
      ],
      "Foundational Elements": [
        "Personalized Goal Setting Framework",
        "Circle of Perspective Session",
        "Vision Statement Crafting & Refinement",
        "Support Materials (worksheets, recordings)",
        "Choice of Session Delivery (Online/Phone/In-Person Options)"
      ],
      "Support & Accountability": [
        "Enhanced Momentum & Accountability Structure",
        "Flexible Scheduling (Weekly/Bi-weekly)",
        "Priority Email Support",
        "Mid-Point Progress Review"
      ],
      "Bonus Resources": [
        "Access to Curated Resource Library"
      ]
    }
  },
  {
    id: 'transformational',
    name: "Transformational Journey",
    tagline: "Deepen your growth with comprehensive, ongoing coaching.",
    priceBase: 1759,
    colorScheme: { background: '#2c7a7b', text: '#ffffff', accent: '#ffffff', headerBackground: '#256869', buttonBackground: '#FFFFFF', buttonText: '#2c7a7b', badgeBackground: '#37b048', badgeText: '#ffffff'},
    badge: "Recommended",
    badgeIcon: FiAward,
    features: {
      "Core Sessions": [
        "2 Initial 60-min Sessions",
        "23 x 30-min Check-in Sessions"
      ],
      "Foundational Elements": [
        "Personalized Goal Setting Framework",
        "Circle of Perspective Session",
        "Vision Statement Crafting & Refinement",
        "Support Materials (worksheets, recordings)",
        "Choice of Session Delivery (Online/Phone/In-Person Options)"
      ],
      "Support & Accountability": [
        "Comprehensive Momentum & Accountability Structure",
        "Flexible Scheduling (Weekly/Bi-weekly)",
        "Priority Plus Email Support",
        "Mid-Point Progress Review"
      ],
      "Bonus Resources": [
        "Expanded Access to Resource Library",
        "Post-Package Follow-up Session"
      ]
    }
  },
  {
    id: 'elite',
    name: "Executive Elite",
    tagline: "Ultimate support & strategic partnership for peak performance.",
    priceBase: 3500,
    colorScheme: { background: '#343a40', text: '#f8f9fa', accent: '#86ef90', headerBackground: '#23272b', buttonBackground: '#86ef90', buttonText: '#2c3e50', badgeBackground: '#86ef90', badgeText: '#2c3e50'},
    badge: "Premium",
    badgeIcon: FiAward, // Could be a different icon like FiZap or FiBriefcase
    features: {
      "Core Sessions": [
        "3 Initial 90-min Strategy Sessions",
        "30+ Bi-weekly 45-min Check-ins"
      ],
      "Foundational Elements": [
        "Bespoke Goal Achievement Blueprint",
        "In-depth Circle of Perspective Analysis",
        "Vision & Legacy Master Plan",
        "Premium Support Materials & Tools Kit",
        "Flexible & Priority Session Delivery (All Methods)"
      ],
      "Support & Accountability": [
        "Dedicated Accountability Partnership",
        "Full Flexible & Priority Scheduling",
        "Direct Line & Priority Plus Email Access",
        "Quarterly Deep-Dive Progress Reviews"
      ],
      "Bonus Resources": [
        "Full Access to All Resources & Workshops",
        "Two Post-Package Strategic Follow-ups",
        "Option for 1 VIP Intensive Day (Full Day)"
      ]
    }
  }
];

const additionalSessionsData = [
  { name: "Additional 60-minute Session", priceBase: 175, tagline: "For deeper dives or new challenges." },
  { name: "Additional 30-minute Check-in", priceBase: 85, tagline: "To maintain momentum or address quick points." },
];

const paymentTermsDetails = [
  "A complimentary 30-minute discovery call is offered to discuss your needs before committing to a package.",
  "Once a package is chosen and contract signed, the following payment options are available:",
  "Option 1: Payment in full prior to the first session.",
  "Option 2: A $500 non-refundable deposit is due prior to the first session, with the remaining balance due in full within 30 days of the first session date.",
  "Option 3: Monthly payment plans (after initial $500 non-refundable deposit):",
  "   - Starter Spark ($1275 +HST): Remainder in 2 monthly payments of $470.35 (incl. HST on remainder).",
  "   - Momentum Builder ($1550 +HST): Remainder in 3 monthly payments of $417.15 (incl. HST on remainder).",
  "   - Transformational Journey ($1759 +HST): Remainder in 4 monthly payments of $371.75 (incl. HST on remainder).",
  "   - Executive Elite: Custom payment plans available upon request.",
  "All prices are subject to HST (13%). Invoices will be provided."
];


const featureCategories = [
  "Core Sessions",
  "Foundational Elements",
  "Support & Accountability",
  "Bonus Resources"
];

// Motion variants
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const tableVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } }
};
const thVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};
const tdVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
};


export default function PricingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdff' }}>
      <motion.main
        style={{
          flexGrow: 1,
          padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 3vw, 1.5rem)',
          fontFamily: '"Lato", sans-serif',
          color: '#4A4A4A',
        }}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              color: '#37b048',
              textAlign: 'center',
              marginBottom: '1rem',
              fontWeight: 'bold',
            }}
          >
            Coaching Packages & Investment
          </motion.h1>
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              textAlign: 'center',
              color: '#5f6c7b',
              maxWidth: '800px',
              margin: '0 auto clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.7,
            }}
          >
            Choose a path that aligns with your aspirations. Each package is thoughtfully designed to provide you with the tools, support, and accountability needed to achieve meaningful and lasting change.
          </motion.p>

          {/* Comparison Table Section */}
          <motion.div
            variants={itemVariants}
            style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', border: '1px solid #e0e0e0', borderRadius: '12px', boxShadow: '0 6px 18px rgba(0,0,0,0.06)', backgroundColor: '#fff' }}
          >
            <motion.table
              variants={tableVariants}
              style={{
                width: '100%',
                minWidth: '900px', // Ensures table has enough space before scrolling
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr>
                  <motion.th variants={thVariants} style={{ width: '25%', padding: '1rem 1.25rem', textAlign: 'left', fontSize: '1.1rem', borderBottom: '2px solid #37b048', color: '#333', backgroundColor: '#f8f9fa' }}>
                    Features
                  </motion.th>
                  {pricingPackagesData.map(pkg => {
                    const BadgeIcon = pkg.badgeIcon;
                    return (
                      <motion.th
                        key={pkg.id}
                        variants={thVariants}
                        style={{
                          width: `${75 / pricingPackagesData.length}%`,
                          padding: '1rem',
                          textAlign: 'center',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: pkg.colorScheme.text,
                          backgroundColor: pkg.colorScheme.headerBackground,
                          borderBottom: `2px solid ${pkg.colorScheme.accent}`,
                          borderLeft: '1px solid #e0e0e0',
                          position: 'relative'
                        }}
                      >
                        {pkg.name}
                        {pkg.badge && (
                          <span style={{
                            display: 'block',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '10px',
                            backgroundColor: pkg.colorScheme.badgeBackground,
                            color: pkg.colorScheme.badgeText,
                            marginTop: '0.3rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}>
                            {BadgeIcon && <BadgeIcon size="0.8em"/>}
                            {pkg.badge}
                          </span>
                        )}
                      </motion.th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {featureCategories.map(category => (
                  <React.Fragment key={category}>
                    <tr>
                      <motion.td variants={tdVariants} colSpan={pricingPackagesData.length + 1} style={{ padding: '0.8rem 1.25rem', fontWeight: 'bold', fontSize: '1rem', backgroundColor: '#f8f9fa', color: '#37b048', borderTop: '1px solid #e0e0e0' }}>
                        {category}
                      </motion.td>
                    </tr>
                    { // Find the max number of features in this category across all packages for row generation
                      Array.from(
                        { length: Math.max(...pricingPackagesData.map(p => (p.features[category] || []).length)) },
                        (_, i) => (
                          <tr key={`${category}-${i}`}>
                            <motion.td variants={tdVariants} style={{ padding: '0.75rem 1.25rem', verticalAlign: 'top', borderTop: '1px solid #eee', backgroundColor: i % 2 === 0 ? '#fff' : '#fdfdfd', textAlign: 'left', fontSize: '0.9rem' }}>
                              {/* This assumes features are somewhat aligned or we list first package's feature name if available */}
                              {pricingPackagesData.find(p => p.features[category] && p.features[category][i])?.features[category][i]?.split(':')[0] || ''}
                            </motion.td>
                            {pricingPackagesData.map(pkg => (
                              <motion.td
                                key={`${pkg.id}-${category}-${i}`}
                                variants={tdVariants}
                                style={{
                                  padding: '0.75rem 1rem',
                                  textAlign: 'center',
                                  verticalAlign: 'top',
                                  borderTop: '1px solid #eee',
                                  borderLeft: '1px solid #eee',
                                  backgroundColor: i % 2 === 0 ? '#fff' : '#fdfdfd',
                                  fontSize: '0.9rem',
                                }}
                              >
                                {pkg.features[category] && pkg.features[category][i] ?
                                  (pkg.features[category][i] === '✔️' || typeof pkg.features[category][i] !== 'string' || !pkg.features[category][i].includes(':')) ?
                                  <FiCheckCircle style={{ color: '#37b048', fontSize: '1.2em' }} /> :
                                  pkg.features[category][i].split(':')[1]?.trim() || pkg.features[category][i] :
                                  '-'}
                              </motion.td>
                            ))}
                          </tr>
                        )
                      )}
                  </React.Fragment>
                ))}
                {/* Price Row */}
                <tr>
                  <motion.td variants={tdVariants} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontWeight: 'bold', fontSize: '1rem', borderTop: '2px solid #ddd', backgroundColor: '#f8f9fa' }}>
                    Package Price
                  </motion.td>
                  {pricingPackagesData.map(pkg => (
                    <motion.td
                      key={`${pkg.id}-price`}
                      variants={tdVariants}
                      style={{
                        padding: '1rem',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        color: pkg.colorScheme.accent === '#ffffff' ? pkg.colorScheme.background : pkg.colorScheme.accent, // Use card bg if accent is white
                        borderTop: '2px solid #ddd',
                        borderLeft: '1px solid #eee',
                        backgroundColor: '#f8f9fa',
                      }}
                    >
                      ${pkg.priceBase}
                      <span style={{fontSize: '0.6em', display: 'block', fontWeight: 'normal', opacity: 0.8}}>+ HST (13%)</span>
                    </motion.td>
                  ))}
                </tr>
                {/* CTA Row */}
                <tr>
                  <motion.td variants={tdVariants} style={{ padding: '1rem', borderTop: '1px solid #ddd', backgroundColor: '#f8f9fa' }}></motion.td>
                  {pricingPackagesData.map(pkg => (
                    <motion.td
                      key={`${pkg.id}-cta`}
                      variants={tdVariants}
                      style={{ padding: '1.5rem 1rem', textAlign: 'center', borderTop: '1px solid #ddd', borderLeft: '1px solid #eee', backgroundColor: '#f8f9fa' }}
                    >
                      <Link href={`/contact?subject=Inquiry about ${encodeURIComponent(pkg.name)} Package`} passHref legacyBehavior>
                        <motion.a
                          style={{
                            display: 'inline-block',
                            padding: '0.8rem 1.5rem',
                            backgroundColor: pkg.colorScheme.buttonBackground || pkg.colorScheme.accent,
                            color: pkg.colorScheme.buttonText || pkg.colorScheme.text,
                            borderRadius: '30px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                            border: `1.5px solid ${pkg.colorScheme.buttonBackground || pkg.colorScheme.accent}`,
                            boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                            transition: 'all 0.25s ease',
                          }}
                          whileHover={{ transform: 'translateY(-2px) scale(1.03)', boxShadow: '0 5px 12px rgba(0,0,0,0.12)' }}
                        >
                          Get Started
                        </motion.a>
                      </Link>
                    </motion.td>
                  ))}
                </tr>
              </tbody>
            </motion.table>
          </motion.div>

          {/* Additional Sessions Section */}
          <motion.div id="additional-sessions" variants={itemVariants} style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#37b048', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold' }}>
              Additional Sessions & Flexibility
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              maxWidth: '800px',
              margin: '0 auto',
            }}>
              {additionalSessionsData.map(session => (
                <div key={session.name} style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e9ecef'}}>
                  <h3 style={{fontSize: '1.15rem', color: '#2c3e50', margin: '0 0 0.5rem 0', fontWeight: '600'}}>{session.name}</h3>
                  <p style={{fontSize: '0.9rem', color: '#5f6c7b', margin: '0 0 1rem 0', lineHeight: 1.6}}>{session.tagline}</p>
                  <p style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#37b048', margin: 0}}>${session.priceBase} <span style={{fontSize: '0.7em', fontWeight: 'normal'}}>+ HST</span></p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment Terms Section */}
          <motion.div variants={itemVariants} style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '800px', margin: 'clamp(2.5rem, 5vw, 4rem) auto 0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#37b048', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold' }}>
              Payment Terms & Conditions
            </h2>
            <div style={{ backgroundColor: '#fff', padding: '1.5rem 2rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e9ecef', fontSize: '0.9rem', lineHeight: 1.75 }}>
              {paymentTermsDetails.map((term, index) => (
                <p key={index} style={{ marginBottom: '0.75rem', paddingLeft: term.startsWith('   -') ? '1.5rem' : '0' }}>
                  {term.startsWith('   -') ? <FiChevronRight style={{marginRight: '0.5rem', color: '#37b048', position: 'relative', top: '2px'}}/> : null}
                  {term.replace(/^   -/, '')}
                </p>
              ))}
               <p style={{marginTop: '1.5rem', fontSize: '0.85rem', color: '#6c757d', fontStyle: 'italic'}}>
                <FiInfo size="1em" style={{marginRight: '0.3rem', position: 'relative', top: '2px'}} />
                All coaching agreements will be formalized with a signed contract outlining the scope of services, confidentiality, and cancellation policies.
              </p>
            </div>
          </motion.div>

        </div>
      </motion.main>
      <Footer />
    </div>
  );
}