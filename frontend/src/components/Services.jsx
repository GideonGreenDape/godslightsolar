import { services } from '../data/services.js';

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 py-20 dark:bg-brand-navy-900 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">Our Core Services</h2>
          <p className="section-subtitle">
            End-to-end technical solutions engineered for performance, safety, and peace of mind.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description, slug }, index) => (
            <a
              key={title}
              href={`/service/${slug}`}
              className="card group p-6 sm:p-8 block hover:border-brand-navy-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy-700 text-brand-yellow-400 transition-transform duration-200 group-hover:scale-110">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-navy-800 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                {description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

