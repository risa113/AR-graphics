import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFAF9FC, 0.032);

    // --- Camera Setup ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 9.2);

    // --- Renderer Setup (Bright Studio) ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- Natural Studio Lighting (Alex Bender AICM Reference) ---
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xF3ECFA, 1.2);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Primary warm directional sunlight casting soft realistic architectural shadows
    const sunLight = new THREE.DirectionalLight(0xFFF8F0, 3.2);
    sunLight.position.set(7, 10, 6);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Secondary soft purple studio fill light
    const fillLight = new THREE.DirectionalLight(0x8E63CB, 1.6);
    fillLight.position.set(-6, -2, -2);
    scene.add(fillLight);

    // Dynamic Violet / Magenta Neon Core Light (Reference: Glowing Seams in AICM)
    const coreNeonLight = new THREE.PointLight(0x8E63CB, 6.0, 10);
    coreNeonLight.position.set(2.0, -0.3, 0.4);
    scene.add(coreNeonLight);

    const accentNeonLight = new THREE.PointLight(0xD8C2F0, 4.5, 8);
    accentNeonLight.position.set(1.4, 1.2, -0.2);
    scene.add(accentNeonLight);

    // Subtle interactive mouse point light
    const mouseLight = new THREE.PointLight(0xFFFFFF, 3.0, 10);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // --- Root Group for Parallax ---
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- 1. Architectural Floor Plane (45° Diagonal Seams with Soft Shadow Absorption) ---
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xFAF9FC,
      roughness: 0.65,
      metalness: 0.05
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -3.8;
    floorMesh.receiveShadow = true;
    worldGroup.add(floorMesh);

    // Architectural 45° grid seam lines
    const gridHelper = new THREE.GridHelper(36, 36, 0xEAE3F1, 0xF3ECFA);
    gridHelper.position.set(0, -3.79, 0);
    gridHelper.rotation.y = Math.PI / 4;
    worldGroup.add(gridHelper);

    // --- 2. Organic Flowing 3D Wave Track (The Curving Path from the Video) ---
    // High-precision smooth CatmullRom 3D spline matching the S-curve wave
    const wavePoints = [
      new THREE.Vector3(1.6, 4.2, -0.6),
      new THREE.Vector3(2.2, 2.6, -0.3),
      new THREE.Vector3(1.4, 1.0, 0.3),
      new THREE.Vector3(2.5, -0.4, 0.6),
      new THREE.Vector3(3.1, -1.8, 0.2),
      new THREE.Vector3(2.2, -2.9, -0.3),
      new THREE.Vector3(1.0, -2.1, 0.1),
      new THREE.Vector3(0.8, -0.6, 0.4),
      new THREE.Vector3(1.2, 1.2, 0.0),
      new THREE.Vector3(1.6, 4.2, -0.6) // Closed loop
    ];
    const waveCurve = new THREE.CatmullRomCurve3(wavePoints, true, 'centripetal');

    // Glossy Pearl White Wave Pipe Geometry
    const waveGeo = new THREE.TubeGeometry(waveCurve, 160, 0.24, 28, true);
    const waveMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      roughness: 0.14,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.castShadow = true;
    waveMesh.receiveShadow = true;
    worldGroup.add(waveMesh);

    // --- 3. The Signature Glazed Royal Purple Ribbon Sculpture ---
    const ribbonGeo = new THREE.TorusKnotGeometry(1.55, 0.38, 140, 28, 2, 3);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x5A2D91,
      metalness: 0.42,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.9
    });
    const mainRibbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    mainRibbon.position.set(1.9, -0.2, -0.4);
    mainRibbon.castShadow = true;
    mainRibbon.receiveShadow = true;
    worldGroup.add(mainRibbon);

    // --- 4. The Architectural Block / Platform (Rising Block with Neon Glow from AICM Video) ---
    const blockGroup = new THREE.Group();
    blockGroup.position.set(2.4, -0.6, -0.2);

    const blockGeo = new THREE.BoxGeometry(2.0, 0.32, 2.0);
    const blockMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.8
    });
    const blockMesh = new THREE.Mesh(blockGeo, blockMat);
    blockMesh.rotation.y = Math.PI / 4;
    blockMesh.castShadow = true;
    blockMesh.receiveShadow = true;
    blockGroup.add(blockMesh);

    worldGroup.add(blockGroup);

    // --- 5. The Rolling Gold Coin / Token (Exact Rolling Physics along the Wave) ---
    const coinGroup = new THREE.Group();

    const coinGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.07, 48);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xF2C244,
      metalness: 0.94,
      roughness: 0.16
    });
    const coinMesh = new THREE.Mesh(coinGeo, coinMat);
    coinMesh.castShadow = true;
    coinGroup.add(coinMesh);

    worldGroup.add(coinGroup);

    // --- 6. Design Elements: Visiting Card Deck ---
    const cardGroup = new THREE.Group();
    const cardGeo = new THREE.BoxGeometry(1.2, 0.72, 0.03);
    const cardMat1 = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, metalness: 0.08, roughness: 0.2, clearcoat: 0.8 });
    const cardMat2 = new THREE.MeshPhysicalMaterial({ color: 0xFAF9FC, metalness: 0.12, roughness: 0.25 });
    const cardMat3 = new THREE.MeshPhysicalMaterial({ color: 0xF3ECFA, metalness: 0.18, roughness: 0.3 });

    const c1 = new THREE.Mesh(cardGeo, cardMat1);
    c1.rotation.set(0.18, -0.35, 0.12);
    c1.castShadow = true;

    const c2 = new THREE.Mesh(cardGeo, cardMat2);
    c2.rotation.set(0.1, -0.18, 0.26);
    c2.position.set(0.1, 0.12, 0.06);
    c2.castShadow = true;

    const c3 = new THREE.Mesh(cardGeo, cardMat3);
    c3.rotation.set(0.04, -0.04, 0.4);
    c3.position.set(0.2, 0.24, 0.12);
    c3.castShadow = true;

    cardGroup.add(c1, c2, c3);
    cardGroup.position.set(-3.6, 2.2, 0.2);
    worldGroup.add(cardGroup);

    // --- 7. Floating Lavender Crystals ---
    const polyGeo = new THREE.IcosahedronGeometry(0.46, 0);
    const polyMat = new THREE.MeshPhysicalMaterial({
      color: 0xD8C2F0,
      metalness: 0.1,
      roughness: 0.14,
      transmission: 0.35,
      thickness: 1.0,
      clearcoat: 0.9
    });
    const crystal = new THREE.Mesh(polyGeo, polyMat);
    crystal.position.set(3.7, 1.6, 0.4);
    crystal.castShadow = true;
    worldGroup.add(crystal);

    // --- 8. Terrazzo Pigment Particles (Sprinkled on floor like AICM Video) ---
    const particleCount = width < 768 ? 90 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x8E63CB),
      new THREE.Color(0xD8C2F0),
      new THREE.Color(0x5A2D91),
      new THREE.Color(0xF2C244),
      new THREE.Color(0xE040FB)
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = -3.75 + Math.random() * 0.12; // Flat on the floor
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      transparent: true,
      opacity: 0.75,
      vertexColors: true
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // --- Interactive Mouse & Motion State ---
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = nx;
      targetY = ny;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        targetX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        targetY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Responsive Adjustments ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (w < 768) {
        worldGroup.position.set(-0.3, 0.1, -1.0);
        worldGroup.scale.set(0.68, 0.68, 0.68);
      } else if (w < 1200) {
        worldGroup.position.set(0.2, 0.0, -0.4);
        worldGroup.scale.set(0.85, 0.85, 0.85);
      } else {
        worldGroup.position.set(0.6, 0.0, 0.0);
        worldGroup.scale.set(1.0, 1.0, 1.0);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // --- Animation Loop (6-Second Infinite Loop matching the Video) ---
    let animationFrameId;
    let clock = new THREE.Clock();
    const LOOP_DURATION = 6.0; // 6 seconds loop like video

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // 1. EXACT ROLLING COIN ALONG THE 3D WAVE CURVE
      const progress = (elapsedTime / LOOP_DURATION) % 1.0;
      const point = waveCurve.getPointAt(progress);
      const tangent = waveCurve.getTangentAt(progress).normalize();

      // Compute normal & binormal to place coin standing on track
      const upVector = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tangent, upVector).normalize();
      const actualUp = new THREE.Vector3().crossVectors(normal, tangent).normalize();

      // Offset coin to sit directly on top of the tube
      const coinPos = point.clone().add(actualUp.clone().multiplyScalar(0.32));
      coinGroup.position.copy(coinPos);

      // Orient coin with tangent
      const rotMatrix = new THREE.Matrix4().makeBasis(tangent, actualUp, normal);
      coinGroup.quaternion.setFromRotationMatrix(rotMatrix);

      // Spin coin like a rolling wheel
      coinMesh.rotation.y = elapsedTime * 8.5;

      // 2. Wave Mesh Subtle Organic Breathing
      waveMesh.rotation.y = Math.sin(elapsedTime * 0.4) * 0.06;

      // 3. Glazed Royal Purple Ribbon Rotation
      mainRibbon.rotation.x = elapsedTime * 0.22 + currentY * 0.25;
      mainRibbon.rotation.y = elapsedTime * 0.28 + currentX * 0.35;

      // 4. Architectural Block Subtle Float & Neon Pulse
      blockGroup.position.y = -0.6 + Math.sin(elapsedTime * 1.2) * 0.06;
      blockMesh.rotation.y = Math.PI / 4 + Math.sin(elapsedTime * 0.6) * 0.08;

      // Neon light pulse matching the video
      coreNeonLight.intensity = 5.0 + Math.sin(elapsedTime * 2.5) * 2.0;
      accentNeonLight.intensity = 4.0 + Math.cos(elapsedTime * 2.0) * 1.5;

      // 5. Card Deck Float
      cardGroup.rotation.y = Math.sin(elapsedTime * 0.7) * 0.12 + currentX * 0.12;
      cardGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.08 + currentY * 0.12;
      cardGroup.position.y = 2.2 + Math.sin(elapsedTime * 1.4) * 0.06;

      // 6. Crystal Float
      crystal.rotation.x = elapsedTime * 0.35;
      crystal.rotation.y = elapsedTime * 0.45;
      crystal.position.y = 1.6 + Math.sin(elapsedTime * 1.8) * 0.08;

      // 7. Interactive Mouse Light & Camera Parallax
      mouseLight.position.x = currentX * 4.0;
      mouseLight.position.y = currentY * 3.0;

      worldGroup.rotation.y = currentX * 0.14;
      worldGroup.rotation.x = -currentY * 0.10;

      // Scroll linked movement
      const scrollProgress = Math.min(scrollY / (window.innerHeight || 800), 2);
      worldGroup.position.y = -scrollProgress * 2.0;
      worldGroup.position.z = -scrollProgress * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      floorGeo.dispose();
      floorMat.dispose();
      gridHelper.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      blockGeo.dispose();
      blockMat.dispose();
      coinGeo.dispose();
      coinMat.dispose();
      cardGeo.dispose();
      cardMat1.dispose();
      cardMat2.dispose();
      cardMat3.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
