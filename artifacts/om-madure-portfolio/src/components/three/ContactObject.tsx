import { lazy, Suspense, useEffect, useState } from 'react';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { StaticFallback } from './StaticFallback';
import { CanvasGuard } from './CanvasGuard';
import { canRenderThree } from '@/utils/canRenderThree';
import { features } from '@/config/features';
const ContactCanvas = lazy(() => import('./scenes/ContactCanvas'));
export function ContactObject() {
  const { reduced, threeEnabled } = useMotionPreference();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (reduced || !threeEnabled || !features.enable3D || !canRenderThree()) return;
    const timer = window.setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(timer);
  }, [reduced, threeEnabled]);
  useEffect(() => {
    const node = document.querySelector('.contact-object');
    if (!node) return;
    let inViewport = false;
    const observer = new IntersectionObserver(([entry]) => { inViewport = entry.isIntersecting; setVisible(inViewport && document.visibilityState !== 'hidden'); }, { threshold: .05 });
    observer.observe(node);
    const onVisibility = () => setVisible(inViewport && document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  return <div className="contact-object" aria-hidden="true">{ready && visible && !reduced && threeEnabled && features.enable3D ? <CanvasGuard kind="contact"><Suspense fallback={<StaticFallback kind="contact" />}><ContactCanvas /></Suspense></CanvasGuard> : <StaticFallback kind="contact" />}</div>;
}
