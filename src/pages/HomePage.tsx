import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
  Briefcase,
  Layers,
  GraduationCap,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  MessageSquare,
  BookOpen,
  Compass,
  Zap,
} from 'lucide-react';
import { COURSES_DATA, Course } from '../data/courses';
import { FAQ_DATA } from '../data/faq';
import { AnimatedCounter } from '../components/AnimatedCounter';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFaq, setActiveFaq] = useState<string | null>(FAQ_DATA[0].id);

  const categories = ['All', 'Design', 'Marketing', 'Writing', 'Tech & Web', 'Advanced'];

  const filteredCourses =
    selectedCategory === 'All'
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.category === selectedCategory);

  const handleApplyCourse = (courseName: string) => {
    navigate(`/register?course=${encodeURIComponent(courseName)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white text-[#111111] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 bg-[#071A3D] text-white overflow-hidden">
        {/* Supplied Hero Background Image with Optimized Contrast Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpeg"
            alt="Skill2Scale Digital Training Environment"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Deep Navy/Blue Overlays for Crisp Legibility */}
          <div className="absolute inset-0 bg-[#071A3D]/88 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A3D] via-[#071A3D]/90 to-[#0B2A5B]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              {/* Quiet unboxed kicker */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-300 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Empowering the Next Generation of African Talent</span>
              </div>

              {/* Exact Hero Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Build Digital Skills.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white">
                  Create Opportunities.
                </span>{' '}
                Scale Your Future.
              </h1>

              {/* Exact Hero Supporting Copy */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl leading-relaxed">
                Skill2Scale Digital helps Africans build practical, market-ready digital skills and
                turn knowledge into real opportunities through training, practice, internship and
                monetization support.
              </p>

              {/* Hero CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0757D5] hover:bg-[#064ab8] text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-blue-900/40 hover:shadow-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <span>Start Your Digital Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate('/courses')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-7 py-4 rounded-xl text-base font-semibold backdrop-blur-sm transition-all duration-200 cursor-pointer"
                >
                  <span>Explore Training Programs</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">₦5,000 Standard</div>
                    <div className="text-[11px] text-slate-300">Affordable fees</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Internship Track</div>
                    <div className="text-[11px] text-slate-300">Hands-on practice</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Certificates</div>
                    <div className="text-[11px] text-slate-300">Career verified</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Hero Floating Highlights Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <div className="text-xs uppercase tracking-wider text-blue-300 font-bold">
                    Skill2Scale Engine
                  </div>
                  <span className="text-[11px] bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full font-medium">
                    Enrolling Now
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-300">16 Foundational Tracks</div>
                      <div className="text-sm font-bold text-white">₦5,000 Each</div>
                    </div>
                    <button
                      onClick={() => navigate('/courses')}
                      className="text-xs text-blue-300 font-semibold hover:text-white"
                    >
                      View
                    </button>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 p-3 rounded-xl border border-blue-400/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-blue-200">AI & Automation Intensive</div>
                      <div className="text-sm font-bold text-white">₦26,000</div>
                    </div>
                    <button
                      onClick={() => handleApplyCourse('AI & Automation')}
                      className="text-xs bg-[#0757D5] hover:bg-blue-600 text-white px-3 py-1 rounded-md font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Optional payment during application. Direct WhatsApp support.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK VALUE PROPOSITION / INTRODUCTION */}
      <section className="py-16 bg-[#F7F9FC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              Introduction to Skill2Scale
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-[#071A3D] leading-snug">
              Africa&apos;s Launchpad for Real Digital Competence, Practical Mastery, and Independent Careers.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Skill2Scale Digital is a specialized digital education and empowerment platform built
              to solve youth unemployment across Africa. We eliminate the frustration of abstract
              theory by connecting high-demand digital training with immediate guided practice,
              internship simulations, and proven monetization systems.
            </p>
          </div>
        </div>
      </section>

      {/* 3. LEARN → PRACTICE → EARN PATHWAY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              Our Proven Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D]">
              The Learn → Practice → Earn Model
            </h2>
            <p className="text-slate-600 text-base">
              Learning alone does not pay bills. Our four-phase methodology ensures you transition
              from complete beginner to confident earner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Practical Learning',
                subtitle: 'Africa-Centered Curriculum',
                desc: 'Acquire step-by-step technical competence taught by seasoned industry practitioners who know how to produce real work.',
                icon: BookOpen,
              },
              {
                step: '02',
                title: 'Guided Practice',
                subtitle: 'Simulations & Capstones',
                desc: 'Complete live briefs, brand identity projects, mock ad campaigns, and codebases to build a verifiable client-ready portfolio.',
                icon: Layers,
              },
              {
                step: '03',
                title: 'Real-World Internship',
                subtitle: 'Startup & Platform Exposure',
                desc: 'Collaborate on live projects with startups, agencies, and tech teams to experience real deadline pressure and team dynamics.',
                icon: Briefcase,
              },
              {
                step: '04',
                title: 'Scale & Monetize',
                subtitle: 'Freelance & Remote Work',
                desc: 'Position your skills on Upwork, Fiverr, and social platforms, pitch high-ticket retainers, and access the Skills Den community.',
                icon: TrendingUp,
              },
            ].map((phase) => (
              <div
                key={phase.step}
                className="relative bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-[#0757D5]/30 group-hover:text-[#0757D5] transition-colors">
                      {phase.step}
                    </span>
                    <div className="p-3 bg-blue-50 text-[#0757D5] rounded-xl group-hover:bg-[#0757D5] group-hover:text-white transition-colors">
                      <phase.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#071A3D] mb-1">{phase.title}</h3>
                  <div className="text-xs font-semibold text-[#0757D5] mb-3">{phase.subtitle}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER LEADERSHIP (CEO SECTION) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              Founder Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] mt-1">
              What Our CEO Has to Say
            </h2>
          </div>

          <div className="bg-[#F7F9FC] border border-slate-200 rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-14 shadow-xs">
            {/* CEO Image */}
            <div className="shrink-0 w-52 sm:w-64 lg:w-72">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-slate-100">
                <img
                  src="/images/ceo.png"
                  alt="Chigozie Nkwo - Founder and CEO of Skill2Scale"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* CEO Exact Statement */}
            <div className="space-y-6 text-center lg:text-left flex-1">
              <div className="text-4xl sm:text-5xl text-[#0757D5] font-serif leading-none">“</div>
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold italic text-[#071A3D] leading-relaxed -mt-4">
                &ldquo;We’re not just teaching skills. We’re solving unemployment, increasing access,
                and giving Africans a shot at a better future.&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-slate-200">
                <div className="text-lg font-bold text-[#071A3D]">Chigozie Nkwo</div>
                <div className="text-sm font-semibold text-[#0757D5]">
                  CEO and Founder of Skill2Scale
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRAINING PROGRAMS */}
      <section id="courses-section" className="py-20 bg-[#F7F9FC] border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
                Industry-Ready Skills
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] mt-1">
                Featured Training Programs
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                Choose the digital skill you want to master. Transparent fees with standard courses at{' '}
                <strong className="text-[#071A3D]">₦5,000</strong> and our specialized intensive AI
                track at <strong className="text-[#0757D5]">₦26,000</strong>.
              </p>
            </div>

            {/* Category Filter Controls */}
            <div className="flex flex-wrap gap-1 p-1 bg-white border border-slate-200 rounded-xl self-start md:self-auto shadow-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0757D5] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#071A3D] hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isAI = course.id === 'ai-automation';
              return (
                <div
                  key={course.id}
                  className={`rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between ${
                    isAI
                      ? 'bg-gradient-to-br from-[#071A3D] via-[#0B2A5B] to-[#0757D5] text-white shadow-xl ring-2 ring-blue-400'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isAI ? 'text-blue-300' : 'text-[#0757D5]'
                        }`}
                      >
                        {course.category}
                      </span>
                      {course.badge && (
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            isAI ? 'bg-amber-400 text-slate-900' : 'bg-blue-50 text-[#0757D5]'
                          }`}
                        >
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isAI ? 'text-white' : 'text-[#071A3D]'
                      }`}
                    >
                      {course.name}
                    </h3>

                    <p
                      className={`text-sm mb-5 leading-relaxed ${
                        isAI ? 'text-slate-200' : 'text-slate-600'
                      }`}
                    >
                      {course.description}
                    </p>

                    <div
                      className={`pt-4 border-t text-xs space-y-1.5 mb-6 ${
                        isAI ? 'border-white/15 text-slate-300' : 'border-slate-100 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Skill Level:</span>
                        <span className="font-semibold">{course.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100/20 flex items-center justify-between">
                    <div>
                      <div
                        className={`text-[11px] uppercase ${
                          isAI ? 'text-slate-300' : 'text-slate-400'
                        }`}
                      >
                        Tuition Fee
                      </div>
                      <div
                        className={`text-2xl font-black ${
                          isAI ? 'text-white' : 'text-[#071A3D]'
                        }`}
                      >
                        {course.price}
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyCourse(course.name)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2 ${
                        isAI
                          ? 'bg-white text-[#071A3D] hover:bg-slate-100 active:scale-95'
                          : 'bg-[#0757D5] text-white hover:bg-[#064ab8] active:scale-95'
                      }`}
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0757D5] hover:text-[#064ab8] underline underline-offset-4 cursor-pointer"
            >
              <span>Explore Detailed Syllabuses for All 17 Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D]">
              Comprehensive Solutions for African Digital Growth
            </h2>
            <p className="text-slate-600 text-base">
              We guide students across every stage of their professional development—from initial
              technical training to corporate internship experience and global monetization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-[#F7F9FC] border border-slate-200 rounded-2xl p-8 flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 text-[#0757D5] rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#071A3D]">Digital Skills Training</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We empower learners with practical, industry-aligned digital capabilities. Our
                  trainings are built around modern tools and real-world workflows that directly
                  apply to freelancing, remote employment, and digital entrepreneurship.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0757D5]" />
                    <span>Project-based interactive curriculum</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0757D5]" />
                    <span>Expert tutor feedback and accountability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0757D5]" />
                    <span>Official certificate upon completion</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => navigate('/courses')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Explore Training</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-[#F7F9FC] border border-slate-200 rounded-2xl p-8 flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-indigo-100 text-[#071A3D] rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#071A3D]">Internship & Skill Mastery</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Learning only creates true value when applied under real conditions. Through
                  guided simulations, capstone projects, and real client briefs, we move graduates
                  from theoretical understanding into verified, battle-tested competence.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#071A3D]" />
                    <span>Live simulations with startups and NGOs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#071A3D]" />
                    <span>Capstone portfolio building for employers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#071A3D]" />
                    <span>Senior mentor guidance and code/design reviews</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => navigate('/internship')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#071A3D] hover:bg-[#0B2A5B] text-white py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Explore Internship</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-[#F7F9FC] border border-slate-200 rounded-2xl p-8 flex flex-col justify-between hover:border-blue-300 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#071A3D]">Skill Monetization</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We demystify the transition: Learn → Practice → Position → Monetize. Students
                  gain access to freelancing systems, international client acquisition strategies,
                  and our vibrant Skills Den opportunity-sharing network.
                </p>
                <ul className="text-xs text-slate-600 space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Upwork, Fiverr & LinkedIn client acquisition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>High-converting offer creation & pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Skills Den accountability and live sharing sessions</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button
                  onClick={() => navigate('/monetization')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Learn How to Monetize</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US (8-Card Grid) */}
      <section className="py-20 bg-[#F7F9FC] border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D]">
              Why Choose Skill2Scale?
            </h2>
            <p className="text-slate-600 text-base">
              We have eliminated the barriers preventing young Africans from thriving in the modern
              digital economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Qualified & Experienced Tutors',
                desc: 'Learn directly from active practitioners with verified commercial experience in the global digital market.',
                icon: Users,
              },
              {
                title: 'Practical Training',
                desc: 'Focus on hands-on application rather than outdated theory alone. Build real deliverables each week.',
                icon: Layers,
              },
              {
                title: 'Pocket-Friendly Learning',
                desc: 'Fair pricing designed to remove financial obstacles and give every ambitious learner a realistic chance.',
                icon: Zap,
              },
              {
                title: 'Internship Opportunities',
                desc: 'Seamless progression from classroom lessons into verified project simulations, capstones, and partner work.',
                icon: Briefcase,
              },
              {
                title: 'Career & Opportunity Updates',
                desc: 'Continuous job drops, freelance briefs, and internship openings shared directly with enrolled members.',
                icon: TrendingUp,
              },
              {
                title: 'Official Certification',
                desc: 'Eligible students receive an official, credential-backed certificate of completion upon meeting requirements.',
                icon: Award,
              },
              {
                title: 'Mentorship & Community',
                desc: 'Never learn in isolation. Access peer groups, group accountability check-ins, and direct tutor support.',
                icon: Compass,
              },
              {
                title: 'Learn → Practice → Earn',
                desc: 'A cohesive ecosystem that purposefully connects technical acquisition with career positioning and income.',
                icon: Sparkles,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-start"
              >
                <div className="p-3 bg-blue-50 text-[#0757D5] rounded-xl w-fit mb-4">
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#071A3D] mb-2">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INTERNSHIP SECTION PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#071A3D] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
                Bridge the Gap Between Learning and Earning
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Don&apos;t Stop at Learning. Build Experience.
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Skill mastery happens through repeated practice, solving real problems, and adapting
                to industry expectations. The Skill2Scale Internship is a structured launchpad where
                you tackle capstones, collaborate in simulated agency workflows, and build an
                undeniable portfolio.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Guided project practice & live briefs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Comprehensive capstone evaluations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-world exposure with startups & NGOs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Senior mentor code & design reviews</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/internship')}
                  className="inline-flex items-center justify-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Explore Internship</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 8. STUDENT TESTIMONIAL IMAGE SECTION */}
      {/* Specifically displays ONLY the supplied image without extra written testimonials */}
      <section className="py-20 bg-[#F7F9FC] border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              Student Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A3D]">
              See What Students Have to Say About Our Digital Training
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 flex justify-center items-center">
            <img
              src="/images/testimonial.png"
              alt="Real Student Feedback and Testimonials for Skill2Scale Digital"
              className="max-w-full h-auto rounded-xl object-contain max-h-[750px] shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* INDUSTRY PARTNERS SECTION */}
      <section className="py-14 sm:py-20 bg-white border-t border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl sm:max-w-3xl flex justify-center items-center">
            <img
              src="/images/partners.jpg"
              alt="Skill2Scale Digital Industry Partners"
              className="w-full h-auto max-h-[850px] object-contain rounded-2xl shadow-xs border border-slate-100 transition-shadow duration-300 hover:shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-20 bg-[#071A3D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-14 space-y-3">
            <h2 className="text-xs font-bold text-blue-300 tracking-widest uppercase">
              OUR IMPACT SPEAKS FOR ITSELF
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Transforming Lives Across the African Continent
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-black text-blue-400 mb-2">
                <AnimatedCounter end={35000} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">Students Trained</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-black text-blue-400 mb-2">
                <AnimatedCounter end={12} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">
                African Countries Reached
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-black text-blue-400 mb-2">
                <AnimatedCounter end={8000} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">
                Jobs & Freelance Opportunities Secured
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-black text-blue-400 mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">Industry Partners</div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm col-span-2 lg:col-span-1">
              <div className="text-3xl sm:text-4xl font-black text-blue-400 mb-2">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">
                Student Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-[#F7F9FC] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-bold text-[#0757D5] tracking-widest uppercase">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D]">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Everything you need to know about registration, course fees, payment, and certificates.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-[#071A3D] text-base hover:text-[#0757D5] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0757D5]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center space-y-3">
            <h4 className="text-base font-bold text-[#071A3D]">Have a question not listed here?</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Reach out directly to our admissions team on WhatsApp for immediate support.
            </p>
            <a
              href="https://wa.me/2349069710687"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Support on WhatsApp (+234 906 971 0687)</span>
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CONCLUSION MESSAGE */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="w-16 h-1 bg-[#0757D5] mx-auto rounded-full" />
          <blockquote className="text-xl sm:text-2xl lg:text-3xl text-slate-800 font-medium leading-relaxed">
            &ldquo;At Skill2Scale Digital, we don&apos;t just teach digital skills — we build
            futures, launch careers and create the next generation of African digital entrepreneurs.
            Every student that walks through our doors leaves with practical skills, real experience
            and the confidence to create opportunities in the digital economy.
            <br />
            <br />
            Join us today and become part of Africa&apos;s fastest growing digital skills
            community.&rdquo;
          </blockquote>

          <div className="pt-4">
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center justify-center gap-3 bg-[#0757D5] hover:bg-[#064ab8] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg shadow-blue-800/30 hover:shadow-xl transition-all cursor-pointer active:scale-95"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
