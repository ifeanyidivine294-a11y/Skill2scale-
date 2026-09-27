import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { LiveActivityNotification } from './components/LiveActivityNotification';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { CoursesPage } from './pages/CoursesPage';
import { InternshipPage } from './pages/InternshipPage';
import { MonetizationPage } from './pages/MonetizationPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { RegisterPage } from './pages/RegisterPage';
import { FAQPage } from './pages/FAQPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [initialCourseParam, setInitialCourseParam] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('course') || '';
  });

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      const params = new URLSearchParams(window.location.search);
      setInitialCourseParam(params.get('course') || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Client-side navigate function
  const navigate = (pathWithQuery: string) => {
    const [path, query] = pathWithQuery.split('?');
    if (query) {
      const params = new URLSearchParams(query);
      const course = params.get('course');
      if (course) setInitialCourseParam(course);
    } else {
      if (path !== '/register' && path !== '/apply') {
        setInitialCourseParam('');
      }
    }

    window.history.pushState({}, '', pathWithQuery);
    setCurrentPath(path);
  };

  // Route resolution
  const renderCurrentPage = () => {
    const normalized = currentPath.toLowerCase();

    if (normalized === '/about') {
      return <AboutPage navigate={navigate} />;
    }
    if (normalized === '/services') {
      return <ServicesPage navigate={navigate} />;
    }
    if (normalized === '/courses' || normalized === '/programs') {
      return <CoursesPage navigate={navigate} />;
    }
    if (normalized === '/internship') {
      return <InternshipPage navigate={navigate} />;
    }
    if (normalized === '/monetization') {
      return <MonetizationPage navigate={navigate} />;
    }
    if (normalized === '/testimonials') {
      return <TestimonialsPage navigate={navigate} />;
    }
    if (normalized === '/contact') {
      return <ContactPage navigate={navigate} />;
    }
    if (normalized === '/register' || normalized === '/apply') {
      return <RegisterPage initialCourse={initialCourseParam} navigate={navigate} />;
    }
    if (normalized === '/faq') {
      return <FAQPage navigate={navigate} />;
    }
    if (normalized === '/admin') {
      return <AdminPage navigate={navigate} />;
    }

    // Default to Home
    return <HomePage navigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] antialiased">
      {/* Top Navbar */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Page View */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer navigate={navigate} />

      {/* Persistent Floating WhatsApp Desk */}
      <WhatsAppFloating />

      {/* Tasteful Live Activity Toast (Demonstration & Verified Registrations) */}
      <LiveActivityNotification />
    </div>
  );
}
