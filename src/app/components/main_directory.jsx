// File: src/app/components/MainDirectory.jsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { FaRegUser, FaRegCalendarAlt, FaRegLightbulb, FaRegFileAlt, FaRegComments, FaRegClock } from 'react-icons/fa';

export default function MainDirectory() {
    // updated items for Coaching and Mental Health Education
    const items = [
        { icon: FaRegUser,          title: 'Meet Your Coach',        description: 'Get to know our certified coach.' },
        { icon: FaRegCalendarAlt,   title: 'Book a Session',        description: 'Schedule your one-on-one coaching.' },
        { icon: FaRegLightbulb,     title: 'Self-Care Tips',         description: 'Daily tips to improve your well-being.' },
        { icon: FaRegFileAlt,       title: 'Educational Articles',   description: 'Explore our mental health library.' },
        { icon: FaRegComments,      title: 'Live Workshops',         description: 'Join interactive mental health workshops.' },
        { icon: FaRegClock,         title: 'Upcoming Events',        description: 'Stay updated on our upcoming events.' },
    ];

    const itemWidth = 250;    // px
    const gap = 16;           // px
    const minEdgeMargin = 32; // px (2rem)
    const containerRef = useRef(null);
    const [maxPerRow, setMaxPerRow] = useState(1);

    // calculate how many items fit per row, respecting edge margins
    useEffect(() => {
        function calculate() {
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth;
            const available = width - 2 * minEdgeMargin;
            const count = Math.max(1, Math.floor((available + gap) / (itemWidth + gap)));
            setMaxPerRow(count);
        }
        calculate();
        window.addEventListener('resize', calculate);
        return () => window.removeEventListener('resize', calculate);
    }, []);

    // group items into balanced rows
    function groupItems(items, maxPerRow) {
        const N = items.length;
        const rowsCount = Math.ceil(N / maxPerRow);
        const base = Math.floor(N / rowsCount);
        const extra = N % rowsCount;
        const rows = [];
        let idx = 0;

        for (let i = 0; i < rowsCount; i++) {
            const count = base + (i < extra ? 1 : 0);
            rows.push(items.slice(idx, idx + count));
            idx += count;
        }
        return rows;
    }

    const rows = groupItems(items, maxPerRow);

    return (
        <div
            ref={containerRef}
            style={{
                padding: '3rem 2rem',
                backgroundColor: '#f0eee9',
                boxSizing: 'border-box',
                fontFamily: 'Lato, sans-serif',
            }}
        >
            {rows.map((row, rowIdx) => (
                <div
                    key={rowIdx}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${row.length}, minmax(${itemWidth}px, 1fr))`,
                        gap: `${gap}px`,
                        marginBottom: `${gap}px`,
                    }}
                >
                    {row.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '1rem',
                                }}
                            >
                                {/* Icon */}
                                <Icon
                                    style={{
                                        color: '#37b048',
                                        fontSize: '4rem',
                                        marginBottom: '1rem',
                                    }}
                                />
                                {/* Title */}
                                <div
                                    style={{
                                        color: '#37b048',
                                        fontSize: '1.5rem',
                                        marginBottom: '1.5rem',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}
                                >
                                    {item.title}
                                </div>
                                {/* Description */}
                                <span
                                    style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 'lighter',
                                        marginBottom: '1.5rem',
                                        display: 'block',
                                        textAlign: 'center',
                                    }}
                                >
                                    {item.description}
                                </span>
                                {/* Arrow */}
                                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>→</div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
