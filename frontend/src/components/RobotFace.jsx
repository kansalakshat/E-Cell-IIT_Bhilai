import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export const MODEL_URL = '/models/robot-face.glb'

/* Sketchfab models arrive at whatever scale and pivot the artist used, and
   this one can't be measured until the file is in place — so the framing
   knobs live here rather than being scattered through the JSX. */
const SCALE = 2.6
const POSITION = [0, -0.4, 0]
const SPIN = 0.12

export default function RobotFace() {
  const ref = useRef()
  const { scene } = useGLTF(MODEL_URL)

  /* Sketchfab exports often ship with shadows off and materials flagged
     transparent; both read badly against the hero wash. */
  useEffect(() => {
    scene.traverse((o) => {
      if (!o.isMesh) return
      o.castShadow = false
      o.receiveShadow = false
      if (o.material) o.material.transparent = false
    })
  }, [scene])

  useFrame((_, d) => {
    ref.current.rotation.y += d * SPIN
  })

  return <primitive ref={ref} object={scene} scale={SCALE} position={POSITION} />
}

useGLTF.preload(MODEL_URL)
