import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import BlogPost from './components/BlogPost.jsx';
import ServicePage from './components/ServicePage.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/service/:slug" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
   