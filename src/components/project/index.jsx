'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './style.module.css';

export default function Project({
    index,
    title,
    description,
    link,
    src,
    category,
    isExpanded,
    onMobileExpand,
    onHover,
    headingLevel = 'h2'
}) {
    const Heading = headingLevel;
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device on component mount
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClick = (e) => {
        if (isMobile) {
            // On mobile: toggle accordion
            e.preventDefault();
            onMobileExpand(category, index);
        } else {
            // Desktop: navigate directly
            window.location.href = link;
        }
    };

    const handleVisitClick = (e) => {
        // Prevent the parent click handler from firing
        e.stopPropagation();
        window.location.href = link;
    };

    const handleMouseEnter = () => {
        if (!isMobile) {
            onHover(true, index);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            onHover(false, index);
        }
    };

    // Extract domain from URL for display
    const getDomain = (url) => {
        try {
            const hostname = new URL(url).hostname;
            return hostname.replace('www.', '');
        } catch {
            return 'Visit';
        }
    };

    return (
        <div className={styles.projectWrapper}>
            <div
                className={`${styles.project} ${isExpanded ? styles.expanded : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <Heading className={styles.projectTitle}>{title}</Heading>
                <p>{description}</p>
                {isMobile && (
                    <span className={`${styles.expandIcon} ${isExpanded ? styles.expandIconRotated : ''}`}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                    </span>
                )}
            </div>

            {/* Mobile accordion content */}
            {isMobile && (
                <div className={`${styles.accordionContent} ${isExpanded ? styles.accordionOpen : ''}`}>
                    <div className={styles.accordionInner}>
                        {src && (
                            <div className={styles.imageContainer}>
                                <Image
                                    src={`/images/${src}`}
                                    alt={title}
                                    width={300}
                                    height={200}
                                    className={styles.projectImage}
                                />
                            </div>
                        )}
                        <button
                            className={styles.visitButton}
                            onClick={handleVisitClick}
                        >
                            {getDomain(link)} →
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
