import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC] min-h-screen text-[#111111]">
      {/* Header Banner */}
      <div className="bg-[#071A3D] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
            Official Contact Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact Skill2Scale Digital
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about our training tracks, corporate partnerships, or enrollment? Our team
            is here to assist you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-5 space-y-6">
            {/* General Corporate Office */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-[#071A3D] pb-3 border-b border-slate-100">
                General Office Information
              </h3>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-blue-50 text-[#0757D5] rounded-xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase">
                      Physical Campus / Headquarters
                    </span>
                    <strong className="text-slate-900 block text-base mt-0.5">
                      Bethel Estate, Lokogoma, Abuja, Nigeria
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-blue-50 text-[#0757D5] rounded-xl shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase">
                      General Enquiries Telephone
                    </span>
                    <a
                      href="tel:+2348130028042"
                      className="text-base font-bold text-[#071A3D] hover:text-[#0757D5] transition-colors"
                    >
                      +234 813 002 8042
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-blue-50 text-[#0757D5] rounded-xl shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block uppercase">
                      Official Support Email
                    </span>
                    <a
                      href="mailto:skill2scale.school@gmail.com"
                      className="text-base font-bold text-[#071A3D] hover:text-[#0757D5] transition-colors break-all"
                    >
                      skill2scale.school@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated WhatsApp Admissions Desk */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/10 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest block">
                    Immediate Support
                  </span>
                  <h3 className="text-lg font-bold text-white">Training &amp; Payment WhatsApp Desk</h3>
                </div>
              </div>

              <p className="text-xs text-emerald-100 leading-relaxed">
                For course selection advice, registration assistance, and payment screenshot
                verification, chat directly with our active WhatsApp desk.
              </p>

              <div className="pt-2">
                <a
                  href="https://wa.me/2349069710687"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp (+234 906 971 0687)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form (Right Column) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs">
            <h3 className="text-2xl font-extrabold text-[#071A3D] mb-2">Send Us a Direct Message</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-8">
              Fill in your details below and our academic counseling team will respond promptly.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-950">Message Successfully Sent!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you for reaching out to Skill2Scale Digital. We have received your inquiry
                  and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ fullName: '', email: '', subject: '', message: '' });
                  }}
                  className="text-xs font-bold text-emerald-700 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Samuel Adekunle"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. samuel@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Subject / Area of Interest
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Question regarding AI & Automation course schedule"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your question or message here..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
