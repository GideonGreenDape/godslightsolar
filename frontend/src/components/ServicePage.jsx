import { useParams, Link } from 'react-router-dom';
import { services } from '../data/services';
import Navbar from './Navbar';
import Footer from './Footer';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SalesBot from './SalesBot.jsx';

export default function ServicePage() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);
  const [openIndex, setOpenIndex] = useState(null);

  if (!service) return <div className="py-20 text-center">Service not found</div>;

  const Icon = service.icon;

  // Service-specific FAQ content
  const serviceFaqs = {
    'solar-installation': [
      { question: "How long does solar installation take?", answer: "A typical residential solar installation in Delta State takes 1-3 days depending on the system size." },
      { question: "Is your solar equipment warrantied?", answer: "Yes, our solar panels and inverters come with manufacturer warranties ranging from 5 to 25 years." }
    ],
    'home-automation': [
      { question: "Can I control my home from anywhere?", answer: "Yes, our smart systems allow you to monitor and control lighting, gates, and appliances via your smartphone from anywhere." },
      { question: "Does automation work during a power outage?", answer: "Our smart systems can be integrated with your backup power source to remain functional during outages." }
    ],
    'electric-fencing': [
      { question: "Is the fence safe for pets and children?", answer: "Yes, our energizers are professionally calibrated to be a deterrent while adhering to safety standards." },
      { question: "Does it alert me if someone tampers with it?", answer: "Absolutely, our systems trigger an alarm immediately upon contact or if the circuit is tamped with." }
    ],
    'cctv-surveillance': [
      { question: "Can I view recordings remotely?", answer: "Yes, our HD camera systems support secure mobile and web access for live or recorded viewing." },
      { question: "Do you offer night vision cameras?", answer: "We exclusively install cameras with high-performance infrared or full-color night vision for 24/7 security." }
    ],
    'electrical-wiring': [
      { question: "Are your electricians certified?", answer: "Yes, our technical team consists of certified, experienced professionals dedicated to strict safety standards." },
      { question: "Do you handle industrial panel upgrades?", answer: "Yes, we specialize in distribution panel upgrades, rewiring, and maintenance for both industrial and residential clients." }
    ]
  };

  const currentFaqs = serviceFaqs[slug] || [];

  // Service-specific background images (curated for high relevance)
  const serviceImages = {
    'solar-installation': 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1600', // Panels on roof
    'home-automation': 'https://images.pexels.com/photos/5077063/pexels-photo-5077063.jpeg?auto=compress&cs=tinysrgb&w=1600', // Smart home interface
    'electric-fencing': 'https://images.pexels.com/photos/2039918/pexels-photo-2039918.jpeg?auto=compress&cs=tinysrgb&w=1600', // Perimeter security/fence
    'cctv-surveillance': 'https://images.pexels.com/photos/6612662/pexels-photo-6612662.jpeg?auto=compress&cs=tinysrgb&w=1600', // Professional CCTV camera
    'electrical-wiring': 'https://images.pexels.com/photos/7750734/pexels-photo-7750734.jpeg?auto=compress&cs=tinysrgb&w=1600' // Technical wiring/electrical panel
  };

  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-900">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-brand-navy-800">
          <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url(${serviceImages[slug]})` }}></div>
          <div className="absolute inset-0 bg-brand-navy-900/60"></div>
          <div className="relative mx-auto max-w-7xl px-4 text-center">
            <Icon className="mx-auto h-16 w-16 text-brand-yellow-400 mb-6" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">{service.title}</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">{service.description}</p>
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
                    <a
                      href={`https://wa.me/2347064110671?text=${encodeURIComponent(`Hi, I'm interested in your ${service.title} services. Could you please provide more information or a quote?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={service.slug === 'solar-installation' ? 'btn-secondary' : 'btn-primary'}
                    >
                      Request a Quote
                    </a>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        {currentFaqs.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-brand-navy-900/50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-brand-navy-900 dark:text-white mb-10">Common Questions</h2>
            <div className="space-y-4">
                {currentFaqs.map((faq, i) => (
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
        )}
      </main>

      <Footer />
      <SalesBot />
    </div>
  );
}

