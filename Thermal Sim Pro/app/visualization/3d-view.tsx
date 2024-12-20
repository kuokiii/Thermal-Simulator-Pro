"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Text, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { LoadingView } from "./loading-view"

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  temperature: number
}

const createTransparentGeometry = (radius: number, height: number, segments: number) => {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const indices = [];

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    positions.push(radius * sinTheta, height / 2, radius * cosTheta);
    positions.push(radius * sinTheta, -height / 2, radius * cosTheta);

    if (i > 0) {
      const base = (i - 1) * 2;
      indices.push(base, base + 1, base + 2);
      indices.push(base + 1, base + 3, base + 2);
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
};

// Different heat exchanger geometries
const exchangerGeometries = {
  counter: {
    createGeometry: () => ({
      outer: createTransparentGeometry(0.5, 2, 32),
      inner: new THREE.CylinderGeometry(0.3, 0.3, 2.2, 32, 1, true)
    }),
    particleMovement: (particle: Particle, flowRate: number) => {
      particle.velocity.set(
        (Math.random() - 0.5) * flowRate * 0.1,
        flowRate * (particle.position.y > 0 ? -1 : 1),
        (Math.random() - 0.5) * flowRate * 0.1
      )
    }
  },
  parallel: {
    createGeometry: () => ({
      outer: new THREE.BoxGeometry(1, 2, 0.5).translate(0, 0, 0.25),
      inner: new THREE.BoxGeometry(0.8, 2.2, 0.3)
    }),
    particleMovement: (particle: Particle, flowRate: number) => {
      particle.velocity.set(
        (Math.random() - 0.5) * flowRate * 0.1,
        flowRate,
        (Math.random() - 0.5) * flowRate * 0.1
      )
    }
  },
  cross: {
    createGeometry: () => {
      const shape = new THREE.Shape()
      shape.moveTo(-0.5, -0.5)
      shape.lineTo(0.5, -0.5)
      shape.lineTo(0.5, 0.5)
      shape.lineTo(-0.5, 0.5)
      shape.closePath()
      const extrudeSettings = {
        steps: 1,
        depth: 2,
        bevelEnabled: false,
      };
      return {
        outer: new THREE.ExtrudeGeometry(shape, extrudeSettings),
        inner: new THREE.BoxGeometry(0.8, 0.8, 2.2)
      }
    },
    particleMovement: (particle: Particle, flowRate: number) => {
      particle.velocity.set(
        flowRate,
        (Math.random() - 0.5) * flowRate * 0.1,
        (Math.random() - 0.5) * flowRate * 0.1
      )
    }
  }
}

function HeatExchanger({ 
  flowRate = 1, 
  temperature = 50,
  type = "counter"
}: {
  flowRate: number
  temperature: number
  type: "counter" | "parallel" | "cross"
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [particles, setParticles] = useState<Particle[]>(() => 
    Array.from({ length: 100 }, () => {
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2;
      return {
        position: new THREE.Vector3(
          Math.cos(theta) * 0.6,
          y,
          Math.sin(theta) * 0.6
        ),
        velocity: new THREE.Vector3(),
        temperature: Math.random() * temperature
      }
    })
  )

  // Update geometry based on type
  const geometry = exchangerGeometries[type].createGeometry()

  useEffect(() => {
    // Update particle velocities when flow rate changes
    setParticles(prev => prev.map(particle => {
      exchangerGeometries[type].particleMovement(particle, flowRate)
      return particle
    }))
  }, [flowRate, type])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Rotate the exchanger slowly
    meshRef.current.rotation.y += delta * 0.1

    // Update particles
    setParticles(prev => prev.map(particle => {
      const speed = flowRate * 0.5; // Adjust this multiplier to control overall speed
      particle.position.add(particle.velocity.clone().multiplyScalar(delta * speed))
      
      // Wrap around boundaries
      if (Math.abs(particle.position.y) > 1) {
        particle.position.y = -Math.sign(particle.position.y) * 1;
      }
      const radius = Math.sqrt(particle.position.x ** 2 + particle.position.z ** 2);
      if (radius < 0.5 || radius > 0.7) {
        const theta = Math.atan2(particle.position.z, particle.position.x);
        particle.position.x = Math.cos(theta) * 0.6;
        particle.position.z = Math.sin(theta) * 0.6;
      }
      
      return particle
    }))
  })

  const getTemperatureColor = (temp: number) => {
    return new THREE.Color().setHSL(
      0.7 - (temp / temperature) * 0.7,
      1,
      0.5
    )
  }

  return (
    <group>
      {/* Outer structure */}
      <mesh ref={meshRef}>
        <primitive object={geometry.outer} />
        <meshStandardMaterial
          color="#444"
          metalness={0.1}
          roughness={0.2}
          transparent={true}
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner structure */}
      <mesh>
        <primitive object={geometry.inner} />
        <meshStandardMaterial
          color="#888"
          metalness={0.6}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Flow particles */}
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position.toArray()}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial
            color={getTemperatureColor(particle.temperature)}
            emissive={getTemperatureColor(particle.temperature)}
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Temperature indicators */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.2}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        {`${temperature}°C`}
      </Text>

      {/* Flow indicators */}
      <group position={[0, 0, 0.6]}>
        <mesh position={[0.7, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 12]} />
          <meshStandardMaterial color="#4ade80" />
        </mesh>
        <Text
          position={[0.7, 0.3, 0]}
          fontSize={0.1}
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
        >
          {`${flowRate.toFixed(1)} m/s`}
        </Text>
      </group>
    </group>
  )
}

function SceneSetup() {
  const { gl, scene } = useThree()

  useEffect(() => {
    gl.setClearColor("#161F25")
    scene.fog = new THREE.Fog("#161F25", 5, 15)
  }, [gl, scene])

  return null
}

export function HeatExchangerView({
  flowRate,
  temperature,
  type = "counter"
}: {
  flowRate: number
  temperature: number
  type: "counter" | "parallel" | "cross"
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingView />
  }

  return (
    <div className="h-full w-full">
      <Suspense fallback={<LoadingView />}>
        <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
          <SceneSetup />
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1}
            intensity={1}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <HeatExchanger 
              flowRate={flowRate} 
              temperature={temperature}
              type={type}
            />
            <Environment preset="studio" />
          </Suspense>
          
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}

