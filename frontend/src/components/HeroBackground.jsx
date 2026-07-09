import { useEffect, useState } from 'react';
import ins1 from '../asset/heroslider/ins1.jfif';
import ins2 from '../asset/heroslider/ins2.jfif';
import ins3 from '../asset/heroslider/ins3.jfif';
import ins4 from '../asset/heroslider/ins4.jfif';
import ins5 from '../asset/heroslider/ins5.jfif';
import ins6 from '../asset/heroslider/ins6.jfif';

const HERO_IMAGES = [ins1, ins2, ins3, ins4, ins5, ins6];
const INITIAL_DELAY_MS = 4000; // show the plain brand gradient first
const SLIDE_MS = 5000;

// Rotates through installation photos as the hero's own background, layered
// under a navy scrim so the existing text stays legible over any photo. The
// gradient the hero already used is the base layer and shows through
// whenever no photo is active (initial delay + the transition crossfade).
export default function HeroBackground() {
  const [started, setStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), INITIAL_DELAY_MS);
    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (!started) return undefined;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_MS);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {HERO_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
            started && i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/55 via-brand-navy-900/35 to-brand-navy-900/65" />
    </div>
  );
}
