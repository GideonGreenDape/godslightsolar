import { useParams, Link } from 'react-router-dom';
import { newsData } from '../data/blog.jsx';
import Navbar from './Navbar';
import Footer from './Footer';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';

export default function NewsDetail() {
  const { slug } = useParams();
  const news = newsData.find(n => n.slug === slug);

  if (!news) {
    return (
      <div className="min-h-screen bg-white dark:bg-brand-navy-900">
        <Navbar />
        <div className="py-40 text-center">
          <h1 className="text-2xl font-bold dark:text-white">News article not found</h1>
          <Link to="/news" className="mt-4 text-brand-yellow-400 inline-block hover:underline">Return to news</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-900">
      <Navbar />
      <main className="pt-10 pb-20">
        <article className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb / Back */}
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-yellow-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-brand-yellow-400 text-sm font-bold uppercase tracking-wider mb-4">
              <Calendar className="h-4 w-4" />
              {news.subheader}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy-900 dark:text-white leading-tight">
              {news.title}
            </h1>
          </div>

          {/* Featured Image */}
          <div className="relative h-[300px] sm:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <img 
              src={news.image} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="prose prose-lg dark:prose-invert prose-yellow max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                {news.content}
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold dark:text-white">Share this article:</span>
                    <button className="p-2 rounded-full bg-gray-50 dark:bg-brand-navy-800 hover:text-brand-yellow-400 transition-colors">
                        <Share2 className="h-4 w-4" />
                    </button>
                </div>
              </div>
            </div>

            {/* Sidebar (Optional) */}
            <aside className="lg:col-span-4 space-y-8">
                <div className="p-8 bg-brand-navy-900 rounded-3xl text-white">
                    <h3 className="text-xl font-bold mb-4">Need a similar solution?</h3>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        Our engineering team is ready to help you implement the same technology in your home or business.
                    </p>
                    <Link to="/#contact" className="btn-primary w-full text-sm">
                        Contact Us Today
                    </Link>
                </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
