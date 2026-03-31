import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, CheckCircle, ArrowRight, ArrowLeft, User, Droplets, Building2, Phone } from 'lucide-react';
import { bloodGroups, bloodRequests, type BloodRequest } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const schema = z.object({
  patientName: z.string().trim().min(2, 'Min 2 characters').max(100),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { required_error: 'Select blood group' }),
  hospitalName: z.string().trim().min(2, 'Hospital name required').max(200),
  city: z.string().trim().min(2, 'City required').max(100),
  contact: z.string().trim().regex(/^\+?\d[\d\s-]{7,15}$/, 'Enter valid phone'),
  requiredDate: z.string().min(1, 'Date required'),
  urgency: z.enum(['critical', 'high', 'normal'], { required_error: 'Select urgency' }),
});

type FormValues = z.infer<typeof schema>;

const steps = [
  { title: 'Patient Info', icon: User, fields: ['patientName', 'bloodGroup'] as const },
  { title: 'Hospital Details', icon: Building2, fields: ['hospitalName', 'city'] as const },
  { title: 'Contact & Urgency', icon: Phone, fields: ['contact', 'requiredDate', 'urgency'] as const },
];

const Emergency = () => {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { patientName: '', hospitalName: '', city: '', contact: '', requiredDate: '', urgency: undefined },
    mode: 'onChange',
  });

  const nextStep = async () => {
    const fields = steps[step].fields;
    const valid = await form.trigger(fields as any);
    if (valid) setStep(s => Math.min(s + 1, 2));
  };

  const onSubmit = (values: FormValues) => {
    const newReq: BloodRequest = {
      id: `R${String(bloodRequests.length + 1).padStart(3, '0')}`,
      patientName: values.patientName,
      bloodGroup: values.bloodGroup,
      hospitalName: values.hospitalName,
      city: values.city,
      contact: values.contact,
      requiredDate: values.requiredDate,
      urgency: values.urgency,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    bloodRequests.push(newReq);
    toast.success('Emergency request submitted!');
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Request Submitted!</h2>
            <p className="text-muted-foreground mb-6">Your emergency blood request has been recorded.</p>
            <Button onClick={() => { setSuccess(false); setStep(0); }}>Submit Another Request</Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 animate-pulse-ring">
              <AlertTriangle className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Emergency Blood Request</h1>
            <p className="text-muted-foreground mt-2">Submit an urgent blood requirement</p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.title} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {i + 1}
                </div>
                <span className={`text-sm hidden sm:inline ${i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s.title}</span>
                {i < 2 && <div className={`h-0.5 w-8 rounded ${i < step ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 0 && (
                  <div className="space-y-6">
                    <FormField control={form.control} name="patientName" render={({ field }) => (
                      <FormItem><FormLabel>Patient Name</FormLabel><FormControl><Input placeholder="Patient name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="bloodGroup" render={({ field }) => (
                      <FormItem><FormLabel>Blood Group Needed</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger></FormControl>
                          <SelectContent>{bloodGroups.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}</SelectContent>
                        </Select><FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-6">
                    <FormField control={form.control} name="hospitalName" render={({ field }) => (
                      <FormItem><FormLabel>Hospital Name</FormLabel><FormControl><Input placeholder="City General Hospital" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Mumbai" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-6">
                    <FormField control={form.control} name="contact" render={({ field }) => (
                      <FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="requiredDate" render={({ field }) => (
                      <FormItem><FormLabel>Required Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="urgency" render={({ field }) => (
                      <FormItem><FormLabel>Urgency Level</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select urgency" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="critical">🔴 Critical</SelectItem>
                            <SelectItem value="high">🟠 High</SelectItem>
                            <SelectItem value="normal">🟢 Normal</SelectItem>
                          </SelectContent>
                        </Select><FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  {step > 0 ? (
                    <Button type="button" variant="outline" onClick={() => setStep(s => s - 1)} className="gap-2">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                  ) : <div />}
                  {step < 2 ? (
                    <Button type="button" onClick={nextStep} className="gap-2">
                      Next <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="gap-2">
                      <AlertTriangle className="h-4 w-4" /> Submit Emergency Request
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Emergency;
