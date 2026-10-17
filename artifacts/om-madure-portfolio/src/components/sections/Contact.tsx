import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, Copy, Github, Linkedin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { submitContact, type ContactData } from '@/services/contact';
import { ContactObject } from '@/components/three/ContactObject';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Errors = Partial<Record<keyof ContactData, string>>;
const validate = (data: ContactData): Errors => ({
  name: data.name.trim().length < 2 ? 'Please enter your name.' : undefined,
  email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? 'Enter a valid email address.' : undefined,
  message: data.message.trim().length < 10 ? 'Your message should be at least 10 characters.' : undefined,
});
export function Contact() {
  const [values, setValues] = useState<ContactData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactData, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const change = (field: keyof ContactData, value: string) => {
    const next = { ...values, [field]: value }; setValues(next);
    if (touched[field]) setErrors(prev => ({ ...prev, [field]: validate(next)[field] }));
  };
  const blur = (field: keyof ContactData) => { setTouched(prev => ({ ...prev, [field]: true })); setErrors(prev => ({ ...prev, [field]: validate(values)[field] })); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); window.setTimeout(() => setCopied(false), 2200); }
    catch { window.location.href = `mailto:${profile.email}`; }
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (honeypot.current?.value) return;
    const nextErrors = validate(values); setErrors(nextErrors); setTouched({ name: true, email: true, message: true });
    if (Object.values(nextErrors).some(Boolean)) return;
    setStatus('loading');
    try {
      await submitContact(values);
      const subject = encodeURIComponent(`Portfolio message from ${values.name}`);
      const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('success');
    } catch { setStatus('error'); }
  };
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title">
    <div className="shell">
      <SectionHeading id="contact-title" number="05" title="Have something in mind?" intro="For an opportunity, a collaboration, or a thoughtful exchange—my inbox is open." />
      <div className="contact-layout">
        <div className="contact-details">
          <span className="eyebrow">Start a conversation</span><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowRight size={20} /></a>
          <button className="copy-email" type="button" onClick={copy}>{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Email copied' : 'Copy email address'}</button>
          {copied && <span className="copy-toast" role="status" aria-live="polite">Email address copied to clipboard</span>}
          <div className="contact-links"><a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)"><Github size={17} />GitHub</a><a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)"><Linkedin size={17} />LinkedIn</a></div>
          <ContactObject />
        </div>
        <motion.form className="contact-form card" onSubmit={submit} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} noValidate>
          <div className="form-heading"><span className="eyebrow">Write a note</span><span className="form-number">01 — 03</span></div>
          <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={event => change('name', event.target.value)} onBlur={() => blur('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Name" />
          {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
          <label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" value={values.email} onChange={event => change('email', event.target.value)} onBlur={() => blur('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="you@example.com" />
          {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
          <label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={4} value={values.message} onChange={event => change('message', event.target.value)} onBlur={() => blur('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="A little about what you have in mind..." />
          {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
          <label className="honeypot" aria-hidden="true">Leave this field empty<input ref={honeypot} tabIndex={-1} autoComplete="off" /></label>
          <button className="btn btn-primary form-submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Preparing message…' : status === 'success' ? 'Message ready' : 'Send a message'}<Send size={15} /></button>
          <p className={`form-feedback ${status}`} role="status">{status === 'success' ? 'Your email app should open with the message ready to send.' : status === 'error' ? 'Something went wrong. Please email me directly.' : 'This opens your email app with a pre-filled message.'}</p>
        </motion.form>
      </div>
    </div>
  </section>;
}
