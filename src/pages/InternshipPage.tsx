import React from 'react';
import { ArrowRight, CheckCircle2, Briefcase, Award, Users, Layers, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

interface InternshipPageProps {
  navigate: (path: string) => void;
}

export const InternshipPage: React.FC<InternshipPageProps> = ({ navigate }) => {
  return (
    <div className="pt-24 pb-20 bg-white text-[#111111]">
      {/* Header Banner */}
      <div className="bg-[#071A3D] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
            Skill2Scale Internship & Mastery
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Don&apos;t Stop at Learning. Build Experience.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between theory and earnings through hands-on project simulations,
            real-world corporate briefs, and verifiable portfolio deliverables.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Why Skill Mastery Matters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              The Reality of the Job Market
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] leading-tight">
              Employers and Clients Don&apos;t Hire Certificates. They Hire Proof.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Skill mastery happens through repeated practice, solving real problems and adapting to
              industry expectations. When a client or employer looks at your profile, they ask one
              question: <em>&ldquo;Can this person do the work?&rdquo;</em>
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              The Skill2Scale Internship is structured to give you that undeniable proof. We immerse
              you in live briefs, multi-disciplinary team projects, and real client communication so
              you graduate with a bulletproof portfolio.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-xs active:scale-95 cursor-pointer"
              >
                <span>Apply for Internship Track</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F7F9FC] border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-[#071A3D]">Key Pillars of Our Internship</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Guided Project Practice',
                  desc: 'Structured weekly milestones that push you beyond tutorials into self-directed execution.',
                },
                {
                  title: 'Real-World Simulations',
                  desc: 'Experience deadline pressure, sprint standups, and revision requests just like in top agencies.',
                },
                {
                  title: 'Capstone Portfolio Projects',
                  desc: 'Complete an end-to-end case study that showcases your research, methodology, and tangible results.',
                },
                {
                  title: 'Senior Expert Support',
                  desc: 'Get feedback from lead designers, marketing directors, and web engineers who audit your deliverables.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0757D5] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#071A3D]">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-World Collaborations */}
        <div className="bg-[#071A3D] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
              Not Just a Program. A Launchpad.
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Work with Startups, NGOs, and Tech Companies
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Skill2Scale interns are connected with partner startups, tech initiatives, and
              non-profits in need of vetted digital talent. Whether it is redesigning a web platform,
              running an ad campaign, or managing corporate communications, you gain real commercial
              references.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified client recommendations on LinkedIn</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Official Letter of Recommendation upon completion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Access to the private alumni hiring network</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Eligibility for paid junior retainers</span>
              </div>
            </div>
          </div>
        </div>

        {/* How to Join */}
        <div className="bg-[#F7F9FC] border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D]">
            How to Qualify for the Internship Track
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Enroll in any Skill2Scale digital training program. Complete the foundational coursework
            and project milestones, and you will be admitted into the Internship &amp; Skill Mastery
            cohort.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-xs active:scale-95 cursor-pointer"
            >
              <span>Enroll to Begin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-100 text-slate-700 px-7 py-3.5 rounded-xl text-base font-semibold"
            >
              <span>Explore Programs First</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
