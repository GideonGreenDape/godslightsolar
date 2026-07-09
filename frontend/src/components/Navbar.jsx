import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import logo from '../asset/GodslightLogo.jfif';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Solar Sizer', href: '#solar-sizer' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setIsOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-white/95 shadow-md backdrop-blur dark:bg-brand-navy-900/95'
          : 'bg-white dark:bg-brand-navy-900'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logo}
            alt={`${siteConfig.name} logo`}
            className="h-11 w-11 shrink-0 rounded-lg object-cover ring-2 ring-brand-yellow-400/40"
          />
          <span className="text-lg font-extrabold tracking-tight text-brand-navy-800 dark:text-white">
            {siteConfig.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-navy-600 dark:text-gray-200 dark:hover:text-brand-yellow-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-2 text-sm font-semibold text-brand-navy-700 dark:text-brand-yellow-400"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phoneDisplay}
          </a>
          <a href="#solar-sizer" className="btn-primary !px-5 !py-2.5 text-sm">
            Size My System
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-navy-800 md:hidden dark:text-white"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-gray-100 bg-white px-4 py-4 dark:border-white/10 dark:bg-brand-navy-900">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-brand-navy-50 dark:text-gray-100 dark:hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${siteConfig.phone}`}
            className="mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold text-brand-navy-700 dark:text-brand-yellow-400"
          >
            <Phone className="h-5 w-5" />
            {siteConfig.phoneDisplay}
          </a>
          <a href="#solar-sizer" onClick={handleNavClick} className="btn-primary mt-2 w-full">
            Size My System
          </a>
        </nav>
      </div>
    </header>
  );
}
