import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Users, DollarSign, Globe2, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface MonetizationPageProps {
  navigate: (path: string) => void;
}

export const MonetizationPage: React.FC<MonetizationPageProps> = ({ navigate }) => {
  return (
    <div className="pt-24 pb-20 bg-white text-[#111111]">
      {/* Header Banner */}
      <div className="bg-[#071A3D] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
            Skill Monetization &amp; Career Acceleration
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Turn Your Digital Skills Into Opportunity
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Learning is only the beginning. Discover the actionable pathways, platforms, and client
            strategies to transform practical knowledge into dependable digital income.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* The 6-Step Monetization Pipeline */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
            The Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D]">
            From Zero to Paid: The 6-Step Engine
          </h2>
          <p className="text-slate-600 text-base">
            We reject the idea of getting rich overnight. Instead, we teach a systematic, ethical
            approach to professional relevance and income.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { step: '01', title: 'Learn', desc: 'Acquire practical technical execution.' },
            { step: '02', title: 'Practice', desc: 'Build real sample briefs and simulations.' },
            { step: '03', title: 'Build Proof', desc: 'Assemble a demonstrable case study.' },
            { step: '04', title: 'Position', desc: 'Optimize LinkedIn and portfolio presence.' },
            { step: '05', title: 'Opportunities', desc: 'Leverage inbound & outbound outreach.' },
            { step: '06', title: 'Monetize', desc: 'Close paid contracts and monthly retainers.' },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[#F7F9FC] border border-slate-200 rounded-2xl p-5 text-center flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[#0757D5]">{item.step}</span>
                <h3 className="text-base font-bold text-[#071A3D] mt-1 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 6 Income Streams & Vehicles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Freelance Platforms',
              desc: 'Master the mechanics of Upwork and Fiverr: bidding algorithms, client vetting, proposal writing, and rising-talent badges.',
              icon: '💼',
            },
            {
              title: 'Remote Global Roles',
              desc: 'Prepare for full-time and part-time remote contract roles with international startups paying in global currencies.',
              icon: '🌍',
            },
            {
              title: 'Digital Products',
              desc: 'Turn your domain knowledge into digital design templates, Notion dashboards, swipe files, and guides that sell continuously.',
              icon: '📦',
            },
            {
              title: 'Personal Branding',
              desc: 'Attract high-intent clients through structured thought leadership on LinkedIn, Twitter/X, and industry newsletters.',
              icon: '🎙️',
            },
            {
              title: 'Direct Client Retainers',
              desc: 'Package your skills as ongoing monthly growth retainers for local Nigerian businesses and SMEs that need consistent support.',
              icon: '🤝',
            },
            {
              title: 'The Skills Den Community',
              desc: 'Access exclusive job leads, direct client referrals from peers, accountability check-ins, and live Q&A workshops.',
              icon: '🔥',
            },
          ].map((vehicle, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{vehicle.icon}</div>
              <h3 className="text-lg font-bold text-[#071A3D] mb-2">{vehicle.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{vehicle.desc}</p>
            </div>
          ))}
        </div>

        {/* The Skills Den Focus Box */}
        <div className="bg-[#071A3D] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
              Exclusive Member Ecosystem
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              What is the Skills Den?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The Skills Den is Skill2Scale&apos;s private community where learners transition into
              active earners. Members share verified remote job openings, freelance platform
              updates, proposal tear-downs, and client pitch templates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Weekly live strategy and proposal critique sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Verified job drops from vetted partners and agencies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Strict peer accountability check-ins</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mentorship from experienced freelancers</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-xs active:scale-95 cursor-pointer"
              >
                <span>Start Learning &amp; Get Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
