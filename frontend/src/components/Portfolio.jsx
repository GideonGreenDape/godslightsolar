import { projects } from '../data/projects.js';

export default function Portfolio() {
  return (
    <section id="projects" className="bg-white py-20 dark:bg-brand-green-900/95 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">Recent Projects</h2>
          <p className="section-subtitle">A glimpse at the systems we&apos;ve designed and installed.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="card overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-44 w-full object-cover"
              />
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-yellow-500">
                  {project.category}
                </span>
                <h3 className="mt-2 text-base font-bold text-brand-green-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
