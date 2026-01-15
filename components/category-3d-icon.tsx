"use client"

import type React from "react"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

interface Category3DIconProps {
  categoryId: string
  isActive: boolean
}

function PizzaCone() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.6, 1.2, 32]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
    </group>
  )
}

function LayeredBurger() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
        <meshStandardMaterial color="#ffdd00" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  )
}

function StackedSandwich() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.6]} />
        <meshStandardMaterial color="#d2691e" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.75, 0.1, 0.55]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.75, 0.1, 0.55]} />
        <meshStandardMaterial color="#ffdd00" />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.6]} />
        <meshStandardMaterial color="#d2691e" />
      </mesh>
    </group>
  )
}

function FriedItems() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[-0.3, 0, 0]}>
        <coneGeometry args={[0.25, 0.6, 16]} />
        <meshStandardMaterial color="#ff8c42" />
      </mesh>
      <mesh position={[0.3, 0, 0]}>
        <coneGeometry args={[0.25, 0.6, 16]} />
        <meshStandardMaterial color="#ff8c42" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ff8c42" />
      </mesh>
    </group>
  )
}

function CoffeeCup() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 0.8, 32]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0.5, 0.1, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 32]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
        <meshStandardMaterial color="#6b3410" />
      </mesh>
    </group>
  )
}

function Cake() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
        <meshStandardMaterial color="#c13b1b" />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
        <meshStandardMaterial color="#fff5e1" />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <coneGeometry args={[0.08, 0.3, 16]} />
        <meshStandardMaterial color="#ffdd00" />
      </mesh>
    </group>
  )
}

function GiftBox() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#ff1493" />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.7, 0.1, 0.1]} />
        <meshStandardMaterial color="#ffdd00" />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.7]} />
        <meshStandardMaterial color="#ffdd00" />
      </mesh>
    </group>
  )
}

function Star() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>
    </group>
  )
}

const iconComponents: Record<string, React.ComponentType> = {
  pizzas: PizzaCone,
  burgers: LayeredBurger,
  sandwiches: StackedSandwich,
  appetizers: FriedItems,
  beverages: CoffeeCup,
  desserts: Cake,
  combos: GiftBox,
  specials: Star,
}

export function Category3DIcon({ categoryId, isActive }: Category3DIconProps) {
  const IconComponent = iconComponents[categoryId]

  if (!IconComponent) return null

  return (
    <div className="w-12 h-12 sm:w-16 sm:h-16">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, 5]} intensity={0.6} />
        <IconComponent />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={isActive ? 8 : 4} />
      </Canvas>
    </div>
  )
}
