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
                        ▼
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
                            Visit →
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
