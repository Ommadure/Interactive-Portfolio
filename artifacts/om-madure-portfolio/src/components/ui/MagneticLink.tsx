import { useMotionValue, useSpring, motion } from 'framer-motion';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> & { children: ReactNode };
/** Small cursor pull for primary links, disabled on touch and reduced-motion contexts. */
export function MagneticLink({ children, ...props }: Props) {
  const { reduced } = useMotionPreference();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 190, damping: 16 });
  const y = useSpring(rawY, { stiffness: 190, damping: 16 });
  return <motion.a {...props} style={{ ...props.style, x: reduced ? 0 : x, y: reduced ? 0 : y }}
    onPointerMove={event => {
      props.onPointerMove?.(event);
      if (reduced || !matchMedia('(pointer:fine)').matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      rawX.set((event.clientX - bounds.left - bounds.width / 2) * .08);
      rawY.set((event.clientY - bounds.top - bounds.height / 2) * .08);
    }}
    onPointerLeave={event => { props.onPointerLeave?.(event); rawX.set(0); rawY.set(0); }}>
    {children}
  </motion.a>;
}
