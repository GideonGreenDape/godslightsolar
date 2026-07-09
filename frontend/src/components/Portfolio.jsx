import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import { useCarousel } from '../hooks/useCarousel.js';

export default function Portfolio() {
  const { activeIndex, sectionRef, trackRef, itemRefs, goTo, pointerHandlers } = useCarousel(projects.length);

  return (
    <section id="projects" ref={sectionRef} className="bg-white py-20 dark:bg-brand-navy-900/95 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">Recent Projects</h2>
          <p className="section-subtitle">A glimpse at the systems we&apos;ve designed and installed.</p>
        </div>

        <div className="relative mt-14" {...pointerHandlers}>
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, i) => (
              <div
                key={project.title}
                ref={(el) => (itemRefs.current[i] = el)}
                data-index={i}
                className="relative aspect-[4/3] w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl bg-brand-navy-800 sm:w-[58%] lg:w-[38%]"
              >
                <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white sm:text-base">
                  Work done in {project.location || 'this location'}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous project"
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2.5 text-brand-navy-800 shadow-lg transition-colors hover:bg-white sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next project"
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2.5 text-brand-navy-800 shadow-lg transition-colors hover:bg-white sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((project, i) => (
            <button
              key={project.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? 'w-6 bg-brand-yellow-400' : 'w-2 bg-gray-300 dark:bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
