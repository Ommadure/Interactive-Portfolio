import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
function Cluster({ compact }: { compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2());
  const target = useRef(new THREE.Vector2());
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#72edf0', metalness: .62, roughness: .23, wireframe: true }), []);
  const solid = useMemo(() => new THREE.MeshStandardMaterial({ color: '#927aff', metalness: .6, roughness: .24, transparent: true, opacity: .78 }), []);
  useFrame((state, delta) => {
    if (!group.current) return;
    target.current.set(state.pointer.y * .3, state.pointer.x * .4);
    pointer.current.lerp(target.current, 1 - Math.exp(-delta * 2.4));
    group.current.rotation.x += delta * .12 + pointer.current.x * delta;
    group.current.rotation.y += delta * .18 + pointer.current.y * delta;
    group.current.position.y = Math.sin(state.clock.elapsedTime * .5) * .08;
  });
  return <group ref={group}>
    <mesh material={mat}><icosahedronGeometry args={[1.22, 1]} /></mesh>
    <mesh rotation={[.8, .6, .2]} scale={.49} material={solid}><torusKnotGeometry args={[.75, .08, 72, 8, 2, 3]} /></mesh>
    {!compact && <mesh position={[1.55, .72, -.2]} material={mat}><icosahedronGeometry args={[.22, 0]} /></mesh>}
    {!compact && <mesh position={[-1.45, -.76, .3]} rotation={[.2, .3, .5]} material={solid}><octahedronGeometry args={[.28, 0]} /></mesh>}
  </group>;
}
export default function HeroCanvas({ compact = false }: { compact?: boolean }) {
  return <Canvas aria-hidden="true" dpr={[1, 1.5]} frameloop="always" camera={{ position: [0, 0, 5.3], fov: 42 }} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}>
    <ambientLight intensity={1.1} /><directionalLight position={[2, 3, 4]} intensity={2.1} color="#b1fbff" /><pointLight position={[-3, -1, 2]} intensity={1.4} color="#936bff" /><Cluster compact={compact} />
  </Canvas>;
}
