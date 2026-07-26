import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Create a simple loader component
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-white dark:bg-brand-navy-900">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-yellow-400 border-t-transparent"></div>
  </div>
);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Lazy load components with artificial delay for loader visibility
const App = lazy(() => delay(800).then(() => import('./App.jsx')));
const BlogPost = lazy(() => delay(800).then(() => import('./components/BlogPost.jsx')));
const NewsDetail = lazy(() => delay(800).then(() => import('./components/NewsDetail.jsx')));
const ServicePage = lazy(() => delay(800).then(() => import('./components/ServicePage.jsx')));
const Pages = lazy(() => delay(800).then(() => import('./components/Pages.jsx')));
const AboutUs = lazy(() => import('./components/Pages.jsx').then(m => ({ default: m.AboutUs })));
const Careers = lazy(() => import('./components/Pages.jsx').then(m => ({ default: m.Careers })));
const Projects = lazy(() => import('./components/Pages.jsx').then(m => ({ default: m.Projects })));
const Photos = lazy(() => import('./components/Pages.jsx').then(m => ({ default: m.Photos })));
const Videos = lazy(() => import('./components/Pages.jsx').then(m => ({ default: m.Videos })));
const News = lazy(() => import('./components/Pages.jsx').then(m => ({ default: m.News })));
const ContactPage = lazy(() => import('./components/Pages.jsx').then(m => ({ default: m.ContactPage })));
const ChatPage = lazy(() => delay(800).then(() => import('./components/Pages.jsx').then(m => ({ default: m.ChatPage }))));
const EmpowermentPage = lazy(() => delay(800).then(() => import('./components/Pages.jsx').then(m => ({ default: m.EmpowermentPage }))));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/service/:slug" element={<ServicePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/empowerment" element={<EmpowermentPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

