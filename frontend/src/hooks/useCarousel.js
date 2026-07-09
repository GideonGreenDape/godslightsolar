import { useEffect, useRef, useState } from 'react';

const AUTOPLAY_MS = 4500;
const RESUME_DELAY_MS = 4000;

// Self-driving horizontal carousel: autoplay + swipe/arrow/dot control, all
// scoped to the track's own horizontal scroll position (never the page's
// vertical scroll), and paused whenever the carousel is off-screen.
export function useCarousel(itemCount) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const sectionVisibleRef = useRef(false);

  const pauseAutoplay = () => {
    pausedRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  };

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    const item = itemRefs.current[index];
    if (!track || !item) return;
    const delta = item.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const goTo = (index) => {
    pauseAutoplay();
    scrollToIndex((index + itemCount) % itemCount);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current && sectionVisibleRef.current) {
        scrollToIndex((activeIndex + 1) % itemCount);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [activeIndex, itemCount]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { root: track, threshold: [0.6] }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [itemCount]);

  const pointerHandlers = {
    onMouseEnter: () => {
      pausedRef.current = true;
    },
    onMouseLeave: () => {
      pausedRef.current = false;
    },
    onTouchStart: () => {
      pausedRef.current = true;
    },
    onTouchEnd: pauseAutoplay,
  };

  return { activeIndex, sectionRef, trackRef, itemRefs, goTo, pointerHandlers };
}
