import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Droplets, Activity, Heart, Search, Trash2, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { donors, bloodRequests, bloodGroups, donations, stats } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const COLORS = ['hsl(0,72%,51%)', 'hsl(0,80%,35%)', 'hsl(38,92%,50%)', 'hsl(142,72%,40%)', 'hsl(220,70%,50%)', 'hsl(280,60%,50%)', 'hsl(180,60%,40%)', 'hsl(30,80%,50%)'];

const PAGE_SIZE = 5;

const Dashboard = () => {
  const [donorSearch, setDonorSearch] = useState('');
  const [donorPage, setDonorPage] = useState(0);
  const [requestPage, setRequestPage] = useState(0);

  const pieData = useMemo(() =>
    bloodGroups.map(bg => ({ name: bg, value: donors.filter(d => d.bloodGroup === bg).length })),
    []
  );

  const barData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((m, i) => ({
      month: m,
      donations: donations.filter(d => new Date(d.donationDate).getMonth() === i).length + Math.floor(Math.random() * 5),
    }));
  }, []);

  const filteredDonors = useMemo(() =>
    donors.filter(d => d.name.toLowerCase().includes(donorSearch.toLowerCase())),
    [donorSearch, donors.length]
  );

  const donorPages = Math.ceil(filteredDonors.length / PAGE_SIZE);
  const requestPages = Math.ceil(bloodRequests.length / PAGE_SIZE);

  const toggleAvailability = (id: string) => {
    const donor = donors.find(d => d.id === id);
    if (donor) {
      donor.available = !donor.available;
      toast.success(`${donor.name} is now ${donor.available ? 'available' : 'unavailable'}`);
    }
  };

  const deleteDonor = (id: string) => {
    const idx = donors.findIndex(d => d.id === id);
    if (idx !== -1) {
      const name = donors[idx].name;
      donors.splice(idx, 1);
      toast.success(`${name} removed`);
    }
  };

  const statCards = [
    { label: 'Total Donors', value: donors.length, icon: Users, color: 'text-primary' },
    { label: 'Active Donors', value: donors.filter(d => d.available).length, icon: CheckCircle, color: 'text-success' },
    { label: 'Pending Requests', value: bloodRequests.filter(r => r.status === 'pending').length, icon: Activity, color: 'text-warning' },
    { label: 'Total Donations', value: donations.length, icon: Heart, color: 'text-primary' },
  ];

  const urgencyStyles: Record<string, string> = {
    critical: 'bg-primary text-primary-foreground',
    high: 'bg-warning text-warning-foreground',
    normal: 'bg-secondary text-secondary-foreground',
  };

  const statusStyles: Record<string, string> = {
    pending: 'bg-warning/10 text-warning',
    fulfilled: 'bg-success/10 text-success',
    expired: 'bg-muted text-muted-foreground',
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage donors, view requests, and monitor system statistics</p>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {statCards.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="mt-1 text-3xl font-bold text-foreground">{s.value}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <s.icon className={`h-6 w-6 ${s.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Blood Group Distribution</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Donations</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Bar dataKey="donations" fill="hsl(0,72%,51%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="donors">
            <TabsList className="mb-6">
              <TabsTrigger value="donors">All Donors</TabsTrigger>
              <TabsTrigger value="requests">Blood Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="donors">
              <div className="rounded-xl border border-border bg-card">
                <div className="flex items-center gap-4 border-b border-border p-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search donors..." value={donorSearch} onChange={e => { setDonorSearch(e.target.value); setDonorPage(0); }} className="pl-9" />
                  </div>
                  <span className="text-sm text-muted-foreground">{filteredDonors.length} donors</span>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Blood Group</TableHead>
                        <TableHead className="hidden md:table-cell">City</TableHead>
                        <TableHead className="hidden md:table-cell">Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDonors.slice(donorPage * PAGE_SIZE, (donorPage + 1) * PAGE_SIZE).map(d => (
                        <TableRow key={d.id}>
                          <TableCell className="font-medium">{d.name}</TableCell>
                          <TableCell><span className="rounded bg-accent px-2 py-0.5 font-mono text-xs font-bold text-accent-foreground">{d.bloodGroup}</span></TableCell>
                          <TableCell className="hidden md:table-cell">{d.city}</TableCell>
                          <TableCell className="hidden md:table-cell">{d.phone}</TableCell>
                          <TableCell>
                            <Badge className={d.available ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                              {d.available ? 'Available' : 'Unavailable'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => toggleAvailability(d.id)}>
                                {d.available ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => deleteDonor(d.id)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {donorPages > 1 && (
                  <div className="flex items-center justify-between border-t border-border p-4">
                    <span className="text-sm text-muted-foreground">Page {donorPage + 1} of {donorPages}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" disabled={donorPage === 0} onClick={() => setDonorPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                      <Button size="sm" variant="outline" disabled={donorPage >= donorPages - 1} onClick={() => setDonorPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="requests">
              <div className="rounded-xl border border-border bg-card">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Blood Group</TableHead>
                        <TableHead className="hidden md:table-cell">Hospital</TableHead>
                        <TableHead className="hidden md:table-cell">City</TableHead>
                        <TableHead>Urgency</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bloodRequests.slice(requestPage * PAGE_SIZE, (requestPage + 1) * PAGE_SIZE).map(r => (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">{r.patientName}</TableCell>
                          <TableCell><span className="rounded bg-accent px-2 py-0.5 font-mono text-xs font-bold text-accent-foreground">{r.bloodGroup}</span></TableCell>
                          <TableCell className="hidden md:table-cell">{r.hospitalName}</TableCell>
                          <TableCell className="hidden md:table-cell">{r.city}</TableCell>
                          <TableCell><Badge className={urgencyStyles[r.urgency]}>{r.urgency}</Badge></TableCell>
                          <TableCell><Badge className={statusStyles[r.status]}>{r.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {requestPages > 1 && (
                  <div className="flex items-center justify-between border-t border-border p-4">
                    <span className="text-sm text-muted-foreground">Page {requestPage + 1} of {requestPages}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" disabled={requestPage === 0} onClick={() => setRequestPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                      <Button size="sm" variant="outline" disabled={requestPage >= requestPages - 1} onClick={() => setRequestPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
