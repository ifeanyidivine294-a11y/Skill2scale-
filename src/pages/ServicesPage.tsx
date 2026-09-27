import React from 'react';
import { ArrowRight, CheckCircle2, GraduationCap, Briefcase, TrendingUp, Users, ShieldCheck, Zap } from 'lucide-react';

interface ServicesPageProps {
  navigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate }) => {
  return (
    <div className="pt-24 pb-20 bg-white text-[#111111]">
      {/* Header Banner */}
      <div className="bg-[#071A3D] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
            What We Do
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Core Services & Learning Tracks
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Delivering the complete pipeline from baseline skill acquisition to career-defining
            internships and dependable digital income streams.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Service 1: Digital Skills Training */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="w-12 h-12 bg-blue-100 text-[#0757D5] rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              Service 01
            </span>
            <h2 className="text-3xl font-extrabold text-[#071A3D]">Digital Skills Training</h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We help learners develop practical digital capabilities that can be applied to
              freelancing, employment, remote work and entrepreneurship. We design our courses to
              eliminate unnecessary theoretical jargon, emphasizing the actual software,
              frameworks, and execution strategies used by global agencies.
            </p>
            <div className="space-y-3 pt-2">
              {[
                'Design Tracks: Graphics Design, UI/UX Design, Video Editing',
                'Marketing Tracks: Digital Marketing, Social Media, Email & Ads',
                'Content Tracks: Copywriting, SEO Writing, Content Creation',
                'Advanced Tech: AI & Automation Intensive Workflow Engineering',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#0757D5] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>Browse All Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-3 rounded-xl text-sm font-semibold transition-colors"
              >
                <span>Enroll in Next Cohort</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F7F9FC] border border-slate-200 rounded-3xl p-8 space-y-4">
            <h3 className="text-lg font-bold text-[#071A3D]">Training Highlights</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-xl border border-slate-100">
                <strong className="text-slate-900 block mb-0.5">Flexible Schedules</strong>
                Recorded modules plus live weekend Q&amp;A sessions built for students and working professionals.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100">
                <strong className="text-slate-900 block mb-0.5">Continuous Tutor Feedback</strong>
                Submit weekly assignments and receive constructive feedback directly from mentors.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100">
                <strong className="text-slate-900 block mb-0.5">Affordable Pricing</strong>
                ₦5,000 for standard programs; ₦26,000 for AI &amp; Automation.
              </div>
            </div>
          </div>
        </div>

        {/* Service 2: Internship & Skill Mastery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-slate-200 pt-16">
          <div className="lg:col-span-5 order-2 lg:order-1 bg-[#F7F9FC] border border-slate-200 rounded-3xl p-8 space-y-4">
            <h3 className="text-lg font-bold text-[#071A3D]">The Mastery Pipeline</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-xl border border-slate-100">
                <strong className="text-slate-900 block mb-0.5">Phase 1: Project Simulation</strong>
                Execute simulated marketing campaigns, mock rebrands, and frontend web deployments.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100">
                <strong className="text-slate-900 block mb-0.5">Phase 2: Capstone Evaluation</strong>
                Deliver an end-to-end commercial project evaluated by senior digital directors.
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100">
                <strong className="text-slate-900 block mb-0.5">Phase 3: Partner Collaboration</strong>
                Opportunity to work with startups, NGOs, tech companies, and agency partners.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <div className="w-12 h-12 bg-indigo-100 text-[#071A3D] rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#071A3D] tracking-widest uppercase">
              Service 02
            </span>
            <h2 className="text-3xl font-extrabold text-[#071A3D]">Internship & Skill Mastery</h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Learning becomes valuable when it is applied. Our internship pathway bridges the gap
              between knowing what to do and having the commercial muscle to do it under pressure.
              Interns work with real scenarios, deadlines, and multi-disciplinary teams.
            </p>
            <div className="space-y-3 pt-2">
              {[
                'Guided practice with industry-standard briefs',
                'Simulations replicating top agency and remote team workflows',
                'Comprehensive capstone projects suitable for high-tier portfolios',
                'Direct reference letter and performance appraisal for job seekers',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#071A3D] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button
                onClick={() => navigate('/internship')}
                className="inline-flex items-center gap-2 bg-[#071A3D] hover:bg-[#0B2A5B] text-white px-7 py-3 rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>Learn More About Internships</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Service 3: Skill Monetization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-slate-200 pt-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
              Service 03
            </span>
            <h2 className="text-3xl font-extrabold text-[#071A3D]">Skill Monetization & Support</h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We teach the complete roadmap: Learn → Practice → Position → Monetize. We remove the
              fear and ambiguity surrounding landing paid client retainers, pricing international
              freelance jobs, creating digital assets, and joining the Skills Den network.
            </p>
            <div className="space-y-3 pt-2">
              {[
                'Upwork and Fiverr profile optimization and bid strategy',
                'High-converting inbound positioning on LinkedIn and Twitter',
                'Pricing frameworks for local Nigerian and international currency retainers',
                'The Skills Den: Exclusive opportunity-sharing and peer accountability sessions',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button
                onClick={() => navigate('/monetization')}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-3 rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>Explore Monetization Systems</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F7F9FC] border border-slate-200 rounded-3xl p-8 space-y-4">
            <h3 className="text-lg font-bold text-[#071A3D]">The Skills Den Community</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The Skills Den is our private community where learners and earners converge to share
              live job links, freelance platform algorithm updates, proposal feedback, and weekly
              accountability.
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <div className="text-xs font-bold text-emerald-950">Active Member Network</div>
              <p className="text-xs text-emerald-800">
                Over 8,000+ gigs and remote opportunities secured through our shared intelligence and
                community referral network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
