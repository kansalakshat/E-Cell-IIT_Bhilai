import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const PER_STRAND = 90
const COUNT = PER_STRAND * 2
const TURNS = 3.4
const SPAN = 17
const RADIUS = 1.5

/* Two counter-phased strands of cubes winding around a red spine */
function Strands() {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const nodes = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const strand = i < PER_STRAND ? 0 : 1
        const k = (i % PER_STRAND) / (PER_STRAND - 1)
        return {
          k,
          angle: k * Math.PI * 2 * TURNS + strand * Math.PI,
          x: (k - 0.5) * SPAN,
        }
      }),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    nodes.forEach((n, i) => {
      const a = n.angle + t * 0.16
      dummy.position.set(n.x, Math.cos(a) * RADIUS, Math.sin(a) * RADIUS)
      dummy.rotation.set(a, a * 0.6, 0)
      /* Fatter in the middle, tapering to the ends */
      dummy.scale.setScalar(0.05 + Math.sin(n.k * Math.PI) * 0.075)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#E8E8ED" roughness={0.45} metalness={0.05} />
    </instancedMesh>
  )
}

function Spine() {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.1
  })
  return (
    <mesh ref={ref} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.018, 0.018, SPAN, 6]} />
      <meshStandardMaterial color="#e6002a" roughness={0.4} />
    </mesh>
  )
}

export default function Helix() {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.9, 6.6], fov: 42 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[4, 8, 6]} intensity={2.2} />
        <directionalLight position={[-5, -2, 3]} intensity={0.6} />
        <Strands />
        <Spine />
      </Canvas>
    </div>
  )
}
