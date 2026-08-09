import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const COUNT = 132
const INNER = 1.6

/* Radial spokes that pump in and out like a level meter on a dial */
function Spokes() {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const spokes = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        angle: (i / COUNT) * Math.PI * 2,
        phase: (i / COUNT) * Math.PI * 4,
      })),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    spokes.forEach((s, i) => {
      const len = 0.7 + (Math.sin(t * 0.55 + s.phase) * 0.5 + 0.5) * 3.2
      const r = INNER + len / 2
      dummy.position.set(Math.cos(s.angle) * r, 0, Math.sin(s.angle) * r)
      dummy.rotation.set(0, -s.angle, 0)
      dummy.scale.set(len, 0.04, 0.04)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0a0a0b" roughness={0.5} />
    </instancedMesh>
  )
}

function Hub() {
  const ref = useRef()
  useFrame((_, d) => {
    ref.current.rotation.y += d * 0.18
    ref.current.rotation.x += d * 0.08
  })
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#e6002a" roughness={0.35} flatShading />
    </mesh>
  )
}

function Tilt() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime() * 0.07
    camera.position.set(Math.sin(t) * 2.0, 4.6, 5.2)
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Burst() {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 4.6, 5.2], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 9, 4]} intensity={2.3} />
        <directionalLight position={[-6, 2, -3]} intensity={0.6} />
        <Spokes />
        <Hub />
        <Tilt />
      </Canvas>
    </div>
  )
}
