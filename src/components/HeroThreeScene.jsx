import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0414, 0.045);

    // --- Camera Setup ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x24103D, 2.5);
    scene.add(ambientLight);

    // Primary directional light with soft lavender color
    const dirLight = new THREE.DirectionalLight(0xD8C2F0, 3.2);
    dirLight.position.set(5, 8, 7);
    scene.add(dirLight);

    // Secondary rim light with royal purple
    const rimLight = new THREE.DirectionalLight(0x5A2D91, 4.0);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    // Interactive mouse point light
    const mouseLight = new THREE.PointLight(0x8E63CB, 8.0, 14);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // Bottom accent point light
    const bottomLight = new THREE.PointLight(0x5A2D91, 5.0, 10);
    bottomLight.position.set(0, -4, 2);
    scene.add(bottomLight);

    // --- Root Object Group for Parallax ---
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- 1. Signature Sculptural 3D Ribbon (Torus Knot) ---
    // Inspired by Alex Bender / AICM 3D sculptural ribbons
    const ribbonGeo = new THREE.TorusKnotGeometry(2.1, 0.52, 160, 32, 2, 3);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x5A2D91,
      emissive: 0x24103D,
      emissiveIntensity: 0.35,
      metalness: 0.72,
      roughness: 0.22,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      reflectivity: 0.85,
      wireframe: false
    });
    const mainRibbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    mainRibbon.position.set(1.4, -0.1, -0.5);
    worldGroup.add(mainRibbon);

    // --- 2. Floating Design & Printing Objects ---
    const floatingGroup = new THREE.Group();
    worldGroup.add(floatingGroup);

    // A. 3D Visiting Cards Stack (3 cards fanning out)
    const cardGroup = new THREE.Group();
    const cardGeo = new THREE.BoxGeometry(1.4, 0.82, 0.04);
    const cardMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x170b28,
      emissive: 0x8E63CB,
      emissiveIntensity: 0.2,
      metalness: 0.5,
      roughness: 0.3
    });
    const cardMat2 = new THREE.MeshPhysicalMaterial({
      color: 0x24103D,
      emissive: 0x5A2D91,
      emissiveIntensity: 0.25,
      metalness: 0.6,
      roughness: 0.25
    });
    const cardMat3 = new THREE.MeshPhysicalMaterial({
      color: 0xD8C2F0,
      metalness: 0.3,
      roughness: 0.2
    });

    const card1 = new THREE.Mesh(cardGeo, cardMat1);
    card1.rotation.set(0.2, -0.4, 0.15);
    card1.position.set(0, 0, 0);

    const card2 = new THREE.Mesh(cardGeo, cardMat2);
    card2.rotation.set(0.1, -0.2, 0.3);
    card2.position.set(0.12, 0.14, 0.08);

    const card3 = new THREE.Mesh(cardGeo, cardMat3);
    card3.rotation.set(0.05, -0.05, 0.45);
    card3.position.set(0.24, 0.28, 0.16);

    cardGroup.add(card1, card2, card3);
    cardGroup.position.set(-3.2, 1.2, 0.5);
    floatingGroup.add(cardGroup);

    // B. 3D Precision Print Roller / Cylinder
    const rollerGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.8, 32);
    const rollerMat = new THREE.MeshStandardMaterial({
      color: 0x8E63CB,
      metalness: 0.85,
      roughness: 0.18
    });
    const roller = new THREE.Mesh(rollerGeo, rollerMat);
    roller.rotation.z = Math.PI / 3;
    roller.rotation.x = 0.5;
    roller.position.set(-2.8, -1.8, 1);
    floatingGroup.add(roller);

    // C. 3D Faceted Crystal Polyhedrons
    const polyGeo = new THREE.IcosahedronGeometry(0.55, 0);
    const polyMat = new THREE.MeshPhysicalMaterial({
      color: 0xD8C2F0,
      emissive: 0x8E63CB,
      emissiveIntensity: 0.4,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.5,
      thickness: 1.2
    });
    const poly1 = new THREE.Mesh(polyGeo, polyMat);
    poly1.position.set(3.4, 2.0, 0.8);
    floatingGroup.add(poly1);

    const poly2 = new THREE.Mesh(polyGeo, polyMat);
    poly2.scale.set(0.65, 0.65, 0.65);
    poly2.position.set(3.2, -2.2, 0.4);
    floatingGroup.add(poly2);

    // D. 3D Concentric Orbit Ring
    const ringGeo = new THREE.TorusGeometry(1.2, 0.04, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xD8C2F0,
      transparent: true,
      opacity: 0.45
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    ring.position.set(1.4, -0.1, -0.5);
    worldGroup.add(ring);

    // --- 3. Atmospheric 3D Stardust Particles ---
    const particleCount = width < 768 ? 140 : 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x8E63CB),
      new THREE.Color(0xD8C2F0),
      new THREE.Color(0x5A2D91),
      new THREE.Color(0xFFFFFF)
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite using canvas texture for soft glow points
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    pGrad.addColorStop(0, 'rgba(255,255,255,1)');
    pGrad.addColorStop(0.3, 'rgba(216,194,240,0.8)');
    pGrad.addColorStop(1, 'rgba(90,45,145,0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: pTexture,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
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
        mainRibbon.scale.set(0.68, 0.68, 0.68);
        mainRibbon.position.set(0, 0.5, -1);
        cardGroup.position.set(-1.2, -1.8, 0.2);
        roller.position.set(1.4, -2.1, 0.5);
      } else if (w < 1200) {
        mainRibbon.scale.set(0.85, 0.85, 0.85);
        mainRibbon.position.set(1.0, 0, -0.5);
        cardGroup.position.set(-2.5, 1.0, 0.5);
        roller.position.set(-2.2, -1.6, 1);
      } else {
        mainRibbon.scale.set(1, 1, 1);
        mainRibbon.position.set(1.4, -0.1, -0.5);
        cardGroup.position.set(-3.2, 1.2, 0.5);
        roller.position.set(-2.8, -1.8, 1);
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
      mainRibbon.rotation.x = elapsedTime * 0.28 + currentY * 0.4;
      mainRibbon.rotation.y = elapsedTime * 0.38 + currentX * 0.5;

      // Orbit ring rotation
      ring.rotation.z = -elapsedTime * 0.18;
      ring.rotation.y = elapsedTime * 0.12;

      // Floating card stack subtle floating & breathing
      cardGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.18 + currentX * 0.2;
      cardGroup.rotation.x = Math.cos(elapsedTime * 0.6) * 0.12 + currentY * 0.2;
      cardGroup.position.y += Math.sin(elapsedTime * 1.5) * 0.003;

      // Print roller rotation
      roller.rotation.y = elapsedTime * 0.7;
      roller.position.y += Math.cos(elapsedTime * 1.2) * 0.0025;

      // Polyhedrons tumbling
      poly1.rotation.x = elapsedTime * 0.5;
      poly1.rotation.y = elapsedTime * 0.6;
      poly1.position.y += Math.sin(elapsedTime * 2.0) * 0.003;

      poly2.rotation.x = -elapsedTime * 0.4;
      poly2.rotation.z = elapsedTime * 0.5;

      // Particles gentle drift
      particles.rotation.y = elapsedTime * 0.035 + currentX * 0.08;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05 + currentY * 0.05;

      // Update interactive light position
      mouseLight.position.x = currentX * 4.5;
      mouseLight.position.y = currentY * 3.5;

      // Parallax on entire world group
      worldGroup.rotation.y = currentX * 0.22;
      worldGroup.rotation.x = -currentY * 0.18;

      // Scroll storytelling transition
      const scrollProgress = Math.min(scrollY / (window.innerHeight || 800), 2);
      worldGroup.position.y = -scrollProgress * 2.2;
      worldGroup.position.z = -scrollProgress * 1.8;
      worldGroup.rotation.z = scrollProgress * 0.35;

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

      // Dispose Three.js objects
      ribbonGeo.dispose();
      ribbonMat.dispose();
      cardGeo.dispose();
      cardMat1.dispose();
      cardMat2.dispose();
      cardMat3.dispose();
      rollerGeo.dispose();
      rollerMat.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      pTexture.dispose();
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
