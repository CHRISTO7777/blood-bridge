import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus, CheckCircle } from 'lucide-react';
import { bloodGroups, genders, donors, type BloodGroup, type Gender, type Donor } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const schema = z.object({
  name: z.string().trim().min(2, 'Min 2 characters').max(100),
  age: z.coerce.number().min(18, 'Must be 18+').max(65, 'Max age 65'),
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Select gender' }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { required_error: 'Select blood group' }),
  phone: z.string().trim().regex(/^\+?\d[\d\s-]{7,15}$/, 'Enter valid phone'),
  email: z.string().trim().email('Enter valid email'),
  city: z.string().trim().min(2, 'Min 2 characters').max(100),
  lastDonation: z.string().optional(),
  available: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

const Register = () => {
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', email: '', city: '', available: true, lastDonation: '' },
  });

  const onSubmit = (values: FormValues) => {
    const newDonor: Donor = {
      id: `D${String(donors.length + 1).padStart(3, '0')}`,
      name: values.name,
      age: values.age,
      gender: values.gender as Gender,
      bloodGroup: values.bloodGroup as BloodGroup,
      phone: values.phone,
      email: values.email,
      city: values.city,
      available: values.available,
      lastDonation: values.lastDonation || 'Never',
    };
    donors.push(newDonor);
    toast.success(`${values.name} registered successfully!`);
    setSuccess(true);
    form.reset();
  };

  if (success) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-32 px-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground mb-6">Thank you for registering as a blood donor.</p>
            <Button onClick={() => setSuccess(false)}>Register Another Donor</Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <UserPlus className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Donor Registration</h1>
            <p className="text-muted-foreground mt-2">Fill in your details to register as a blood donor</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="Rahul Sharma" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl><Input type="number" placeholder="25" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                        <SelectContent>{genders.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="bloodGroup" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Group</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger></FormControl>
                        <SelectContent>{bloodGroups.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" placeholder="rahul@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl><Input placeholder="Mumbai" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="lastDonation" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Donation Date</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="available" render={({ field }) => (
                  <FormItem className="flex items-center gap-3 rounded-lg border border-border p-4">
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div>
                      <FormLabel className="text-sm font-medium">Available for Donation</FormLabel>
                      <p className="text-xs text-muted-foreground">Toggle your availability status</p>
                    </div>
                  </FormItem>
                )} />
                <Button type="submit" size="lg" className="w-full gap-2">
                  <UserPlus className="h-4 w-4" /> Register as Donor
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Register;
