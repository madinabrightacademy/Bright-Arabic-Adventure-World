import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Sparkles as SparklesIcon,
  Play,
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  RotateCw,
  Eye,
  Maximize2,
  CheckCircle2,
  Lock,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  Flame,
  Award,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Navigation as NavIcon,
  Target,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { IslandId, UserProfile, Island } from '../types/game';
import { ISLANDS_DATA, GAMES_CATALOG } from '../data/curriculum';
import { getFriendlyIslandName, getFriendlyLevel } from '../data/skillPedagogy';
import { sound } from '../services/sound';

export interface Island3DConfig {
  id: IslandId;
  order: number;
  position: [number, number, number];
  color: string;
  crystalColor: string;
  crystalEmissive: string;
  accentColor: string;
  scale: number;
  crystalName: string;
  primaryGameId: string;
}

export const ISLAND_CONFIGS: Island3DConfig[] = [
  {
    id: 'HRF',
    order: 1,
    position: [-8.8, 0, 4.4],
    color: '#2dd4bf',
    crystalColor: '#5eead4',
    crystalEmissive: '#14b8a6',
    accentColor: '#0f766e',
    scale: 1.15,
    crystalName: 'Mutiara Teal',
    primaryGameId: 'sand_trace'
  },
  {
    id: 'MFR',
    order: 2,
    position: [-4.4, 0, 8.8],
    color: '#f59e0b',
    crystalColor: '#fbbf24',
    crystalEmissive: '#d97706',
    accentColor: '#b45309',
    scale: 1.25,
    crystalName: 'Kristal Emas-Jingga',
    primaryGameId: 'floating_market'
  },
  {
    id: 'HWR',
    order: 3,
    position: [4.2, 0, 8.4],
    color: '#10b981',
    crystalColor: '#34d399',
    crystalEmissive: '#059669',
    accentColor: '#047857',
    scale: 1.2,
    crystalName: 'Zamrud Hijau',
    primaryGameId: 'dialog_quest'
  },
  {
    id: 'QWD',
    order: 4,
    position: [9.0, 0, 3.6],
    color: '#3b82f6',
    crystalColor: '#60a5fa',
    crystalEmissive: '#2563eb',
    accentColor: '#1d4ed8',
    scale: 1.35,
    crystalName: 'Safir Biru',
    primaryGameId: 'sentence_bridge'
  },
  {
    id: 'IST',
    order: 5,
    position: [8.5, 0, -4.4],
    color: '#8b5cf6',
    crystalColor: '#a78bfa',
    crystalEmissive: '#7c3aed',
    accentColor: '#6d28d9',
    scale: 1.15,
    crystalName: 'Ametis Ungu',
    primaryGameId: 'echo_cave'
  },
  {
    id: 'QRA',
    order: 6,
    position: [4.4, 0, -8.8],
    color: '#e11d48',
    crystalColor: '#f43f5e',
    crystalEmissive: '#be123c',
    accentColor: '#9f1239',
    scale: 1.25,
    crystalName: 'Delima Merah Marun',
    primaryGameId: 'scroll_tap_gloss'
  },
  {
    id: 'KTB',
    order: 7,
    position: [-4.2, 0, -9.0],
    color: '#d97706',
    crystalColor: '#f59e0b',
    crystalEmissive: '#b45309',
    accentColor: '#92400e',
    scale: 1.2,
    crystalName: 'Tinta Emas Kaligrafi',
    primaryGameId: 'imla_lighthouse'
  },
  {
    id: 'KLM',
    order: 8,
    position: [-8.8, 0, -4.0],
    color: '#ea580c',
    crystalColor: '#f97316',
    crystalEmissive: '#c2410c',
    accentColor: '#9a3412',
    scale: 1.25,
    crystalName: 'Kecubung Suara Emas',
    primaryGameId: 'makhraj_mastery'
  },
  {
    id: 'TMH',
    order: 9,
    position: [0, 5.8, -0.6],
    color: '#facc15',
    crystalColor: '#fef08a',
    crystalEmissive: '#eab308',
    accentColor: '#ca8a04',
    scale: 1.45,
    crystalName: 'Mahkota Emas Sempurna',
    primaryGameId: 'mihrab_gate'
  }
];

// 1. REFINED CAMERA CONTROLLER WITH SEAMLESS ORBITING & NO RUBBER-BAND FIGHTING
export interface CameraActionHandle {
  rotateLeft: (angle?: number) => void;
  rotateRight: (angle?: number) => void;
  tiltUp: () => void;
  tiltDown: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
}

interface CameraControllerProps {
  selectedIslandId: IslandId;
  isOverview: boolean;
  isAutoRotate: boolean;
  onRegisterActions?: (handle: CameraActionHandle) => void;
  onUserInteracted?: () => void;
}

const CameraController: React.FC<CameraControllerProps> = ({
  selectedIslandId,
  isOverview,
  isAutoRotate,
  onRegisterActions,
  onUserInteracted
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const isTransitioningRef = useRef<boolean>(true);
  const prevTargetIdRef = useRef<string>('');
  const prevOverviewRef = useRef<boolean>(isOverview);

  const targetIslandConfig = useMemo(() => {
    return ISLAND_CONFIGS.find((c) => c.id === selectedIslandId) || ISLAND_CONFIGS[0];
  }, [selectedIslandId]);

  // Compute desired target camera & lookAt vectors
  const targetCamPos = useMemo(() => {
    if (isOverview) {
      return new THREE.Vector3(24, 28, 24);
    }
    const [ix, iy, iz] = targetIslandConfig.position;
    if (targetIslandConfig.id === 'TMH') {
      return new THREE.Vector3(ix + 6.8, iy + 7.8, iz + 6.8);
    }
    return new THREE.Vector3(ix + 5.6, iy + 5.5, iz + 5.6);
  }, [isOverview, targetIslandConfig]);

  const targetLookAt = useMemo(() => {
    if (isOverview) {
      return new THREE.Vector3(0, 1.2, 0);
    }
    const [ix, iy, iz] = targetIslandConfig.position;
    return new THREE.Vector3(ix, iy + 1.2, iz);
  }, [isOverview, targetIslandConfig]);

  // Trigger glide transition when target changes
  useEffect(() => {
    const key = `${selectedIslandId}-${isOverview}`;
    if (prevTargetIdRef.current !== key) {
      prevTargetIdRef.current = key;
      isTransitioningRef.current = true;
    }
  }, [selectedIslandId, isOverview]);

  // Register external controls (D-Pad, buttons)
  useEffect(() => {
    if (!onRegisterActions) return;

    const handle: CameraActionHandle = {
      rotateLeft: (angle = Math.PI / 8) => {
        if (!controlsRef.current) return;
        isTransitioningRef.current = false;
        const currentAzimuth = controlsRef.current.getAzimuthalAngle();
        controlsRef.current.setAzimuthalAngle(currentAzimuth + angle);
        controlsRef.current.update();
        onUserInteracted?.();
      },
      rotateRight: (angle = Math.PI / 8) => {
        if (!controlsRef.current) return;
        isTransitioningRef.current = false;
        const currentAzimuth = controlsRef.current.getAzimuthalAngle();
        controlsRef.current.setAzimuthalAngle(currentAzimuth - angle);
        controlsRef.current.update();
        onUserInteracted?.();
      },
      tiltUp: () => {
        if (!controlsRef.current) return;
        isTransitioningRef.current = false;
        const currentPolar = controlsRef.current.getPolarAngle();
        controlsRef.current.setPolarAngle(Math.max(Math.PI / 8, currentPolar - 0.18));
        controlsRef.current.update();
        onUserInteracted?.();
      },
      tiltDown: () => {
        if (!controlsRef.current) return;
        isTransitioningRef.current = false;
        const currentPolar = controlsRef.current.getPolarAngle();
        controlsRef.current.setPolarAngle(Math.min(Math.PI / 2.05, currentPolar + 0.18));
        controlsRef.current.update();
        onUserInteracted?.();
      },
      zoomIn: () => {
        if (!controlsRef.current) return;
        isTransitioningRef.current = false;
        camera.position.sub(controlsRef.current.target).multiplyScalar(0.82).add(controlsRef.current.target);
        controlsRef.current.update();
        onUserInteracted?.();
      },
      zoomOut: () => {
        if (!controlsRef.current) return;
        isTransitioningRef.current = false;
        camera.position.sub(controlsRef.current.target).multiplyScalar(1.22).add(controlsRef.current.target);
        controlsRef.current.update();
        onUserInteracted?.();
      },
      resetView: () => {
        isTransitioningRef.current = true;
        onUserInteracted?.();
      }
    };

    onRegisterActions(handle);
  }, [onRegisterActions, camera, onUserInteracted]);

  useFrame((_, delta) => {
    // ONLY lerp during transition mode! Once user interacts or arrives, hand over 100% control to OrbitControls!
    if (isTransitioningRef.current) {
      camera.position.lerp(targetCamPos, Math.min(delta * 3.4, 0.18));

      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt, Math.min(delta * 3.8, 0.22));
        controlsRef.current.update();

        // Check if transition has arrived close enough
        const distToCam = camera.position.distanceTo(targetCamPos);
        const distToLook = controlsRef.current.target.distanceTo(targetLookAt);
        if (distToCam < 0.25 && distToLook < 0.2) {
          isTransitioningRef.current = false;
        }
      }
    } else if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.9}
      zoomSpeed={1.1}
      panSpeed={0.8}
      autoRotate={isAutoRotate}
      autoRotateSpeed={0.2}
      minDistance={6}
      maxDistance={48}
      minPolarAngle={Math.PI / 10}
      maxPolarAngle={Math.PI / 2.04}
      enablePan={true}
      onStart={() => {
        // As soon as user touches or drags, stop transition lock immediately!
        isTransitioningRef.current = false;
        onUserInteracted?.();
      }}
    />
  );
};

// 2. OCEAN & BASE WATER DIORAMA WITH WAVE RINGS
const OceanDisk: React.FC<{ timeOfDay: 'day' | 'sunset' | 'night' }> = ({ timeOfDay }) => {
  const oceanRef = useRef<THREE.Mesh>(null);
  const foamRef = useRef<THREE.Mesh>(null);
  const innerRipplesRef = useRef<THREE.Mesh>(null);

  const waterColor = useMemo(() => {
    switch (timeOfDay) {
      case 'day': return '#0284c7';
      case 'sunset': return '#9f1239';
      case 'night': return '#0c1b33';
    }
  }, [timeOfDay]);

  useFrame((_, delta) => {
    if (oceanRef.current) {
      oceanRef.current.rotation.y += delta * 0.035;
    }
    if (foamRef.current) {
      foamRef.current.rotation.y -= delta * 0.025;
    }
    if (innerRipplesRef.current) {
      innerRipplesRef.current.rotation.y += delta * 0.018;
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* Deep Sea Base Floor */}
      <mesh position={[0, -1.3, 0]} receiveShadow>
        <cylinderGeometry args={[26.5, 26.5, 2.2, 48]} />
        <meshStandardMaterial color="#0369a1" roughness={0.85} />
      </mesh>

      {/* Main Water Mesh */}
      <mesh ref={oceanRef} receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[25, 25, 0.9, 64]} />
        <meshStandardMaterial
          color={waterColor}
          roughness={0.2}
          metalness={0.2}
          transparent
          opacity={0.88}
          flatShading
        />
      </mesh>

      {/* Inner Lagoon Ripple Layer */}
      <mesh ref={innerRipplesRef} position={[0, 0.44, 0]}>
        <ringGeometry args={[10, 23.5, 48]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer Shore Foam Ring */}
      <mesh ref={foamRef} position={[0, 0.46, 0]}>
        <ringGeometry args={[23.2, 24.9, 48]} />
        <meshBasicMaterial color="#bae6fd" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 3. BESPOKE PROCEDURAL BIOMES PER ISLAND
const IslandBiomeFeatures: React.FC<{ id: IslandId }> = ({ id }) => {
  switch (id) {
    case 'HRF':
      // Pulau Huruf: Glowing Turquoise Pearl, Tropical Palm Trees & Alphabet Stele Stones
      return (
        <group position={[0, 2.2, 0]}>
          <Float speed={2} rotationIntensity={0.25} floatIntensity={0.35}>
            <mesh position={[0, 0.7, 0]}>
              <sphereGeometry args={[0.7, 18, 18]} />
              <meshStandardMaterial
                color="#5eead4"
                emissive="#14b8a6"
                emissiveIntensity={0.9}
                roughness={0.15}
                metalness={0.85}
              />
            </mesh>
          </Float>
          {/* Clam shell base */}
          <mesh position={[0, 0.15, 0]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.9, 0.7, 0.25, 8]} />
            <meshStandardMaterial color="#fef08a" roughness={0.6} />
          </mesh>
          {/* 3 Palm Trees */}
          {[0, 2.1, 4.2].map((angle, idx) => (
            <group
              key={idx}
              position={[Math.cos(angle) * 1.35, 0, Math.sin(angle) * 1.35]}
              rotation={[0, angle, 0.16]}
            >
              <mesh position={[0, 0.55, 0]}>
                <cylinderGeometry args={[0.07, 0.13, 1.2, 5]} />
                <meshStandardMaterial color="#78350f" flatShading />
              </mesh>
              <mesh position={[0, 1.2, 0]}>
                <coneGeometry args={[0.65, 0.75, 5]} />
                <meshStandardMaterial color="#15803d" flatShading />
              </mesh>
            </group>
          ))}
          {/* Stele Alphabet Inscribed Stones */}
          {[-0.9, 0.9].map((x, i) => (
            <mesh key={i} position={[x, 0.4, 0.8]} rotation={[0, i === 0 ? 0.3 : -0.3, 0]}>
              <boxGeometry args={[0.3, 0.6, 0.15]} />
              <meshStandardMaterial color="#94a3b8" flatShading />
            </mesh>
          ))}
        </group>
      );

    case 'MFR':
      // Pasar Mufradat: Market Canopies, Wooden Docks & Floating Fruit Boats
      return (
        <group position={[0, 2.2, 0]}>
          <Float speed={2.5} rotationIntensity={0.35} floatIntensity={0.4}>
            <mesh position={[0, 0.8, 0]}>
              <octahedronGeometry args={[0.8, 0]} />
              <meshStandardMaterial
                color="#fbbf24"
                emissive="#d97706"
                emissiveIntensity={1.0}
                roughness={0.2}
              />
            </mesh>
          </Float>
          {/* Market Canopies */}
          {[
            { pos: [0.7, 0.3, 0.6], color: '#ef4444' },
            { pos: [-0.7, 0.3, 0.6], color: '#f59e0b' },
            { pos: [0, 0.3, -0.8], color: '#10b981' }
          ].map((c, i) => (
            <group key={i} position={c.pos as [number, number, number]}>
              <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.6, 4]} />
                <meshStandardMaterial color="#78350f" />
              </mesh>
              <mesh position={[0, 0.65, 0]}>
                <coneGeometry args={[0.5, 0.3, 4]} />
                <meshStandardMaterial color={c.color} flatShading />
              </mesh>
            </group>
          ))}
          {/* Floating boats around island */}
          {[-1.85, 1.85].map((x, i) => (
            <group key={i} position={[x, -1.8, i === 0 ? 0.8 : -0.8]} rotation={[0, i * 1.3, 0]}>
              <mesh>
                <boxGeometry args={[0.65, 0.28, 1.3]} />
                <meshStandardMaterial color="#92400e" flatShading />
              </mesh>
              <mesh position={[0, 0.38, 0]}>
                <boxGeometry args={[0.5, 0.05, 0.85]} />
                <meshStandardMaterial color={i === 0 ? '#ef4444' : '#f59e0b'} />
              </mesh>
            </group>
          ))}
        </group>
      );

    case 'HWR':
      // Kampung Hiwar: Traditional Arabian houses, domes & town square fountain
      return (
        <group position={[0, 2.2, 0]}>
          {[
            { pos: [0, 0, 0], domeColor: '#10b981', scale: 0.95 },
            { pos: [0.95, 0, -0.65], domeColor: '#059669', scale: 0.8 },
            { pos: [-0.9, 0, 0.65], domeColor: '#34d399', scale: 0.85 }
          ].map((h, i) => (
            <group key={i} position={h.pos as [number, number, number]} scale={h.scale}>
              <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[0.9, 0.8, 0.9]} />
                <meshStandardMaterial color="#fef3c7" flatShading />
              </mesh>
              <mesh position={[0, 0.95, 0]}>
                <sphereGeometry args={[0.42, 10, 10]} />
                <meshStandardMaterial color={h.domeColor} flatShading />
              </mesh>
            </group>
          ))}
          {/* Minaret Tower */}
          <group position={[-0.8, 0, -0.8]}>
            <mesh position={[0, 0.9, 0]}>
              <cylinderGeometry args={[0.2, 0.25, 1.8, 6]} />
              <meshStandardMaterial color="#fef3c7" flatShading />
            </mesh>
            <mesh position={[0, 1.9, 0]}>
              <coneGeometry args={[0.26, 0.5, 6]} />
              <meshStandardMaterial color="#059669" flatShading />
            </mesh>
          </group>
        </group>
      );

    case 'QWD':
      // Gunung Qawa'id: Jagged twin peaks, stone arches & nahwu bridge
      return (
        <group position={[0, 2.2, 0]}>
          <mesh position={[-0.7, 1.0, 0]}>
            <coneGeometry args={[1.3, 2.4, 5]} />
            <meshStandardMaterial color="#475569" flatShading />
          </mesh>
          <mesh position={[0.75, 0.8, 0.3]}>
            <coneGeometry args={[1.1, 2.0, 5]} />
            <meshStandardMaterial color="#334155" flatShading />
          </mesh>
          {/* Arch bridge connecting peaks */}
          <mesh position={[0.05, 1.35, 0.15]}>
            <boxGeometry args={[1.4, 0.2, 0.4]} />
            <meshStandardMaterial color="#94a3b8" flatShading />
          </mesh>
          {/* Ancient Tower */}
          <mesh position={[0.05, 1.6, 0.15]}>
            <cylinderGeometry args={[0.18, 0.22, 0.5, 6]} />
            <meshStandardMaterial color="#60a5fa" flatShading />
          </mesh>
        </group>
      );

    case 'IST':
      // Lembah Istima': Canyon pillars & acoustic resonance echo crystals
      return (
        <group position={[0, 2.2, 0]}>
          {[0, 1.57, 3.14, 4.71].map((ang, i) => (
            <mesh
              key={i}
              position={[Math.cos(ang) * 1.25, 0.7, Math.sin(ang) * 1.25]}
            >
              <cylinderGeometry args={[0.2, 0.3, 1.8, 6]} />
              <meshStandardMaterial
                color="#a855f7"
                emissive="#6b21a8"
                emissiveIntensity={0.65}
                flatShading
              />
            </mesh>
          ))}
          {/* Central Resonance Horn */}
          <Float speed={3} rotationIntensity={0.3} floatIntensity={0.3}>
            <mesh position={[0, 0.8, 0]}>
              <torusGeometry args={[0.6, 0.12, 8, 16]} />
              <meshStandardMaterial color="#c084fc" emissive="#7c3aed" emissiveIntensity={0.9} />
            </mesh>
          </Float>
        </group>
      );

    case 'QRA':
      // Perpustakaan Qira'ah: Giant stacked leather books & illuminated scrolls
      return (
        <group position={[0, 2.2, 0]}>
          {[0, 1, 2, 3].map((idx) => (
            <mesh
              key={idx}
              position={[0, 0.2 + idx * 0.34, 0]}
              rotation={[0, idx * 0.28, 0]}
            >
              <boxGeometry args={[1.45 - idx * 0.16, 0.28, 1.15 - idx * 0.1]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#be123c' : '#f43f5e'}
                flatShading
              />
            </mesh>
          ))}
          {/* Floating glowing scroll on top */}
          <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
            <mesh position={[0, 1.7, 0]} rotation={[0.4, 0, 0.2]}>
              <boxGeometry args={[0.8, 0.05, 0.5]} />
              <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={0.8} />
            </mesh>
          </Float>
        </group>
      );

    case 'KTB':
      // Pelabuhan Kitabah: Maritime lighthouse tower with beacon & giant quill
      return (
        <group position={[0, 2.2, 0]}>
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.32, 0.55, 2.2, 8]} />
            <meshStandardMaterial color="#fef08a" flatShading />
          </mesh>
          {/* Lighthouse lantern room */}
          <mesh position={[0, 2.2, 0]}>
            <sphereGeometry args={[0.34, 8, 8]} />
            <meshStandardMaterial color="#facc15" emissive="#f59e0b" emissiveIntensity={1.5} />
          </mesh>
          {/* Wooden jetty pier */}
          <mesh position={[0, 0.2, 1.1]}>
            <boxGeometry args={[0.5, 0.15, 1.2]} />
            <meshStandardMaterial color="#78350f" flatShading />
          </mesh>
        </group>
      );

    case 'KLM':
      // Pulau Kalam: Golden amphitheater steps & orator speech pulpit
      return (
        <group position={[0, 2.2, 0]}>
          {[0, 1, 2].map((idx) => (
            <mesh key={idx} position={[0, 0.18 + idx * 0.32, 0]}>
              <cylinderGeometry args={[1.45 - idx * 0.38, 1.45 - idx * 0.38, 0.3, 8]} />
              <meshStandardMaterial color="#f97316" flatShading />
            </mesh>
          ))}
          {/* Orator's Mimbar Podium */}
          <mesh position={[0, 1.2, 0.4]}>
            <boxGeometry args={[0.45, 0.6, 0.45]} />
            <meshStandardMaterial color="#fbbf24" flatShading />
          </mesh>
        </group>
      );

    case 'TMH':
      // Kuil Langit Adib Agung: Celestial golden archway & billowing clouds
      return (
        <group position={[0, 0.4, 0]}>
          <mesh position={[0, 1.6, 0]}>
            <torusGeometry args={[1.6, 0.26, 8, 18, Math.PI]} />
            <meshStandardMaterial color="#fef08a" emissive="#eab308" emissiveIntensity={1.3} />
          </mesh>
          {/* Golden Pillars */}
          {[-1.6, 1.6].map((x, i) => (
            <mesh key={i} position={[x, 0.7, 0]}>
              <cylinderGeometry args={[0.18, 0.22, 1.6, 8]} />
              <meshStandardMaterial color="#facc15" flatShading />
            </mesh>
          ))}
          {/* Cloud puffs base */}
          {[0, 1.05, 2.1, 3.14, 4.2, 5.24].map((ang, i) => (
            <mesh
              key={i}
              position={[Math.cos(ang) * 2.0, -0.6, Math.sin(ang) * 2.0]}
            >
              <sphereGeometry args={[0.75, 8, 8]} />
              <meshStandardMaterial color="#ffffff" roughness={0.9} transparent opacity={0.88} />
            </mesh>
          ))}
        </group>
      );
  }
};

// 4. INDIVIDUAL 3D ISLAND ITEM (HOVER ELEVATION & BILLBOARD BADGE)
interface Island3DItemProps {
  config: Island3DConfig;
  islandData: Island;
  isSelected: boolean;
  isUnlocked: boolean;
  hasCrystal: boolean;
  onSelect: (id: IslandId) => void;
  onOpenHub: (id: IslandId) => void;
}

const Island3DItem: React.FC<Island3DItemProps> = ({
  config,
  islandData,
  isSelected,
  isUnlocked,
  hasCrystal,
  onSelect,
  onOpenHub
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const friendly = getFriendlyIslandName(config.id);

  const isSkyTemple = config.id === 'TMH';
  const baseHeight = isSkyTemple ? 1.6 : 2.2;
  const baseRadius = isSkyTemple ? 2.5 : 2.3 * config.scale;

  // Hover elevation and smooth animation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = isHovered || isSelected ? 1.08 : 1.0;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      Math.min(delta * 6, 0.25)
    );

    // Subtle elevation when hovered
    const targetY = isHovered ? config.position[1] + 0.35 : config.position[1];
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, Math.min(delta * 6, 0.25));
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
    sound.playPop();
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'default';
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    sound.playSparkle();
    sound.speakArabic(islandData.name_ar);
    onSelect(config.id);
  };

  return (
    <group
      ref={groupRef}
      position={config.position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Island Base Geometry */}
      <mesh
        castShadow
        receiveShadow
        position={[0, isSkyTemple ? 0 : baseHeight / 2 - 0.2, 0]}
      >
        <cylinderGeometry
          args={[baseRadius * 0.9, baseRadius * 1.1, baseHeight, 7]}
        />
        <meshStandardMaterial
          color={isUnlocked ? config.color : '#475569'}
          roughness={0.5}
          metalness={0.1}
          flatShading
        />
      </mesh>

      {/* Shore Sand Ring for Ocean Islands */}
      {!isSkyTemple && (
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry
            args={[baseRadius * 1.25, baseRadius * 1.35, 0.4, 7]}
          />
          <meshStandardMaterial
            color={isUnlocked ? '#fde68a' : '#64748b'}
            roughness={0.8}
            flatShading
          />
        </mesh>
      )}

      {/* Island Biome Features */}
      {isUnlocked && <IslandBiomeFeatures id={config.id} />}

      {/* Floating Crystal Diamond Badge */}
      <Float speed={3} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh position={[0, baseHeight + 1.8, 0]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color={config.crystalColor}
            emissive={config.crystalEmissive}
            emissiveIntensity={hasCrystal ? 1.6 : 0.85}
            roughness={0.15}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Aura Ring when Selected or Hovered */}
      {(isSelected || isHovered) && (
        <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[baseRadius * 1.35, baseRadius * 1.55, 32]} />
          <meshBasicMaterial
            color={isHovered ? '#38bdf8' : '#facc15'}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* 3D FLOATING SELECTION / HOVER CRYSTAL BEACON */}
      {(isHovered || isSelected) && (
        <Float speed={3} rotationIntensity={1.2} floatIntensity={1.5} position={[0, baseHeight + 2.2, 0]}>
          <mesh castShadow>
            <octahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial
              color={isHovered ? '#38bdf8' : '#facc15'}
              emissive={isHovered ? '#0284c7' : '#ca8a04'}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <pointLight color={isHovered ? '#38bdf8' : '#facc15'} intensity={2.5} distance={5} />
        </Float>
      )}
    </group>
  );
};

// 5. ANIMATED SAILING BOATS
const SailingBoats: React.FC = () => {
  const boat1Ref = useRef<THREE.Group>(null);
  const boat2Ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.18;
    if (boat1Ref.current) {
      boat1Ref.current.position.set(Math.sin(t) * 6.5, 0.15, Math.cos(t) * 6.5);
      boat1Ref.current.rotation.y = t + Math.PI;
      boat1Ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 2) * 0.05;
    }
    if (boat2Ref.current) {
      const t2 = t + Math.PI;
      boat2Ref.current.position.set(Math.sin(t2) * 7.2, 0.15, Math.cos(t2) * 7.2);
      boat2Ref.current.rotation.y = t2 + Math.PI;
      boat2Ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 2 + 1) * 0.05;
    }
  });

  return (
    <>
      <group ref={boat1Ref}>
        <mesh>
          <boxGeometry args={[0.5, 0.28, 1.2]} />
          <meshStandardMaterial color="#78350f" flatShading />
        </mesh>
        <mesh position={[0, 0.65, 0.1]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.4, 0.9, 3]} />
          <meshStandardMaterial color="#f8fafc" flatShading />
        </mesh>
      </group>

      <group ref={boat2Ref}>
        <mesh>
          <boxGeometry args={[0.45, 0.26, 1.1]} />
          <meshStandardMaterial color="#92400e" flatShading />
        </mesh>
        <mesh position={[0, 0.6, 0.1]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.35, 0.8, 3]} />
          <meshStandardMaterial color="#fef08a" flatShading />
        </mesh>
      </group>
    </>
  );
};

// 6. ANIMATED HUDHUD COMPANION FLYING
const FlyingHudhud: React.FC = () => {
  const hudhudRef = useRef<THREE.Group>(null);
  const wingLRef = useRef<THREE.Mesh>(null);
  const wingRRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!hudhudRef.current) return;
    const elapsed = clock.getElapsedTime();
    const angle = elapsed * 0.55;
    const rad = 9.2;
    hudhudRef.current.position.set(
      Math.cos(angle) * rad,
      7.5 + Math.sin(elapsed * 2) * 0.8,
      Math.sin(angle) * rad
    );
    hudhudRef.current.rotation.y = -angle + Math.PI / 2;

    if (wingLRef.current && wingRRef.current) {
      wingLRef.current.rotation.x = Math.sin(elapsed * 16) * 0.45;
      wingRRef.current.rotation.x = -Math.sin(elapsed * 16) * 0.45;
    }
  });

  return (
    <group ref={hudhudRef}>
      <mesh>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.24, 0.15, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#d97706" />
      </mesh>
      <mesh ref={wingLRef} position={[0, 0, 0.32]}>
        <boxGeometry args={[0.1, 0.05, 0.4]} />
        <meshStandardMaterial color="#14b8a6" />
      </mesh>
      <mesh ref={wingRRef} position={[0, 0, -0.32]}>
        <boxGeometry args={[0.1, 0.05, 0.4]} />
        <meshStandardMaterial color="#14b8a6" />
      </mesh>
    </group>
  );
};

// 7. MAIN R3F WORLD MAP COMPONENT EXPORT
interface R3FWorldMapProps {
  profile: UserProfile;
  selectedIslandId: IslandId;
  onSelectIsland: (islandId: IslandId) => void;
  onLaunchGame: (gameId: string) => void;
  onOpenIslandHub: (islandId: IslandId) => void;
  onNavigateLearn: () => void;
}

export const R3FWorldMap: React.FC<R3FWorldMapProps> = ({
  profile,
  selectedIslandId,
  onSelectIsland,
  onLaunchGame,
  onOpenIslandHub,
  onNavigateLearn
}) => {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');
  const [isOverview, setIsOverview] = useState(true);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [showControlHint, setShowControlHint] = useState(true);
  const cameraActionsRef = useRef<CameraActionHandle | null>(null);

  // Automatically trigger smooth zoom-in whenever user selects a different island
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsOverview(false);
  }, [selectedIslandId]);

  const selectedIslandData =
    ISLANDS_DATA.find((i) => i.id === selectedIslandId) || ISLANDS_DATA[0];
  const selectedConfig =
    ISLAND_CONFIGS.find((c) => c.id === selectedIslandId) || ISLAND_CONFIGS[0];
  const friendly = getFriendlyIslandName(selectedIslandData.id);
  const hasCrystal = Boolean(profile.crystals[selectedIslandData.id]);
  const isUnlocked = selectedIslandData.minLevel <= profile.level;

  // Next / Previous island navigation
  const currentIndex = ISLAND_CONFIGS.findIndex((c) => c.id === selectedIslandId);

  const handlePrevIsland = () => {
    const prevIdx = (currentIndex - 1 + ISLAND_CONFIGS.length) % ISLAND_CONFIGS.length;
    const prevId = ISLAND_CONFIGS[prevIdx].id;
    sound.playPop();
    setIsOverview(false);
    onSelectIsland(prevId);
  };

  const handleNextIsland = () => {
    const nextIdx = (currentIndex + 1) % ISLAND_CONFIGS.length;
    const nextId = ISLAND_CONFIGS[nextIdx].id;
    sound.playPop();
    setIsOverview(false);
    onSelectIsland(nextId);
  };

  const handleToggleOverview = () => {
    sound.playPop();
    setIsOverview((prev) => !prev);
  };

  // Environment lights based on timeOfDay
  const atmosphereColors = {
    day: { sun: '#fff5e6', sunIntensity: 1.8, amb: '#ffffff', ambIntensity: 0.85, fog: '#bae6fd' },
    sunset: { sun: '#fb923c', sunIntensity: 1.4, amb: '#fda4af', ambIntensity: 0.65, fog: '#f43f5e' },
    night: { sun: '#60a5fa', sunIntensity: 0.7, amb: '#312e81', ambIntensity: 0.4, fog: '#0f172a' }
  };
  const atmo = atmosphereColors[timeOfDay];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-3 border-amber-300 bg-slate-950 flex flex-col">
      {/* 3D R3F Canvas Viewport */}
      <div className="w-full h-[500px] sm:h-[580px] lg:h-[640px] relative touch-none select-none">
        <Canvas
          shadows
          camera={{ position: [24, 28, 24], fov: 42, near: 0.1, far: 1000 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          {/* Fog */}
          <fog attach="fog" args={[atmo.fog, 18, 58]} />

          {/* Lighting */}
          <ambientLight color={atmo.amb} intensity={atmo.ambIntensity} />
          <directionalLight
            castShadow
            position={[22, 36, 22]}
            color={atmo.sun}
            intensity={atmo.sunIntensity}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={10}
            shadow-camera-far={90}
            shadow-camera-left={-25}
            shadow-camera-right={25}
            shadow-camera-top={25}
            shadow-camera-bottom={-25}
          />
          <directionalLight position={[-20, 15, -20]} color="#7dd3fc" intensity={0.45} />

          {/* Isometric Camera Controller */}
          <CameraController
            selectedIslandId={selectedIslandId}
            isOverview={isOverview}
            isAutoRotate={isAutoRotate}
            onRegisterActions={(handle) => {
              cameraActionsRef.current = handle;
            }}
            onUserInteracted={() => {
              if (showControlHint) setShowControlHint(false);
            }}
          />

          {/* Ocean Disk */}
          <OceanDisk timeOfDay={timeOfDay} />

          {/* 8 Islands + Sky Temple */}
          {ISLAND_CONFIGS.map((cfg) => {
            const islData = ISLANDS_DATA.find((i) => i.id === cfg.id) || ISLANDS_DATA[0];
            return (
              <Island3DItem
                key={cfg.id}
                config={cfg}
                islandData={islData}
                isSelected={cfg.id === selectedIslandId && !isOverview}
                isUnlocked={islData.minLevel <= profile.level}
                hasCrystal={Boolean(profile.crystals[cfg.id])}
                onSelect={(id) => {
                  setIsOverview(false);
                  onSelectIsland(id);
                }}
                onOpenHub={onOpenIslandHub}
              />
            );
          })}

          {/* Sailing Boats and Flying Hudhud */}
          <SailingBoats />
          <FlyingHudhud />

          {/* Night Starfield */}
          {timeOfDay === 'night' && (
            <>
              <Stars radius={60} depth={50} count={600} factor={4} saturation={0} fade speed={1} />
              <Sparkles count={50} scale={30} size={2.5} speed={0.4} color="#fef08a" />
            </>
          )}
        </Canvas>

        {/* TOP FLOATING OVERLAY: Atmosphere, Mode & Auto-Rotate Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 text-white pointer-events-auto shadow-md">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-300 flex items-center gap-1">
              <span>🏝️</span> 3D Isometrik
            </span>
            <span className="text-white/30 text-xs">|</span>
            <button
              onClick={() => {
                sound.playPop();
                setIsAutoRotate((prev) => !prev);
              }}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                isAutoRotate ? 'bg-amber-400 text-slate-950 font-black shadow-xs ring-1 ring-amber-300' : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
              title="Putar kepulauan otomatis"
            >
              <RotateCw className="w-3 h-3" />
              <span>{isAutoRotate ? 'Berputar' : 'Auto Putar'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md p-1 rounded-2xl border border-white/20 pointer-events-auto shadow-md">
            <button
              onClick={() => {
                sound.playPop();
                setTimeOfDay('day');
              }}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                timeOfDay === 'day' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Waktu Siang Cerah"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setTimeOfDay('sunset');
              }}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                timeOfDay === 'sunset' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Waktu Senja Emas"
            >
              <Sunset className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setTimeOfDay('night');
              }}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                timeOfDay === 'night' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Waktu Malam Berbintang"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* OVERVIEW CAMERA BUTTON (MACRO VIEW) */}
        <div className="absolute top-14 right-3 pointer-events-auto z-10">
          <button
            onClick={handleToggleOverview}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 backdrop-blur-md border shadow-md transition-all cursor-pointer ${
              isOverview
                ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300/60'
                : 'bg-black/65 text-white border-white/20 hover:bg-black/85'
            }`}
            title="Lihat seluruh kepulauan secara luas"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{isOverview ? 'Fokus Pulau' : 'Peta Luas'}</span>
          </button>
        </div>

        {/* ERGONOMIC ON-SCREEN 3D CAMERA D-PAD & ROTATE CONTROLS */}
        <div className="absolute bottom-3 right-3 pointer-events-auto z-10 flex flex-col items-end gap-1.5">
          {/* Subtle gesture instruction badge */}
          {showControlHint && (
            <div className="bg-black/75 backdrop-blur-md text-[10px] text-amber-200 font-bold px-2.5 py-1 rounded-xl border border-amber-400/30 shadow-md flex items-center gap-1.5">
              <span>👆 Geser layar untuk putar 360°</span>
              <button
                type="button"
                onClick={() => setShowControlHint(false)}
                className="text-white/60 hover:text-white ml-1 text-xs"
              >
                ×
              </button>
            </div>
          )}

          <div className="bg-slate-900/85 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-xl flex items-center gap-1 text-white">
            {/* Rotate Left Button */}
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                cameraActionsRef.current?.rotateLeft();
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 text-amber-300 transition-all cursor-pointer"
              title="Putar kamera ke kiri (↺)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Rotate Right Button */}
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                cameraActionsRef.current?.rotateRight();
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 text-amber-300 transition-all cursor-pointer"
              title="Putar kamera ke kanan (↻)"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <span className="text-white/20 text-xs">|</span>

            {/* Tilt Up */}
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                cameraActionsRef.current?.tiltUp();
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 text-white transition-all cursor-pointer"
              title="Dongak sudut pandang ke atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            {/* Tilt Down */}
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                cameraActionsRef.current?.tiltDown();
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 text-white transition-all cursor-pointer"
              title="Tunduk sudut pandang ke bawah"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <span className="text-white/20 text-xs">|</span>

            {/* Zoom In */}
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                cameraActionsRef.current?.zoomIn();
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 text-white transition-all cursor-pointer"
              title="Perbesar (Zoom In)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Zoom Out */}
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                cameraActionsRef.current?.zoomOut();
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 text-white transition-all cursor-pointer"
              title="Perkecil (Zoom Out)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Reset Camera to Center */}
            <button
              type="button"
              onClick={() => {
                sound.playSparkle();
                cameraActionsRef.current?.resetView();
              }}
              className="p-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black active:scale-95 transition-all cursor-pointer ml-0.5"
              title="Pusat Kepulauan / Reset Posisi"
            >
              <Target className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM FLOATING ISLAND HUD & EXPLORATION DRAWER */}
      <div className="p-3 bg-slate-900 border-t-2 border-amber-300/60 text-white space-y-2.5">
        {/* Active Island Info & Actions */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5">
            {/* Prev Island Arrow */}
            <button
              onClick={handlePrevIsland}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5"
              title="Pulau Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Island Icon & Badge */}
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-300 text-2xl flex items-center justify-center shrink-0">
              {friendly.icon}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-300/30">
                  {getFriendlyLevel(selectedIslandData.minLevel).fullTitle}
                </span>

                {hasCrystal ? (
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> Kristal Diraih
                  </span>
                ) : isUnlocked ? (
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded-full">
                    Tersedia
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Lock className="w-2.5 h-2.5" /> Terkunci
                  </span>
                )}
              </div>

              <h4 className="text-sm font-black font-chibi mt-0.5 text-white flex items-center gap-2">
                <span>{friendly.fullName}</span>
                <span className="font-arabic text-amber-300 text-base">{selectedIslandData.name_ar}</span>
                <button
                  type="button"
                  onClick={() => sound.speakArabic(selectedIslandData.name_ar)}
                  className="w-4 h-4 text-amber-200 hover:text-white transition-colors cursor-pointer"
                  title="Dengarkan lafal"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </h4>
            </div>
          </div>

          {/* Action buttons & Next Arrow */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onOpenIslandHub(selectedIslandData.id)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Buka Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Next Island Arrow */}
            <button
              onClick={handleNextIsland}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
              title="Pulau Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Launch Game & Description */}
        <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-white/10 gap-2">
          <p className="text-[11px] text-slate-300 line-clamp-1 flex-1 leading-snug">
            {selectedIslandData.description}
          </p>

          <button
            type="button"
            onClick={() => onLaunchGame(selectedConfig.primaryGameId)}
            className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer shadow-xs"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Mainkan</span>
          </button>
        </div>

        {/* 8 Islands Navigation Carousel Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none text-[11px] font-bold border-t border-white/10">
          <span className="text-slate-400 shrink-0 text-[10px]">Pilih Pulau:</span>
          {ISLAND_CONFIGS.map((cfg) => {
            const isCurrent = cfg.id === selectedIslandData.id;
            const fr = getFriendlyIslandName(cfg.id);
            return (
              <button
                key={cfg.id}
                onClick={() => {
                  sound.playPop();
                  setIsOverview(false);
                  onSelectIsland(cfg.id);
                }}
                className={`px-2.5 py-1 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                  isCurrent
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs ring-2 ring-amber-300/80'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                <span>{fr.icon}</span>
                <span>{fr.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
