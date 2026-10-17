import { useMemo, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useSpring, type MotionStyle } from 'framer-motion';
import { MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { DeploymentLink } from '@/components/ui/DeploymentLink';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useMotionPreference } from '@/hooks/useMotionPreference';

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const { reduced } = useMotionPreference();
  const spotlightFrame = useRef(0);
  const rotateX = useSpring(0, { stiffness: 140, damping: 18 }); const rotateY = useSpring(0, { stiffness: 140, damping: 18 });
  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (reduced || !matchMedia('(pointer:fine)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const node = event.currentTarget;
    cancelAnimationFrame(spotlightFrame.current);
    spotlightFrame.current = requestAnimationFrame(() => {
      node.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
      node.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
    });
    rotateX.set(((event.clientY - box.top) / box.height - .5) * -8);
    rotateY.set(((event.clientX - box.left) / box.width - .5) * 8);
  };
  const reset = () => { cancelAnimationFrame(spotlightFrame.current); rotateX.set(0); rotateY.set(0); };
  return <motion.article layout initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: .48, delay: index * .06 }} className="project-card" onMouseMove={onMove} onMouseLeave={reset} style={{ rotateX, rotateY, transformPerspective: 950, '--project-accent': project.accentColor } as MotionStyle}>
    <div className="project-spotlight" /><PlaceholderImage title={project.title} accent={project.accentColor} image={project.images[0]} />
    <div className="project-card-content">
      <div className="project-card-top"><span className="project-index">0{projects.indexOf(project) + 1} / PROJECT</span>{project.links.live && <span className="live-status"><i className="live-dot" />Live</span>}</div>
      <h3>{project.title}<span className="project-title-dot">.</span></h3><p>{project.subtitle}</p>
      <div className="project-tech">{project.techStack.slice(0, 5).map(tech => <span key={tech}>{tech}</span>)}{project.techStack.length > 5 && <span>+{project.techStack.length - 5}</span>}</div>
      <div className="project-card-bottom"><Link to={`/projects/${project.slug}`} className="text-link">View details <MoveUpRight size={14} /></Link><DeploymentLink project={project} compact /></div>
    </div>
  </motion.article>;
}
export function Projects() {
  const filters = useMemo(() => ['All', ...new Set(projects.flatMap(project => project.techStack))], []);
  const [filter, setFilter] = useState('All');
  const visible = projects.filter(project => filter === 'All' || project.techStack.includes(filter));
  return <section id="projects" className="section projects-section" aria-labelledby="projects-title">
    <div className="shell">
      <div className="projects-heading-row"><SectionHeading id="projects-title" number="04" title="Interfaces, in production." intro="Selected projects shaped by clear systems, careful states, and useful details." /><div className="project-index-note"><span>{String(projects.length).padStart(2, '0')}</span> CASE STUDIES</div></div>
      <div className="project-filters" role="group" aria-label="Filter projects by technology">{filters.map(item => <button key={item} className={filter === item ? 'filter-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <motion.div layout className="projects-grid"><AnimatePresence mode="popLayout">{visible.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</AnimatePresence></motion.div>
    </div>
  </section>;
}
