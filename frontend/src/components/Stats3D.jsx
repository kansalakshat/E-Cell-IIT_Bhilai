import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function AnimatedCube({ position, color, emissive, label }) {
  const meshRef = useRef()
  const timeRef = useRef(0)

  useFrame(() => {
    if (meshRef.current) {
      timeRef.current += 0.01
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.008
      meshRef.current.position.y = position[1] + Math.sin(timeRef.current) * 0.3
      meshRef.current.scale.z = 0.8 + Math.sin(timeRef.current * 1.5) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <material
        color={color}
        emissive={emissive}
        emissiveIntensity={0.5}
        wireframe={false}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  )
}

function RotatingRing({ radius = 3 }) {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.003
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[radius, 0.1, 32, 100]} />
        <material
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
    </group>
  )
}

export default function Stats3D() {
  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <AnimatedCube
          position={[-4, 0, 0]}
          color="#0066ff"
          emissive="#0066ff"
          label="Startups"
        />
        <AnimatedCube
          position={[0, 0, 0]}
          color="#00d9ff"
          emissive="#00d9ff"
          label="Funding"
        />
        <AnimatedCube
          position={[4, 0, 0]}
          color="#ff6b00"
          emissive="#ff6b00"
          label="Growth"
        />

        <RotatingRing radius={5} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0066ff" />
        <pointLight position={[-10, -10, 10]} intensity={0.8} color="#00d9ff" />
      </Canvas>
    </div>
  )
}
