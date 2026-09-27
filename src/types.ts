export interface RegistrationFormData {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  country: string;
  state: string;
  city: string;
  houseAddress: string;
  education: string;
  referralSource: string;
  selectedCourse: string;
  coursePrice: string;
  motivation: string;
  additionalSkills: string[];
  paymentMade: boolean;
  paymentReference?: string;
}

export interface RegistrationRecord extends RegistrationFormData {
  id: string;
  paymentStatus: 'Paid' | 'Pending / Optional' | 'Confirmed';
  registrationDate: string;
  timestamp: number;
}
