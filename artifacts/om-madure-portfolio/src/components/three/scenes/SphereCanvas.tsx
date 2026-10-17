import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
function Labels({ labels }: { labels: string[] }) {
  const group = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const drag = useRef(false);
  const points = useMemo(() => labels.map((label, i) => {
    const phi = Math.acos(-1 + (2 * i) / labels.length);
    const theta = Math.sqrt(labels.length * Math.PI) * phi;
    return { label, position: [Math.cos(theta) * Math.sin(phi) * 1.8, Math.sin(theta) * Math.sin(phi) * 1.8, Math.cos(phi) * 1.8] as [number, number, number] };
  }), [labels]);
  useFrame((_, delta) => { if (group.current && !hover && !drag.current) group.current.rotation.y += delta * .12; });
  return <group ref={group}>
    <mesh onPointerOver={() => setHover(true)} onPointerOut={() => { setHover(false); drag.current = false; }} onPointerDown={event => { event.stopPropagation(); drag.current = true; }} onPointerUp={() => { drag.current = false; }} onPointerMove={event => {
      if (!drag.current || !group.current) return;
      group.current.rotation.y += event.nativeEvent.movementX * .006;
      group.current.rotation.x += event.nativeEvent.movementY * .006;
    }}><sphereGeometry args={[2.28, 14, 10]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} /></mesh>
    {points.map(({ label, position }) => <Html key={label} position={position} center distanceFactor={5}><span className="sphere-label">{label}</span></Html>)}
  </group>;
}
export default function SphereCanvas({ labels }: { labels: string[] }) {
  return <Canvas aria-hidden="true" dpr={[1, 1.5]} frameloop="always" camera={{ position: [0, 0, 5.2], fov: 40 }} gl={{ alpha: true, antialias: false }}><ambientLight intensity={1.4} /><Labels labels={labels} /></Canvas>;
}
