import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import { services } from '../data/services.js';
import logo from '../asset/GodslightLogo.jfif';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt={`${siteConfig.name} logo`}
                className="h-10 w-10 rounded-lg object-cover ring-2 ring-brand-yellow-400/40"
              />
              <span className="text-lg font-extrabold text-white">{siteConfig.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">{siteConfig.tagline}</p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Services</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#services" className="hover:text-brand-yellow-400">Services</a></li>
              <li><a href="#solar-sizer" className="hover:text-brand-yellow-400">Solar Sizer</a></li>
              <li><a href="#projects" className="hover:text-brand-yellow-400">Projects</a></li>
              <li><a href="#contact" className="hover:text-brand-yellow-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-yellow-400" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-brand-yellow-400">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-yellow-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-yellow-400">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow-400" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
