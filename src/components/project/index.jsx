'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.module.css';

export default function index({index, title, description, link, onHover, headingLevel = 'h2'}) {
    const Heading = headingLevel;
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        if (isActive) {
            router.push(link);
        } else {
            onHover(true, index);
            setIsActive(true);
        }
    };

    const handleMouseLeave = () => {
        onHover(false, index);
        setIsActive(false);
    };
    
    return (
        <div 
           className={styles.project} 
           onMouseEnter={() => onHover(true, index)} 
           onMouseLeave={handleMouseLeave}
           onClick={handleClick}
        >
            <Heading className={styles.projectTitle}>{title}</Heading>
            <p>{description}</p>
        </div>
    )
}
