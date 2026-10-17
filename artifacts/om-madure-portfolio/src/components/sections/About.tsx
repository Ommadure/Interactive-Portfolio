import { ArrowUpRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { education } from '@/data/education';
import { certifications } from '@/data/certifications';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { reveal } from '@/animations/variants';

export function About() {
  return <section id="about" className="section about-section" aria-labelledby="about-title">
    <div className="shell">
      <SectionHeading id="about-title" number="01" title="Thoughtful by design." intro="A little context behind the interfaces." />
      <div className="about-layout">
        <motion.div className="about-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <p className="about-lead">{profile.summary}</p>
          <p className="location-line"><MapPin size={15} />{profile.location}</p>
          <a className="text-link" href={profile.sourceRepo} target="_blank" rel="noopener noreferrer" aria-label="View portfolio source code on GitHub, opens in a new tab">View source code <ArrowUpRight size={15} /></a>
        </motion.div>
        <div className="about-credentials">
          {education.map(item => <motion.article key={item.degree} className="credential-card education-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <span className="eyebrow">Education · {item.year}</span><h3>{item.degree}</h3><p>{item.institution}</p><div className="credential-bottom"><span>{item.location}</span><strong>{item.result}</strong></div>
          </motion.article>)}
          <motion.article className="credential-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <span className="eyebrow">Certifications</span><div className="certification-list">{certifications.map(cert => <span className="cert-badge" key={cert.name}><i />{cert.name}<small>{cert.year}</small></span>)}</div>
          </motion.article>
        </div>
      </div>
    </div>
  </section>;
}
