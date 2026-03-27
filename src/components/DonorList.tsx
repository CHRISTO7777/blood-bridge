import { motion } from 'framer-motion';
import { Phone, MapPin, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { donors, type BloodGroup } from '@/data/mockData';

interface DonorListProps {
  filterGroup: BloodGroup | null;
}

const DonorList = ({ filterGroup }: DonorListProps) => {
  const filtered = filterGroup
    ? donors.filter((d) => d.bloodGroup === filterGroup)
    : donors;

  return (
    <section id="donors" className="bg-background px-6 py-16">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          {filterGroup ? `${filterGroup} Donors` : 'All Donors'}
        </h2>
        <p className="mb-8 text-muted-foreground">
          {filtered.length} donor{filtered.length !== 1 ? 's' : ''} found
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No donors found for {filterGroup}</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((donor, i) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-card-foreground">{donor.name}</h3>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {donor.location}
                    </div>
                  </div>
                  <span className="rounded-lg bg-accent px-3 py-1.5 font-mono text-sm font-bold text-accent-foreground">
                    {donor.bloodGroup}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    {donor.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Last: {donor.lastDonation}
                  </span>
                  <span className={`flex items-center gap-1 font-medium ${donor.available ? 'text-success' : 'text-muted-foreground'}`}>
                    {donor.available ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                    {donor.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DonorList;
