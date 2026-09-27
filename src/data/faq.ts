export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Enrollment' | 'Payment' | 'Internship & Certification';
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'who-can-register',
    category: 'General',
    question: 'Who can register for Skill2Scale Digital programs?',
    answer: 'Anyone interested in developing practical digital skills can register, regardless of educational background or current career stage. Whether you are a secondary school leaver, university student, graduate, job seeker, or working professional looking to upskill, our programs are structured to meet you where you are.',
  },
  {
    id: 'previous-experience',
    category: 'General',
    question: 'Do I need previous tech or digital experience?',
    answer: 'No previous experience is required for most of our foundational programs. Our courses start with core concepts and progress step-by-step into hands-on practical application. If a specialized advanced course has any prerequisites (such as basic computer literacy), it is clearly highlighted.',
  },
  {
    id: 'course-fees',
    category: 'Payment',
    question: 'How much does training cost?',
    answer: 'Skill2Scale is committed to keeping digital education accessible and affordable across Africa. Most of our standard training programs cost ₦5,000. Our specialized intensive program, AI & Automation, costs ₦26,000. There are no hidden fees.',
  },
  {
    id: 'optional-payment',
    category: 'Payment',
    question: 'Is payment mandatory before completing registration?',
    answer: 'No. Payment is optional during the registration workflow. You can complete and submit your application first to reserve your spot, and then review payment instructions or reach out to support for any questions.',
  },
  {
    id: 'payment-screenshot',
    category: 'Payment',
    question: 'How do I submit my payment screenshot after paying?',
    answer: 'Once you make your payment via PalmPay (Account Number: 9069710687), simply send your payment receipt or screenshot to our official WhatsApp support at +2349069710687. Our admissions team will verify your receipt and send your enrollment confirmation.',
  },
  {
    id: 'what-happens-next',
    category: 'Enrollment',
    question: 'What happens after I submit my registration?',
    answer: 'Once submitted, your application details are securely logged in our system. You will receive an on-screen confirmation with your Registration ID and a direct button to connect with our admissions desk on WhatsApp (+2349069710687) for onboarding materials, class schedules, and cohort orientation.',
  },
  {
    id: 'certificate',
    category: 'Internship & Certification',
    question: 'Will I receive a verified certificate upon completion?',
    answer: 'Yes. Eligible students who complete the coursework, assignments, and practical project assessments receive an official Skill2Scale Digital Certificate of Completion, complete with verification credentials suitable for LinkedIn and employer portfolios.',
  },
  {
    id: 'internship',
    category: 'Internship & Certification',
    question: 'Can I join the Skill2Scale Internship after training?',
    answer: 'Yes! Skill2Scale provides an integrated Internship & Skill Mastery pathway. High-performing students who complete their foundational coursework can transition directly into our guided practice, simulations, capstone projects, and real-world client briefs to build verified portfolio experience.',
  },
  {
    id: 'contact-questions',
    category: 'General',
    question: 'Where can I ask additional questions or get support?',
    answer: 'You can reach out directly to our dedicated training desk on WhatsApp at +2349069710687. You can also contact our general office via phone at +2348130028042 or email us at skill2scale.school@gmail.com.',
  },
];
