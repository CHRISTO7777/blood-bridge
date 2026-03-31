import { Link } from 'react-router-dom';
import { Droplets, Heart, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Droplets className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Blood<span className="text-primary">Bridge</span></span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            A DBMS academic project for Blood Donor Management System. Connecting donors with patients to save lives.
          </p>
          <div className="flex gap-3">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-4 w-4" /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
          <div className="space-y-2">
            {[{ label: 'Find Donor', path: '/find-donor' }, { label: 'Register', path: '/register' }, { label: 'Emergency Request', path: '/emergency' }, { label: 'Dashboard', path: '/dashboard' }].map((l) => (
              <Link key={l.path} to={l.path} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Project */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Project Info</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Subject: DBMS Lab</p>
            <p>Tech: React + MySQL</p>
            <Link to="/sql-queries" className="block hover:text-primary transition-colors">SQL Queries & ER Diagram</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-foreground mb-4">Contact</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> contact@bloodbridge.org</p>
            <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +91 1800 200 300</p>
            <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> New Delhi, India</p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 BloodBridge · DBMS Academic Project</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          Made with <Heart className="h-3 w-3 text-primary fill-primary" /> for saving lives
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
