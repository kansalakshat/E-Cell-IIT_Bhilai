import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export const MODEL_URL = '/models/robot-face.glb'

/* Framing knobs — the model arrives at the artist's own scale and pivot,
   so these are the three values worth touching. */
const SCALE = 4.6
const POSITION = [0, -0.4, 0]
const SPIN = 0.12

export default function RobotFace() {
  const ref = useRef()
  /* Materials are left exactly as authored — no traversal, no overrides —
     so it renders the way it does on Sketchfab. */
  const { scene } = useGLTF(MODEL_URL)

  useFrame((_, d) => {
    ref.current.rotation.y += d * SPIN
  })

  return <primitive ref={ref} object={scene} scale={SCALE} position={POSITION} />
}

useGLTF.preload(MODEL_URL)
