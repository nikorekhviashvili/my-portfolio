'use client';

import { useEffect, useRef } from 'react';

// Renders post HTML and lazy-plays inline videos only while they are on screen,
// so a post with several clips doesn't download them all up front.
export default function PostContent({ html, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const videos = ref.current?.querySelectorAll('video');
    if (!videos?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.play().catch(() => {});
          } else {
            target.pause();
          }
        });
      },
      { rootMargin: '200px 0px' }
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [html]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
