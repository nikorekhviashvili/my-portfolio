'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.module.css';

export default function Project({index, title, description, link, onHover, headingLevel = 'h2'}) {
    const Heading = headingLevel;
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    // Detect mobile device on component mount
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };
        
        // Initial check
        checkMobile();
        
        // Listen for window resize events
        window.addEventListener('resize', checkMobile);
        
        // Reset isActive state
        setIsActive(false);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClick = () => {
        // For mobile: double-tap behavior
        if (isMobile) {
            if (isActive) {
                window.location.href = link;
            } else {
                onHover(true, index);
                setIsActive(true);
            }
        } 
        // For desktop: single-click navigation
        else {
            window.location.href = link;
        }
    };

    const handleMouseEnter = () => {
        // Only trigger hover effect without affecting click behavior
        onHover(true, index);
    };

    const handleMouseLeave = () => {
        onHover(false, index);
        setIsActive(false);
    };
    
    return (
        <div 
           className={styles.project} 
           onMouseEnter={handleMouseEnter} 
           onMouseLeave={handleMouseLeave}
           onClick={handleClick}
        >
            <Heading className={styles.projectTitle}>{title}</Heading>
            <p>{description}</p>
        </div>
    )
}
