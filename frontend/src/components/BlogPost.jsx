import { useParams, Link } from 'react-router-dom';
import { tips } from '../data/blog.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const tip = tips.find(t => t.slug === slug);

  if (!tip) return <div className="py-20 text-center">Post not found</div>;

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Link to="/" className="text-brand-yellow-400 hover:underline mb-8 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-extrabold text-brand-navy-900 dark:text-white">{tip.title}</h1>
      <div className="mt-8 text-gray-600 dark:text-gray-300 leading-relaxed prose">
        {tip.content}
      </div>
    </div>
  );
}

