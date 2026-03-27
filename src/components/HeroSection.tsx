import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bloodGroups, type BloodGroup } from '@/data/mockData';

interface HeroSectionProps {
  onSearch: (group: BloodGroup | null) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [selected, setSelected] = useState<BloodGroup | null>(null);

  const handleSelect = (group: BloodGroup) => {
    const next = selected === group ? null : group;
    setSelected(next);
    onSearch(next);
  };

  return (
    <section className="relative overflow-hidden bg-primary px-6 py-20 lg:py-28">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-foreground" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary-foreground" />
      </div>

      <div className="container relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/20 animate-pulse-ring">
            <Droplets className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-primary-foreground md:text-6xl">
            Every Drop <span className="opacity-70">Saves a Life</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/70">
            Find blood donors instantly. Connect hospitals with donors in emergencies.
            Be the reason someone lives another day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/50">
            Search by Blood Group
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {bloodGroups.map((group) => (
              <button
                key={group}
                onClick={() => handleSelect(group)}
                className={`rounded-xl px-5 py-3 font-mono text-lg font-bold transition-all duration-200 ${
                  selected === group
                    ? 'bg-primary-foreground text-primary scale-110 shadow-lg'
                    : 'bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
          {selected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6"
            >
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-base font-semibold"
                onClick={() => {
                  document.getElementById('donors')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Search className="h-4 w-4" />
                Find {selected} Donors
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
