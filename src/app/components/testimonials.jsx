'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

const Testimonials = () => {
    // Wrapped allTestimonials in React.useMemo for stable reference
    const allTestimonials = React.useMemo(() => [
        {
            name: 'Jane D., Project Manager',
            text: 'Working with Michelle transformed our team dynamics. Her tailored strategies and supportive guidance led to measurable growth in productivity and overall morale. A truly impactful experience for our organization!',
            image: 'https://placehold.co/80x80/e6f8ec/37b048?text=JD&font=lato',
        },
        {
            name: 'John S., Team Lead',
            text: 'The structured coaching and practical exercises helped me significantly reduce stress and stay focused. I now lead my team with greater confidence and clarity, and we\'re seeing stronger results.',
            image: 'https://placehold.co/80x80/e6f8ec/37b048?text=JS&font=lato',
        },
        {
            name: 'Catherine B., HR Director',
            text: 'Michelle\'s interactive workshops fostered open dialogue and built a culture of accountability. Team collaboration and morale have reached new heights, and we value the peer support networks established.',
            image: 'https://placehold.co/80x80/e6f8ec/37b048?text=CB&font=lato',
        },
        {
            name: 'Liam J., Operations Head',
            text: 'The analytics-driven approach to coaching delivered clear ROI. We saw a reduction in absenteeism by nearly 30% and a boost in employee retention by 20% within just six months.',
            image: 'https://placehold.co/80x80/e6f8ec/37b048?text=LJ&font=lato',
        },
        {
            name: 'Olivia M., Senior Developer',
            text: 'The evidence-based modules from The Working Mind program empowered me with resilience skills that directly translate to better focus and decision-making under pressure. Highly recommended.',
            image: 'https://placehold.co/80x80/e6f8ec/37b048?text=OM&font=lato',
        },
        {
            name: 'David K., Entrepreneur',
            text: 'As a solo founder, managing stress is crucial. Michelle\'s coaching provided invaluable tools for maintaining balance and focus, directly impacting my business\'s success.',
            image: 'https://placehold.co/80x80/e6f8ec/37b048?text=DK&font=lato',
        },
    ], []); // Empty dependency array for useMemo as the data itself is static here

    const [displayed, setDisplayed] = useState([]);

    useEffect(() => {
        const shuffled = [...allTestimonials].sort(() => 0.5 - Math.random());
        setDisplayed(shuffled.slice(0, 3));
    }, [allTestimonials]); // CORRECTED: Added allTestimonials to dependency array

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };
    const contentWrapperVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const engravedLightOnDarkStyle = (color = '#37b048') => ({
        color: color,
        textShadow: '0px 1px 1px rgba(0,0,0,0.25), 0px -1px 1px rgba(255,255,255,0.1)',
    });

    return (
        <motion.section
            style={{
                width: '100%',
                backgroundColor: 'rgba(220, 240, 220, 0.85)',
                backgroundImage: 'url(/assets/textures/soft-wallpaper.png)',
                backgroundRepeat: 'repeat',
                padding: 'clamp(3rem, 7vw, 5rem) 0',
                fontFamily: '"Lato", sans-serif',
                overflowX: 'hidden',
                boxShadow: `
                    inset 0 10px 15px -10px rgba(0,0,0,0.25), 
                    inset 0 -10px 15px -10px rgba(0,0,0,0.25)
                `,
                position: 'relative',
            }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <motion.div
                style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    padding: '0 clamp(1rem, 4vw, 2rem)',
                }}
                variants={contentWrapperVariants}
            >
                <motion.h2
                    variants={itemVariants}
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                        ...engravedLightOnDarkStyle('#2E7D32'),
                        marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        letterSpacing: '-0.03em',
                    }}
                >
                    Successful Stories
                </motion.h2>

                <motion.div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(240px, 25vw, 320px), 1fr))',
                        gap: 'clamp(1.25rem, 2.5vw, 2rem)',
                    }}
                >
                    {displayed.map((testimonial, idx) => {
                        const isPlaceholderCo = testimonial.image && testimonial.image.includes('placehold.co');

                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -7, scale: 1.03, boxShadow: '0 18px 40px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.3)' }}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.22)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    borderRadius: '18px',
                                    padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                                    boxShadow: '0 12px 35px rgba(0,0,0,0.12), inset 0 1px 0px rgba(255,255,255,0.18)',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    minHeight: '330px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            width: '75px',
                                            height: '75px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '3px solid rgba(255,255,255,0.5)',
                                            backgroundColor: 'rgba(255,255,255,0.15)',
                                            marginBottom: '1.15rem',
                                            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {isPlaceholderCo || !testimonial.image ? (
                                            <FaUserCircle style={{ width: '65%', height: '65%', color: 'rgba(255,255,255,0.6)' }} />
                                        ) : (
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                width={75}
                                                height={75}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        )}
                                    </div>
                                    <p
                                        style={{
                                            fontStyle: 'italic',
                                            color: '#4E342E',
                                            lineHeight: '1.75',
                                            margin: '0 0 1.25rem',
                                            fontSize: 'clamp(0.88rem, 1.7vw, 0.98rem)',
                                        }}
                                    >
                                        “{testimonial.text}”
                                    </p>
                                </div>
                                <p style={{
                                    margin: '0',
                                    marginTop: 'auto',
                                    paddingTop: '1rem',
                                    fontWeight: 'bold',
                                    color: '#3E2723',
                                    fontSize: 'clamp(0.92rem, 1.75vw, 1.02rem)',
                                }}>
                                    — {testimonial.name}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Testimonials;
