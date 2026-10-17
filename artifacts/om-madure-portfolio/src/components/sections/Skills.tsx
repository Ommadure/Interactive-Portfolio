import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '@/data/skills';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillSphere } from '@/components/three/SkillSphere';
import { features } from '@/config/features';

export function Skills() {
  const [active, setActive] = useState(skills[0].category);
  const selected = skills.find(group => group.category === active) ?? skills[0];
  return <section id="skills" className="section skills-section" aria-labelledby="skills-title">
    <div className="shell">
      <SectionHeading id="skills-title" number="02" title="Tools for the details." intro="From the browser's building blocks to the systems that make them feel effortless." />
      <div className="skills-layout">
        <div className="skills-browser">
          <div className="skill-tabs" role="tablist" aria-label="Skill categories">{skills.map((group, index) => <button role="tab" id={`skill-tab-${index}`} aria-selected={active === group.category} aria-controls="skill-panel" tabIndex={active === group.category ? 0 : -1} key={group.category} onClick={() => setActive(group.category)} onKeyDown={event => {
            if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            const tabs = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
            const current = tabs.indexOf(event.currentTarget);
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
            tabs[next]?.focus(); setActive(skills[next].category);
          }}>{group.category}<span>{String(index + 1).padStart(2, '0')}</span></button>)}</div>
          <div className="skill-panel" role="tabpanel" id="skill-panel" aria-labelledby={`skill-tab-${skills.findIndex(group => group.category === active)}`}>
            <span className="eyebrow">{selected.category} / {selected.items.length} skills</span>
            <AnimatePresence mode="wait"><motion.div key={active} className="skill-chips" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: .25 }}>
              {selected.items.map((item, index) => <motion.span className="skill-chip" key={item} initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .035 }}>{item}</motion.span>)}
            </motion.div></AnimatePresence>
            <p className="skill-footnote">Hover a skill to take a closer look.</p>
          </div>
        </div>
        {features.enableSkillSphere && <div className="sphere-panel"><div className="sphere-caption"><span className="eyebrow">A small constellation</span><span>drag to explore</span></div><SkillSphere /></div>}
      </div>
    </div>
  </section>;
}
