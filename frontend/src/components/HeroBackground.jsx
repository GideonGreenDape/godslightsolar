import { useEffect, useState } from 'react';
import ins1 from '../asset/heroslider/ins1.jfif';
import ins2 from '../asset/heroslider/ins2.jfif';
import ins3 from '../asset/heroslider/ins3.jfif';
import ins4 from '../asset/heroslider/ins4.jfif';
import ins5 from '../asset/heroslider/ins5.jfif';
import ins6 from '../asset/heroslider/ins6.jfif';

const HERO_IMAGES = [
  'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=2000',
  'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=2000',
  ins1, ins2, ins3, ins4, ins5, ins6
];
const INITIAL_DELAY_MS = 1000; // Reduced initial delay to show images faster
const SLIDE_MS = 4000; // Faster rotation
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
          alt="Solar installation project"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
            started && i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* Darker overlay to ensure high contrast for white text */}
      <div className="absolute inset-0 bg-brand-navy-900/70" />
    </div>
  );
}

