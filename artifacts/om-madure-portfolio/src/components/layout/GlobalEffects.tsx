import { useEffect, useState } from 'react';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { features } from '@/config/features';

/** Scroll progress and pointer-only cursor embellishment. */
export function GlobalEffects() {
  const { reduced } = useMotionPreference();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); };
  }, []);
  useEffect(() => {
    if (reduced || !features.enableCustomCursor || !matchMedia('(pointer:fine)').matches) return;
    const dot = document.querySelector<HTMLElement>('.cursor-dot');
    const ring = document.querySelector<HTMLElement>('.cursor-ring');
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (dot) { dot.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`; dot.style.opacity = '1'; }
        if (ring) { ring.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`; ring.style.opacity = '1'; }
      });
    };
    const target = (event: Event) => {
      const el = event.target as HTMLElement;
      ring?.classList.toggle('cursor-active', !!el.closest('a,button,input,textarea,[role="button"]'));
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', target, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', target); };
  }, [reduced]);
  return <>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    {!reduced && <><span className="cursor-dot" aria-hidden="true" /><span className="cursor-ring" aria-hidden="true" /></>}
  </>;
}
