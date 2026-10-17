import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight, Terminal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/profile';
import { HeroScene } from '@/components/three/HeroScene';
import { reveal, stagger } from '@/animations/variants';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { MagneticLink } from '@/components/ui/MagneticLink';

export function Hero() {
  return <section className="hero-section" id="top" aria-labelledby="hero-title">
    <div className="hero-grid noise-grid" aria-hidden="true" />
    <div className="hero-orb hero-orb-a" aria-hidden="true" /><div className="hero-orb hero-orb-b" aria-hidden="true" />
    <div className="shell hero-layout">
      <motion.div className="hero-copy" variants={stagger} initial="hidden" animate="visible">
        <motion.div variants={reveal} className="hero-kicker"><span className="availability-dot" />{profile.title.toUpperCase()}<span className="kicker-rule" />{profile.location.toUpperCase()}</motion.div>
        <motion.p variants={reveal} className="hero-title-label">{profile.title}<span> / 01</span></motion.p>
        <motion.h1 id="hero-title" variants={reveal} className="hero-name display">Om<br /><span>Madure</span><b>.</b></motion.h1>
        <motion.p variants={reveal} className="hero-tagline">{profile.tagline}</motion.p>
        <motion.div variants={reveal} className="hero-actions">
          <MagneticLink className="btn btn-primary magnetic" href="#projects">View projects <MoveUpRight size={16} /></MagneticLink>
          <a className="btn btn-quiet" href={profile.resumePath} download>Download resume <ArrowDown size={15} /></a>
        </motion.div>
        <motion.div variants={reveal} className="hero-stats" aria-label="Career highlights">
          {profile.stats.map((stat, index) => <AnimatedStat key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} index={index} />)}
        </motion.div>
        <motion.div variants={reveal} className="hero-socials" aria-label="Social links">
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile, opens in a new tab"><Github size={16} /><span>GitHub</span></a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile, opens in a new tab"><Linkedin size={16} /><span>LinkedIn</span></a>
          <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}><Mail size={16} /><span>Email</span></a>
          <span className="social-divider" /><a className="palette-shortcut" href="#projects"><Terminal size={14} /> Craft, in the open <ArrowUpRight size={13} /></a>
        </motion.div>
      </motion.div>
      <HeroScene />
    </div>
    <div className="shell hero-bottom"><span>SCROLL TO EXPLORE</span><div className="scroll-line"><i /></div><span>01 — 07</span></div>
  </section>;
}

function AnimatedStat({ label, value, suffix, index }: { label: string; value: number; suffix?: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const { reduced } = useMotionPreference();
  useEffect(() => {
    if (reduced) { setCount(value); return; }
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 950;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(value * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: .2 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, reduced]);
  const rendered = value % 1 ? count.toFixed(1) : Math.floor(count).toString();
  return <div className="hero-stat" style={{ animationDelay: `${index * 90}ms` }}><strong><span ref={ref}>{rendered}</span>{suffix}</strong><small>{label}</small></div>;
}
