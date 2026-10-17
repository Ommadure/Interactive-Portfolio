import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
function Planet() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (ref.current) { ref.current.rotation.y += delta * .12; ref.current.rotation.x += delta * .08; } });
  return <mesh ref={ref}><icosahedronGeometry args={[1, 1]} /><meshStandardMaterial color="#76e9e8" wireframe metalness={.5} roughness={.3} /></mesh>;
}
export default function ContactCanvas() {
  return <Canvas aria-hidden="true" dpr={[1, 1.5]} frameloop="always" camera={{ position: [0, 0, 3.5] }} gl={{ alpha: true, antialias: false }}><ambientLight intensity={1.5} /><pointLight position={[2, 2, 3]} color="#ae8eff" intensity={2} /><Planet /></Canvas>;
}
