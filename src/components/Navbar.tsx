import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Menu, X, Sun, Moon, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Find Donor', path: '/find-donor' },
  { label: 'Register', path: '/register' },
  { label: 'Emergency', path: '/emergency' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'SQL Queries', path: '/sql-queries' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'bg-card/95 backdrop-blur-md shadow-sm border-border' : 'bg-card border-transparent'}`}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Droplets className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">
            Blood<span className="text-primary">Bridge</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {item.label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" onClick={() => setDark(!dark)}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <Link to="/register">
            <Button size="sm" className="hidden md:inline-flex">Register as Donor</Button>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card lg:hidden"
          >
            <div className="space-y-1 p-4">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setDark(!dark)} className="gap-2">
                  {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {dark ? 'Light Mode' : 'Dark Mode'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
