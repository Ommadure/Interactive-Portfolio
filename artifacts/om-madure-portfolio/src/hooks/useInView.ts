import { useEffect, useRef, useState } from 'react';
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } }, { rootMargin: '-60px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}
