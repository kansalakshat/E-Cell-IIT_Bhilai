import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const INK = '#E8E8ED'
const ACCENT = '#e6002a'

/* Slowly tumbling wireframe knot — the centrepiece */
function Knot() {
  const ref = useRef()
  useFrame((_, d) => {
    ref.current.rotation.x += d * 0.12
    ref.current.rotation.y += d * 0.18
  })
  return (
    <mesh ref={ref} scale={1.35}>
      <torusKnotGeometry args={[1.5, 0.42, 140, 24]} />
      <meshBasicMaterial color={INK} wireframe transparent opacity={0.22} />
    </mesh>
  )
}

/* Solid accent core that breathes inside the knot */
function Core() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.scale.setScalar(0.8 + Math.sin(t * 0.9) * 0.06)
    ref.current.rotation.y -= 0.005
    ref.current.rotation.z += 0.002
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={ACCENT} roughness={0.35} metalness={0.1} flatShading />
    </mesh>
  )
}

/* Instanced cubes drifting on orbits */
function Swarm({ count = 70 }) {
  const ref = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        radius: 3.2 + Math.random() * 4.5,
        speed: (Math.random() - 0.5) * 0.35,
        phase: Math.random() * Math.PI * 2,
        y: (Math.random() - 0.5) * 5,
        scale: 0.04 + Math.random() * 0.09,
        tilt: (Math.random() - 0.5) * 0.9,
      })),
    [count]
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    seeds.forEach((s, i) => {
      const a = s.phase + t * s.speed
      dummy.position.set(
        Math.cos(a) * s.radius,
        s.y + Math.sin(a * 1.6) * 0.4,
        Math.sin(a) * s.radius * s.tilt
      )
      dummy.rotation.set(a, a * 1.3, 0)
      dummy.scale.setScalar(s.scale)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={INK} roughness={0.5} />
    </instancedMesh>
  )
}

/* Thin orbit rings */
function Rings() {
  const ref = useRef()
  useFrame((_, d) => {
    ref.current.rotation.z += d * 0.06
  })
  return (
    <group ref={ref} rotation={[Math.PI / 2.4, 0, 0]}>
      <mesh>
        <torusGeometry args={[4.4, 0.006, 6, 120]} />
        <meshBasicMaterial color={INK} transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[0.6, 0.4, 0]}>
        <torusGeometry args={[5.6, 0.005, 6, 120]} />
        <meshBasicMaterial color={INK} transparent opacity={0.14} />
      </mesh>
    </group>
  )
}

/* Leans toward the cursor, drifts with scroll */
function Rig({ children }) {
  const group = useRef()
  const { pointer } = useThree()

  useFrame(() => {
    const scroll = window.scrollY * 0.0006
    group.current.rotation.y += (pointer.x * 0.4 - group.current.rotation.y) * 0.05
    group.current.rotation.x += (-pointer.y * 0.28 + scroll - group.current.rotation.x) * 0.05
    group.current.position.y = -window.scrollY * 0.0015
  })

  return <group ref={group}>{children}</group>
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.5, 10], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 8, 6]} intensity={2.2} />
      <directionalLight position={[-6, -3, 2]} intensity={0.7} />
      <Rig>
        <Knot />
        <Core />
        <Swarm />
        <Rings />
      </Rig>
    </Canvas>
  )
}
