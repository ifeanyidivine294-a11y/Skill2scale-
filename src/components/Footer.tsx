import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071A3D] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpeg"
                alt="Skill2Scale Logo"
                className="h-10 w-auto object-contain rounded bg-white p-0.5"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base tracking-tight leading-none">
                  SKILL2SCALE
                </span>
                <span className="text-[10px] font-semibold text-blue-400 tracking-widest uppercase">
                  DIGITAL
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Skill2Scale Digital is a forward-thinking digital education and empowerment platform. We equip young Africans with in-demand, market-ready digital skills, hands-on internship experience, and actionable pathways to monetize knowledge in the global digital economy.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-blue-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official & Verified African Digital Skills Platform</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Our Services', path: '/services' },
                { label: 'Training Courses', path: '/courses' },
                { label: 'Internship Program', path: '/internship' },
                { label: 'Skill Monetization', path: '/monetization' },
                { label: 'Student Testimonials', path: '/testimonials' },
                { label: 'Frequently Asked Questions', path: '/faq' },
                { label: 'Contact Us', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => handleNav(item.path)}
                    className="hover:text-white transition-colors cursor-pointer text-left inline-flex items-center gap-1 group text-slate-300"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">›</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Programs */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                'Graphics Design',
                'Content Writing',
                'Digital Marketing',
                'Website Design',
                'Virtual Assistance',
                'Video Editing',
                'UI/UX Design',
                'AI & Automation',
              ].map((prog) => (
                <li key={prog}>
                  <button
                    onClick={() => handleNav(`/register?course=${encodeURIComponent(prog)}`)}
                    className="hover:text-blue-400 transition-colors cursor-pointer text-left text-slate-300 inline-flex items-center justify-between w-full pr-4"
                  >
                    <span>{prog}</span>
                    <span className="text-xs text-slate-400">
                      {prog === 'AI & Automation' ? '₦26,000' : '₦5,000'}
                    </span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => handleNav('/courses')}
                  className="text-xs font-semibold text-[#0757D5] hover:text-blue-300 inline-flex items-center gap-1 underline underline-offset-4 cursor-pointer"
                >
                  <span>View All 17 Courses</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <span>Bethel Estate, Lokogoma, Abuja, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+2348130028042" className="hover:text-white transition-colors">
                  +234 813 002 8042
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:skill2scale.school@gmail.com" className="hover:text-white transition-colors break-all">
                  skill2scale.school@gmail.com
                </a>
              </li>
              <li className="pt-3 border-t border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Registration & Payment WhatsApp:</div>
                <a
                  href="https://wa.me/2349069710687"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-700/80 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>+234 906 971 0687</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Skill2Scale Digital. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('/faq')} className="hover:text-slate-200">
              FAQs
            </button>
            <button onClick={() => handleNav('/contact')} className="hover:text-slate-200">
              Support Desk
            </button>
            <button
              onClick={() => handleNav('/admin')}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
