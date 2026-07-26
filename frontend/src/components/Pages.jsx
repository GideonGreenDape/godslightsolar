import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Contact from './Contact';
import SalesBot from './SalesBot';
import { Shield, Target, Award, Users, Briefcase, Zap, Heart, Star, Calendar, ArrowRight, MapPin, Send, CheckCircle2, ShieldCheck, Gauge, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { newsData } from '../data/blog.jsx';
import { siteConfig } from '../data/siteConfig.js';
import HeroBackground from './HeroBackground.jsx';
import certImg from '../asset/businessCertificate/caccertifcate.jpg';
import { API_BASE } from '../utils/api.js';

export function AboutUs() {
  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-900">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-brand-navy-900 py-20 text-white text-center">
          <h1 className="text-4xl font-extrabold">About Godslight Solars</h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto px-4 text-lg">
            Leading the renewable energy transition in Nigeria through innovation, quality, and technical excellence.
          </p>
        </section>

        {/* Story Section */}
        <section className="py-20 max-w-5xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-navy-900 dark:text-white">Our Mission</h2>
              <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                At Godslight Innovations Technology & Solar Energy, our mission is to provide reliable, sustainable, and affordable energy solutions to homes and businesses across Nigeria. We combine cutting-edge technology with professional engineering to bridge the energy gap and secure properties with advanced security systems.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Headquartered in Delta State, we have established ourselves as a trusted name in solar installation, electrical wiring, and technical services, driven by a commitment to quality and customer satisfaction.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-navy-50 dark:bg-brand-navy-800 p-6 rounded-2xl text-center">
                <Shield className="h-10 w-10 text-brand-yellow-400 mx-auto mb-4" />
                <h3 className="font-bold text-brand-navy-900 dark:text-white text-sm">Reliability</h3>
              </div>
              <div className="bg-brand-navy-50 dark:bg-brand-navy-800 p-6 rounded-2xl text-center">
                <Target className="h-10 w-10 text-brand-yellow-400 mx-auto mb-4" />
                <h3 className="font-bold text-brand-navy-900 dark:text-white text-sm">Innovation</h3>
              </div>
              <div className="bg-brand-navy-50 dark:bg-brand-navy-800 p-6 rounded-2xl text-center">
                <Award className="h-10 w-10 text-brand-yellow-400 mx-auto mb-4" />
                <h3 className="font-bold text-brand-navy-900 dark:text-white text-sm">Quality</h3>
              </div>
              <div className="bg-brand-navy-50 dark:bg-brand-navy-800 p-6 rounded-2xl text-center">
                <Users className="h-10 w-10 text-brand-yellow-400 mx-auto mb-4" />
                <h3 className="font-bold text-brand-navy-900 dark:text-white text-sm">Customer Focus</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-gray-50 dark:bg-brand-navy-900/50 py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-navy-900 dark:text-white">Technical Excellence</h2>
            <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
              With over 10 years of experience in the technical services industry, we specialize in high-fidelity electrical wiring, smart home automation, and professional CCTV surveillance. Our engineering team is dedicated to delivering systems that stand the test of time.
            </p>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-navy-900 dark:text-white">Visit Us</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Find our headquarters in Delta State.</p>
          </div>
          <div className="card overflow-hidden">
            <iframe
              title="Business Location"
              width="100%"
              height="400"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function Careers() {
  const jobs = [
    { title: "Solar Installation Technician", type: "Full-time", location: "Delta State" },
    { title: "Technical Sales Representative", type: "Commission-based", location: "Remote/Nigeria" },
    { title: "Electrical Engineer", type: "Full-time", location: "Warri, Delta State" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-900">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-brand-navy-900 py-20 text-white text-center">
          <h1 className="text-4xl font-extrabold">Join Our Team</h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto px-4 text-lg">
            Build your career at the forefront of Nigeria's renewable energy revolution.
          </p>
        </section>

        {/* Culture Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy-900 dark:text-white">Why Work With Us?</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">We foster a culture of learning, safety, and technical excellence.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-50 dark:bg-brand-navy-800 rounded-2xl">
              <Zap className="h-8 w-8 text-brand-yellow-400 mb-4" />
              <h3 className="font-bold mb-2 dark:text-white text-sm">Professional Growth</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Regular training on the latest solar and automation technologies.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-brand-navy-800 rounded-2xl">
              <Heart className="h-8 w-8 text-brand-yellow-400 mb-4" />
              <h3 className="font-bold mb-2 dark:text-white text-sm">Inclusive Culture</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">A collaborative environment where every engineer's voice matters.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-brand-navy-800 rounded-2xl">
              <Star className="h-8 w-8 text-brand-yellow-400 mb-4" />
              <h3 className="font-bold mb-2 dark:text-white text-sm">Impactful Work</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Directly contribute to solving Nigeria's energy challenges.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-brand-navy-800 rounded-2xl">
              <Shield className="h-8 w-8 text-brand-yellow-400 mb-4" />
              <h3 className="font-bold mb-2 dark:text-white text-sm">Safety First</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Strict adherence to international safety standards for all field work.</p>
            </div>
          </div>
        </section>

        {/* Open Roles Section */}
        <section className="bg-gray-50 dark:bg-brand-navy-900/50 py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold center text-brand-navy-900 dark:text-white mb-12">Current Openings</h2>
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <div key={i} className="bg-white dark:bg-brand-navy-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy-900 dark:text-white">{job.title}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.type}</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <a href={`https://wa.me/2347064110671?text=Hi, I am interested in the ${job.title} position.`} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-6 text-sm">Apply Now</a>
                </div>
              ))}
            </div>
            <p className="mt-12 text-center text-gray-500 italic text-sm">
              Don't see a role for you? Send your CV to careers@godslightsolars.com for future consideration.
            </p>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-brand-navy-900 dark:text-white mb-8">Our Location</h2>
          <div className="card overflow-hidden">
            <iframe
              title="Business Location"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export function Projects() {
  const projectList = [
    { title: "10kVA Hybrid Solar System", location: "Abraka, Delta State", area: "Warri, Delta State" },
    { title: "Smart Office Automation", location: "Ughelli, Delta State", area: "Ughelli, Delta State" },
    { title: "Industrial Electrical Wiring", location: "Warri, Delta State", area: "Warri, Delta State" },
    { title: "32-Camera CCTV Network", location: "Sapele, Delta State", area: "Sapele, Delta State" },
    { title: "5kW Residential Solar Array", location: "Asaba, Delta State", area: "Asaba, Delta State" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-900">
      <Navbar />
      <main>
        <section className="bg-brand-navy-900 py-20 text-white text-center">
          <h1 className="text-4xl font-extrabold">Our Projects</h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto px-4">
            A showcase of our technical expertise and successful installations across Delta State.
          </p>
        </section>

        <section className="py-20 max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-xl font-bold mb-10 text-brand-navy-900 dark:text-white">Featured Last Projects</h2>
          <div className="space-y-6">
            {projectList.map((p, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-brand-navy-800 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4">
                <div>
                  <h3 className="font-bold text-base text-brand-navy-900 dark:text-white">{p.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200 dark:border-white/10 pt-4">
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Location</p>
                    <p className="text-xs dark:text-gray-400 mt-0.5">{p.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Area Coverage / Length</p>
                    <p className="text-xs dark:text-gray-400 mt-0.5">{p.area}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center text-brand-navy-900 dark:text-white mb-8">Visit Our Office</h2>
            <div className="card overflow-hidden">
              <iframe
                title="Business Location"
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export function Photos() { return <div className="py-20 text-center text-2xl">Photos</div>; }
export function News() {
  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-900">
      <Navbar />
      <main>
        {/* News Hero */}
        <section className="bg-brand-navy-900 py-20 text-white text-center">
          <h1 className="text-4xl font-extrabold">Latest News</h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto px-4 text-lg">
            Stay updated with Godslight Solars' projects, expansions, and technical innovations.
          </p>
        </section>

        {/* News List */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="group flex flex-col bg-white dark:bg-brand-navy-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      Read Full Story <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-brand-yellow-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <Calendar className="h-3 w-3" />
                    {item.subheader}
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy-900 dark:text-white mb-3 group-hover:text-brand-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-6 flex items-center text-brand-navy-900 dark:text-brand-yellow-400 font-bold text-xs uppercase tracking-widest">
                    Learn More &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-brand-navy-900 dark:text-white mb-8">Our Headquarters</h2>
            <div className="card overflow-hidden">
              <iframe
                title="Business Location"
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export function Videos() { return <div className="py-20 text-center text-2xl">Videos</div>; }

export function EmpowermentPage() {
  const [formData, setFormData] = useState({ whatToPower: [] });
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'whatToPower') {
      const updatedPower = checked
        ? [...(formData.whatToPower || []), value]
        : (formData.whatToPower || []).filter(item => item !== value);
      setFormData({ ...formData, whatToPower: updatedPower });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch(`${API_BASE}/api/empowerment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-navy-900 pb-20">
      <Navbar />
      <style>{`
        .input {
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          width: 100%;
          outline: none;
          transition: all 0.2s;
        }
        .input:focus {
          border-color: #f59e0b;
          box-shadow: 0 0 0 2px #f59e0b;
        }
        .dark .input {
          background-color: #1e293b;
          border-color: #374151;
          color: white;
        }
        @media (max-width: 640px) {
            .page-title { font-size: 1rem !important; }
            .content-text { font-size: 0.875rem !important; }
            .section-header { font-size: 1rem !important; }
        }
      `}</style>
      <main className="max-w-3xl mx-auto px-4 pt-10">
        <h1 className="page-title text-xl font-bold mb-8 text-brand-navy-900 dark:text-white">Solar Empowerment Program</h1>

        {status === 'success' ? (
          <div className="card p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="mt-2 text-gray-600">Your application has been received. We will contact you soon.</p>
            <button onClick={() => navigate('/')} className="mt-6 btn-primary">Return Home</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 mb-8 ">
            {/* Personal Info */}
            <section className="card p-6 space-y-4 content-text">
              <h2 className="section-header text-xl font-bold border-b pb-2">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input name="firstName" placeholder="First Name" onChange={handleInputChange} className="input" required />
                <input name="lastName" placeholder="Last Name" onChange={handleInputChange} className="input" required />
                <input name="middleName" placeholder="Middle Name" onChange={handleInputChange} className="input" />
                <select name="gender" onChange={handleInputChange} className="input">
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input name="phone" type="tel" placeholder="Phone" onChange={handleInputChange} className="input" required />
                <input name="email" type="email" placeholder="Email" onChange={handleInputChange} className="input" required />
              </div>
            </section>

            {/* Business Info */}
            <section className="card p-6 space-y-4 content-text">
              <h2 className="section-header text-xl font-bold border-b pb-2">Business Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input name="businessName" placeholder="Business Name" onChange={handleInputChange} className="input" />
                <input name="businessCategory" placeholder="Business Category" onChange={handleInputChange} className="input" />
                <input name="businessType" placeholder="Business Type" onChange={handleInputChange} className="input" />
                <input name="lga" placeholder="Local Govt Area" onChange={handleInputChange} className="input" />
                <input name="state" placeholder="State" onChange={handleInputChange} className="input" />
                <input name="subCategory" placeholder="Others/Sub Category" onChange={handleInputChange} className="input" />
              </div>
            </section>

            {/* Energy Usage */}
            <section className="card p-6 space-y-4 content-text">
              <h2 className="section-header text-xl font-bold border-b pb-2">Energy Usage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium">Do you use a generator?</label>
                    <select name="useGenerator" onChange={handleInputChange} className="input">
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                </select>
              </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Generator Type</label>
                    <select name="genType" onChange={handleInputChange} className="input">
                        <option value="">Select...</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="inverter">Inverter Generator</option>
                        <option value="none">None</option>
                    </select>
    </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Generator Size (kVA)</label>
                    <select name="genSize" onChange={handleInputChange} className="input">
                        <option value="">Select...</option>
                        <option value="<1">Less than 1kVA</option>
                        <option value="1">1kVA</option>
                        <option value="2-3">2-3kVA</option>
                        <option value="5">5kVA</option>
                        <option value=">5">Above 5kVA</option>
                    </select>
    </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Daily Hours of Usage</label>
                    <select name="hoursUsage" onChange={handleInputChange} className="input">
                        <option value="">Select...</option>
                        <option value="1-4">1-4 hours</option>
                        <option value="5-8">5-8 hours</option>
                        <option value="9-12">9-12 hours</option>
                        <option value="12+">12+ hours</option>
                    </select>
    </div>

                <div className="col-span-full space-y-1">
                    <label className="text-sm font-medium">Average Daily Fuel Cost (₦)</label>
                    <select name="dailyFuelCost" onChange={handleInputChange} className="input">
                        <option value="">Select...</option>
                        <option value="<1000">Below 1,000</option>
                        <option value="1000-3000">1,000 - 3,000</option>
                        <option value="3000-5000">3,000 - 5,000</option>
                        <option value="5000+">Above 5,000</option>
                    </select>
                </div>

                <div className="col-span-full space-y-1">
                    <label className="text-sm font-medium">What will you power with the solar?</label>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {['Lights', 'Fans', 'TV', 'Fridge/Freezer', 'Computer', 'Industrial Machinery'].map(item => (
                            <label key={item} className="flex items-center gap-2">
                                <input type="checkbox" name="whatToPower" value={item} onChange={handleInputChange} /> {item}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="col-span-full space-y-1">
                    <label className="text-sm font-medium">Do you currently experience power outage?</label>
                    <select name="powerOutage" onChange={handleInputChange} className="input">
                        <option value="">Select...</option>
                        <option value="frequent">Yes, Frequent</option>
                        <option value="rare">Rarely</option>
                        <option value="no">No</option>
                    </select>
                </div>
              </div>
            </section>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1" />
              I confirm that the information provided is accurate. I agree to be contacted regarding this solar empowerment program.
            </label>

            <button type="submit" disabled={status === 'loading'} className="mb-6 w-full btn-primary py-3">
              {status === 'loading' ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}

export function ChatPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-900">
      <Navbar />
      <main className="py-12">
        <SalesBot isOverlay={false} />
      </main>
      <Footer />
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-brand-navy-900">
      <Navbar />
      <main className="py-12">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

