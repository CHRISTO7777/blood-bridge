import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, UserPlus, AlertTriangle, Heart, Users, Droplets, Activity, ArrowRight, Building2, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stats, bloodGroups, bloodRequests, donors, hospitals } from '@/data/mockData';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';

const AnimatedCounter = ({ value, label, icon: Icon }: { value: number; label: string; icon: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <p className="font-mono text-3xl font-bold text-foreground">{value.toLocaleString()}</p>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </motion.div>
);

const urgencyStyles = {
  critical: 'bg-primary text-primary-foreground',
  high: 'bg-warning text-warning-foreground',
  normal: 'bg-secondary text-secondary-foreground',
};

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden bg-primary px-4 py-20 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-foreground" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary-foreground" />
      </div>
      <div className="container relative mx-auto max-w-6xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/20 animate-pulse-ring">
            <Droplets className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
            Donate Blood, <span className="opacity-80">Save Lives</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/70">
            Blood Donor Management System — Find donors instantly, submit emergency requests,
            and help hospitals connect with life-saving donors.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/find-donor">
              <Button size="lg" variant="secondary" className="gap-2 text-base font-semibold">
                <Search className="h-4 w-4" /> Find Donor
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" className="gap-2 text-base font-semibold bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border-0">
                <UserPlus className="h-4 w-4" /> Become a Donor
              </Button>
            </Link>
            <Link to="/emergency">
              <Button size="lg" variant="outline" className="gap-2 text-base font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <AlertTriangle className="h-4 w-4" /> Emergency Request
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="border-b border-border bg-card py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <AnimatedCounter value={stats.totalDonors} label="Registered Donors" icon={Users} />
          <AnimatedCounter value={stats.totalDonations} label="Total Donations" icon={Droplets} />
          <AnimatedCounter value={stats.livesSaved} label="Lives Saved" icon={Heart} />
          <AnimatedCounter value={stats.activeRequests} label="Active Requests" icon={Activity} />
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="px-4 py-16 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Our platform streamlines the blood donation process from registration to emergency fulfillment.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: UserPlus, title: 'Register as Donor', desc: 'Create your donor profile with blood group, location, and availability status.' },
            { icon: Search, title: 'Find Donors', desc: 'Search donors by blood group, city, and availability with advanced filters.' },
            { icon: Shield, title: 'Emergency Requests', desc: 'Submit urgent blood requests that reach donors and hospitals immediately.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Blood Group Distribution */}
    <section className="bg-muted px-4 py-16">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Blood Groups Available</h2>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {bloodGroups.map((bg) => {
            const count = donors.filter((d) => d.bloodGroup === bg).length;
            return (
              <motion.div
                key={bg}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl border border-border bg-card p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <span className="font-mono text-2xl font-bold text-primary">{bg}</span>
                <p className="text-xs text-muted-foreground mt-1">{count} donors</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Emergency Requests */}
    <section className="px-4 py-16 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary animate-pulse-ring">
              <AlertTriangle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Emergency Requests</h2>
              <p className="text-sm text-muted-foreground">Active blood requirements</p>
            </div>
          </div>
          <Link to="/emergency">
            <Button variant="outline" className="gap-2">View All <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {bloodRequests.filter(r => r.status === 'pending').slice(0, 4).map((req, i) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-primary">{req.bloodGroup}</span>
                <Badge className={urgencyStyles[req.urgency]}>{req.urgency.toUpperCase()}</Badge>
              </div>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {req.hospitalName}</p>
                <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> Required by {req.requiredDate}</p>
                <p className="font-medium text-foreground">Patient: {req.patientName}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Partner Hospitals */}
    <section className="bg-muted px-4 py-16">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-foreground mb-2">Partner Hospitals</h2>
        <p className="text-muted-foreground mb-8">Registered hospitals in our network</p>
        <div className="grid gap-4 md:grid-cols-3">
          {hospitals.map((h, i) => (
            <motion.div key={h.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
              <Building2 className="mb-3 h-5 w-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">{h.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.location}</p>
              <p className="mt-1 text-sm text-muted-foreground">{h.contact}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="px-4 py-20 bg-primary">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Save Lives?</h2>
        <p className="text-primary-foreground/70 mb-8">Register as a donor today and become part of a life-saving network.</p>
        <Link to="/register">
          <Button size="lg" variant="secondary" className="gap-2 text-base font-semibold">
            <Heart className="h-4 w-4" /> Register Now
          </Button>
        </Link>
      </div>
    </section>
  </Layout>
);

export default Index;
