import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const MODEL_URL = '/models/robot-face.glb'

/* Share of the viewport the model fills. 1 touches the limiting edge; go
   above 1 to let it bleed off screen. */
const FILL = 1
const SPIN = 0.12

export default function RobotFace() {
  const ref = useRef()
  /* Materials untouched — original colours, original gloss. The only
     correction is on the Canvas: `flat` disables ACES tone mapping, which
     is what was tinting the whites cream. */
  const { scene } = useGLTF(MODEL_URL)

  /* Measured rather than guessed: the export's scale and pivot are the
     artist's, so read the bounding box and derive both from it. */
  const { size, center } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    return {
      size: box.getSize(new THREE.Vector3()),
      center: box.getCenter(new THREE.Vector3()),
    }
  }, [scene])

  /* viewport is in world units at the origin, and updates on resize — so
     this refits itself instead of cropping on a different screen. */
  const viewport = useThree((s) => s.viewport)
  const scale = Math.min(viewport.width / size.x, viewport.height / size.y) * FILL

  useFrame((_, d) => {
    ref.current.rotation.y += d * SPIN
  })

  return (
    <group ref={ref}>
      {/* Offsetting by the measured centre puts the model's middle on the
          origin, so the group spins in place rather than orbiting. */}
      <primitive object={scene} scale={scale} position={center.clone().multiplyScalar(-scale)} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)
