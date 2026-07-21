import { ArrowRight, ShieldCheck, Zap, Gauge } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import HeroBackground from './HeroBackground.jsx';

const STATS = [
  { icon: Zap, label: 'Systems Installed', value: '500+' },
  { icon: ShieldCheck, label: 'Years of Trust', value: '10+' },
  { icon: Gauge, label: 'Avg. Response Time', value: '<24h' },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-brand-navy-800 via-brand-navy-700 to-brand-navy-900 text-white"
    >
      <HeroBackground />

      <div
        className="pointer-events-none absolute -right-24 -top-24 z-0 h-80 w-80 rounded-full bg-brand-yellow-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 z-0 h-72 w-72 rounded-full bg-brand-navy-400/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-yellow-300 ring-1 ring-white/20">
            Solar &bull; Automation &bull; Security &bull; Electrical
          </span>

          <h1 className="mt-6 animate-fade-up text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-4xl">
            Powering Homes. Securing Businesses. Connecting the Future.
          </h1>

          {/* <p className="mx-auto mt-3 max-w-2xl text-xs font-semibold uppercase tracking-wide text-brand-yellow-300 sm:text-sm">
            Godslight Solars & Technical Services
          </p> */}

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl">
            From solar power and battery backup to home automation, CCTV, and electrical wiring —
            we design and install technical systems that just work. Start with a free instant
            solar size estimate below.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#solar-sizer" className="btn-primary w-full sm:w-auto">
              Get My Free Solar Estimate
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#contact" className="btn-secondary w-full sm:w-auto">
              Talk to an Engineer
            </a>
          </div>

          <p className="mt-5 text-xs font-bold tracking-wide text-white">{siteConfig.rcNumber}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4 sm:gap-8">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl bg-white/5 px-2 py-5 text-center ring-1 ring-white/10 backdrop-blur"
            >
              <Icon className="h-6 w-6 text-brand-yellow-400 sm:h-7 sm:w-7" />
              <span className="mt-2 text-xl font-extrabold sm:text-2xl">{value}</span>
              <span className="mt-1 text-[11px] text-gray-300 sm:text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

