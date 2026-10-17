import { ArrowUp, Github, MoveUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { currentYear } from '@/utils/format';
import { getInitials } from '@/utils/format';
export function Footer() {
  return <footer className="site-footer"><div className="shell footer-main">
    <a href="#top" className="footer-brand"><span className="brand-mark">{getInitials(profile.name)}</span><span><strong>{profile.name}</strong><small>{profile.title}</small></span></a>
    <p>{profile.title}</p>
    <div className="footer-links"><a href={profile.social.github} target="_blank" rel="noopener noreferrer"><Github size={15} />GitHub</a><a href={profile.sourceRepo} target="_blank" rel="noopener noreferrer">View source <MoveUpRight size={14} /></a><a className="back-top" href="#top">Back to top <ArrowUp size={14} /></a></div>
  </div><div className="shell footer-bottom"><span>© {currentYear()} {profile.name}</span><span>{profile.location}</span></div></footer>;
}
