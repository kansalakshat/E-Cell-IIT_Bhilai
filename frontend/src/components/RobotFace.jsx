import { useRef, useMemo, useEffect } from 'react'
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
  const { scene } = useGLTF(MODEL_URL)

  /* Strip every reflective property. Sketchfab renders against an
     environment map that makes gloss read as depth; with only direct lights
     here the same materials just produce hotspots. Fully rough and
     non-metallic leaves pure diffuse shading — the form, no shine. */
  useEffect(() => {
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return
      const materials = Array.isArray(o.material) ? o.material : [o.material]
      materials.forEach((m) => {
        if ('roughness' in m) m.roughness = 1
        if ('metalness' in m) m.metalness = 0
        if ('envMapIntensity' in m) m.envMapIntensity = 0
        if ('clearcoat' in m) m.clearcoat = 0
        if ('sheen' in m) m.sheen = 0
        if ('specularIntensity' in m) m.specularIntensity = 0
        if ('reflectivity' in m) m.reflectivity = 0
        m.needsUpdate = true
      })
    })
  }, [scene])

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
