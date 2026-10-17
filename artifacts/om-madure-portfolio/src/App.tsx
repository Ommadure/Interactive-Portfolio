import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import { UIProvider } from '@/context/UIContext';
import { Navbar } from '@/components/layout/Navbar';
import { GlobalEffects } from '@/components/layout/GlobalEffects';
import { CommandPalette } from '@/components/command/CommandPalette';
import { ErrorBoundary } from '@/components/error-boundary';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { features } from '@/config/features';
import { theme } from '@/config/theme';
import { scheduleIdle } from '@/utils/scheduleIdle';
const Home = lazy(() => import('@/pages/Home'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function RouteContent() {
  const location = useLocation();
  const { reduced } = useMotionPreference();
  useEffect(() => {
    const project = location.pathname.startsWith('/projects/') ? projects.find(item => item.slug === location.pathname.split('/').pop()) : undefined;
    const title = project ? `${project.title} — ${profile.name}` : location.pathname === '/' ? `${profile.name} — ${profile.title}` : `Page not found — ${profile.name}`;
    const description = project ? `${project.title} — ${project.subtitle}. A project by ${profile.name}, ${profile.title}.` : location.pathname === '/' ? `${profile.tagline} ${profile.summary}` : `The requested page was not found in ${profile.name}'s portfolio.`;
    document.title = title;
    const setMeta = (selector: string, value: string) => { const element = document.querySelector<HTMLMetaElement>(selector); if (element) element.content = value; };
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', `https://YOUR_PORTFOLIO_DOMAIN${location.pathname}`);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://YOUR_PORTFOLIO_DOMAIN${location.pathname}`;
  }, [location.pathname]);
  return <AnimatePresence mode="wait" initial={false}>
    <motion.div key={location.pathname} initial={{ opacity: 0, y: reduced ? 0 : 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -5 }} transition={{ duration: .28 }}>
      <ErrorBoundary resetKey={location.pathname}>
        <Suspense fallback={<div className="route-skeleton" aria-label="Loading page"><span /><span /><span /></div>}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </motion.div>
  </AnimatePresence>;
}
function AppShell() {
  const { reduced } = useMotionPreference();
  useEffect(() => {
    Object.entries(theme.accent).forEach(([key, value]) => document.documentElement.style.setProperty(`--theme-${key}`, value));
    document.documentElement.style.setProperty('--signature-gradient', theme.gradients.signature);
    document.documentElement.style.setProperty('--duration-fast', `${theme.durations.fast}s`);
    document.documentElement.style.setProperty('--duration-base', `${theme.durations.base}s`);
  }, []);
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.title,
      url: 'https://YOUR_PORTFOLIO_DOMAIN/',
      sameAs: [profile.social.github, profile.social.linkedin],
    };
    let script = document.getElementById('person-schema') as HTMLScriptElement | null;
    if (!script) { script = document.createElement('script'); script.id = 'person-schema'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(schema);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('reduced-motion', reduced);
    if (reduced || !features.enableSmoothScroll) return;
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    let cancelled = false;
    const start = async () => {
      const module = await import('lenis');
      if (cancelled) return;
      lenis = new module.default({ autoRaf: false });
      const loop = (time: number) => { lenis?.raf(time); frame = requestAnimationFrame(loop); };
      frame = requestAnimationFrame(loop);
    };
    const cancelIdle = scheduleIdle(() => void start(), 1800);
    return () => { cancelled = true; cancelIdle(); cancelAnimationFrame(frame); lenis?.destroy(); };
  }, [reduced]);
  return <><Navbar /><GlobalEffects /><CommandPalette /><RouteContent /></>;
}
function App() {
  return <ThemeProvider><UIProvider><BrowserRouter><AppShell /></BrowserRouter></UIProvider></ThemeProvider>;
}
export default App;
