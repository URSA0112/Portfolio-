'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function KnotMesh() {
  const mesh = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mesh.current || !wire.current) return
    const t = state.clock.elapsedTime
    mesh.current.rotation.x = t * 0.08
    mesh.current.rotation.y = t * 0.13
    wire.current.rotation.x = -t * 0.05
    wire.current.rotation.y = -t * 0.09
    mesh.current.rotation.z = THREE.MathUtils.lerp(
      mesh.current.rotation.z,
      state.mouse.x * 0.25,
      0.04
    )
  })

  return (
    <group>
      <mesh ref={mesh} castShadow>
        <torusKnotGeometry args={[1.2, 0.38, 256, 32, 2, 3]} />
        <meshStandardMaterial
          color="#6d28d9"
          emissive="#4c1d95"
          emissiveIntensity={0.9}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      <mesh ref={wire} scale={1.14}>
        <torusKnotGeometry args={[1.2, 0.38, 100, 16, 2, 3]} />
        <meshBasicMaterial wireframe color="#a78bfa" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

function ParticleField({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#7c3aed'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#38bdf8'),
    ]
    for (let i = 0; i < count; i++) {
      const r = 3.8 + Math.random() * 3.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return g
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.04
    ref.current.rotation.x = state.clock.elapsedTime * 0.018
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.028} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x += (state.mouse.x * 1.8 - state.camera.position.x) * 0.04
    state.camera.position.y += (state.mouse.y * 1.2 - state.camera.position.y) * 0.04
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <fog attach="fog" args={['#06060f', 12, 28]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={3} color="#7c3aed" />
      <pointLight position={[-4, -4, -4]} intensity={2} color="#06b6d4" />
      <pointLight position={[0, 0, 3]} intensity={1} color="#a78bfa" />
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
        <KnotMesh />
      </Float>
      <ParticleField />
      <Sparkles count={80} scale={12} size={1.5} speed={0.4} opacity={0.4} color="#a78bfa" />
      <CameraRig />
    </Canvas>
  )
}
