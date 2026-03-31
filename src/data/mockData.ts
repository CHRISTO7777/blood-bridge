export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Gender = 'Male' | 'Female' | 'Other';

export interface Donor {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  phone: string;
  email: string;
  city: string;
  available: boolean;
  lastDonation: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  contact: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  hospitalName: string;
  city: string;
  contact: string;
  requiredDate: string;
  urgency: 'critical' | 'high' | 'normal';
  status: 'pending' | 'fulfilled' | 'expired';
  createdAt: string;
}

export interface Donation {
  id: string;
  donorId: string;
  donationDate: string;
}

export const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const genders: Gender[] = ['Male', 'Female', 'Other'];

export const donors: Donor[] = [
  { id: 'D001', name: 'Rahul Sharma', age: 28, gender: 'Male', bloodGroup: 'O+', phone: '+91 98765 43210', email: 'rahul@email.com', city: 'Mumbai', available: true, lastDonation: '2025-11-15' },
  { id: 'D002', name: 'Priya Patel', age: 24, gender: 'Female', bloodGroup: 'A+', phone: '+91 87654 32109', email: 'priya@email.com', city: 'Delhi', available: true, lastDonation: '2025-10-20' },
  { id: 'D003', name: 'Amit Kumar', age: 32, gender: 'Male', bloodGroup: 'B+', phone: '+91 76543 21098', email: 'amit@email.com', city: 'Bangalore', available: false, lastDonation: '2026-02-10' },
  { id: 'D004', name: 'Sneha Reddy', age: 26, gender: 'Female', bloodGroup: 'AB+', phone: '+91 65432 10987', email: 'sneha@email.com', city: 'Hyderabad', available: true, lastDonation: '2025-12-05' },
  { id: 'D005', name: 'Vikram Singh', age: 35, gender: 'Male', bloodGroup: 'O-', phone: '+91 54321 09876', email: 'vikram@email.com', city: 'Chennai', available: true, lastDonation: '2025-09-30' },
  { id: 'D006', name: 'Ananya Gupta', age: 22, gender: 'Female', bloodGroup: 'A-', phone: '+91 43210 98765', email: 'ananya@email.com', city: 'Pune', available: true, lastDonation: '2025-11-28' },
  { id: 'D007', name: 'Rajesh Nair', age: 40, gender: 'Male', bloodGroup: 'B-', phone: '+91 32109 87654', email: 'rajesh@email.com', city: 'Kolkata', available: false, lastDonation: '2026-01-15' },
  { id: 'D008', name: 'Meera Joshi', age: 29, gender: 'Female', bloodGroup: 'AB-', phone: '+91 21098 76543', email: 'meera@email.com', city: 'Ahmedabad', available: true, lastDonation: '2025-10-12' },
  { id: 'D009', name: 'Arjun Menon', age: 31, gender: 'Male', bloodGroup: 'O+', phone: '+91 10987 65432', email: 'arjun@email.com', city: 'Jaipur', available: true, lastDonation: '2025-12-22' },
  { id: 'D010', name: 'Kavita Desai', age: 27, gender: 'Female', bloodGroup: 'A+', phone: '+91 99876 54321', email: 'kavita@email.com', city: 'Mumbai', available: true, lastDonation: '2025-11-01' },
  { id: 'D011', name: 'Suresh Iyer', age: 33, gender: 'Male', bloodGroup: 'O+', phone: '+91 88765 43210', email: 'suresh@email.com', city: 'Chennai', available: true, lastDonation: '2025-08-15' },
  { id: 'D012', name: 'Deepa Nair', age: 25, gender: 'Female', bloodGroup: 'B+', phone: '+91 77654 32109', email: 'deepa@email.com', city: 'Bangalore', available: true, lastDonation: '2025-07-20' },
];

export const hospitals: Hospital[] = [
  { id: 'H001', name: 'City General Hospital', location: 'Mumbai', contact: '+91 22 2345 6789' },
  { id: 'H002', name: 'Apollo Hospital', location: 'Delhi', contact: '+91 11 2345 6789' },
  { id: 'H003', name: 'Fortis Healthcare', location: 'Bangalore', contact: '+91 80 2345 6789' },
  { id: 'H004', name: 'AIIMS', location: 'Hyderabad', contact: '+91 40 2345 6789' },
  { id: 'H005', name: 'Medanta', location: 'Chennai', contact: '+91 44 2345 6789' },
];

export const bloodRequests: BloodRequest[] = [
  { id: 'R001', patientName: 'Mohan Verma', bloodGroup: 'O-', hospitalName: 'City General Hospital', city: 'Mumbai', contact: '+91 98123 45678', requiredDate: '2026-03-30', urgency: 'critical', status: 'pending', createdAt: '2026-03-27' },
  { id: 'R002', patientName: 'Sita Devi', bloodGroup: 'A+', hospitalName: 'Apollo Hospital', city: 'Delhi', contact: '+91 87123 45678', requiredDate: '2026-04-01', urgency: 'high', status: 'pending', createdAt: '2026-03-27' },
  { id: 'R003', patientName: 'Ravi Prasad', bloodGroup: 'B+', hospitalName: 'Fortis Healthcare', city: 'Bangalore', contact: '+91 76123 45678', requiredDate: '2026-04-02', urgency: 'normal', status: 'pending', createdAt: '2026-03-26' },
  { id: 'R004', patientName: 'Lakshmi Rao', bloodGroup: 'AB+', hospitalName: 'AIIMS', city: 'Hyderabad', contact: '+91 65123 45678', requiredDate: '2026-03-29', urgency: 'critical', status: 'pending', createdAt: '2026-03-27' },
  { id: 'R005', patientName: 'Arun Das', bloodGroup: 'O+', hospitalName: 'Medanta', city: 'Chennai', contact: '+91 54123 45678', requiredDate: '2026-04-05', urgency: 'normal', status: 'fulfilled', createdAt: '2026-03-20' },
];

export const donations: Donation[] = [
  { id: 'DN001', donorId: 'D001', donationDate: '2025-11-15' },
  { id: 'DN002', donorId: 'D002', donationDate: '2025-10-20' },
  { id: 'DN003', donorId: 'D003', donationDate: '2026-02-10' },
  { id: 'DN004', donorId: 'D005', donationDate: '2025-09-30' },
  { id: 'DN005', donorId: 'D009', donationDate: '2025-12-22' },
  { id: 'DN006', donorId: 'D010', donationDate: '2025-11-01' },
  { id: 'DN007', donorId: 'D004', donationDate: '2025-12-05' },
  { id: 'DN008', donorId: 'D006', donationDate: '2025-11-28' },
];

export const stats = {
  totalDonors: 1247,
  totalDonations: 3892,
  livesSaved: 11676,
  activeRequests: 23,
};

export const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur'];

// Helper: check if donor is eligible (3 month rule)
export const isDonorEligible = (lastDonation: string): boolean => {
  const last = new Date(lastDonation);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  return last <= threeMonthsAgo;
};
