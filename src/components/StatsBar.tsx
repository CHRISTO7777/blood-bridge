import { motion } from 'framer-motion';
import { Users, Droplets, Heart, AlertCircle } from 'lucide-react';
import { stats } from '@/data/mockData';

const items = [
  { label: 'Registered Donors', value: stats.totalDonors.toLocaleString(), icon: Users },
  { label: 'Total Donations', value: stats.totalDonations.toLocaleString(), icon: Droplets },
  { label: 'Lives Saved', value: stats.livesaved.toLocaleString(), icon: Heart },
  { label: 'Active Requests', value: stats.activeRequests.toString(), icon: AlertCircle },
];

const StatsBar = () => (
  <section className="border-b border-border bg-card py-8">
    <div className="container mx-auto max-w-5xl px-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <item.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
            <p className="font-mono text-2xl font-bold text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
