export interface Service {
  id: string;
  title: string;
  titleEn: string;
  shortDesc: string;
  shortDescEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
  features: string[];
  featuresEn: string[];
  imageUrl: string;
}

export interface WorkerDocument {
  id: string;
  workerName: string;
  dateOfBirth: string; // YYYY-MM-DD
  passportNid: string;
  employeeId: string;
  designation: string;
  documentType: 'NID' | 'Passport' | 'Contract' | 'Visa' | 'Medical' | 'Certificate' | 'Other';
  documentTitle: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Pending' | 'Canceled';
  description: string;
  fileData?: string; // base64 string
  fileName?: string;
  fileType?: string;
  uploadedAt: any;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  selectedService: string;
  message: string;
  status: 'Pending' | 'Processing' | 'Completed';
  createdAt: any;
  notes?: string;
}
