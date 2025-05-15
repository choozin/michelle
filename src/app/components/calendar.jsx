// src/app/components/Calendar.jsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCog, FaSeedling } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight, FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi';

import {
    subscribeToMonthData,
    addActivityToDate,
    seedInitialDataToFirebase
} from '@/lib/calendarDataService';

const Calendar = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedFullDate, setSelectedFullDate] = useState(null);

    const [monthData, setMonthData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSeeding, setIsSeeding] = useState(false);
    const [hoveredCellKey, setHoveredCellKey] = useState(null);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

    const [formPosition, setFormPosition] = useState({ top: 0, left: 0, width: 0, visible: false });
    const calendarGridRef = useRef(null);
    const formRef = useRef(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [entity, setEntity] = useState("I'm booking for Myself");
    const [description, setDescription] = useState('');
    const [activityTitle, setActivityTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

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

    const handleSeedData = async () => {
        if (isSeeding) return;
        const confirmSeed = window.confirm("Are you sure you want to seed initial dummy data for May-July 2025? This WILL OVERWRITE existing data in Firebase for these months if it exists at the specific paths.");
        if (confirmSeed) {
            setIsSeeding(true);
            openModal("Seeding Data...", "Please wait while initial data is being added to Firebase.", "info");
            try {
                await seedInitialDataToFirebase();
                if (isModalOpen && modalContent.message.includes("Seeding Data...")) closeModal();
                openModal("Success", "Dummy data seeding complete. The calendar should reflect changes shortly via real-time updates.", "success");
            } catch (error) {
                if (isModalOpen && modalContent.message.includes("Seeding Data...")) closeModal();
                openModal("Error", `Failed to seed data: ${error.message}`, "error");
            } finally {
                setIsSeeding(false);
            }
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setFormPosition(prev => ({ ...prev, visible: false }));
        setSelectedFullDate(null);
        const year = currentDisplayDate.getFullYear();
        const month = currentDisplayDate.getMonth();
        const unsubscribe = subscribeToMonthData(year, month, (data) => {
            setMonthData(data || {});
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [currentDisplayDate]);

    const year = currentDisplayDate.getFullYear();
    const month = currentDisplayDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonthWeekday = new Date(year, month, 1).getDay();

    const calendarCells = Array.from({ length: 42 }, (_, i) => {
        const dayOfMonth = i - firstDayOfMonthWeekday + 1;
        if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
            return new Date(year, month, dayOfMonth);
        }
        return null;
    });

    const getDayDisplayInfo = useCallback((dateObj) => {
        if (!dateObj) return { visualStatus: 'empty', cellText: '', firebaseStatus: null, activities: [], dayData: null };

        const normalizedDateObj = new Date(dateObj);
        normalizedDateObj.setHours(0, 0, 0, 0);

        const dayString = String(normalizedDateObj.getDate()).padStart(2, '0');
        const dayDataFromDB = monthData[dayString];
        const fbStatus = dayDataFromDB?.status;
        const activities = Object.values(dayDataFromDB?.activities || {});

        let visualStatus = 'empty';
        let cellText = '';

        if (normalizedDateObj < today) {
            visualStatus = 'past_unavailable';
            cellText = 'Unavailable';
        } else if (fbStatus === 'unavailable') {
            visualStatus = 'day_off_unavailable'; // Admin explicitly set unavailable
            cellText = 'Unavailable';
        } else if (fbStatus === 'pending') {
            visualStatus = 'pending';
            cellText = 'Pending';
        } else if (fbStatus === 'scheduled') {
            visualStatus = 'scheduled';
            cellText = 'Scheduled';
        } else if (fbStatus === 'available') {
            // If Firebase status is 'available', it's available, regardless of weekend.
            // Visual distinction for weekends can be handled by styling 'available_weekend'.
            const weekday = normalizedDateObj.getDay();
            if (weekday === 0 || weekday === 6) {
                visualStatus = 'available_weekend';
            } else {
                visualStatus = 'available_weekday';
            }
            cellText = 'Available';
        } else {
            // No status from DB (e.g., data not loaded yet, or day truly not in DB)
            // For display, if it's a future day, treat as 'available' visually until DB confirms otherwise.
            // Past/weekend checks still apply for default visual if no DB data.
            const weekday = normalizedDateObj.getDay();
            if (weekday === 0 || weekday === 6) {
                visualStatus = 'weekend_no_db_status';
                cellText = 'Unavailable'; // Visually unavailable by default if weekend and no explicit DB status
            } else {
                visualStatus = 'available_no_db_status';
                cellText = 'Available'; // Visually available by default if weekday and no explicit DB status
            }
        }

        if (selectedFullDate && normalizedDateObj.getTime() === selectedFullDate.getTime()) {
            return { visualStatus: `selected_${visualStatus}`, cellText, firebaseStatus: fbStatus, dayData: dayDataFromDB, activities };
        }

        return { visualStatus, cellText, firebaseStatus: fbStatus, dayData: dayDataFromDB, activities };

    }, [monthData, selectedFullDate, today]);

    const prevMonth = () => setCurrentDisplayDate(new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDisplayDate(new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth() + 1, 1));
    const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const handleDateClick = (dateObj, e) => {
        if (!dateObj) return;
        const normalizedDateObj = new Date(dateObj); normalizedDateObj.setHours(0, 0, 0, 0);
        const { visualStatus, firebaseStatus, dayData, activities } = getDayDisplayInfo(normalizedDateObj);

        // Users can only submit to days whose Firebase status is 'available'.
        if (firebaseStatus !== 'available') {
            let message = 'This date is not available for new bookings.';
            if (normalizedDateObj < today) message = 'This date is in the past.';
            else if (firebaseStatus === 'pending') message = `This date has ${activities.length} request(s) pending approval.`;
            else if (firebaseStatus === 'scheduled') message = `This date has ${activities.length} scheduled activit(y/ies).`;
            else if (firebaseStatus === 'unavailable') message = dayData?.reason || 'This day is marked as unavailable.';
            else if (visualStatus === 'weekend_no_db_status') message = 'Weekends are generally unavailable unless specified.';


            openModal('Not Available for New Booking', message, 'info');
            setFormPosition(prev => ({ ...prev, visible: false }));
            setSelectedFullDate(normalizedDateObj);
            return;
        }

        if (formPosition.visible && selectedFullDate && selectedFullDate.getTime() !== normalizedDateObj.getTime()) {
            openModal('Change Date?', 'You have an active selection. Do you want to change to this new date?', 'confirm',
                () => selectAndPositionForm(normalizedDateObj, e.currentTarget)
            );
        } else if (selectedFullDate && selectedFullDate.getTime() === normalizedDateObj.getTime()) {
            setFormPosition(prev => ({ ...prev, visible: !prev.visible }));
        } else {
            selectAndPositionForm(normalizedDateObj, e.currentTarget);
        }
    };

    const selectAndPositionForm = (dateObj, cellElement) => {
        setSelectedFullDate(dateObj);
        setName(''); setEmail(''); setEntity("I'm booking for Myself"); setDescription('');
        setActivityTitle(''); setStartTime(''); setEndTime('');

        if (calendarGridRef.current && cellElement) {
            const gridRect = calendarGridRef.current.getBoundingClientRect();
            const cellRect = cellElement.getBoundingClientRect();
            let top = (cellRect.bottom - gridRect.top) + 8;
            let left = (cellRect.left - gridRect.top);
            let formWidth = Math.min(gridRect.width > 550 ? 400 : gridRect.width * 0.85, 400);
            const calendarEffectiveWidth = calendarGridRef.current.offsetWidth;
            if (left + formWidth > calendarEffectiveWidth - 10) left = Math.max(10, calendarEffectiveWidth - formWidth - 10);
            if (left < 10) left = 10;
            setFormPosition({ top, left, width: formWidth, visible: true });
        }
    };

    useEffect(() => {
        if (formPosition.visible && formRef.current) {
            setTimeout(() => { if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' }); }, 50);
        }
    }, [formPosition]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFullDate) { openModal('Error', 'No date selected.', 'error'); return; }
        if (!activityTitle.trim()) { openModal('Validation Error', 'Please enter an activity title.', 'error'); return; }
        if (!startTime || !endTime) { openModal('Validation Error', 'Please select start and end times.', 'error'); return; }
        if (new Date(`1970/01/01 ${startTime}`) >= new Date(`1970/01/01 ${endTime}`)) {
            openModal('Validation Error', 'End time must be after start time.', 'error'); return;
        }
        if (!name.trim()) { openModal('Validation Error', 'Please enter your name.', 'error'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { openModal('Validation Error', 'Please enter a valid email address.', 'error'); return; }

        const activityData = {
            title: activityTitle, startTime, endTime,
            activityType: entity, notes: description,
            bookedBy: { name, email },
        };

        openModal('Submitting...', 'Your request is being submitted.', 'info');
        try {
            await addActivityToDate(
                selectedFullDate.getFullYear(), selectedFullDate.getMonth(), selectedFullDate.getDate(),
                activityData, false
            );
            if (isModalOpen && modalContent.message.includes('Submitting...')) closeModal();
            const formattedDate = selectedFullDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            openModal('Request Submitted', `Thank you, ${name}! Your request for "${activityTitle}" on ${formattedDate} (${startTime}-${endTime}) has been submitted. The day's status is now 'pending'.`, 'success');
            setFormPosition({ ...formPosition, visible: false });
            setName(''); setEmail(''); setEntity("I'm booking for Myself"); setDescription('');
            setActivityTitle(''); setStartTime(''); setEndTime('');
        } catch (error) {
            console.error("Error submitting activity request:", error);
            if (isModalOpen && modalContent.message.includes('Submitting...')) closeModal();
            openModal('Submission Error', String(error.message || 'Could not submit request.'), 'error');
        }
    };

    const closeOriginalForm = () => setFormPosition({ ...formPosition, visible: false });
    const formattedSelectedDateForForm = selectedFullDate ? selectedFullDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : '';
    const timeSlots = [];
    for (let h = 7; h < 22; h++) {
        const hourDisplay = h % 12 === 0 ? 12 : h % 12;
        const ampm = h < 12 || h === 24 ? 'AM' : 'PM';
        timeSlots.push({ value: `${String(h).padStart(2, '0')}:00`, label: `${hourDisplay}:00 ${ampm}` });
        if (h < 21) timeSlots.push({ value: `${String(h).padStart(2, '0')}:30`, label: `${hourDisplay}:30 ${ampm}` });
    }

    const calendarWrapperVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
    const calendarElementsVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } } };
    const childVariant = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } };

    if (isLoading && Object.keys(monthData).length === 0) { // Show loading indicator more consistently
        return <div style={{ textAlign: 'center', padding: '3rem', fontFamily: '"Lato", sans-serif', fontSize: '1.2rem' }}>Loading Calendar Data...</div>;
    }

    return (
        <motion.div
            style={{ width: '100%', fontFamily: '"Lato", sans-serif', padding: '2rem 0', backgroundColor: '#f9f9f9', overflowX: 'hidden' }}
            variants={calendarWrapperVariants} initial="hidden" animate="visible"
        >
            <motion.div ref={calendarGridRef} style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', position: 'relative' }} variants={calendarElementsVariants}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem', marginBottom: '0.5rem' }}>
                    <button title="Seed Dummy Data (Dev/Admin)" onClick={handleSeedData} disabled={isSeeding} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: isSeeding ? '#ccc' : '#777' }}>
                        <FaSeedling size="1.5em" />
                    </button>
                    <motion.h2 style={{ margin: 0, color: '#37b048', fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', textAlign: 'center', flexGrow: 1 }} variants={childVariant}>
                        Book an Appointment
                    </motion.h2>
                    <button title="Admin Panel" onClick={() => setIsAdminPanelOpen(p => !p)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#777' }}>
                        <FaCog size="1.5em" />
                    </button>
                </div>

                <AnimatePresence>
                    {isAdminPanelOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '1rem', marginBottom: '1rem' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                            style={{ overflow: 'hidden', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', backgroundColor: '#fff' }}
                        >
                            <h4>Admin Panel (Placeholder)</h4>
                            <p>Current view: {currentDisplayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                            <p style={{ fontSize: '0.8em' }}><em>Actual admin functions need to be implemented here.</em></p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', gap: '0.5rem' }} variants={childVariant}>
                    <button onClick={prevMonth} aria-label="Previous month" style={{ border: 'none', background: 'transparent', fontSize: '1.8rem', color: '#555', cursor: 'pointer', padding: '0.5rem' }}><FiChevronLeft /></button>
                    <span style={{ fontSize: '1.1rem', color: '#333', fontWeight: '600', minWidth: '200px', textAlign: 'center' }}>
                        {currentDisplayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <button onClick={nextMonth} aria-label="Next month" style={{ border: 'none', background: 'transparent', fontSize: '1.8rem', color: '#555', cursor: 'pointer', padding: '0.5rem' }}><FiChevronRight /></button>
                </motion.div>

                <motion.div style={{ overflowX: 'auto' }} variants={childVariant}>
                    <div style={{ minWidth: '550px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem', textAlign: 'center', fontWeight: 'bold', fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                            {dayLabels.map(d => <span key={d}>{d}</span>)}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '0.5rem' }}>
                            {calendarCells.map((dateObj) => {
                                const { visualStatus, cellText, firebaseStatus, activities } = getDayDisplayInfo(dateObj);
                                const cellKey = dateObj ? dateObj.toISOString().split('T')[0] : `empty-${Math.random()}`;

                                const isCellSelected = visualStatus.startsWith('selected_');
                                const baseVisualStatus = isCellSelected ? visualStatus.substring('selected_'.length) : visualStatus;
                                const isCellHovered = hoveredCellKey === cellKey && firebaseStatus === 'available';

                                let cellStyle = {
                                    minHeight: 'calc(clamp(3.5rem, 8vw, 4.5rem) + 1rem)',
                                    border: '1px solid #eee', borderRadius: '8px',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
                                    padding: '0.5rem 0.25rem', fontFamily: '"Lato", sans-serif',
                                    backgroundColor: '#fff', color: '#333', cursor: 'default',
                                    transition: 'all 0.2s ease', position: 'relative', textAlign: 'center', overflow: 'hidden'
                                };
                                let dayNumberStyle = { fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem', display: 'block' };
                                let statusTextStyle = { fontSize: '0.6rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 };

                                // Colors: Black unavailable, white available, green scheduled, brown pending, blue mouseover for available
                                switch (baseVisualStatus) {
                                    case 'empty': cellStyle.backgroundColor = 'transparent'; cellStyle.border = '1px solid transparent'; statusTextStyle.opacity = 0; break;
                                    case 'past_unavailable':
                                        cellStyle.backgroundColor = '#343a40'; cellStyle.color = '#fff'; cellStyle.cursor = 'not-allowed'; dayNumberStyle.opacity = 0.6; statusTextStyle.opacity = 0.6; break;
                                    case 'weekend_no_db_status': // A weekend day for which no data explicitly came from DB
                                    case 'weekend_implicit_unavailable': // (legacy, should be covered by weekend_no_db_status)
                                        cellStyle.backgroundColor = '#343a40'; cellStyle.color = '#fff'; cellStyle.cursor = 'not-allowed'; dayNumberStyle.opacity = 0.7; statusTextStyle.opacity = 0.7; break;
                                    case 'available_weekend': // DB status is 'available', is weekend
                                        cellStyle.backgroundColor = '#ffffff'; cellStyle.color = '#333';
                                        cellStyle.cursor = 'pointer';
                                        if (isCellHovered) { cellStyle.backgroundColor = '#e0eaff'; /* Blue hover */ }
                                        break;
                                    case 'day_off_unavailable':
                                        cellStyle.backgroundColor = '#343a40'; cellStyle.color = '#fff'; cellStyle.cursor = 'not-allowed'; break;
                                    case 'pending':
                                        cellStyle.backgroundColor = '#8d6e63'; cellStyle.color = '#fff'; cellStyle.cursor = 'pointer'; break;
                                    case 'scheduled':
                                        cellStyle.backgroundColor = '#a5d6a7'; cellStyle.color = '#1b5e20'; cellStyle.cursor = 'pointer'; break;
                                    case 'available_weekday':
                                    case 'available_weekday_implicit': // Day not in DB, weekday -> treat as available
                                    case 'available_no_db_status': // Day not in DB, weekday -> treat as available
                                        cellStyle.backgroundColor = '#ffffff'; cellStyle.color = '#333';
                                        cellStyle.cursor = 'pointer';
                                        if (isCellHovered) { cellStyle.backgroundColor = '#e0eaff'; /* Blue hover */ }
                                        break;
                                    default:
                                        cellStyle.backgroundColor = '#f8f9fa'; cellStyle.color = '#adb5bd'; break;
                                }
                                if (isCellSelected) {
                                    cellStyle.outline = '3px solid #007bff'; cellStyle.outlineOffset = '1px';
                                    cellStyle.zIndex = 2; cellStyle.transform = (cellStyle.transform || '') + ' scale(1.02)';
                                }

                                const canUserAttemptBooking = firebaseStatus === 'available';
                                const isGenerallyInteractive = baseVisualStatus !== 'empty' && baseVisualStatus !== 'past_unavailable' && baseVisualStatus !== 'day_off_unavailable' && baseVisualStatus !== 'weekend_no_db_status';

                                return (
                                    <button
                                        key={cellKey} type="button"
                                        onClick={e => handleDateClick(dateObj, e)}
                                        onMouseEnter={() => dateObj && setHoveredCellKey(cellKey)}
                                        onMouseLeave={() => setHoveredCellKey(null)}
                                        disabled={!isGenerallyInteractive && !isCellSelected}
                                        style={cellStyle}
                                        title={dateObj ? `${cellText}${activities.length > 0 ? ` (${activities.length} activities)` : ''}` : 'Empty cell'}
                                    >
                                        {dateObj && (
                                            <>
                                                <span style={dayNumberStyle}>{dateObj.getDate()}</span>
                                                <span style={statusTextStyle}>{cellText}</span>
                                                {activities && activities.length > 0 && baseVisualStatus !== 'empty' && (
                                                    <div style={{ fontSize: '0.6rem', marginTop: 'auto', color: 'inherit', opacity: 0.75, paddingTop: '0.2rem' }}>
                                                        {activities.length} act.
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {formPosition.visible && selectedFullDate && (
                        <motion.div /* ... form div from previous correct version ... */
                            ref={formRef}
                            initial={{ opacity: 0, y: 20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 20, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                            style={{
                                position: 'absolute',
                                top: `${formPosition.top}px`, left: `${formPosition.left}px`,
                                width: `${formPosition.width}px`,
                                backgroundColor: '#ffffff',
                                padding: '1.5rem', borderRadius: '12px', color: '#333',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 10,
                                border: '1px solid #e0e0e0'
                            }}
                        >
                            <FaTimes onClick={closeOriginalForm} style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer', color: '#888', fontSize: '1.25rem' }} title="Close form" />
                            <h3 style={{ margin: 0, fontSize: '1.15rem', marginBottom: '1.25rem', color: '#37b048', fontWeight: 600 }}>
                                Request for: {formattedSelectedDateForForm}
                            </h3>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                <input type='text' value={activityTitle} onChange={e => setActivityTitle(e.target.value)} placeholder='Activity / Session Title' style={{ padding: '0.75rem', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: '"Lato",sans-serif' }} />
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select value={startTime} onChange={e => setStartTime(e.target.value)} style={{ flex: 1, padding: '0.75rem', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: '"Lato",sans-serif' }}>
                                        <option value="">Start Time</option>
                                        {timeSlots.map(slot => <option key={`start-${slot.value}`} value={slot.value}>{slot.label}</option>)}
                                    </select>
                                    <select value={endTime} onChange={e => setEndTime(e.target.value)} style={{ flex: 1, padding: '0.75rem', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: '"Lato",sans-serif' }}>
                                        <option value="">End Time</option>
                                        {timeSlots.map(slot => <option key={`end-${slot.value}`} value={slot.value}>{slot.label}</option>)}
                                    </select>
                                </div>
                                <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Your Name' style={{ padding: '0.75rem', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: '"Lato",sans-serif' }} />
                                <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Your Email' style={{ padding: '0.75rem', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: '"Lato",sans-serif' }} />
                                <select value={entity} onChange={e => setEntity(e.target.value)} style={{ padding: '0.75rem', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: '"Lato",sans-serif' }}>
                                    <option>I&apos;m booking for Myself</option>
                                    <option>I&apos;m booking for a Group</option>
                                    <option>I&apos;m booking for my Team</option>
                                    <option>I&apos;m booking for my Company</option>
                                </select>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description or notes..." rows={3} style={{ padding: '0.75rem', fontSize: '0.9rem', borderRadius: '6px', border: '1px solid #ccc', fontFamily: '"Lato",sans-serif', resize: 'vertical' }} />
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    <button type='submit' style={{ flex: 1, padding: '0.8rem 1.5rem', fontSize: '0.95rem', fontWeight: 'bold', fontFamily: '"Lato",sans-serif', backgroundColor: '#37b048', color: '#fff', border: 'none', borderRadius: '999px', cursor: 'pointer' }}>Submit Request</button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isModalOpen && (<motion.div /* ... modal div from previous correct version ... */
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
                                <button onClick={modalContent.onConfirm ? handleModalConfirm : closeModal} style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem', fontWeight: 'bold', backgroundColor: modalContent.type === 'error' ? '#e74c3c' : (modalContent.type === 'confirm' ? '#37b048' : '#007bff'), color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', minWidth: '110px', transition: 'background-color 0.2s ease' }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = modalContent.type === 'error' ? '#c82333' : (modalContent.type === 'confirm' ? '#2f7a3c' : '#0056b3')}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = modalContent.type === 'error' ? '#e74c3c' : (modalContent.type === 'confirm' ? '#37b048' : '#007bff')}
                                >
                                    {modalContent.onConfirm ? (modalContent.type === 'confirm' ? 'Confirm' : 'OK') : 'OK'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>)}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default Calendar;