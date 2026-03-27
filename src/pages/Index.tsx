import { useState } from 'react';
import type { BloodGroup } from '@/data/mockData';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import DonorList from '@/components/DonorList';
import EmergencyRequests from '@/components/EmergencyRequests';
import HospitalDirectory from '@/components/HospitalDirectory';

const Index = () => {
  const [filterGroup, setFilterGroup] = useState<BloodGroup | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onSearch={setFilterGroup} />
      <StatsBar />
      <EmergencyRequests />
      <DonorList filterGroup={filterGroup} />
      <HospitalDirectory />
      <footer className="border-t border-border bg-card px-6 py-8 text-center text-sm text-muted-foreground">
        <p>Blood Donor Management System · Saving lives, one donation at a time</p>
      </footer>
    </div>
  );
};

export default Index;
