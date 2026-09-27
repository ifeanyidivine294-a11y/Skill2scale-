import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="WhatsApp Support Desk" className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Tooltip greeting */}
      {showTooltip && (
        <div className="mb-2 bg-white text-slate-800 p-3 rounded-xl shadow-xl border border-slate-100 max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-semibold text-slate-900 mb-0.5">Need help with registration?</div>
          <p className="text-slate-500 pr-3">
            Chat with the Skill2Scale admissions & payment desk on WhatsApp.
          </p>
        </div>
      )}

      {/* Main floating button */}
      <a
        href="https://wa.me/2349069710687"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat on WhatsApp (+234 906 971 0687)"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="text-xs sm:text-sm font-bold tracking-wide">
          WhatsApp Desk
        </span>
      </a>
    </aside>
  );
};
