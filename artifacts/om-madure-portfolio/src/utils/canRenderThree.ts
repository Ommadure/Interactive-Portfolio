export function canRenderThree() {
  if (typeof window === 'undefined') return false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return (navigator.hardwareConcurrency || 4) > 2 && !reducedMotion && !saveData &&
    !!document.createElement('canvas').getContext('webgl');
}
