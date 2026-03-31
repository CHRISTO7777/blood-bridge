import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Calendar, CheckCircle, XCircle, Filter, User } from 'lucide-react';
import { donors, bloodGroups, cities, isDonorEligible, type BloodGroup } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';

const FindDonor = () => {
  const [bloodGroup, setBloodGroup] = useState<string>('all');
  const [city, setCity] = useState<string>('all');
  const [availability, setAvailability] = useState<string>('all');
  const [searchName, setSearchName] = useState('');

  const filtered = useMemo(() => {
    return donors.filter((d) => {
      if (bloodGroup !== 'all' && d.bloodGroup !== bloodGroup) return false;
      if (city !== 'all' && d.city !== city) return false;
      if (availability === 'available' && !d.available) return false;
      if (availability === 'unavailable' && d.available) return false;
      if (availability === 'eligible' && !isDonorEligible(d.lastDonation)) return false;
      if (searchName && !d.name.toLowerCase().includes(searchName.toLowerCase())) return false;
      return true;
    });
  }, [bloodGroup, city, availability, searchName]);

  const clearFilters = () => {
    setBloodGroup('all');
    setCity('all');
    setAvailability('all');
    setSearchName('');
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Find Blood Donors</h1>
            <p className="text-muted-foreground mt-2">Search and filter donors by blood group, city, and availability</p>
          </div>

          {/* Filters */}
          <div className="rounded-xl border border-border bg-card p-4 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filters</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name..." value={searchName} onChange={e => setSearchName(e.target.value)} className="pl-9" />
              </div>
              <Select value={bloodGroup} onValueChange={setBloodGroup}>
                <SelectTrigger><SelectValue placeholder="Blood Group" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blood Groups</SelectItem>
                  {bloodGroups.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger><SelectValue placeholder="Availability" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                  <SelectItem value="eligible">Eligible (3-month rule)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {bloodGroup !== 'all' && <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setBloodGroup('all')}>Blood: {bloodGroup} ×</Badge>}
              {city !== 'all' && <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setCity('all')}>City: {city} ×</Badge>}
              {availability !== 'all' && <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setAvailability('all')}>Status: {availability} ×</Badge>}
            </div>
          </div>

          {/* Results */}
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} donor{filtered.length !== 1 ? 's' : ''} found</p>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-16 text-center">
              <User className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No donors found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find matching donors.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((donor, i) => (
                <motion.div
                  key={donor.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                      {getInitials(donor.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-card-foreground truncate">{donor.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="rounded-md bg-accent px-2 py-0.5 font-mono text-xs font-bold text-accent-foreground">{donor.bloodGroup}</span>
                        <Badge variant={donor.available ? 'default' : 'secondary'} className={`text-xs ${donor.available ? 'bg-success text-success-foreground' : ''}`}>
                          {donor.available ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0" /> {donor.city}</p>
                    <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 shrink-0" /> {donor.phone}</p>
                    <p className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 shrink-0" /> Last donation: {donor.lastDonation}</p>
                    {isDonorEligible(donor.lastDonation) ? (
                      <p className="flex items-center gap-2 text-success font-medium"><CheckCircle className="h-3.5 w-3.5" /> Eligible to donate</p>
                    ) : (
                      <p className="flex items-center gap-2 text-warning font-medium"><XCircle className="h-3.5 w-3.5" /> Not yet eligible</p>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 gap-2">
                    <Phone className="h-3.5 w-3.5" /> Contact Donor
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default FindDonor;
