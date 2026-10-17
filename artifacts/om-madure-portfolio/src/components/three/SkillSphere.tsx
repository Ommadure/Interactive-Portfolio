import { lazy, Suspense, useEffect, useState } from 'react';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { StaticFallback } from './StaticFallback';
import { CanvasGuard } from './CanvasGuard';
import { canRenderThree } from '@/utils/canRenderThree';
import { features } from '@/config/features';
import { skills } from '@/data/skills';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { scheduleIdle } from '@/utils/scheduleIdle';
const SphereCanvas = lazy(() => import('./scenes/SphereCanvas'));
export function SkillSphere() {
  const { reduced, threeEnabled } = useMotionPreference();
  const mobile = useMediaQuery('(max-width: 767px)');
  const sphereSkills = [...(skills.find(group => group.category === 'Languages')?.items ?? []), ...(skills.find(group => group.category === 'Frontend')?.items ?? [])].slice(0, 25);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (reduced || !threeEnabled || !features.enable3D || !features.enableSkillSphere || mobile || !canRenderThree()) return;
    return scheduleIdle(() => setReady(true), 1600);
  }, [reduced, threeEnabled, mobile]);
  useEffect(() => {
    const node = document.querySelector('.skill-sphere');
    if (!node) return;
    let inViewport = false;
    const observer = new IntersectionObserver(([entry]) => { inViewport = entry.isIntersecting; setVisible(inViewport && document.visibilityState !== 'hidden'); }, { threshold: .1 });
    observer.observe(node);
    const onVisibility = () => setVisible(inViewport && document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  if (mobile) return null;
  if (!features.enableSkillSphere) return null;
  return <div className="skill-sphere" aria-label={`Interactive 3D sphere featuring skills: ${sphereSkills.slice(0, 8).join(', ')}`} role="img">
    {ready && !reduced && threeEnabled ? <CanvasGuard kind="skills"><Suspense fallback={<StaticFallback kind="skills" />}>{visible && <SphereCanvas labels={sphereSkills} />}</Suspense></CanvasGuard> : <StaticFallback kind="skills" />}
  </div>;
}
