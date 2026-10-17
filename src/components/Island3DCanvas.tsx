import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Sparkles,
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
  Volume2
} from 'lucide-react';
import { IslandId, UserProfile } from '../types/game';
import { ISLANDS_DATA } from '../data/curriculum';
import { getFriendlyIslandName, getFriendlyLevel } from '../data/skillPedagogy';
import { sound } from '../services/sound';

interface Island3DCanvasProps {
  profile: UserProfile;
  selectedIslandId: IslandId;
  onSelectIsland: (islandId: IslandId) => void;
  onLaunchGame: (gameId: string) => void;
  onOpenIslandHub: (islandId: IslandId) => void;
}

interface Island3DConfig {
  id: IslandId;
  position: [number, number, number];
  color: number;
  crystalColor: number;
  accentColor: number;
  scale: number;
}

const ISLAND_CONFIGS: Island3DConfig[] = [
  { id: 'HRF', position: [-8, 0, 5], color: 0x2dd4bf, crystalColor: 0x5eead4, accentColor: 0x14b8a6, scale: 1.1 },
  { id: 'MFR', position: [-4, 0, 8], color: 0xf59e0b, crystalColor: 0xfbbf24, accentColor: 0xd97706, scale: 1.2 },
  { id: 'HWR', position: [3, 0, 8], color: 0x10b981, crystalColor: 0x34d399, accentColor: 0x059669, scale: 1.15 },
  { id: 'QWD', position: [8, 0, 4], color: 0x3b82f6, crystalColor: 0x60a5fa, accentColor: 0x2563eb, scale: 1.3 },
  { id: 'IST', position: [9, 0, -3], color: 0x8b5cf6, crystalColor: 0xa78bfa, accentColor: 0x7c3aed, scale: 1.1 },
  { id: 'QRA', position: [5, 0, -8], color: 0xe11d48, crystalColor: 0xf43f5e, accentColor: 0xbe123c, scale: 1.2 },
  { id: 'KTB', position: [-3, 0, -9], color: 0xd97706, crystalColor: 0xf59e0b, accentColor: 0xb45309, scale: 1.15 },
  { id: 'KLM', position: [-8, 0, -4], color: 0xea580c, crystalColor: 0xf97316, accentColor: 0xc2410c, scale: 1.2 },
  { id: 'TMH', position: [0, 5.5, -0.5], color: 0xfacc15, crystalColor: 0xfef08a, accentColor: 0xeab308, scale: 1.35 } // Sky Temple floats high in the center
];

export const Island3DCanvas: React.FC<Island3DCanvasProps> = ({
  profile,
  selectedIslandId,
  onSelectIsland,
  onLaunchGame,
  onOpenIslandHub
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [hoveredIslandId, setHoveredIslandId] = useState<IslandId | null>(null);
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const islandGroupsRef = useRef<Map<IslandId, THREE.Group>>(new Map());
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const hudhudMeshRef = useRef<THREE.Group | null>(null);
  const boatMeshRef = useRef<THREE.Group | null>(null);
  const lightGroupRef = useRef<THREE.Group | null>(null);
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 18, 22));

  // Pointer drag controls state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 4, radius: 26 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. SCENE & FOG
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x87ceeb, 0.015);

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 18, 22);
    camera.lookAt(0, 0, 0);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear previous canvas if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. LIGHTING
    const lightGroup = new THREE.Group();
    lightGroupRef.current = lightGroup;
    scene.add(lightGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    lightGroup.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.8);
    sunLight.position.set(20, 35, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    lightGroup.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.6);
    fillLight.position.set(-20, 15, -20);
    lightGroup.add(fillLight);

    // 5. OCEAN WATER
    const waterGeometry = new THREE.CylinderGeometry(25, 25, 1, 64);
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
      flatShading: true
    });
    const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
    waterMesh.position.y = -0.5;
    waterMesh.receiveShadow = true;
    scene.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // Outer Sea Floor Disk
    const floorGeo = new THREE.CylinderGeometry(27, 27, 2, 48);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.8 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -1.5;
    scene.add(floorMesh);

    // 6. BUILD PROCEDURAL 3D ISLANDS
    const islandGroups = new Map<IslandId, THREE.Group>();
    islandGroupsRef.current = islandGroups;

    ISLAND_CONFIGS.forEach((cfg) => {
      const islandGroup = new THREE.Group();
      islandGroup.position.set(...cfg.position);
      islandGroup.userData = { islandId: cfg.id };

      // Island base geometry (faceted cone/cylinder base)
      const isSkyTemple = cfg.id === 'TMH';
      const baseHeight = isSkyTemple ? 1.5 : 2.2;
      const baseRadius = isSkyTemple ? 2.5 : 2.2 * cfg.scale;

      const baseGeo = new THREE.CylinderGeometry(baseRadius * 0.9, baseRadius * 1.1, baseHeight, 7);
      const baseMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.5,
        metalness: 0.1,
        flatShading: true
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      baseMesh.position.y = isSkyTemple ? 0 : baseHeight / 2 - 0.2;
      islandGroup.add(baseMesh);

      // Sandy/Rock shoreline ring around water
      if (!isSkyTemple) {
        const shoreGeo = new THREE.CylinderGeometry(baseRadius * 1.25, baseRadius * 1.35, 0.4, 7);
        const shoreMat = new THREE.MeshStandardMaterial({
          color: 0xfde68a,
          roughness: 0.8,
          flatShading: true
        });
        const shoreMesh = new THREE.Mesh(shoreGeo, shoreMat);
        shoreMesh.position.y = 0.2;
        islandGroup.add(shoreMesh);
      }

      // Biome-specific landmark meshes
      if (cfg.id === 'HRF') {
        // Pulau Huruf: White sands, lagoon, giant glowing crystal pearl
        const pearlGeo = new THREE.SphereGeometry(0.7, 16, 16);
        const pearlMat = new THREE.MeshStandardMaterial({
          color: 0x5eead4,
          emissive: 0x14b8a6,
          emissiveIntensity: 0.6,
          roughness: 0.1,
          metalness: 0.9
        });
        const pearlMesh = new THREE.Mesh(pearlGeo, pearlMat);
        pearlMesh.position.y = 2.4;
        islandGroup.add(pearlMesh);

        // Palm trees
        for (let i = 0; i < 3; i++) {
          const angle = (i * Math.PI * 2) / 3;
          const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.12, 1.2, 5),
            new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true })
          );
          trunk.position.set(Math.cos(angle) * 1.2, 1.9, Math.sin(angle) * 1.2);
          trunk.rotation.z = 0.15;
          const leaves = new THREE.Mesh(
            new THREE.ConeGeometry(0.6, 0.8, 5),
            new THREE.MeshStandardMaterial({ color: 0x15803d, flatShading: true })
          );
          leaves.position.y = 0.7;
          trunk.add(leaves);
          islandGroup.add(trunk);
        }
      } else if (cfg.id === 'MFR') {
        // Pasar Mufradat: Market boats, canopies & amber crystal
        const crystalGeo = new THREE.OctahedronGeometry(0.8, 0);
        const crystalMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          emissive: 0xd97706,
          emissiveIntensity: 0.7,
          roughness: 0.2
        });
        const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
        crystalMesh.position.y = 2.5;
        islandGroup.add(crystalMesh);

        // 2 small floating wooden boats near island
        for (let i = 0; i < 2; i++) {
          const boat = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.25, 1.2),
            new THREE.MeshStandardMaterial({ color: 0x92400e, flatShading: true })
          );
          boat.position.set(i === 0 ? 2.5 : -2.5, 0.2, i === 0 ? 0.5 : -0.5);
          boat.rotation.y = i * 1.2;
          islandGroup.add(boat);
        }
      } else if (cfg.id === 'HWR') {
        // Kampung Hiwar: White Arab houses with domes
        for (let i = 0; i < 3; i++) {
          const house = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.7, 0.8),
            new THREE.MeshStandardMaterial({ color: 0xfef3c7, flatShading: true })
          );
          const dome = new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 8, 8),
            new THREE.MeshStandardMaterial({ color: 0x10b981, flatShading: true })
          );
          dome.position.y = 0.45;
          house.add(dome);
          house.position.set(i === 0 ? 0 : i === 1 ? 0.9 : -0.8, 2.2, i === 2 ? 0.6 : -0.4);
          islandGroup.add(house);
        }
      } else if (cfg.id === 'QWD') {
        // Gunung Qawa'id: Twin peaks & stone bridge
        const peak1 = new THREE.Mesh(
          new THREE.ConeGeometry(1.2, 2.4, 5),
          new THREE.MeshStandardMaterial({ color: 0x475569, flatShading: true })
        );
        peak1.position.set(-0.6, 2.6, 0);
        const peak2 = new THREE.Mesh(
          new THREE.ConeGeometry(1.0, 1.9, 5),
          new THREE.MeshStandardMaterial({ color: 0x334155, flatShading: true })
        );
        peak2.position.set(0.7, 2.4, 0.3);
        const bridge = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 0.15, 0.3),
          new THREE.MeshStandardMaterial({ color: 0x94a3b8, flatShading: true })
        );
        bridge.position.set(0.1, 2.8, 0.15);
        islandGroup.add(peak1, peak2, bridge);
      } else if (cfg.id === 'IST') {
        // Lembah Istima': Mystical canyon & glowing crystal pillars
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI * 2) / 4;
          const pillar = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.3, 1.8, 6),
            new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x6b21a8, emissiveIntensity: 0.5, flatShading: true })
          );
          pillar.position.set(Math.cos(angle) * 1.1, 2.4, Math.sin(angle) * 1.1);
          islandGroup.add(pillar);
        }
      } else if (cfg.id === 'QRA') {
        // Perpustakaan Qira'ah: Towering ancient books
        for (let i = 0; i < 4; i++) {
          const book = new THREE.Mesh(
            new THREE.BoxGeometry(1.4 - i * 0.2, 0.25, 1.1 - i * 0.15),
            new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0xbe123c : 0xf43f5e, flatShading: true })
          );
          book.position.set(0, 2.1 + i * 0.3, 0);
          book.rotation.y = i * 0.2;
          islandGroup.add(book);
        }
      } else if (cfg.id === 'KTB') {
        // Pelabuhan Kitabah: Lighthouse tower with spinning light
        const lighthouse = new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.5, 2.2, 8),
          new THREE.MeshStandardMaterial({ color: 0xfef08a, flatShading: true })
        );
        lighthouse.position.set(0, 2.8, 0);
        const topLight = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 8, 8),
          new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 1.2 })
        );
        topLight.position.y = 1.2;
        lighthouse.add(topLight);
        islandGroup.add(lighthouse);
      } else if (cfg.id === 'KLM') {
        // Pulau Kalam: Golden amphitheater steps & pulpit
        for (let i = 0; i < 3; i++) {
          const ring = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5 - i * 0.4, 1.5 - i * 0.4, 0.3, 8),
            new THREE.MeshStandardMaterial({ color: 0xf97316, flatShading: true })
          );
          ring.position.y = 2.0 + i * 0.3;
          islandGroup.add(ring);
        }
      } else if (cfg.id === 'TMH') {
        // Kuil Langit: Celestial golden mihrab arch & floating clouds
        const arch = new THREE.Mesh(
          new THREE.TorusGeometry(1.4, 0.25, 8, 16, Math.PI),
          new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xeab308, emissiveIntensity: 0.8 })
        );
        arch.position.y = 2.2;
        islandGroup.add(arch);

        // Fluffy cloud spheres around bottom
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI * 2) / 6;
          const cloud = new THREE.Mesh(
            new THREE.SphereGeometry(0.7, 8, 8),
            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, transparent: true, opacity: 0.85 })
          );
          cloud.position.set(Math.cos(angle) * 1.8, -0.6, Math.sin(angle) * 1.8);
          islandGroup.add(cloud);
        }
      }

      scene.add(islandGroup);
      islandGroups.set(cfg.id, islandGroup);
    });

    // 7. ANIMATED COMPANION HUDHUD
    const hudhudGroup = new THREE.Group();
    const hudhudBody = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.4 })
    );
    const hudhudHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xd97706 })
    );
    hudhudHead.position.set(0.25, 0.15, 0);
    const hudhudWingL = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.05, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x14b8a6 })
    );
    hudhudWingL.position.set(0, 0, 0.3);
    const hudhudWingR = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.05, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x14b8a6 })
    );
    hudhudWingR.position.set(0, 0, -0.3);
    hudhudGroup.add(hudhudBody, hudhudHead, hudhudWingL, hudhudWingR);
    hudhudGroup.position.set(0, 8, 0);
    scene.add(hudhudGroup);
    hudhudMeshRef.current = hudhudGroup;

    // 8. ANIMATED SAILING BOAT ON OCEAN
    const boatGroup = new THREE.Group();
    const hull = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.3, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x78350f, flatShading: true })
    );
    const sail = new THREE.Mesh(
      new THREE.ConeGeometry(0.4, 0.9, 3),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, flatShading: true })
    );
    sail.position.set(0, 0.6, 0.1);
    sail.rotation.y = Math.PI / 4;
    boatGroup.add(hull, sail);
    boatGroup.position.set(-6, 0.2, 2);
    scene.add(boatGroup);
    boatMeshRef.current = boatGroup;

    // 9. STARFIELD (Visible in Night Mode)
    const starGeo = new THREE.BufferGeometry();
    const starCount = 300;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 80;
      starPos[i + 1] = Math.random() * 40 + 10;
      starPos[i + 2] = (Math.random() - 0.5) * 80;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.4, transparent: true, opacity: 0.8 });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    setIsCanvasLoaded(true);

    // 10. ANIMATION TICK LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle water ripple rotation
      if (waterMeshRef.current) {
        waterMeshRef.current.rotation.y = elapsedTime * 0.02;
      }

      // Hudhud flying orbit
      if (hudhudMeshRef.current) {
        const hudAngle = elapsedTime * 0.6;
        const radius = 9;
        hudhudMeshRef.current.position.set(
          Math.cos(hudAngle) * radius,
          7 + Math.sin(elapsedTime * 2) * 0.8,
          Math.sin(hudAngle) * radius
        );
        hudhudMeshRef.current.rotation.y = -hudAngle + Math.PI / 2;
        // Wing flapping
        hudhudWingL.rotation.x = Math.sin(elapsedTime * 15) * 0.4;
        hudhudWingR.rotation.x = -Math.sin(elapsedTime * 15) * 0.4;
      }

      // Sailing boat movement
      if (boatMeshRef.current) {
        const boatAngle = elapsedTime * 0.15;
        boatMeshRef.current.position.set(
          Math.sin(boatAngle) * 6,
          0.15 + Math.sin(elapsedTime * 3) * 0.05,
          Math.cos(boatAngle) * 6
        );
        boatMeshRef.current.rotation.y = boatAngle + Math.PI;
        boatMeshRef.current.rotation.z = Math.sin(elapsedTime * 2) * 0.05;
      }

      // Islands floating micro-bob
      islandGroups.forEach((grp, id) => {
        const cfg = ISLAND_CONFIGS.find(c => c.id === id);
        if (cfg) {
          if (id === 'TMH') {
            // Sky Temple floats with larger amplitude
            grp.position.y = cfg.position[1] + Math.sin(elapsedTime * 1.5) * 0.3;
          } else {
            grp.position.y = cfg.position[1] + Math.sin(elapsedTime * 1.2 + cfg.position[0]) * 0.08;
          }
        }
      });

      // Auto-rotation when not dragging
      if (isAutoRotate && !isDraggingRef.current) {
        cameraAngleRef.current.theta += 0.0025;
      }

      // Smooth camera position update based on spherical coordinates
      const { theta, phi, radius } = cameraAngleRef.current;
      targetCameraPos.current.x = radius * Math.sin(phi) * Math.sin(theta);
      targetCameraPos.current.y = radius * Math.cos(phi);
      targetCameraPos.current.z = radius * Math.sin(phi) * Math.cos(theta);

      camera.position.lerp(targetCameraPos.current, 0.05);
      camera.lookAt(0, 1.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 11. POINTER INTERACTION (RAYCASTER HOVER & DRAG)
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycaster check for island hover
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      let foundIsland: IslandId | null = null;
      for (const hit of intersects) {
        let curr: THREE.Object3D | null = hit.object;
        while (curr) {
          if (curr.userData && curr.userData.islandId) {
            foundIsland = curr.userData.islandId;
            break;
          }
          curr = curr.parent;
        }
        if (foundIsland) break;
      }

      setHoveredIslandId(foundIsland);
      container.style.cursor = foundIsland ? 'pointer' : isDraggingRef.current ? 'grabbing' : 'grab';

      // Drag Orbit Rotation
      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;

        cameraAngleRef.current.theta -= deltaX * 0.008;
        cameraAngleRef.current.phi = Math.max(
          0.3,
          Math.min(Math.PI / 2.2, cameraAngleRef.current.phi - deltaY * 0.008)
        );

        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      const deltaMove = Math.hypot(
        e.clientX - previousMousePositionRef.current.x,
        e.clientY - previousMousePositionRef.current.y
      );

      // If it was a clean click without major dragging
      if (deltaMove < 5 && hoveredIslandId) {
        sound.playSparkle();
        sound.speakArabic(ISLANDS_DATA.find(i => i.id === hoveredIslandId)?.name_ar || '');
        onSelectIsland(hoveredIslandId);
      }

      isDraggingRef.current = false;
      container.style.cursor = hoveredIslandId ? 'pointer' : 'grab';
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraAngleRef.current.radius = Math.max(
        14,
        Math.min(38, cameraAngleRef.current.radius + e.deltaY * 0.03)
      );
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update lighting and atmosphere when timeOfDay changes
  useEffect(() => {
    if (!sceneRef.current || !lightGroupRef.current) return;
    const scene = sceneRef.current;
    const lightGroup = lightGroupRef.current;

    if (timeOfDay === 'day') {
      scene.fog = new THREE.FogExp2(0xbae6fd, 0.015);
      if (waterMeshRef.current) {
        (waterMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(0x0284c7);
      }
      lightGroup.children.forEach(light => {
        if (light instanceof THREE.AmbientLight) light.intensity = 0.9;
        if (light instanceof THREE.DirectionalLight) {
          light.color.setHex(0xfff5e6);
          light.intensity = 1.8;
        }
      });
    } else if (timeOfDay === 'sunset') {
      scene.fog = new THREE.FogExp2(0xf43f5e, 0.018);
      if (waterMeshRef.current) {
        (waterMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(0xbe185d);
      }
      lightGroup.children.forEach(light => {
        if (light instanceof THREE.AmbientLight) light.intensity = 0.6;
        if (light instanceof THREE.DirectionalLight) {
          light.color.setHex(0xfb923c);
          light.intensity = 1.4;
        }
      });
    } else if (timeOfDay === 'night') {
      scene.fog = new THREE.FogExp2(0x0f172a, 0.025);
      if (waterMeshRef.current) {
        (waterMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(0x0f172a);
      }
      lightGroup.children.forEach(light => {
        if (light instanceof THREE.AmbientLight) light.intensity = 0.35;
        if (light instanceof THREE.DirectionalLight) {
          light.color.setHex(0x60a5fa);
          light.intensity = 0.8;
        }
      });
    }
  }, [timeOfDay]);

  // Focus camera toward selected island when selectedIslandId changes
  useEffect(() => {
    const cfg = ISLAND_CONFIGS.find(c => c.id === selectedIslandId);
    if (!cfg) return;

    // Gently shift camera orbit to align with the chosen island
    const targetTheta = Math.atan2(cfg.position[0], cfg.position[2]);
    cameraAngleRef.current.theta = targetTheta;
    cameraAngleRef.current.radius = cfg.id === 'TMH' ? 20 : 22;
  }, [selectedIslandId]);

  const activeIslandData = ISLANDS_DATA.find(i => i.id === (hoveredIslandId || selectedIslandId)) || ISLANDS_DATA[0];
  const activeIslandFriendly = getFriendlyIslandName(activeIslandData.id);
  const isSelectedUnlocked = activeIslandData.minLevel <= profile.level;
  const isSelectedCrystalClaimed = Boolean(profile.crystals[activeIslandData.id]);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-3 border-amber-300 bg-slate-950">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[400px] sm:h-[460px] touch-none select-none relative"
        title="Geser mouse atau sentuh layar untuk memutar kepulauan 3D"
      />

      {/* Top Floating Overlay: Atmosphere Switcher & Controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 text-white pointer-events-auto shadow-md">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-300 flex items-center gap-1">
            <span>✨</span> 3D WebGL Diorama
          </span>
          <span className="text-white/30 text-xs">|</span>
          <button
            onClick={() => setIsAutoRotate(prev => !prev)}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              isAutoRotate ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-slate-300'
            }`}
            title="Nyalakan/matikan rotasi otomatis"
          >
            <RotateCw className="w-3 h-3" />
            <span>{isAutoRotate ? 'Orbit Aktif' : 'Orbit Diam'}</span>
          </button>
        </div>

        {/* Atmosphere Time of Day Buttons */}
        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-2xl border border-white/20 pointer-events-auto shadow-md text-xs">
          <button
            onClick={() => setTimeOfDay('day')}
            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
              timeOfDay === 'day' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            title="Waktu Siang Cerah"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTimeOfDay('sunset')}
            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
              timeOfDay === 'sunset' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            title="Waktu Senja Emas"
          >
            <Sunset className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTimeOfDay('night')}
            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
              timeOfDay === 'night' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            title="Waktu Malam Berbintang"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Interactive Island Info Card (Bottom-center overlay) */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-none z-10">
        <motion.div
          key={activeIslandData.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900/90 backdrop-blur-lg border-2 border-amber-300/80 rounded-2xl p-3 text-white pointer-events-auto shadow-xl"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300 text-2xl flex items-center justify-center shrink-0">
                {activeIslandFriendly.icon}
              </div>

              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-400/20 px-2 py-0.2 rounded-full border border-amber-300/30">
                    {getFriendlyLevel(activeIslandData.minLevel).fullTitle}
                  </span>

                  {isSelectedCrystalClaimed ? (
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" /> Kristal Diraih
                    </span>
                  ) : isSelectedUnlocked ? (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.2 rounded-full">
                      Tersedia
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> Terkunci
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-black font-chibi mt-0.5 text-white flex items-center gap-2">
                  <span>{activeIslandFriendly.fullName}</span>
                  <span className="font-arabic text-amber-300 text-base">{activeIslandData.name_ar}</span>
                </h4>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onOpenIslandHub(activeIslandData.id)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Buka Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 mt-1.5 line-clamp-1 leading-snug">
            {activeIslandData.description}
          </p>

          {/* Island Quick Switcher Pills */}
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none text-[10px] font-bold">
            <span className="text-slate-400 shrink-0">Pilih Pulau 3D:</span>
            {ISLANDS_DATA.map((isl) => {
              const isCurrent = isl.id === activeIslandData.id;
              const friendly = getFriendlyIslandName(isl.id);
              return (
                <button
                  key={isl.id}
                  onClick={() => onSelectIsland(isl.id)}
                  className={`px-2 py-0.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <span>{friendly.icon}</span>
                  <span>{friendly.shortName}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
