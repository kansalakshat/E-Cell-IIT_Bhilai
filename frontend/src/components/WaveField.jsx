import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useSceneColors } from '../theme'

const COLS = 26
const ROWS = 26
const GAP = 0.42
const COUNT = COLS * ROWS

/* A grid of instanced pillars that ripples outward from the centre */
function Grid() {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const cells = useMemo(() => {
    const out = []
    for (let x = 0; x < COLS; x++) {
      for (let z = 0; z < ROWS; z++) {
        const px = (x - COLS / 2) * GAP
        const pz = (z - ROWS / 2) * GAP
        out.push({ px, pz, dist: Math.hypot(px, pz) })
      }
    }
    return out
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    cells.forEach((c, i) => {
      const wave = Math.sin(c.dist * 1.1 - t * 1.6)
      const falloff = Math.max(0, 1 - c.dist / 7)
      const h = 0.08 + Math.max(0, wave) * falloff * 1.5
      dummy.position.set(c.px, h / 2, c.pz)
      dummy.scale.set(0.16, h, 0.16)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={useSceneColors().muted} roughness={0.45} metalness={0.05} />
    </instancedMesh>
  )
}

function SlowOrbit() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime() * 0.12
    camera.position.x = Math.sin(t) * 9
    camera.position.z = Math.cos(t) * 9
    camera.position.y = 5.2
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function WaveField() {
  return (
    <div className="h-full w-full">
      <Canvas flat dpr={[1, 1.5]} camera={{ position: [0, 5.2, 9], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 9, 5]} intensity={2.4} />
        <directionalLight position={[-5, 3, -4]} intensity={0.6} />
        <Grid />
        <SlowOrbit />
      </Canvas>
    </div>
  )
}
