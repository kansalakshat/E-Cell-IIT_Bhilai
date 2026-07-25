import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

function RotatingCube() {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0015
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.z += 0.001
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <material
        color="#0066ff"
        emissive="#0066ff"
        emissiveIntensity={0.4}
        wireframe
      />
    </mesh>
  )
}

function FloatingOrb() {
  const orbRef = useRef()
  const timeRef = useRef(0)

  useFrame(() => {
    timeRef.current += 0.01
    orbRef.current.position.y = Math.sin(timeRef.current) * 1.5
    orbRef.current.position.x = Math.cos(timeRef.current * 0.5) * 2
  })

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <material
        color="#00d9ff"
        emissive="#00d9ff"
        emissiveIntensity={0.6}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

function RotatingTorus() {
  const torusRef = useRef()

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.x -= 0.002
      torusRef.current.rotation.y -= 0.003
    }
  })

  return (
    <mesh ref={torusRef} position={[-3, 0, 0]}>
      <torusGeometry args={[1.2, 0.4, 16, 100]} />
      <material
        color="#ff6b00"
        emissive="#ff6b00"
        emissiveIntensity={0.3}
        wireframe
      />
    </mesh>
  )
}

function ParticleField() {
  const pointsRef = useRef()

  useEffect(() => {
    const particleCount = 100
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    return () => geometry.dispose()
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial color="#0066ff" size={0.1} />
    </points>
  )
}

export default function Hero3D() {
  useEffect(() => {
    const tl = gsap.timeline()
    tl.from('.hero-title', {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: 'power3.out'
    }, 0.2)
    .from('.hero-subtitle', {
      duration: 1,
      opacity: 0,
      y: 30,
      ease: 'power3.out'
    }, 0.4)
    .from('.hero-button', {
      duration: 0.8,
      opacity: 0,
      scale: 0.8,
      ease: 'back.out'
    }, 0.6)
  }, [])

  return (
    <div className="w-full h-screen relative overflow-hidden bg-dark">
      <Canvas>
        <PerspectiveCamera position={[0, 2, 6]} fov={60} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.5}
          enableZoom={false}
          enablePan={false}
        />
        <RotatingCube />
        <FloatingOrb />
        <RotatingTorus />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#0066ff" />
        <pointLight position={[-10, -10, 10]} intensity={0.8} color="#00d9ff" />
      </Canvas>

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-dark to-dark pointer-events-none"></div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight pointer-events-auto">
          <span className="gradient-text block">Build.</span>
          <span className="text-white block">Innovate.</span>
          <span className="gradient-text block">Lead.</span>
        </h1>
        <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 pointer-events-auto px-4">
          Where Ideas Become Reality – E-Cell IIT Bhilai
        </p>
        <button className="hero-button px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 pointer-events-auto">
          Explore Now
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
