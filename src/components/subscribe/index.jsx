'use client';

import { useState } from 'react';
import styles from './style.module.css';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(
        'https://buttondown.email/api/emails/embed-subscribe/rekhviashvili',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ email }),
        }
      );

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.container}>
        <p className={styles.success}>Thanks for subscribing! Check your email to confirm.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Subscribe</h3>
      <p className={styles.description}>Get notified when I publish something new.</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className={styles.input}
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
