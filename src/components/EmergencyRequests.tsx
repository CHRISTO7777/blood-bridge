import { motion } from 'framer-motion';
import { AlertTriangle, Building2, Clock } from 'lucide-react';
import { bloodRequests, hospitals } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const urgencyStyles = {
  critical: 'bg-primary text-primary-foreground',
  high: 'bg-warning text-warning-foreground',
  normal: 'bg-secondary text-secondary-foreground',
};

const EmergencyRequests = () => (
  <section className="bg-muted px-6 py-16">
    <div className="container mx-auto max-w-5xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary animate-pulse-ring">
          <AlertTriangle className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Emergency Requests</h2>
          <p className="text-sm text-muted-foreground">Active blood requirements from hospitals</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {bloodRequests.map((req, i) => {
          const hospital = hospitals.find((h) => h.id === req.hospitalId);
          return (
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
                <Badge className={urgencyStyles[req.urgency]}>
                  {req.urgency.toUpperCase()}
                </Badge>
              </div>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {hospital?.name ?? 'Unknown Hospital'}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {req.date} · {req.unitsNeeded} unit{req.unitsNeeded > 1 ? 's' : ''} needed
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default EmergencyRequests;
