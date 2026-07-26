import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import SolarSizer from './components/SolarSizer/SolarSizer.jsx';
import Portfolio from './components/Portfolio.jsx';
import Testimonials from './components/Testimonials.jsx';
import Resources from './components/Resources.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import SalesBot from './components/SalesBot.jsx';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from './utils/api.js';

export default function App() {
  const [showPromo, setShowPromo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/ping`).catch(() => console.log('Backend ping failed - ignoring.'));
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-brand-navy-900">
      {/* Promo Overlay */}
      {showPromo && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-brand-navy-800">
            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-brand-navy-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 h-40 w-full overflow-hidden rounded-xl bg-gray-200">
                <img
                    src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Solar Panel"
                    className="h-full w-full object-cover"
                />
            </div>
            <h2 className="text-xl font-bold text-brand-navy-900 dark:text-white">Solar for Business & Productive Use</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Boost your productivity with reliable, clean energy solutions designed for your specific needs.</p>
            <button onClick={() => navigate('/empowerment')} className="mt-6 w-full rounded-lg bg-brand-yellow-400 py-2 font-bold text-brand-navy-900">Explore Solutions</button>
          </div>
        </div>
      )}

      <Navbar />
      <main>
        <Hero />
        <Services />
        <SolarSizer />
        <Portfolio />
        <Testimonials />
        <Resources />
        <Contact />
      </main>
      <Footer />
      <div className="relative z-[100]">
      <SalesBot />
    </div>
    </div>
  );
}

