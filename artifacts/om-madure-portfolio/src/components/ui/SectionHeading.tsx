import { motion } from 'framer-motion';
import { reveal } from '@/animations/variants';
export function SectionHeading({ number, title, intro, id }: { number: string; title: string; intro?: string; id: string }) {
  return <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="section-heading">
    <span className="eyebrow">{number} / Selected focus</span><h2 id={id} className="section-title">{title}</h2>{intro && <p className="muted section-intro">{intro}</p>}
  </motion.div>;
}
