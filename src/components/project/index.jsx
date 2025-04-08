'use client';
import React from 'react'
import styles from './style.module.css';

export default function index({index, title, description, link, onHover, headingLevel = 'h2'}) {
    const Heading = headingLevel;
    
    return (
        <a href={link} className={styles.project} 
           onMouseEnter={() => onHover(true, index)} 
           onMouseLeave={() => onHover(false, index)}>
            <Heading className={styles.projectTitle}>{title}</Heading>
            <p>{description}</p>
        </a>
    )
}
