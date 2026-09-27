import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

interface TestimonialsPageProps {
  navigate: (path: string) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ navigate }) => {
  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC] min-h-screen text-[#111111]">
      {/* Header Banner */}
      <div className="bg-[#071A3D] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
            Real Student Impact
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            See What Students Have to Say About Our Digital Training
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Unfiltered feedback from learners across Nigeria and Africa who have taken their first
            steps toward digital freedom with Skill2Scale.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Supplied Testimonial Image Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 flex flex-col items-center justify-center">
          <div className="w-full flex justify-center">
            <img
              src="/images/testimonial.png"
              alt="Verified Student Testimonials for Skill2Scale Digital Training"
              className="max-w-full h-auto rounded-2xl object-contain max-h-[850px] shadow-xs"
            />
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between w-full text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified WhatsApp &amp; Community Feedback</span>
            </div>
            <span>35,000+ Students Impacted</span>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-white rounded-3xl p-8 sm:p-10 text-center border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-2xl font-extrabold text-[#071A3D]">Ready to Write Your Own Success Story?</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Join the next training cohort today. Courses start at only ₦5,000.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-xs active:scale-95 cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
