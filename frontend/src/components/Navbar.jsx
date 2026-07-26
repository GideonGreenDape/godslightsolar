import { useEffect, useState } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import logo from '../asset/GodslightLogo.jfif';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Solar Sizer', href: '/#solar-sizer' },
  {
    label: 'Company',
    subLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Projects', href: '/projects' },
    ]
  },
  {
    label: 'Media',
    subLinks: [
      { label: 'Photos', href: '/photos' },
      { label: 'Videos', href: '/videos' },
    ]
  },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const isActive = (href) => location.pathname === href.replace('/#', '/');

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'bg-white/95 shadow-md backdrop-blur dark:bg-brand-navy-900/95'
            : 'bg-white dark:bg-brand-navy-900'
        }`}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3">
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
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            link.subLinks ? (
              <div key={link.label} className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand-navy-600 dark:text-gray-200">
                  {link.label} <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 w-40 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block dark:bg-brand-navy-800 border border-gray-100 dark:border-brand-navy-700">
                    {link.subLinks.map(sub => (
                        <Link key={sub.label} to={sub.href} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-brand-navy-700">{sub.label}</Link>
                    ))}
                </div>
              </div>
            ) : (
              <Link key={link.label} to={link.href} className={`text-sm font-medium transition-colors ${isActive(link.href) ? 'text-brand-navy-800 font-bold' : 'text-gray-600 dark:text-gray-200'}`}>{link.label}</Link>
            )
          ))}
        </nav>

          <button type="button" onClick={() => setIsOpen(true)} className="md:hidden p-2 text-brand-navy-800 dark:text-white">
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </header>

      {/* Slide-in Mobile menu */}
      <div className={`fixed inset-0 z-[60] bg-white dark:bg-brand-navy-900 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
            <div className="flex justify-between mb-10 items-center">
                <div className="flex items-center gap-3">
                    <img src={logo} className="h-10 w-10 rounded-lg object-cover" />
                    <span className="font-bold text-sm">{siteConfig.name}</span>
                </div>
                <button onClick={() => setIsOpen(false)}><X className="h-8 w-8" /></button>
            </div>
            <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                    link.subLinks ? (
                        <div key={link.label}>
                            <button 
                                onClick={() => setOpenSubmenu(openSubmenu === link.label ? null : link.label)} 
                                className={`text-xs font-normal flex justify-between w-full transition-colors ${openSubmenu === link.label ? 'text-orange-600' : 'dark:text-white'}`}
                            >
                                {link.label} <ChevronDown className={`h-4 w-4 transition-transform ${openSubmenu === link.label ? 'rotate-180 text-orange-600' : ''}`} />
                            </button>
                            {openSubmenu === link.label && (
                                <div className="pl-4 mt-3 flex flex-col gap-3">
                                    {link.subLinks.map(sub => <Link key={sub.label} to={sub.href} onClick={handleNavClick} className={`text-xs ${location.pathname === sub.href ? 'text-brand-navy-800 font-semibold' : 'text-gray-600'}`}>{sub.label}</Link>)}
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link key={link.label} to={link.href} onClick={handleNavClick} className={`text-xs font-normal ${isActive(link.href) ? 'text-brand-navy-800 font-semibold' : ''}`}>{link.label}</Link>
                    )
                ))}
            </nav>
        </div>
      </div>
    </>
  );
}

