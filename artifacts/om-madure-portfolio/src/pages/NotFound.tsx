import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { profile } from '@/data/profile';
import { Footer } from '@/components/layout/Footer';
export function NotFound() {
  return <main id="main" className="not-found-page"><div className="shell not-found-content"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1 className="display">A missing<br /><span className="gradient-text">pixel.</span></h1><p className="muted">The page you’re looking for isn’t here.</p><Link to="/" className="btn btn-primary"><ArrowLeft size={15} />Back to home</Link><a className="not-found-source" href={profile.sourceRepo} target="_blank" rel="noopener noreferrer">Portfolio source code</a></div><Footer /></main>;
}
export default NotFound;
