import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

function FloatingObjects() {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0003
      groupRef.current.rotation.y += 0.0005
      groupRef.current.position.y = Math.sin(Date.now() * 0.0005) * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating tetrahedrons */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * 2) * 3, Math.sin(i * 2) * 2, i * -1]}>
          <tetrahedronGeometry args={[0.8, 0]} />
          <material
            color={['#0066ff', '#00d9ff', '#ff6b00'][i]}
            emissive={['#0066ff', '#00d9ff', '#ff6b00'][i]}
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      ))}

      {/* Central rotating octahedron */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1.2, 0]} />
        <material
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
    </group>
  )
}

function ParticleSystem() {
  const pointsRef = useRef()
  const timeRef = useRef(0)

  useEffect(() => {
    if (!pointsRef.current) return

    const positions = new Float32Array(300 * 3)
    for (let i = 0; i < 300 * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20
    }

    pointsRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
  }, [])

  useFrame(() => {
    timeRef.current += 0.001
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0001
      pointsRef.current.rotation.y += 0.0002
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial color="#0066ff" size={0.08} sizeAttenuation />
    </points>
  )
}

export default function AnimatedBackground() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas>
        <PerspectiveCamera position={[0, 0, 8]} fov={75} />
        <FloatingObjects />
        <ParticleSystem />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#0066ff" />
        <pointLight position={[-10, -10, 10]} intensity={0.6} color="#00d9ff" />
      </Canvas>
    </div>
  )
}

function PerspectiveCamera(props) {
  const cameraRef = useRef()
  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = 8 + Math.sin(Date.now() * 0.0005) * 0.3
    }
  })
  return <perspectiveCamera ref={cameraRef} {...props} />
}
