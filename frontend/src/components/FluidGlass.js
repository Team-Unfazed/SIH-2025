import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  MeshTransmissionMaterial,
  useGLTF,
  Float,
  Text,
  Sphere,
  Box,
  Cylinder
} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { easing } from 'maath';

// Fallback geometric shapes when models aren't available
const LensGeometry = ({ scale = 0.25, ...materialProps }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      easing.dampE(
        meshRef.current.rotation,
        [Math.sin(state.clock.elapsedTime * 0.5) * 0.1, state.clock.elapsedTime * 0.3, 0],
        0.1,
        delta
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={[scale * 4, scale * 4, scale * 4]}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          distortionScale={0.5}
          temporalDistortion={0.1}
          {...materialProps}
        />
      </mesh>
    </Float>
  );
};

const BarGeometry = ({ scale = 0.3, ...materialProps }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={[scale * 3, scale * 6, scale * 3]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <MeshTransmissionMaterial
          distortionScale={0.8}
          temporalDistortion={0.2}
          {...materialProps}
        />
      </mesh>
    </Float>
  );
};

const CubeGeometry = ({ scale = 0.35, ...materialProps }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={[scale * 3, scale * 3, scale * 3]}>
        <roundedBoxGeometry args={[1, 1, 1]} radius={0.1} smoothness={4} />
        <MeshTransmissionMaterial
          distortionScale={0.3}
          temporalDistortion={0.05}
          {...materialProps}
        />
      </mesh>
    </Float>
  );
};

// Component to load 3D models with fallbacks
const ModelComponent = ({ mode, modelProps, fallbackComponent }) => {
  let modelPath = '';
  
  switch (mode) {
    case 'lens':
      modelPath = '/assets/3d/lens.glb';
      break;
    case 'bar':
      modelPath = '/assets/3d/bar.glb';
      break;
    case 'cube':
      modelPath = '/assets/3d/cube.glb';
      break;
    default:
      modelPath = '/assets/3d/lens.glb';
  }

  try {
    const { scene } = useGLTF(modelPath);
    const meshRef = useRef();

    useFrame((state, delta) => {
      if (meshRef.current) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      }
    });

    return (
      <primitive 
        ref={meshRef}
        object={scene.clone()} 
        scale={modelProps.scale || 1}
      />
    );
  } catch (error) {
    // Fallback to geometric shapes if model loading fails
    return fallbackComponent;
  }
};

// Background particles for ambiance
const Particles = () => {
  const points = useMemo(() => {
    const temp = new Array(150).fill().map(() => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ],
      scale: Math.random() * 0.1 + 0.05
    }));
    return temp;
  }, []);

  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {points.map((point, index) => (
        <mesh key={index} position={point.position} scale={point.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial 
            color={new THREE.Color().setHSL(0.6, 0.8, 0.5)} 
            transparent 
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main Scene component
const Scene = ({ mode, lensProps, barProps, cubeProps }) => {
  let modelProps = {};
  let fallbackComponent = null;

  switch (mode) {
    case 'lens':
      modelProps = { scale: lensProps?.scale || 0.25, ...lensProps };
      fallbackComponent = <LensGeometry {...modelProps} />;
      break;
    case 'bar':
      modelProps = { scale: barProps?.scale || 0.3, ...barProps };
      fallbackComponent = <BarGeometry {...modelProps} />;
      break;
    case 'cube':
      modelProps = { scale: cubeProps?.scale || 0.35, ...cubeProps };
      fallbackComponent = <CubeGeometry {...modelProps} />;
      break;
    default:
      modelProps = { scale: lensProps?.scale || 0.25, ...lensProps };
      fallbackComponent = <LensGeometry {...modelProps} />;
  }

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4F46E5" />
      <spotLight position={[15, 15, 15]} angle={0.3} penumbra={1} intensity={0.8} />
      
      {/* Main glass object */}
      <ModelComponent 
        mode={mode} 
        modelProps={modelProps} 
        fallbackComponent={fallbackComponent} 
      />
      
      {/* Background particles */}
      <Particles />
      
      {/* Environment */}
      <Environment preset="city" background={false} />
      
      {/* Controls */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={10}
      />
    </>
  );
};

// Main FluidGlass component
const FluidGlass = ({ 
  mode = 'lens', 
  lensProps = {
    scale: 0.25,
    ior: 1.15,
    thickness: 5,
    chromaticAberration: 0.1,
    anisotropy: 0.01
  }, 
  barProps = {},
  cubeProps = {},
  backgroundColor = '#0f172a',
  showFPS = false
}) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ 
          background: `linear-gradient(135deg, ${backgroundColor} 0%, #1e293b 100%)`,
          borderRadius: '12px'
        }}
      >
        <color attach="background" args={[backgroundColor]} />
        <fog attach="fog" args={[backgroundColor, 5, 20]} />
        
        <Scene 
          mode={mode} 
          lensProps={lensProps} 
          barProps={barProps} 
          cubeProps={cubeProps} 
        />
      </Canvas>
      
      {/* Mode indicator */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.6)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '500',
        textTransform: 'capitalize',
        backdropFilter: 'blur(10px)'
      }}>
        Mode: {mode}
      </div>
    </div>
  );
};

// Preload models (optional - will fallback to geometry if models don't exist)
try {
  useGLTF.preload('/assets/3d/lens.glb');
  useGLTF.preload('/assets/3d/bar.glb');
  useGLTF.preload('/assets/3d/cube.glb');
} catch (error) {
  console.log('Models not found, using fallback geometry');
}

export default FluidGlass;
