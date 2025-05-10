'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Using FaTimes for the original form's close icon, and Fi for new modal icons
import { FaTimes } from 'react-icons/fa'; 
import { FiChevronLeft, FiChevronRight, FiAlertTriangle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

const Calendar = () => {
    const [offset, setOffset] = useState(0);
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(null); // Stores 'YYYY-MM-DD'
    
    // Form positioning and visibility state (from our enhancements)
    const [formPosition, setFormPosition] = useState({ top: 0, left: 0, width: 0, visible: false });
    const calendarGridRef = useRef(null); // Ref for the grid to calculate form position
    const formRef = useRef(null); // Ref for the form to scroll it into view

    // Form field states (original)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [entity, setEntity] = useState("I'm booking for Myself");
    const [description, setDescription] = useState('');

    // Modal State (from our enhancements)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info', onConfirm: null });

    // --- Modal Functions (our enhancements) ---
    const openModal = (title, message, type = 'info', onConfirmCallback = null) => {
        setModalContent({ title, message, type, onConfirm: onConfirmCallback });
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const handleModalConfirm = () => {
        if (modalContent.onConfirm) modalContent.onConfirm();
        setIsModalOpen(false);
    };

    // --- Date Calculations (original logic) ---
    const currentMonthDate = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const month = currentMonthDate.getMonth();
    const year = currentMonthDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonthWeekday = currentMonthDate.getDay();
    
    const calendarCellsData = Array.from({ length: 42 }, (_, i) => {
        const day = i - firstDayOfMonthWeekday + 1;
        if (day > 0 && day <= daysInMonth) {
            return new Date(year, month, day);
        }
        return null;
    });

    // Sample booked dates (original logic, adapted for string comparison)
    const bookedThisMonthOriginal = [4, 7, 13, 18, 22, 27, 30];
    const bookedNextMonthOriginal = [2, 5, 11, 16, 21, 24, 29];

    const getBookedDatesForCurrentView = () => {
        const currentYear = currentMonthDate.getFullYear();
        const currentMonthNum = currentMonthDate.getMonth(); // 0-indexed

        if (currentYear === today.getFullYear() && currentMonthNum === today.getMonth() + 0) { // Current actual month
            return bookedThisMonthOriginal.map(d => `${currentYear}-${String(currentMonthNum + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
        }
        if (currentYear === today.getFullYear() && currentMonthNum === today.getMonth() + 1) { // Next actual month
             return bookedNextMonthOriginal.map(d => `${currentYear}-${String(currentMonthNum + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
        }
        return [];
    };
    const bookedDates = getBookedDatesForCurrentView();

    // --- Cell Status (original logic, adapted) ---
    const getDayStatus = (dateObj) => {
        if (!dateObj) return 'empty'; 
        const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        
        const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (dateObj < todayDateOnly) return 'unavailable'; 

        const weekday = dateObj.getDay();
        if (weekday === 0 || weekday === 6) return 'unavailable'; 
        if (bookedDates.includes(dateStr)) return 'booked';
        if (dateStr === selectedDate) return 'selected';
        return 'available';
    };
    
    const [hoveredOriginalCellKey, setHoveredOriginalCellKey] = useState(null);


    // --- Navigation (original logic) ---
    const prevMonth = () => {
        setOffset((o) => Math.max(0, o - 1));
        setFormPosition({ ...formPosition, visible: false }); 
    };
    const nextMonth = () => {
        setOffset((o) => Math.min(5, o + 1)); 
        setFormPosition({ ...formPosition, visible: false }); 
    };
    const dayLabelsOriginal = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];


    // --- Event Handlers ---
    const handleDateClick = (dateObj, e) => {
        if (!dateObj) return;
        const status = getDayStatus(dateObj);
        
        if (status !== 'available' && status !== 'selected') {
            openModal('Not Available', 'This date is not available for booking.', 'info');
            return;
        }

        const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

        // MODIFIED: Only show confirm dialog if form is already visible and a different date is clicked
        if (formPosition.visible && selectedDate && selectedDate !== dateStr) {
            openModal(
                'Change Date?',
                'You have already selected a date. Do you want to change it to this new date?',
                'confirm',
                () => selectAndPositionForm(dateStr, e.currentTarget)
            );
        } else if (selectedDate === dateStr) { 
             setFormPosition(prev => ({ ...prev, visible: !prev.visible })); 
        } else { // New date selected, or form was not visible
            selectAndPositionForm(dateStr, e.currentTarget);
        }
    };
    
    const selectAndPositionForm = (dateStr, cellElement) => {
        setSelectedDate(dateStr);
        if (calendarGridRef.current && cellElement) {
            const gridRect = calendarGridRef.current.getBoundingClientRect();
            const cellRect = cellElement.getBoundingClientRect();
            
            let top = cellRect.bottom - gridRect.top + 8; 
            let left = cellRect.left - gridRect.left;
            let formWidth = Math.min(gridRect.width > 550 ? 400 : gridRect.width * 0.8, 400); 

            if (left + formWidth > gridRect.width -10 ) { 
                left = Math.max(10, gridRect.width - formWidth - 10); 
            }
             if (left < 10) {
                left = 10;
            }
            // Ensure form becomes visible when a new date is selected this way
            setFormPosition({ top, left, width: formWidth, visible: true }); 
        }
    };
    
    useEffect(() => {
        if (formPosition.visible && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [formPosition]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) { openModal('Validation Error', 'Please enter your name.', 'error'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { openModal('Validation Error', 'Please enter a valid email address.', 'error'); return; }
        if (!description.trim()) { openModal('Validation Error', 'Please provide a brief description.', 'error'); return; }

        const [y, m, d] = selectedDate.split('-').map(Number);
        const dt = new Date(y, m - 1, d);
        const formattedDate = dt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        openModal('Booking Submitted', `Thank you, ${name}! Your consultation request for ${formattedDate} has been received. We will contact you shortly.`, 'success');
        
        setSelectedDate(null);
        setFormPosition({ ...formPosition, visible: false });
        setName(''); setEmail(''); setEntity("I'm booking for Myself"); setDescription('');
    };

    const closeOriginalForm = () => { 
        setFormPosition({ ...formPosition, visible: false });
    };
    
    const formattedSelectedDateForForm = selectedDate
        ? (() => {
            const [y, m, d] = selectedDate.split('-').map(Number);
            const dt = new Date(y, m - 1, d); 
            const weekday = dt.toLocaleDateString('en-US', { weekday: 'long' });
            const monthName = dt.toLocaleDateString('en-US', { month: 'long' });
            const dayNum = dt.getDate();
            const ordinal = (() => {
                const s = ['th', 'st', 'nd', 'rd']; const v = dayNum % 100;
                return (dayNum + (s[(v - 20) % 10] || s[v] || s[0]));
            })();
            return `${weekday}, ${monthName} ${ordinal}, ${y}`;
        })()
        : '';

    const calendarWrapperVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };
    const calendarElementsVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
    };
     const childVariant = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
    };

    return (
        <motion.div 
            style={{ 
                width: '100%', fontFamily: '"Lato", sans-serif', 
                padding: '2rem 0', backgroundColor: '#f9f9f9', 
                overflowX: 'hidden', 
            }}
            variants={calendarWrapperVariants} initial="hidden" animate="visible"
        >
            <motion.div
                ref={calendarGridRef} 
                style={{ 
                    width: '100%', maxWidth: '1000px', 
                    margin: '0 auto', position: 'relative' 
                }}
                variants={calendarElementsVariants} 
            >
                <motion.h2
                    style={{ 
                        margin: 0, color: '#37b048', fontSize: '2rem',
                        textAlign: 'center', marginBottom: '0.5rem'
                    }}
                    variants={childVariant}
                >
                    Make an Appointment With Me
                </motion.h2>

                <motion.div
                    style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', marginBottom: '1rem'
                    }}
                    variants={childVariant}
                >
                    <button
                        onClick={prevMonth} disabled={offset === 0}
                        style={{
                            border: 'none', background: 'none', fontSize: '1.5rem',
                            color: offset === 0 ? '#ccc' : '#999', 
                            marginRight: '1rem', cursor: offset === 0 ? 'default' : 'pointer'
                        }}
                    ><FiChevronLeft /></button>
                    <span style={{ fontSize: '1rem', color: '#999' }}>
                        {currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                        onClick={nextMonth} disabled={offset === 5} 
                        style={{
                            border: 'none', background: 'none', fontSize: '1.5rem',
                            color: offset === 5 ? '#ccc' : '#999', 
                            marginLeft: '1rem', cursor: offset === 5 ? 'default' : 'pointer'
                        }}
                    ><FiChevronRight /></button>
                </motion.div>

                <motion.div style={{ overflowX: 'auto' }} variants={childVariant}> 
                    <div style={{ minWidth: '550px' }}> 
                        <div
                            style={{ 
                                display: 'grid', gridTemplateColumns: 'repeat(7,1fr)',
                                borderBottom: '1px solid #ccc', paddingBottom: '0.5rem',
                                textAlign: 'center', fontWeight: 'bold',
                                fontSize: '0.75rem', color: '#666'
                            }}
                        >
                            {dayLabelsOriginal.map(d => <span key={d}>{d}</span>)}
                        </div>

                        <div
                            style={{ 
                                display: 'grid', gridTemplateColumns: 'repeat(7,1fr)',
                                gap: '0.5rem', marginTop: '0.5rem'
                            }}
                        >
                            {calendarCellsData.map((dateObj, idx) => {
                                const status = getDayStatus(dateObj);
                                const cellKey = dateObj ? `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}` : `empty-${idx}`;
                                const isSelectable = status === 'available';
                                const isOriginalHovered = hoveredOriginalCellKey === cellKey;
                                
                                let cellStyle = {
                                    height: '4rem', border: 'none', borderRadius: '4px',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: '"Lato", sans-serif',
                                    backgroundColor: '#fff', color: '#000', cursor: 'default',
                                    transition: 'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease', // Added transition
                                    position: 'relative', // For z-index on hover
                                };

                                if (status === 'empty') {
                                    cellStyle.backgroundColor = 'transparent'; 
                                } else if (status === 'unavailable') {
                                     cellStyle.backgroundColor = '#000'; 
                                     cellStyle.color = '#fff';
                                } else if (status === 'booked') {
                                    cellStyle.backgroundColor = '#f5f0e1'; 
                                } else if (status === 'selected') {
                                    cellStyle.backgroundColor = '#37b048'; 
                                    cellStyle.color = '#fff';
                                    cellStyle.boxShadow = '0 2px 4px rgba(0,0,0,0.1) inset, inset 0 0 0 2px #28a745'; // Enhanced selected
                                    cellStyle.transform = 'scale(1.02)';
                                } else if (status === 'available') {
                                    cellStyle.cursor = 'pointer';
                                    cellStyle.boxShadow = 'inset 0 1px 1px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.05)'; // Subtle default shadow
                                    if (isOriginalHovered) {
                                        cellStyle.backgroundColor = '#e6f8ec'; 
                                        cellStyle.transform = 'translateY(-1px) scale(1.03)'; // Enhanced hover
                                        cellStyle.boxShadow = '0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0px rgba(255,255,255,0.2)';
                                        cellStyle.zIndex = 1;
                                    }
                                }

                                return (
                                    <button 
                                        key={cellKey} type="button"
                                        onClick={e => handleDateClick(dateObj, e)}
                                        onMouseEnter={() => dateObj && isSelectable && setHoveredOriginalCellKey(cellKey)}
                                        onMouseLeave={() => setHoveredOriginalCellKey(null)}
                                        disabled={!isSelectable && status !== 'selected'} 
                                        aria-disabled={!isSelectable && status !== 'selected'}
                                        style={cellStyle}
                                    >
                                        {dateObj && (
                                            <>
                                                <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{dateObj.getDate()}</span>
                                                <span style={{ fontSize: '0.75rem' }}>
                                                    {status === 'available' ? 'Available' : status === 'booked' ? 'Booked' : (status !== 'empty' ? 'Unavailable' : '')}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
                
                <AnimatePresence>
                    {formPosition.visible && selectedDate && (
                        <motion.div
                            ref={formRef}
                            initial={{ opacity: 0, y: -20, height: 0 }} 
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -20, height: 0 }}
                            transition={{ duration: 0.3 }} 
                            style={{ 
                                position: 'absolute',
                                top: `${formPosition.top}px`, left: `${formPosition.left}px`,
                                width: `${formPosition.width}px`, 
                                backgroundColor: '#37b048', 
                                padding: '2rem', borderRadius: '8px', color: '#fff',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)', zIndex: 10,
                                marginTop: '0', 
                            }}
                        >
                            <FaTimes 
                                onClick={closeOriginalForm} 
                                style={{
                                    position: 'absolute', top: '0.5rem', right: '0.5rem',
                                    cursor: 'pointer', color: '#fff', fontSize: '1.25rem'
                                }}
                            />
                            <h3 style={{ margin: 0, fontSize: '1.25rem', marginBottom: '1rem' }}>
                                Appointment for {formattedSelectedDateForForm}
                            </h3>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Your Name' style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: '4px', border: 'none', fontFamily: '"Lato",sans-serif' }} />
                                <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Your Email' style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: '4px', border: 'none', fontFamily: '"Lato",sans-serif' }} />
                                <select value={entity} onChange={e => setEntity(e.target.value)} style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: '4px', border: 'none', fontFamily: '"Lato",sans-serif' }}>
                                    <option>I'm booking for Myself</option>
                                    <option>I'm booking for a Group</option> 
                                    <option>I'm booking for my Team</option>
                                    <option>I'm booking for my Company</option>
                                </select>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe what services you're interested in." rows={4} style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: '4px', border: 'none', fontFamily: '"Lato",sans-serif' }} />
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type='submit' style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 'bold', fontFamily: '"Lato",sans-serif', backgroundColor: '#fff', color: '#37b048', border: 'none', borderRadius: '999px', cursor: 'pointer' }}>Submit</button>
                                    <button type='button' onClick={closeOriginalForm} style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 'bold', fontFamily: '"Lato",sans-serif', backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: '999px', cursor: 'pointer' }}>Close</button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                                    {modalContent.type === 'confirm' && <FiAlertTriangle size="40px" color="#f39c12" />}
                                </div>
                                <h3 style={{ marginTop: 0, marginBottom: '0.8rem', fontSize: '1.5rem', color: '#343a40', fontWeight: '600' }}>{modalContent.title}</h3>
                                <p style={{ marginBottom: '1.75rem', color: '#555', whiteSpace: 'pre-line', lineHeight: 1.65, fontSize: '0.95rem' }}>{modalContent.message}</p>
                                <div style={{ display: 'flex', justifyContent: modalContent.type === 'confirm' ? 'space-between' : 'center', gap: '1rem' }}>
                                    {modalContent.type === 'confirm' && (
                                        <button onClick={closeModal} style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem', fontWeight: '600', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', minWidth: '110px', transition: 'background-color 0.2s ease' }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5a6268'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#6c757d'}
                                        >Cancel</button>
                                    )}
                                    <button onClick={modalContent.onConfirm ? handleModalConfirm : closeModal} style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem', fontWeight: 'bold', backgroundColor: modalContent.type === 'error' ? '#e74c3c' : (modalContent.type === 'confirm' ? '#37b048' : '#007bff'),  color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', minWidth: '110px', transition: 'background-color 0.2s ease' }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = modalContent.type === 'error' ? '#c82333' : (modalContent.type === 'confirm' ? '#2f7a3c' : '#0056b3')}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = modalContent.type === 'error' ? '#e74c3c' : (modalContent.type === 'confirm' ? '#37b048' : '#007bff')}
                                    >
                                        {modalContent.onConfirm ? (modalContent.type === 'confirm' ? 'Confirm' : 'OK') : 'OK'}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default Calendar;