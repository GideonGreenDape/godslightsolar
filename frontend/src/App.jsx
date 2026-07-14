import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import SolarSizer from './components/SolarSizer/SolarSizer.jsx';
import Portfolio from './components/Portfolio.jsx';
import Testimonials from './components/Testimonials.jsx';
import Resources from './components/Resources.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-900">
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
      <WhatsAppButton />
    </div>
  );
}

