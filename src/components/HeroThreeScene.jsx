import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFAF9FC, 0.035);

    // --- Camera Setup ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

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

    // --- Natural Studio Lighting (Reference: AICM Bright Lighting) ---
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xF3ECFA, 1.2);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Primary warm directional sunlight casting soft highlights
    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 2.8);
    sunLight.position.set(6, 9, 7);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    scene.add(sunLight);

    // Secondary soft purple studio rim light
    const rimLight = new THREE.DirectionalLight(0x8E63CB, 1.8);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);

    // Subtle interactive mouse point light
    const mouseLight = new THREE.PointLight(0xD8C2F0, 4.0, 12);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // --- Root Group for Parallax ---
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- Ground Grid Floor (Reference: AICM Floor Tiles) ---
    const gridHelper = new THREE.GridHelper(30, 30, 0xEAE3F1, 0xF3ECFA);
    gridHelper.position.set(0, -4.0, 0);
    gridHelper.rotation.y = Math.PI / 4;
    worldGroup.add(gridHelper);

    // --- 1. Signature Sculptural 3D Ribbon (Glazed Royal Purple) ---
    // Smooth, glossy organic ribbon inspired by Alex Bender AICM
    const ribbonGeo = new THREE.TorusKnotGeometry(1.9, 0.46, 160, 32, 2, 3);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x5A2D91,
      metalness: 0.38,
      roughness: 0.22,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      reflectivity: 0.85
    });
    const mainRibbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    mainRibbon.position.set(1.9, -0.1, -0.5);
    mainRibbon.castShadow = true;
    mainRibbon.receiveShadow = true;
    worldGroup.add(mainRibbon);

    // --- 2. Floating Design & Printing Objects ---
    const floatingGroup = new THREE.Group();
    worldGroup.add(floatingGroup);

    // A. 3D Visiting Cards Stack (Crisp White + Purple Foil Edge)
    const cardGroup = new THREE.Group();
    const cardGeo = new THREE.BoxGeometry(1.3, 0.78, 0.04);
    const cardMat1 = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.1,
      roughness: 0.2,
      clearcoat: 0.8
    });
    const cardMat2 = new THREE.MeshPhysicalMaterial({
      color: 0xFAF9FC,
      metalness: 0.15,
      roughness: 0.25
    });
    const cardMat3 = new THREE.MeshPhysicalMaterial({
      color: 0xF3ECFA,
      metalness: 0.2,
      roughness: 0.3
    });

    const card1 = new THREE.Mesh(cardGeo, cardMat1);
    card1.rotation.set(0.2, -0.4, 0.15);
    card1.position.set(0, 0, 0);
    card1.castShadow = true;

    const card2 = new THREE.Mesh(cardGeo, cardMat2);
    card2.rotation.set(0.1, -0.2, 0.3);
    card2.position.set(0.12, 0.14, 0.08);
    card2.castShadow = true;

    const card3 = new THREE.Mesh(cardGeo, cardMat3);
    card3.rotation.set(0.05, -0.05, 0.45);
    card3.position.set(0.24, 0.28, 0.16);
    card3.castShadow = true;

    cardGroup.add(card1, card2, card3);
    cardGroup.position.set(-3.6, 2.2, 0.2);
    floatingGroup.add(cardGroup);

    // B. 3D Golden Disc / Coin (Direct reference: AICM rolling gold token)
    const coinGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 48);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xE8BA40,
      metalness: 0.88,
      roughness: 0.18
    });
    const coin = new THREE.Mesh(coinGeo, coinMat);
    coin.rotation.x = Math.PI / 3;
    coin.rotation.z = Math.PI / 6;
    coin.position.set(2.4, -2.4, 0.8);
    coin.castShadow = true;
    floatingGroup.add(coin);

    // C. 3D Lavender Faceted Crystals
    const polyGeo = new THREE.IcosahedronGeometry(0.52, 0);
    const polyMat = new THREE.MeshPhysicalMaterial({
      color: 0xD8C2F0,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.3,
      thickness: 1.0,
      clearcoat: 0.9
    });
    const poly1 = new THREE.Mesh(polyGeo, polyMat);
    poly1.position.set(3.8, 1.8, 0.5);
    poly1.castShadow = true;
    floatingGroup.add(poly1);

    const poly2 = new THREE.Mesh(polyGeo, polyMat);
    poly2.scale.set(0.6, 0.6, 0.6);
    poly2.position.set(3.6, -1.8, 0.4);
    poly2.castShadow = true;
    floatingGroup.add(poly2);

    // D. Concentric Orbit Ring
    const ringGeo = new THREE.TorusGeometry(1.25, 0.03, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xD8C2F0,
      transparent: true,
      opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    ring.position.set(1.9, -0.1, -0.5);
    worldGroup.add(ring);

    // --- 3. Subtle Pastel Specks / Terrazzo Particles (Reference: AICM Terrazzo flecks) ---
    const particleCount = width < 768 ? 80 : 160;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x8E63CB),
      new THREE.Color(0xD8C2F0),
      new THREE.Color(0x5A2D91),
      new THREE.Color(0xE8BA40)
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      transparent: true,
      opacity: 0.65,
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

    // --- Window Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Responsive adjustments
      if (w < 768) {
        mainRibbon.scale.set(0.65, 0.65, 0.65);
        mainRibbon.position.set(0.6, 0.2, -1.2);
        cardGroup.position.set(-1.8, 2.0, 0.1);
        coin.position.set(1.4, -2.2, 0.4);
      } else if (w < 1200) {
        mainRibbon.scale.set(0.85, 0.85, 0.85);
        mainRibbon.position.set(1.3, -0.1, -0.5);
        cardGroup.position.set(-2.8, 1.8, 0.3);
        coin.position.set(1.8, -2.2, 0.6);
      } else {
        mainRibbon.scale.set(1, 1, 1);
        mainRibbon.position.set(1.9, -0.1, -0.5);
        cardGroup.position.set(-3.6, 2.2, 0.2);
        coin.position.set(2.4, -2.4, 0.8);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp for mouse motion
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Rotate primary sculptural ribbon
      mainRibbon.rotation.x = elapsedTime * 0.25 + currentY * 0.35;
      mainRibbon.rotation.y = elapsedTime * 0.32 + currentX * 0.45;

      // Orbit ring rotation
      ring.rotation.z = -elapsedTime * 0.15;
      ring.rotation.y = elapsedTime * 0.1;

      // Card stack subtle float
      cardGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.15 + currentX * 0.15;
      cardGroup.rotation.x = Math.cos(elapsedTime * 0.6) * 0.1 + currentY * 0.15;
      cardGroup.position.y += Math.sin(elapsedTime * 1.5) * 0.0025;

      // Golden coin rotation & float
      coin.rotation.z = elapsedTime * 0.8;
      coin.position.y += Math.cos(elapsedTime * 1.2) * 0.002;

      // Crystals
      poly1.rotation.x = elapsedTime * 0.4;
      poly1.rotation.y = elapsedTime * 0.5;
      poly1.position.y += Math.sin(elapsedTime * 2.0) * 0.0025;

      poly2.rotation.x = -elapsedTime * 0.35;
      poly2.rotation.z = elapsedTime * 0.45;

      // Particles subtle drift
      particles.rotation.y = elapsedTime * 0.02 + currentX * 0.05;

      // Interactive mouse light
      mouseLight.position.x = currentX * 4.0;
      mouseLight.position.y = currentY * 3.0;

      // Parallax on entire world group
      worldGroup.rotation.y = currentX * 0.18;
      worldGroup.rotation.x = -currentY * 0.14;

      // Scroll transition
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

      ribbonGeo.dispose();
      ribbonMat.dispose();
      cardGeo.dispose();
      cardMat1.dispose();
      cardMat2.dispose();
      cardMat3.dispose();
      coinGeo.dispose();
      coinMat.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      gridHelper.dispose();
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
