import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CanvasGuard } from './CanvasGuard';
import { StaticFallback } from './StaticFallback';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { canRenderThree } from '@/utils/canRenderThree';
import { features } from '@/config/features';
import { scheduleIdle } from '@/utils/scheduleIdle';
const HeroCanvas = lazy(() => import('./scenes/HeroCanvas'));
/** Delays the 3D chunk until idle and pauses the canvas outside the viewport. */
export function HeroScene() {
  const { reduced, threeEnabled } = useMotionPreference();
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, .95]);
  useEffect(() => {
    if (reduced || !threeEnabled || !features.enable3D || !canRenderThree()) return;
    return scheduleIdle(() => setLoad(true), 1400);
  }, [reduced, threeEnabled]);
  useEffect(() => {
    const node = document.querySelector('.hero-visual');
    if (!node) return;
    let inViewport = false;
    const observer = new IntersectionObserver(([entry]) => { inViewport = entry.isIntersecting; setVisible(inViewport && document.visibilityState !== 'hidden'); }, { threshold: 0.05 });
    observer.observe(node);
    const onVisibility = () => setVisible(inViewport && document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  return <motion.div ref={ref} className="hero-visual" style={reduced ? undefined : { y, scale }} aria-hidden="true">
    {!load || reduced || !threeEnabled || !features.enable3D || !canRenderThree() ? <StaticFallback /> : <CanvasGuard kind="hero"><Suspense fallback={<StaticFallback />}>{visible && <HeroCanvas compact={window.innerWidth < 768} />}</Suspense></CanvasGuard>}
    <span className="hero-visual-index">FIG. 01 — UI IN MOTION</span>
  </motion.div>;
}
