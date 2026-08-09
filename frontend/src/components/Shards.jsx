import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

/* position, scale, spin, solid-red or black-wireframe */
const PIECES = [
  { geo: 'icosahedron', pos: [-3.6, 1.5, -1], scale: 1.7, spin: [0.05, 0.08], solid: false },
  { geo: 'octahedron', pos: [3.4, 0.4, -2], scale: 1.2, spin: [-0.04, 0.09], solid: false },
  { geo: 'tetrahedron', pos: [1.1, -1.9, 0.6], scale: 1.0, spin: [0.09, -0.06], solid: false },
  { geo: 'dodecahedron', pos: [-2.2, -1.6, -2.4], scale: 0.9, spin: [0.06, 0.05], solid: false },
  { geo: 'box', pos: [2.6, 2.2, 0.4], scale: 0.42, spin: [-0.07, 0.1], solid: true },
]

function Piece({ geo, pos, scale, spin, solid }) {
  const ref = useRef()
  useFrame(({ clock }, d) => {
    ref.current.rotation.x += d * spin[0]
    ref.current.rotation.y += d * spin[1]
    /* Each piece bobs on its own offset so the cluster never syncs up */
    ref.current.position.y = pos[1] + Math.sin(clock.getElapsedTime() * 0.28 + pos[0]) * 0.3
  })

  return (
    <mesh ref={ref} position={pos} scale={scale}>
      {geo === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {geo === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {geo === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
      {geo === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
      {geo === 'box' && <boxGeometry args={[1.3, 1.3, 1.3]} />}
      {solid ? (
        <meshStandardMaterial color="#e6002a" roughness={0.35} flatShading />
      ) : (
        <meshBasicMaterial color="#E8E8ED" wireframe />
      )}
    </mesh>
  )
}

export default function Shards() {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6.2], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <directionalLight position={[-4, -2, 2]} intensity={0.5} />
        {PIECES.map((p, i) => (
          <Piece key={i} {...p} />
        ))}
      </Canvas>
    </div>
  )
}
