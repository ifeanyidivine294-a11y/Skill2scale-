import React, { useState, useEffect, useMemo } from 'react';
import { COURSES_DATA } from '../data/courses';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  User,
  MapPin,
  BookOpen,
  Copy,
  Check,
  Eye,
  ExternalLink,
} from 'lucide-react';
import {
  buildWhatsAppRegistrationMessage,
  buildWhatsAppUrl,
  WHATSAPP_PHONE_NUMBER,
} from '../utils/whatsapp';

interface RegisterPageProps {
  initialCourse?: string;
  navigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ initialCourse, navigate }) => {
  // Step state (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdRegistrationId, setCreatedRegistrationId] = useState<string>('');
  const [validationAlert, setValidationAlert] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    country: 'Nigeria',
    state: '',
    city: '',
    houseAddress: '',
    education: "Bachelor's Degree",
    referralSource: 'Facebook',
    selectedCourse: initialCourse || 'Digital Marketing',
    motivation: '',
    additionalSkillInput: '',
    additionalSkills: [] as string[],
    paymentMade: false,
    paymentReference: '',
  });

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync initialCourse prop if it changes
  useEffect(() => {
    if (initialCourse) {
      setFormData((prev) => ({ ...prev, selectedCourse: initialCourse }));
    }
  }, [initialCourse]);

  const isAI = formData.selectedCourse.toLowerCase().includes('ai & automation');
  const coursePrice = isAI ? '₦26,000' : '₦5,000';

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationAlert('');
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleAddSkill = () => {
    const trimmed = formData.additionalSkillInput.trim();
    if (trimmed && !formData.additionalSkills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        additionalSkills: [...prev.additionalSkills, trimmed],
        additionalSkillInput: '',
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalSkills: prev.additionalSkills.filter((s) => s !== skillToRemove),
    }));
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText('9069710687');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  // Build the complete WhatsApp message dynamically from live form state
  const generatedWhatsAppMessage = useMemo(() => {
    return buildWhatsAppRegistrationMessage({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      dob: formData.dob,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      houseAddress: formData.houseAddress,
      education: formData.education,
      selectedCourse: formData.selectedCourse,
      coursePrice: coursePrice,
      referralSource: formData.referralSource,
      motivation: formData.motivation,
      additionalSkills: formData.additionalSkills,
      paymentStatus: formData.paymentMade ? 'Paid' : 'Not Paid',
      paymentReference: formData.paymentReference,
    });
  }, [formData, coursePrice]);

  const whatsappUrl = useMemo(() => {
    return buildWhatsAppUrl(generatedWhatsAppMessage);
  }, [generatedWhatsAppMessage]);

  const copyFormattedMessage = () => {
    navigator.clipboard.writeText(generatedWhatsAppMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (formData.phone.trim().length < 8) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
    }

    if (step === 2) {
      if (!formData.country.trim()) newErrors.country = 'Country is required';
      if (!formData.state.trim()) newErrors.state = 'State / Region is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.houseAddress.trim()) newErrors.houseAddress = 'House address is required';
      if (!formData.education) newErrors.education = 'Educational qualification is required';
    }

    if (step === 3) {
      if (!formData.selectedCourse) newErrors.selectedCourse = 'Please select a course';
      if (!formData.referralSource) newErrors.referralSource = 'Please indicate where you heard about us';
      if (!formData.motivation.trim()) {
        newErrors.motivation = 'Please share your reasons for choosing this course';
      } else if (formData.motivation.trim().length < 15) {
        newErrors.motivation = 'Please write at least a full sentence explaining your motivation';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate entire form before final WhatsApp submission
  const validateEntireForm = (): boolean => {
    const isStep1Valid = validateStep(1);
    if (!isStep1Valid) {
      setCurrentStep(1);
      setValidationAlert('Please complete all required personal details in Step 1.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return false;
    }

    const isStep2Valid = validateStep(2);
    if (!isStep2Valid) {
      setCurrentStep(2);
      setValidationAlert('Please complete all required location and educational details in Step 2.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return false;
    }

    const isStep3Valid = validateStep(3);
    if (!isStep3Valid) {
      setCurrentStep(3);
      setValidationAlert('Please complete your course selection and motivation in Step 3.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Submit Registration and Open WhatsApp with the complete message
  const handleConfirmAndSendToWhatsApp = async () => {
    if (!validateEntireForm()) {
      return;
    }

    setIsSubmitting(true);
    setValidationAlert('');

    let generatedId = `S2S-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // 1. Save to server backend
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          dob: formData.dob,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          houseAddress: formData.houseAddress,
          education: formData.education,
          referralSource: formData.referralSource,
          selectedCourse: formData.selectedCourse,
          motivation: formData.motivation,
          additionalSkills: formData.additionalSkills,
          paymentMade: formData.paymentMade,
          paymentReference: formData.paymentReference,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success && data.registration?.id) {
        generatedId = data.registration.id;
      }
    } catch {
      // Offline fallback: save locally so records are preserved
      try {
        const stored = JSON.parse(localStorage.getItem('s2s_registrations') || '[]');
        stored.unshift({
          ...formData,
          id: generatedId,
          coursePrice,
          paymentStatus: formData.paymentMade ? 'Paid' : 'Pending / Optional',
          registrationDate: new Date().toISOString(),
          timestamp: Date.now(),
        });
        localStorage.setItem('s2s_registrations', JSON.stringify(stored));
      } catch (e) {
        console.error(e);
      }
    }

    setCreatedRegistrationId(generatedId);
    setIsSubmitting(false);

    // 2. Open WhatsApp click-to-chat with the complete encoded message
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup blocked, user can click direct button on complete screen', e);
    }

    // 3. Move to Step 5 (Confirmation Screen)
    setCurrentStep(5);
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F9FC] min-h-screen text-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Accuracy Notice as requested */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#0757D5] text-white rounded-xl shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-[#071A3D] uppercase tracking-wide">
                IMPORTANT: PLEASE PROVIDE ACCURATE INFORMATION
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                The information submitted will be used for registration, official WhatsApp
                communication, and certificate issuance. Please ensure that all your details are
                accurate.
              </p>
            </div>
          </div>
        </div>

        {/* Global Validation Error Banner (if any) */}
        {validationAlert && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3 text-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{validationAlert}</span>
          </div>
        )}

        {/* Progress Bar (5 Steps) */}
        <div className="mb-8 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
            <span>Step {currentStep} of 5</span>
            <span className="text-[#0757D5] font-bold">
              {currentStep === 1 && 'Personal Information'}
              {currentStep === 2 && 'Location & Background'}
              {currentStep === 3 && 'Course & Motivation'}
              {currentStep === 4 && 'Review, Payment & WhatsApp Submission'}
              {currentStep === 5 && 'Registration Complete'}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[
              { num: 1, label: 'Personal' },
              { num: 2, label: 'Location' },
              { num: 3, label: 'Course' },
              { num: 4, label: 'Review & Pay' },
              { num: 5, label: 'Complete' },
            ].map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div key={step.num} className="space-y-1">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isPast
                        ? 'bg-emerald-500'
                        : isCurrent
                        ? 'bg-[#0757D5]'
                        : 'bg-slate-200'
                    }`}
                  />
                  <div className="hidden sm:block text-[11px] text-center font-medium text-slate-600 truncate">
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Form Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          {/* STEP 1: PERSONAL INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0757D5] uppercase tracking-wider">
                  <User className="w-4 h-4" />
                  <span>Step 1: Personal Information</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#071A3D] mt-1">Applicant Details</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Please provide your full legal name exactly as you wish it to appear on your
                  certificate.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Full Name (First, Middle &amp; Surname) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="e.g. Divine Ifeanyi Okeke"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] ${
                      errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Phone Number (WhatsApp Active) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="e.g. +234 803 123 4567"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] ${
                        errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="e.g. divine@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] ${
                        errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Date of Birth <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] ${
                      errors.dob ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.dob && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.dob}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-7 py-3 rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>Continue to Location</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION & EDUCATION */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0757D5] uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Step 2: Location &amp; Academic Background</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#071A3D] mt-1">Where are you located?</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Skill2Scale serves learners across 12+ African nations. Please specify your location
                  and education.
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Country <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      placeholder="e.g. Nigeria, Ghana, Kenya"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] ${
                        errors.country ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.country && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.country}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      State / Region <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="e.g. Lagos, Abuja FCT, Greater Accra"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] ${
                        errors.state ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.state && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.state}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="e.g. Ikeja, Lokogoma, Port Harcourt"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] ${
                        errors.city ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Educational Qualification <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] bg-white font-medium"
                    >
                      <option value="Secondary School">Secondary School</option>
                      <option value="SSCE / WAEC / NECO">SSCE / WAEC / NECO</option>
                      <option value="OND">OND</option>
                      <option value="NCE">NCE</option>
                      <option value="HND">HND</option>
                      <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                      <option value="Master's Degree">Master&apos;s Degree</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="Professional Qualification">Professional Qualification</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    House / Residential Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.houseAddress}
                    onChange={(e) => handleInputChange('houseAddress', e.target.value)}
                    placeholder="e.g. 14 Allen Avenue, Ikeja"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] ${
                      errors.houseAddress ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.houseAddress && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.houseAddress}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-7 py-3 rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>Continue to Course</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: COURSE & MOTIVATION */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0757D5] uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Step 3: Program Selection &amp; Career Goals</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#071A3D] mt-1">Course &amp; Motivation</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Verify your chosen skill and let our mentors know what you aim to achieve.
                </p>
              </div>

              <div className="space-y-5">
                {/* Course Selection Dropdown with Pre-selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Selected Digital Training Program <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.selectedCourse}
                    onChange={(e) => handleInputChange('selectedCourse', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] font-semibold text-[#071A3D] bg-slate-50"
                  >
                    {COURSES_DATA.map((course) => (
                      <option key={course.id} value={course.name}>
                        {course.name} ({course.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live Course & Fee Display */}
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between ${
                    isAI
                      ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white border-blue-400'
                      : 'bg-blue-50 border-blue-200 text-[#071A3D]'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                      Selected Program
                    </div>
                    <div className="text-lg font-extrabold">{formData.selectedCourse}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider opacity-80">Training Fee</div>
                    <div className="text-2xl font-black">{coursePrice}</div>
                  </div>
                </div>

                {/* Where did you hear about Skill2Scale */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Where did you hear about Skill2Scale? <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.referralSource}
                    onChange={(e) => handleInputChange('referralSource', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] bg-white font-medium"
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Friend / Referral">Friend / Referral</option>
                    <option value="School / Institution">School / Institution</option>
                    <option value="Skill2Scale Student">Skill2Scale Student</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Motivation textarea */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    What are your reasons for choosing this course? <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    placeholder="Tell us about your background, career goals, freelancing ambitions, or specific skills you want to build..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5] ${
                      errors.motivation ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.motivation && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.motivation}</span>
                    </p>
                  )}
                </div>

                {/* Additional Skills - Multiple entries */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    What other digital skills do you intend to learn in addition to this one?
                  </label>
                  <p className="text-xs text-slate-500 mb-2">
                    Type a skill and click &quot;Add&quot; (you can add multiple):
                  </p>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={formData.additionalSkillInput}
                      onChange={(e) => handleInputChange('additionalSkillInput', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                      placeholder="e.g. Video Editing, UI/UX Design, Website Design"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Add Skill
                    </button>
                  </div>

                  {formData.additionalSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {formData.additionalSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0757D5] px-3 py-1 rounded-lg text-xs font-medium border border-blue-200"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-slate-400 hover:text-slate-600 font-bold ml-1 cursor-pointer"
                            aria-label={`Remove ${skill}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">None added yet (optional)</p>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-[#0757D5] hover:bg-[#064ab8] text-white px-7 py-3 rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>Continue to Review &amp; Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW, PAYMENT & WHATSAPP SUBMISSION */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0757D5] uppercase tracking-wider">
                  <CreditCard className="w-4 h-4" />
                  <span>Step 4: Review Details &amp; Payment (Optional)</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#071A3D] mt-1">
                  Confirm Registration &amp; WhatsApp Transmission
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Payment is <strong className="text-slate-700">OPTIONAL</strong> at this stage. You
                  may submit your full registration details first and request payment clarification if
                  needed.
                </p>
              </div>

              {/* Fee and PalmPay details */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Selected Track:</span>
                    <div className="text-lg font-bold text-[#071A3D]">{formData.selectedCourse}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium">Training Fee:</span>
                    <div className="text-2xl font-black text-[#0757D5]">{coursePrice}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Bank / Payment Account Information:
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="text-xs text-slate-500">Bank / FinTech Provider:</div>
                      <div className="text-base font-extrabold text-[#071A3D]">PalmPay</div>
                      <div className="text-xs text-slate-500 mt-1">Account Number:</div>
                      <div className="text-xl font-mono font-bold text-[#0757D5] tracking-wider">
                        9069710687
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={copyAccountNumber}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-500" />
                          <span>Copy Account</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Status Choice */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <label className="block text-sm font-bold text-[#071A3D]">
                  Have you made payment?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange('paymentMade', true)}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      formData.paymentMade
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-sm font-bold">Yes, I Have Paid</div>
                    <div className="text-xs text-slate-500 mt-0.5">I have a screenshot/reference</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInputChange('paymentMade', false)}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      !formData.paymentMade
                        ? 'border-[#0757D5] bg-blue-50 text-[#071A3D] ring-2 ring-blue-500/20 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-sm font-bold">No, Not Yet</div>
                    <div className="text-xs text-slate-500 mt-0.5">Payment is optional now</div>
                  </button>
                </div>

                {/* If Paid: Optional payment reference input */}
                {formData.paymentMade && (
                  <div className="pt-2 animate-in fade-in space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Payment Reference / Sender Name / Transaction ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.paymentReference}
                        onChange={(e) => handleInputChange('paymentReference', e.target.value)}
                        placeholder="e.g. PalmPay Ref #12345678 or Sender: Divine Okeke"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
                      />
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        You can attach your payment receipt screenshot directly in WhatsApp when the
                        chat opens.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* MESSAGE PREVIEW BOX (As requested in prompt) */}
              <div className="bg-slate-50 border-2 border-blue-200 rounded-2xl p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0757D5] uppercase tracking-wider">
                    <Eye className="w-4 h-4" />
                    <span>WhatsApp Message Preview</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Live preview of your submission</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Please review your registration details. Your complete information will be sent to
                  Skill2Scale Digital via WhatsApp:
                </p>

                {/* Formatted Message Code Box */}
                <div className="bg-[#071A3D] text-slate-100 rounded-xl p-4 font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-inner max-h-72 overflow-y-auto border border-slate-700 select-all">
                  {generatedWhatsAppMessage}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Recipient: +234 906 971 0687</span>
                  <button
                    type="button"
                    onClick={copyFormattedMessage}
                    className="text-[#0757D5] hover:text-[#064ab8] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirmAndSendToWhatsApp}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-lg shadow-emerald-900/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Preparing Submission...</span>
                  ) : (
                    <>
                      <MessageSquare className="w-5 h-5 fill-white" />
                      <span>Confirm &amp; Send to WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: REGISTRATION COMPLETE & CONFIRMATION */}
          {currentStep === 5 && (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase">
                  Application Success
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D]">
                  Registration Received
                </h2>
                <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Your application has been successfully recorded in the Skill2Scale system. Please
                  ensure your message is transmitted to our official admissions desk on WhatsApp.
                </p>
              </div>

              {/* Application Details Summary Card */}
              <div className="bg-[#F7F9FC] border border-slate-200 rounded-2xl p-6 max-w-lg mx-auto text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs text-slate-500">Registration ID:</span>
                  <span className="text-sm font-mono font-bold text-[#0757D5]">
                    {createdRegistrationId || 'S2S-2026-ACTIVE'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs text-slate-500">Applicant Name:</span>
                  <span className="text-sm font-semibold text-slate-800">{formData.fullName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs text-slate-500">Phone Number:</span>
                  <span className="text-sm font-mono text-slate-800">{formData.phone}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs text-slate-500">Selected Program:</span>
                  <span className="text-sm font-bold text-[#071A3D]">{formData.selectedCourse}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs text-slate-500">Course Fee:</span>
                  <span className="text-base font-extrabold text-[#0757D5]">{coursePrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Payment Status:</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      formData.paymentMade
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {formData.paymentMade ? 'Paid' : 'Not Paid (Optional)'}
                  </span>
                </div>
              </div>

              {/* View/Copy Complete Message Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-lg mx-auto text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Your Complete WhatsApp Message:
                  </span>
                  <button
                    type="button"
                    onClick={copyFormattedMessage}
                    className="text-xs font-bold text-[#0757D5] hover:text-[#064ab8] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-3 text-[11px] font-mono text-slate-700 whitespace-pre-wrap max-h-44 overflow-y-auto leading-relaxed">
                  {generatedWhatsAppMessage}
                </div>
              </div>

              {/* Next Steps Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 max-w-lg mx-auto text-left text-xs text-slate-700 leading-relaxed space-y-2">
                <div className="font-bold text-[#071A3D] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0757D5]" />
                  <span>Next Steps:</span>
                </div>
                <p>
                  1. Click <strong>&quot;Open WhatsApp Chat&quot;</strong> below to send your complete
                  application to admissions.
                  <br />
                  2. If you made payment, attach your payment screenshot directly in the chat.
                  <br />
                  3. Our admissions officer will confirm your enrollment and provide class onboarding
                  details.
                </p>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Chat (+234 906 971 0687)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto px-6 py-3.5 border border-slate-200 hover:bg-slate-100 rounded-xl text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
