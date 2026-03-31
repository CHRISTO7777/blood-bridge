import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10).max(1000),
});

const Contact = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = () => {
    toast.success('Message sent! We will get back to you soon.');
    form.reset();
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
            <p className="text-muted-foreground mt-2">Have questions? Reach out to us.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Get in Touch</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> contact@bloodbridge.org</p>
                  <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> +91 1800 200 300</p>
                  <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /> New Delhi, India</p>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">About This Project</h3>
                <p className="text-sm text-muted-foreground">
                  This Blood Donor Management System is built as a DBMS academic project demonstrating database design,
                  SQL queries, normalization, and full-stack web development using React and MySQL.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem><FormLabel>Subject</FormLabel><FormControl><Input placeholder="Subject" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Your message..." rows={4} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full gap-2"><Send className="h-4 w-4" /> Send Message</Button>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Contact;
