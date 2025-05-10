'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiX, FiArrowRight } from 'react-icons/fi';


const Subscribe = ({
    divStyle = 'container',        
    title = 'Your Daily Motivation & Wellness Insight',
    content = 'Subscribe to receive uplifting quotes, wellness tips, and mental health education delivered straight to your inbox.',
    showName = false,
    bgColor, 
    inputPlaceholderName = 'Your Name',
    inputPlaceholderEmail = 'Enter your e-mail',
    buttonText = '→', 
    buttonStyle = 'arrow'          
}) => {
    const fullWidthBgColor = bgColor || '#f7f6f3'; 

    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => setWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const marginHoriz = divStyle === 'container'
        ? (width < 512 ? '1rem' : (width < 768 ? '2rem' : '3rem')) 
        : '0';

    const [nameInput, setNameInput] = useState(''); 
    const [email, setEmail] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info', onConfirm: null });

    const openModal = (title, message, type = 'info', onConfirmCallback = null) => {
        setModalContent({ title, message, type, onConfirm: onConfirmCallback });
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const handleModalConfirm = () => {
        if (modalContent.onConfirm) modalContent.onConfirm();
        setIsModalOpen(false);
    };
    
    const validateEmail = (addr) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && validateEmail(email)) {
            openModal('Subscription Confirmed!', `Thank you, ${showName && nameInput ? nameInput : 'friend'}! You've been subscribed.`, 'success');
            setEmail('');
            setNameInput('');
        } else {
            openModal('Invalid Email', 'Please enter a correct email address to subscribe.', 'error');
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };
    const panelVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1, delayChildren:0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const glassyInputStyle = {
        flex: '1 1 200px',
        padding: '0.85rem 1.25rem',
        fontSize: '1rem',
        backgroundColor: 'rgba(0,0,0,0.3)', // Darker translucent for better contrast with light text
        color: '#f0f0f0',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.2s ease, background-color 0.2s ease',
    };
    
    const glassyPillButtonStyle = {
        padding: '0.85rem 2rem',
        background: 'linear-gradient(to bottom, rgba(55, 176, 72, 0.75), rgba(47, 154, 54, 0.85))',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.2)',
        transition: 'background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const glassyArrowButtonStyle = {
        padding: '0.85rem', 
        minWidth: '50px', 
        background: 'linear-gradient(to bottom, rgba(55, 176, 72, 0.75), rgba(47, 154, 54, 0.85))',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '8px', 
        fontSize: '1.2rem', 
        cursor: 'pointer',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.2)',
        transition: 'background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    };


    return (
        <>
            <motion.section
                style={{
                    width: '100%',
                    // MODIFIED: Dark green semi-transparent background for 'container' style
                    backgroundColor: divStyle === 'container' ? 'rgba(30, 65, 40, 0.88)' : fullWidthBgColor,
                    backgroundImage: divStyle === 'container' ? 'url(/assets/textures/soft-wallpaper.png)' : 'none',
                    backgroundRepeat: divStyle === 'container' ? 'repeat' : 'no-repeat',
                    backgroundAttachment: divStyle === 'container' ? 'fixed' : 'scroll',
                    padding: 'clamp(3rem, 6vw, 4rem) 0', 
                    fontFamily: '"Lato", sans-serif',
                    display: 'flex',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    overflowX: 'hidden',
                    boxShadow: divStyle === 'container' ? 'inset 0 10px 15px -10px rgba(0,0,0,0.3), inset 0 -10px 15px -10px rgba(0,0,0,0.3)' : 'none',
                    position: 'relative',
                }}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div
                    style={divStyle === 'container' ? { 
                        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassy panel slightly less opaque for better contrast of its content
                        backdropFilter: 'blur(12px)', // Increased blur for better glass effect
                        WebkitBackdropFilter: 'blur(12px)',
                        margin: `0 ${marginHoriz}`,
                        padding: 'clamp(2rem, 5vw, 3.5rem)',
                        borderRadius: '18px',
                        color: '#f0f0f0', // Default text color for panel content (light)
                        textAlign: 'center',
                        maxWidth: '700px',
                        width: 'calc(100% - 2 * '+ marginHoriz +')', 
                        boxShadow: '0 12px 35px rgba(0,0,0,0.12), inset 0 1px 0px rgba(255,255,255,0.18)', // Enhanced shadow
                        border: '1px solid rgba(255,255,255,0.28)', // Slightly more opaque border
                    } : { 
                        backgroundColor: 'transparent', 
                        margin: `0 ${marginHoriz}`,
                        padding: 'clamp(2rem, 4vw, 3rem)',
                        borderRadius: '0',
                        color: '#333', // Dark text for fullWidth style
                        textAlign: 'center',
                        maxWidth: '800px',
                        width: '100%',
                    }}
                    variants={panelVariants}
                >
                    <motion.h2 
                        style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                            margin: '0 0 1.25rem', 
                            // Text color for title on panel
                            color: divStyle === 'container' ? '#ffffff' : '#37b048', 
                            fontWeight: 'bold', 
                            textShadow: divStyle === 'container' ? '0 1px 4px rgba(0,0,0,0.4)' : 'none', // Stronger shadow for light text
                            letterSpacing: '-0.02em',
                        }}
                        variants={itemVariants}
                    >
                        {title}
                    </motion.h2>
                    
                    {divStyle === 'fullWidth' && (
                        <motion.hr variants={itemVariants} style={{ border: 'none', borderTop: '1px solid #ccc', margin: '0 auto 1.5rem', width: '80px' }} />
                    )}
                    
                    <motion.p 
                        style={{ 
                            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', 
                            margin: '0 0 2.5rem', 
                            lineHeight: 1.7,
                            // Text color for content on panel
                            color: divStyle === 'container' ? 'rgba(240, 245, 240, 0.9)' : '#555', 
                            textShadow: divStyle === 'container' ? '0 1px 2px rgba(0,0,0,0.2)' : 'none', // Subtle shadow for readability
                        }}
                        variants={itemVariants}
                    >
                        {content}
                    </motion.p>

                    <motion.form 
                        onSubmit={handleSubmit} 
                        style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', alignItems: 'stretch' }}
                        variants={itemVariants}
                    >
                        {showName && (
                            <input
                                type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)}
                                placeholder={inputPlaceholderName}
                                style={divStyle === 'container' ? glassyInputStyle : {
                                    flex: '1 1 200px', padding: '0.85rem 1rem', fontSize: '1rem',
                                    border: '1px solid #ccc', borderRadius: '6px'
                                }}
                            />
                        )}
                        <input
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder={inputPlaceholderEmail}
                            style={divStyle === 'container' ? glassyInputStyle : {
                                flex: '1 1 200px', padding: '0.85rem 1rem', fontSize: '1rem',
                                border: '1px solid #ccc', borderRadius: '6px'
                            }}
                        />
                        
                        {buttonStyle === 'arrow' ? (
                            <motion.button
                                type="submit"
                                style={divStyle === 'container' ? glassyArrowButtonStyle : {
                                    padding: '0.85rem 1rem', backgroundColor: '#37b048', color: '#fff',
                                    border: 'none', borderRadius: '6px', fontSize: '1.2rem', cursor: 'pointer'
                                }}
                                whileHover={divStyle === 'container' ? { 
                                    background: 'linear-gradient(to bottom, rgba(69, 204, 88, 0.85), rgba(55, 176, 72, 0.95))', 
                                    y: -2, boxShadow: '0 7px 18px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.25)'
                                } : { backgroundColor: '#2f9a36', y: -2 }}
                                whileTap={divStyle === 'container' ? { scale: 0.95 } : { scale: 0.95 }}
                            >
                                <FiArrowRight />
                            </motion.button>
                        ) : ( 
                            <motion.button
                                type="submit"
                                style={divStyle === 'container' ? glassyPillButtonStyle : {
                                    padding: '0.85rem 2rem', backgroundColor: '#37b048', color: '#fff',
                                    border: 'none', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer'
                                }}
                                whileHover={divStyle === 'container' ? { 
                                    background: 'linear-gradient(to bottom, rgba(69, 204, 88, 0.85), rgba(55, 176, 72, 0.95))', 
                                    y: -2, boxShadow: '0 7px 18px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.25)'
                                } : { backgroundColor: '#2f9a36', y: -2 }}
                                whileTap={divStyle === 'container' ? { scale: 0.95 } : { scale: 0.95 }}
                            >
                                {buttonText === '→' ? 'Subscribe' : buttonText} 
                            </motion.button>
                        )}
                    </motion.form>
                </motion.div>
            </motion.section>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: -20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            style={{ backgroundColor: '#fff', padding: '2rem 2.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', textAlign: 'center', maxWidth: '480px', width: '100%' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {modalContent.type === 'success' && <FiCheckCircle size="40px" color="#37b048" />}
                                {modalContent.type === 'error' && <FiAlertTriangle size="40px" color="#e74c3c" />}
                                {modalContent.type === 'info' && <FiInfo size="40px" color="#3498db" />}
                            </div>
                            <h3 style={{ marginTop: 0, marginBottom: '0.8rem', fontSize: '1.5rem', color: '#343a40', fontWeight: '600' }}>{modalContent.title}</h3>
                            <p style={{ marginBottom: '1.75rem', color: '#555', whiteSpace: 'pre-line', lineHeight: 1.65, fontSize: '0.95rem' }}>{modalContent.message}</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                <button onClick={closeModal} style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem', fontWeight: 'bold', backgroundColor: '#007bff',  color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', minWidth: '110px', transition: 'background-color 0.2s ease' }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                                >OK</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Subscribe;
