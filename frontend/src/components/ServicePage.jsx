import { useParams, Link } from 'react-router-dom';
import { services } from '../data/services';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { faqs } from '../data/blog';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);
  const [openIndex, setOpenIndex] = useState(null);

  if (!service) return <div className="py-20 text-center">Service not found</div>;

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-900">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-brand-navy-800">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1509391366360-2addb561c287?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          <div className="relative mx-auto max-w-7xl px-4 text-center">
            <Icon className="mx-auto h-16 w-16 text-brand-yellow-400 mb-6" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">{service.title}</h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{service.description}</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-brand-navy-900 dark:text-white">Overview</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{service.longDescription}</p>
            
            <div className="mt-10 bg-brand-navy-50 p-8 rounded-2xl dark:bg-brand-navy-800">
                <h3 className="font-bold text-xl text-brand-navy-900 dark:text-white">
                  {service.slug === 'solar-installation' ? 'Ready to get started?' : 'Get an Estimate'}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {service.slug === 'solar-installation'
                    ? 'Use our instant solar sizing tool to see what you need, or contact us directly for a site assessment.'
                    : `We provide custom quotes for our ${service.title.toLowerCase()} services based on your specific property requirements. Contact us today for a free assessment.`}
                </p>
                <div className="mt-6 flex gap-4">
                    {service.slug === 'solar-installation' && <Link to="/#solar-sizer" className="btn-primary">Try Sizer Tool</Link>}
                    <Link to="/#contact" className="btn-primary">Request a Quote</Link>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-brand-navy-900/50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-brand-navy-900 dark:text-white mb-10">Common Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-white dark:border-brand-navy-700 dark:bg-brand-navy-800">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-brand-navy-900 dark:text-white">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

