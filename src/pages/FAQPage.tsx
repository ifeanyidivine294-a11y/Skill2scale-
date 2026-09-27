import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faq';
import { Search, ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';

interface FAQPageProps {
  navigate: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const categories = ['All', 'General', 'Enrollment', 'Payment', 'Internship & Certification'];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC] min-h-screen text-[#111111]">
      {/* Header Banner */}
      <div className="bg-[#071A3D] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
            Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Find immediate answers regarding course fees, registration, optional payments,
            certificates, and internship eligibility.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search & Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 mb-10 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0757D5] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-[#071A3D] text-base hover:text-[#0757D5] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0757D5]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    <p className="pt-4">{faq.answer}</p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Category: {faq.category}</span>
                      <button
                        onClick={() => navigate('/register')}
                        className="text-[#0757D5] font-semibold hover:underline"
                      >
                        Apply for Course →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#071A3D]">Still need assistance?</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Our admissions counselors are on WhatsApp right now to walk you through registration and
            payment guidelines.
          </p>
          <a
            href="https://wa.me/2349069710687"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp (+234 906 971 0687)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
