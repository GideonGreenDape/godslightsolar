import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { useCarousel } from '../hooks/useCarousel';

export default function Testimonials() {
  const { activeIndex, sectionRef, trackRef, itemRefs, goTo, pointerHandlers } = useCarousel(testimonials.length);

  return (
    <section id="testimonials" ref={sectionRef} className="bg-gray-50 py-20 dark:bg-brand-navy-900 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Trusted by homeowners and businesses looking for professional solar installation in Delta State and across Nigeria.</p>
        </div>

        <div className="relative mt-14" {...pointerHandlers}>
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                data-index={i}
                className="w-[85%] shrink-0 snap-start rounded-2xl bg-white p-8 shadow-sm dark:bg-brand-navy-800 sm:w-[45%] lg:w-[30%]"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-brand-yellow-400 text-brand-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-gray-600 dark:text-gray-300 italic">"{t.text}"</p>
                <div>
                  <p className="font-bold text-brand-navy-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50 sm:block"
          >
            <ChevronLeft className="h-6 w-6 text-brand-navy-800" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50 sm:block"
          >
            <ChevronRight className="h-6 w-6 text-brand-navy-800" />
          </button>
        </div>
      </div>
    </section>
  );
}

