import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '@/data/projects';
import { DeploymentLink } from '@/components/ui/DeploymentLink';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Footer } from '@/components/layout/Footer';
import { NotFound } from './NotFound';
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(item => item.slug === slug);
  const currentIndex = projects.findIndex(item => item.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];
  useEffect(() => {
    if (!project) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [project]);
  if (!project) return <NotFound />;
  return <main id="main" className="project-detail-page">
    <section className="detail-hero section" aria-labelledby="detail-title"><div className="shell">
      <Link className="back-link" to="/#projects"><ArrowLeft size={15} />Back to all projects</Link>
      <div className="detail-kicker"><span className="eyebrow">PROJECT / 0{currentIndex + 1}</span><span className="detail-line" /></div>
      <h1 id="detail-title" className="detail-title display">{project.title}<span>.</span></h1><p className="detail-subtitle">{project.subtitle}</p>
      <div className="detail-tech">{project.techStack.map(tech => <span className="chip" key={tech}>{tech}</span>)}</div>
      <div className="detail-links"><DeploymentLink project={project} />{project.links.github ? <a className="btn btn-quiet" href={project.links.github} target="_blank" rel="noopener noreferrer"><Github size={15} />Source code <ArrowUpRight size={14} /></a> : <span className="source-soon"><Github size={14} />Source link coming soon</span>}</div>
      <div className="detail-cover"><PlaceholderImage title={project.title} accent={project.accentColor} image={project.images[0]} /></div>
    </div></section>
    <section className="detail-content section" aria-labelledby="detail-work-title"><div className="shell detail-columns">
      <div><span className="eyebrow">What went into it</span><h2 id="detail-work-title" className="section-title">The work.</h2></div>
      <ol className="highlight-list">{project.highlights.map((highlight, index) => <li key={highlight}><span>0{index + 1}</span><p>{highlight}</p></li>)}</ol>
      <div className="detail-gallery"><span className="eyebrow">Gallery</span><h2 className="section-title">In the interface.</h2>
        {project.images.length > 1 ? <div className="gallery-grid">{project.images.slice(1).map((image, index) => <img key={image} src={image} alt={`${project.title} screenshot ${index + 2}`} loading="lazy" decoding="async" />)}</div> : project.images.length === 1 ? <div className="gallery-grid"><img src={project.images[0]} alt={`${project.title} screenshot`} loading="lazy" decoding="async" /></div> : <div className="gallery-placeholder"><PlaceholderImage title={project.title} accent={project.accentColor} /></div>}
      </div>
    </div></section>
    <section className="detail-next" aria-labelledby="detail-next-title"><div className="shell"><span className="eyebrow">Up next</span><Link to={`/projects/${next.slug}`} id="detail-next-title" className="next-project"><span>{next.title}</span><ArrowRight size={22} /></Link><Link className="text-link" to="/#projects">Back to all projects <ArrowLeft size={14} /></Link></div></section>
    <Footer />
  </main>;
}
