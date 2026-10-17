import { theme } from '@/config/theme';
import type { Variants } from 'framer-motion';

export const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: theme.durations.reveal, ease: [0.22, 0.8, 0.24, 1] } },
};
export const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
