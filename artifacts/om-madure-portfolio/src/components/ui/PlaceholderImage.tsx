import type { CSSProperties } from 'react';
/** A cohesive SVG-free project screenshot placeholder used until real images are supplied. */
export function PlaceholderImage({ title, accent, image }: { title: string; accent: string; image?: string }) {
  if (image) return <div className="project-visual project-image" style={{ '--project-accent': accent } as CSSProperties}><img src={image} alt={`${title} project screenshot`} loading="lazy" decoding="async" /></div>;
  return <div className="project-visual" style={{ '--project-accent': accent } as CSSProperties} role="img" aria-label={`${title} screenshot coming soon`}>
    <div className="visual-orbit visual-orbit-a" /><div className="visual-orbit visual-orbit-b" />
    <div className="visual-window"><span /><span /><span /><div className="visual-sheen" /><strong>{title}</strong><small>Screenshot coming soon</small></div>
    <i className="visual-cross cross-a" /><i className="visual-cross cross-b" />
  </div>;
}
