import { Clock3, ExternalLink } from 'lucide-react';
import { getDomain } from '@/utils/url';
import type { Project } from '@/types';
import { MagneticLink } from './MagneticLink';

/** Displays a real deployment action or the quiet data-driven placeholder. */
export function DeploymentLink({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (!project.links.live) return <span className={`deploy-soon ${compact ? 'deploy-compact' : ''}`}><Clock3 size={14} />Deployment coming soon</span>;
  return <MagneticLink className={`btn btn-primary demo-link ${compact ? 'demo-compact' : ''}`} href={project.links.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo (opens in a new tab)`}>
    <span className="live-dot" aria-hidden="true" />Live demo <ExternalLink size={14} /><span className="visually-hidden">opens in a new tab</span>
    <small>{getDomain(project.links.live)}</small>
  </MagneticLink>;
}
