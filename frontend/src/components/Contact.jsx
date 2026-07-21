import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';
import { submitContactForm } from '../utils/api.js';

const initialForm = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    // Package form data for WhatsApp
    const waText = `New Inquiry from ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Message: ${form.message}`;

    // Open WhatsApp with the populated inquiry
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(waText)}`, '_blank');

    try {
      await submitContactForm(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-20 dark:bg-brand-navy-900 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">Let&apos;s Build Something Reliable</h2>
          <p className="section-subtitle">
            Reach out for a free site assessment or send us your details and we&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <a
              href={`tel:${siteConfig.phone}`}
              className="card flex items-center gap-4 p-5 hover:border-brand-navy-300"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy-700 text-brand-yellow-400">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Call Us</p>
                <p className="text-lg font-bold text-brand-navy-800 dark:text-white">
                  {siteConfig.phoneDisplay}
                </p>
              </div>
            </a>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 p-5 hover:border-brand-navy-300"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">WhatsApp Chat</p>
                <p className="text-lg font-bold text-brand-navy-800 dark:text-white">Message Us Instantly</p>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="card flex items-center gap-4 p-5 hover:border-brand-navy-300"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy-700 text-brand-yellow-400">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Email</p>
                <p className="text-lg font-bold text-brand-navy-800 dark:text-white">{siteConfig.email}</p>
              </div>
            </a>

            <div className="card flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy-700 text-brand-yellow-400">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Address</p>
                <p className="text-base font-semibold text-brand-navy-800 dark:text-white">
                  {siteConfig.address}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-4 p-6 lg:col-span-3 sm:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-gray-600 dark:text-gray-200">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-navy-500 focus:outline-none focus:ring-2 focus:ring-brand-navy-200 dark:border-white/10 dark:bg-brand-navy-800/40 dark:text-white"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-semibold text-gray-600 dark:text-gray-200">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-navy-500 focus:outline-none focus:ring-2 focus:ring-brand-navy-200 dark:border-white/10 dark:bg-brand-navy-800/40 dark:text-white"
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold text-gray-600 dark:text-gray-200">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-navy-500 focus:outline-none focus:ring-2 focus:ring-brand-navy-200 dark:border-white/10 dark:bg-brand-navy-800/40 dark:text-white"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-semibold text-gray-600 dark:text-gray-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-navy-500 focus:outline-none focus:ring-2 focus:ring-brand-navy-200 dark:border-white/10 dark:bg-brand-navy-800/40 dark:text-white"
                placeholder="Tell us about your project..."
              />
            </div>

            {status === 'error' && <p className="text-sm font-medium text-brand-red-600">{error}</p>}
            {status === 'success' && (
              <p className="flex items-center gap-2 text-sm font-medium text-brand-navy-600">
                <CheckCircle2 className="h-4 w-4" /> Message sent! We&apos;ll be in touch shortly.
              </p>
            )}

            <button type="submit" disabled={status === 'loading'} className="btn-primary w-full sm:w-auto">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

