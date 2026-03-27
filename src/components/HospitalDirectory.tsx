import { motion } from 'framer-motion';
import { Building2, MapPin, Phone } from 'lucide-react';
import { hospitals } from '@/data/mockData';

const HospitalDirectory = () => (
  <section className="bg-background px-6 py-16">
    <div className="container mx-auto max-w-5xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Partner Hospitals</h2>
      <p className="mb-8 text-muted-foreground">Registered hospitals in our network</p>

      <div className="grid gap-4 md:grid-cols-3">
        {hospitals.map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <Building2 className="mb-3 h-5 w-5 text-primary" />
            <h3 className="font-semibold text-card-foreground">{h.name}</h3>
            <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {h.location}
            </p>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5" /> {h.contact}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HospitalDirectory;
