import React from 'react';
import { ArrowRight, CheckCircle2, Target, Eye, Compass, Heart, Users, Globe2, BookOpen } from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="pt-24 pb-20 bg-white text-[#111111]">
      {/* Header Banner */}
      <div className="bg-[#071A3D] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
            About Skill2Scale Digital
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Empowering Africa&apos;s Next Generation of Digital Leaders
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between raw African talent and global digital opportunities through
            accessible education, practical internships, and sustainable monetization.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] leading-tight">
              A Digital Skills Development Platform Built for Real-World Impact
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Skill2Scale is a digital education and empowerment platform that provides affordable,
              high-quality training in digital and tech skills to young Africans.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Beyond just training, Skill2Scale integrates internship opportunities, real-life
              practice, and monetization systems, ensuring that students not only learn, but also earn
              and grow professionally. We operate at the intersection of education, empowerment, and
              entrepreneurship.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-7 py-3 rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>Join Our Next Cohort</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F7F9FC] border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-[#071A3D]">Our 4 Pillars of Excellence</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Africa-Centered Curriculum',
                  desc: 'Curated specifically for the internet conditions, device constraints, and real market opportunities available to African learners.',
                },
                {
                  title: 'Learn-Practice-Earn Framework',
                  desc: 'We reject idle theory. Every concept is tested through client simulations, capstones, and monetization roadmaps.',
                },
                {
                  title: 'Active Community & Mentorship',
                  desc: 'Our learners never walk alone. Peer cohorts and seasoned tutors provide continuous support and accountability.',
                },
                {
                  title: 'Built for Measurable Outcomes',
                  desc: 'Zero fluff. We prioritize verifiable skills that yield freelance retainers, remote job offers, and self-reliance.',
                },
              ].map((pillar, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0757D5] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#071A3D]">{pillar.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-[#071A3D] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
              Our Story (The Journey)
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              &ldquo;What if African youth didn&apos;t need to leave the continent to thrive?&rdquo;
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Skill2Scale was born out of a simple question. We started as a small coaching initiative,
              helping a few passionate young people land freelance gigs and remote opportunities. Over
              time, we realized that talent was never the problem—access, structure, and support were.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              That is why we built Skill2Scale: to make high-demand digital skills accessible,
              practical, and life-changing. Today, we have trained over 35,000 learners across 12+
              African nations—and we are just getting started.
            </p>
          </div>
        </div>

        {/* Why We Exist */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              The Reality We Are Changing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D]">Why We Exist</h2>
            <p className="text-slate-600 text-base">
              The gap between traditional schooling and modern digital employment is widening.
              Skill2Scale provides the bridge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F7F9FC] border border-slate-200 rounded-2xl p-7">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-lg mb-4">
                !
              </div>
              <h3 className="text-lg font-bold text-[#071A3D] mb-2">The Youth Unemployment Crisis</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Millions of ambitious graduates and school leavers enter the African job market
                annually with degrees that do not translate into immediate income or relevant
                employment.
              </p>
            </div>

            <div className="bg-[#F7F9FC] border border-slate-200 rounded-2xl p-7">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-4">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-[#071A3D] mb-2">Unprecedented Global Demand</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Global companies, remote startups, and local businesses are desperately seeking
                designers, marketers, writers, web creators, and AI technicians. The demand exists;
                the bridge is missing.
              </p>
            </div>

            <div className="bg-[#F7F9FC] border border-slate-200 rounded-2xl p-7">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0757D5] flex items-center justify-center font-bold text-lg mb-4">
                ★
              </div>
              <h3 className="text-lg font-bold text-[#071A3D] mb-2">The Skill2Scale Solution</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We combine affordable ₦5,000 foundation courses, intensive AI tracks, hands-on
                internships, and monetization coaching so students build portfolios that command
                respect and earnings.
              </p>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-[#0757D5] rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#071A3D]">Our Vision</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To become Africa&apos;s leading digital skill accelerator—helping millions of Africans
              maximize their potential, contribute to global innovation, and build generational wealth
              for themselves and their communities.
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-indigo-50 text-[#071A3D] rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#071A3D]">Our Mission</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To democratize access to digital education by providing low-cost, high-value training,
              guided internship simulations, and continuous mentorship that empowers young Africans to
              transition seamlessly from learning to earning.
            </p>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-[#F7F9FC] border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D]">
            Ready to Begin Your Skill2Scale Journey?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Choose from 17 practical training programs starting from only ₦5,000.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-xs active:scale-95 cursor-pointer"
          >
            <span>Register for a Course</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
