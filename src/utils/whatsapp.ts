export interface WhatsAppRegistrationPayload {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  country: string;
  state: string;
  city: string;
  houseAddress: string;
  education: string;
  selectedCourse: string;
  coursePrice: string;
  referralSource: string;
  motivation: string;
  additionalSkills: string[];
  paymentStatus: 'Paid' | 'Not Paid' | 'Not Applicable';
  paymentReference?: string;
}

export const WHATSAPP_PHONE_NUMBER = '2349069710687';

/**
 * Builds the exact, structured WhatsApp message required for Skill2Scale Digital registration.
 * Replaces all placeholders with actual values, or "Not provided" if empty.
 */
export function buildWhatsAppRegistrationMessage(payload: WhatsAppRegistrationPayload): string {
  const formatField = (val: string | undefined | null): string => {
    if (!val || !val.trim()) return 'Not provided';
    return val.trim();
  };

  const skillsText =
    payload.additionalSkills && payload.additionalSkills.length > 0
      ? payload.additionalSkills.join(', ')
      : 'Not provided';

  // Format fee cleanly: ensure "₦[price]" format without doubling the currency symbol
  const rawPrice = payload.coursePrice ? payload.coursePrice.replace(/[^0-9,]/g, '') : '5,000';
  const feeLine = `Course Fee: ₦${rawPrice}`;

  // Payment reference/screenshot line
  let paymentRefLine = 'Not provided';
  if (payload.paymentReference && payload.paymentReference.trim()) {
    paymentRefLine = payload.paymentReference.trim();
  } else if (payload.paymentStatus === 'Paid') {
    paymentRefLine = 'Payment screenshot ready to attach on WhatsApp';
  }

  const lines = [
    'SKILL2SCALE DIGITAL – NEW REGISTRATION',
    '',
    '👤 PERSONAL INFORMATION',
    `Full Name: ${formatField(payload.fullName)}`,
    `Phone Number: ${formatField(payload.phone)}`,
    `Email Address: ${formatField(payload.email)}`,
    `Date of Birth: ${formatField(payload.dob)}`,
    '',
    '📍 LOCATION',
    `Country: ${formatField(payload.country)}`,
    `State/Region: ${formatField(payload.state)}`,
    `City: ${formatField(payload.city)}`,
    `House Address: ${formatField(payload.houseAddress)}`,
    '',
    '🎓 EDUCATION',
    `Educational Qualification: ${formatField(payload.education)}`,
    '',
    '📚 TRAINING PROGRAM',
    `Selected Course: ${formatField(payload.selectedCourse)}`,
    feeLine,
    '',
    '💡 ADDITIONAL INFORMATION',
    `Where did you hear about us?: ${formatField(payload.referralSource)}`,
    `Reason for choosing this course: ${formatField(payload.motivation)}`,
    `Other digital skills the applicant wants to learn: ${skillsText}`,
    '',
    '💳 PAYMENT',
    `Payment Status: ${payload.paymentStatus || 'Not Paid'}`,
    `Payment Reference/Screenshot: ${paymentRefLine}`,
  ];

  return lines.join('\n');
}

/**
 * Creates the official click-to-chat URL with full URL encoding.
 */
export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encoded}`;
}
