import { useContext, useEffect, useState } from 'react';
import { UIContext } from '@/context/UIContext';
export function useMotionPreference() {
  const ui = useContext(UIContext);
  const [systemReduced, setSystemReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return { reduced: systemReduced || !!ui?.performanceMode, performanceMode: !!ui?.performanceMode, threeEnabled: ui?.threeEnabled ?? true };
}
