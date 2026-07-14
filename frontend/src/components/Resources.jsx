import { faqs, tips } from '../data/blog.jsx';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Resources() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white py-20 dark:bg-brand-navy-900/95 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* FAQ Section */}
          <div>
            <h2 className="section-title text-left">Frequently Asked Questions</h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-gray-200 dark:border-brand-navy-700">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-brand-navy-900 dark:text-white">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Solar Tips Section */}
          <div>
            <h2 className="section-title text-left">Solar Energy Tips</h2>
            <div className="mt-8 grid gap-6">
              {tips.map((tip, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 p-6 dark:border-brand-navy-700">
                  <h3 className="text-xl font-bold text-brand-navy-900 dark:text-white">{tip.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{tip.excerpt}</p>
                  <a href={`/blog/${tip.slug}`} className="mt-4 inline-block text-sm font-semibold text-brand-yellow-400 hover:underline">
                    Read more →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

