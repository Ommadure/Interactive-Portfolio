import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Building2, MapPin } from 'lucide-react';
import { experience } from '@/data/experience';
import { profile } from '@/data/profile';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 85%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <section id="experience" ref={ref} className="section experience-section" aria-labelledby="experience-title">
    <div className="shell">
      <SectionHeading id="experience-title" number="03" title="Built in the real world." intro="Production work, thoughtful iteration, and the systems around the interface." />
      <div className="experience-layout">
        <aside className="experience-aside"><span className="eyebrow">Selected experience</span><strong>9<span> months</span></strong><p>{profile.title}</p></aside>
        <div className="timeline">
          <div className="timeline-rail"><motion.span style={{ scaleY, transformOrigin: 'top' }} /></div>
          {experience.map(item => <article className="timeline-item" key={`${item.role}-${item.company}`}>
            <span className="timeline-marker" /><div className="timeline-heading"><div><span className="eyebrow">{item.startDate} — {item.endDate}</span><h3>{item.role}</h3><p className="company-line"><Building2 size={14} />{item.company}</p><p className="company-location"><MapPin size={13} />{item.location}</p></div><ArrowUpRight size={19} className="timeline-arrow" /></div>
            <ul>{item.bullets.map((bullet, index) => <motion.li key={bullet} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: Math.min(index * .045, .24) }}>{bullet}</motion.li>)}</ul>
          </article>)}
        </div>
      </div>
    </div>
  </section>;
}
