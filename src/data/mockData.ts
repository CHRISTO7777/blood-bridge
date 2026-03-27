export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  phone: string;
  location: string;
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
  bloodGroup: BloodGroup;
  date: string;
  hospitalId: string;
  urgency: 'critical' | 'high' | 'normal';
  unitsNeeded: number;
}

export const donors: Donor[] = [
  { id: 'D001', name: 'Rahul Sharma', bloodGroup: 'O+', phone: '+91 98765 43210', location: 'Mumbai', available: true, lastDonation: '2025-11-15' },
  { id: 'D002', name: 'Priya Patel', bloodGroup: 'A+', phone: '+91 87654 32109', location: 'Delhi', available: true, lastDonation: '2025-10-20' },
  { id: 'D003', name: 'Amit Kumar', bloodGroup: 'B+', phone: '+91 76543 21098', location: 'Bangalore', available: false, lastDonation: '2026-02-10' },
  { id: 'D004', name: 'Sneha Reddy', bloodGroup: 'AB+', phone: '+91 65432 10987', location: 'Hyderabad', available: true, lastDonation: '2025-12-05' },
  { id: 'D005', name: 'Vikram Singh', bloodGroup: 'O-', phone: '+91 54321 09876', location: 'Chennai', available: true, lastDonation: '2025-09-30' },
  { id: 'D006', name: 'Ananya Gupta', bloodGroup: 'A-', phone: '+91 43210 98765', location: 'Pune', available: true, lastDonation: '2025-11-28' },
  { id: 'D007', name: 'Rajesh Nair', bloodGroup: 'B-', phone: '+91 32109 87654', location: 'Kolkata', available: false, lastDonation: '2026-01-15' },
  { id: 'D008', name: 'Meera Joshi', bloodGroup: 'AB-', phone: '+91 21098 76543', location: 'Ahmedabad', available: true, lastDonation: '2025-10-12' },
  { id: 'D009', name: 'Arjun Menon', bloodGroup: 'O+', phone: '+91 10987 65432', location: 'Jaipur', available: true, lastDonation: '2025-12-22' },
  { id: 'D010', name: 'Kavita Desai', bloodGroup: 'A+', phone: '+91 99876 54321', location: 'Mumbai', available: true, lastDonation: '2025-11-01' },
];

export const hospitals: Hospital[] = [
  { id: 'H001', name: 'City General Hospital', location: 'Mumbai', contact: '+91 22 2345 6789' },
  { id: 'H002', name: 'Apollo Hospital', location: 'Delhi', contact: '+91 11 2345 6789' },
  { id: 'H003', name: 'Fortis Healthcare', location: 'Bangalore', contact: '+91 80 2345 6789' },
  { id: 'H004', name: 'AIIMS', location: 'Hyderabad', contact: '+91 40 2345 6789' },
  { id: 'H005', name: 'Medanta', location: 'Chennai', contact: '+91 44 2345 6789' },
];

export const bloodRequests: BloodRequest[] = [
  { id: 'R001', bloodGroup: 'O-', date: '2026-03-27', hospitalId: 'H001', urgency: 'critical', unitsNeeded: 3 },
  { id: 'R002', bloodGroup: 'A+', date: '2026-03-27', hospitalId: 'H002', urgency: 'high', unitsNeeded: 2 },
  { id: 'R003', bloodGroup: 'B+', date: '2026-03-26', hospitalId: 'H003', urgency: 'normal', unitsNeeded: 1 },
  { id: 'R004', bloodGroup: 'AB+', date: '2026-03-27', hospitalId: 'H004', urgency: 'critical', unitsNeeded: 4 },
];

export const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const stats = {
  totalDonors: 1247,
  totalDonations: 3892,
  livesaved: 11676,
  activeRequests: 23,
};
