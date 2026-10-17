export function StaticFallback({ kind = 'hero' }: { kind?: 'hero' | 'skills' | 'contact' }) {
  return <div className={`three-fallback three-fallback-${kind}`} aria-hidden="true">
    <div className="fallback-halo" /><div className="fallback-orbit fallback-orbit-one" /><div className="fallback-orbit fallback-orbit-two" />
    <div className="fallback-core" /><i className="fallback-node node-one" /><i className="fallback-node node-two" /><i className="fallback-node node-three" />
  </div>;
}
