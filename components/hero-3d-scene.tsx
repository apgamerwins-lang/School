'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability safely
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        38,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 4.2, 8.2);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(renderer.domElement);
    } catch {
      const fallbackTimer = setTimeout(() => {
        setWebglSupported(false);
        setIsLoading(false);
      }, 0);
      return () => clearTimeout(fallbackTimer);
    }

    const initTimer = setTimeout(() => {
      setIsLoading(false);
    }, 50);

    // Lighting setup - Academic Warm Studio in Victory Light Blue & Ivory White with Mulberry rim
    const ambientLight = new THREE.AmbientLight(0xdce8f2, 1.25);
    scene.add(ambientLight);

    const keySunLight = new THREE.DirectionalLight(0xfffef4, 2.2);
    keySunLight.position.set(6, 10, 7);
    keySunLight.castShadow = true;
    keySunLight.shadow.mapSize.width = 1024;
    keySunLight.shadow.mapSize.height = 1024;
    keySunLight.shadow.bias = -0.001;
    scene.add(keySunLight);

    const rimLight = new THREE.DirectionalLight(0x994d7a, 1.4);
    rimLight.position.set(-6, 5, -5);
    scene.add(rimLight);

    // Soft sky fill in Victory Light Blue
    const fillLight = new THREE.HemisphereLight(0xffffff, 0xdce8f2, 0.85);
    scene.add(fillLight);

    // Warm directional highlight specifically illuminating the golden roof
    const goldRoofLight = new THREE.DirectionalLight(0xffecd0, 1.8);
    goldRoofLight.position.set(2, 9, 4);
    scene.add(goldRoofLight);

    // Architecture Group
    const campusGroup = new THREE.Group();
    scene.add(campusGroup);

    // Materials - Reimagined with Ivory White, Victory Light Blue, Deep Victory Navy, and Mulberry
    const ivoryWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xfaf8f5,
      roughness: 0.55,
      metalness: 0.05,
    });

    const surfaceMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.45,
      metalness: 0.08,
    });

    const deepMulberryMat = new THREE.MeshStandardMaterial({
      color: 0x994d7a,
      roughness: 0.35,
      metalness: 0.75,
    });

    const mutedRoseMat = new THREE.MeshStandardMaterial({
      color: 0xc48d92,
      roughness: 0.45,
      metalness: 0.5,
    });

    const victoryBlueMat = new THREE.MeshStandardMaterial({
      color: 0x152c42,
      roughness: 0.65,
      metalness: 0.3,
    });

    const victoryLightBlueMat = new THREE.MeshStandardMaterial({
      color: 0xdce8f2,
      roughness: 0.35,
      metalness: 0.7,
    });

    const goldRoofMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Rich metallic architectural gold leaf
      roughness: 0.24,
      metalness: 0.88,
    });

    const polishedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xf5d77f, // Lustrous polished gold for ribs & finial spire
      roughness: 0.16,
      metalness: 0.94,
    });

    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x1f3c54,
      roughness: 0.8,
      metalness: 0.0,
    });

    // 1. Concentric Tiered Plinth (Foundation of Learning)
    const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.8, 0.25, 48), ivoryWhiteMat);
    tier1.position.y = -0.125;
    tier1.receiveShadow = true;
    campusGroup.add(tier1);

    const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.3, 0.2, 48), victoryLightBlueMat);
    tier2.position.y = 0.1;
    tier2.receiveShadow = true;
    campusGroup.add(tier2);

    const tier3 = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.8, 0.18, 48), ivoryWhiteMat);
    tier3.position.y = 0.29;
    tier3.receiveShadow = true;
    campusGroup.add(tier3);

    // Center circular inlay in Deep Victory Navy
    const inlay = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.05, 36), victoryBlueMat);
    inlay.position.y = 0.39;
    inlay.receiveShadow = true;
    campusGroup.add(inlay);

    // 2. Colonnade of Wisdom (8 Doric/Tuscan-inspired columns in circular arrangement)
    const columnCount = 8;
    const colonnadeRadius = 1.95;
    const columnGroup = new THREE.Group();

    for (let i = 0; i < columnCount; i++) {
      const angle = (i / columnCount) * Math.PI * 2;
      const colX = Math.cos(angle) * colonnadeRadius;
      const colZ = Math.sin(angle) * colonnadeRadius;

      // Base plinth
      const colBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.1, 16), victoryBlueMat);
      colBase.position.set(colX, 0.44, colZ);
      colBase.castShadow = true;
      colBase.receiveShadow = true;
      columnGroup.add(colBase);

      // Shaft in Ivory White
      const colShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 2.2, 16), surfaceMat);
      colShaft.position.set(colX, 1.54, colZ);
      colShaft.castShadow = true;
      colShaft.receiveShadow = true;
      columnGroup.add(colShaft);

      // Capital (Head of column in Gold accent)
      const colCap = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 0.14, 16), goldRoofMat);
      colCap.position.set(colX, 2.68, colZ);
      colCap.castShadow = true;
      columnGroup.add(colCap);
    }
    campusGroup.add(columnGroup);

    // 3. Entablature & Architrave Ring in Victory Navy
    const architrave = new THREE.Mesh(
      new THREE.CylinderGeometry(2.15, 2.05, 0.22, 48),
      victoryBlueMat
    );
    architrave.position.y = 2.82;
    architrave.castShadow = true;
    architrave.receiveShadow = true;
    campusGroup.add(architrave);

    // Decorative frieze cornice ring in Gold
    const frieze = new THREE.Mesh(
      new THREE.CylinderGeometry(2.05, 2.15, 0.12, 48),
      goldRoofMat
    );
    frieze.position.y = 2.97;
    frieze.castShadow = true;
    frieze.receiveShadow = true;
    campusGroup.add(frieze);

    // 4. Classical Top Roof & Gilded Rotunda Dome in Gold
    const domeGroup = new THREE.Group();

    // Hemispherical Golden Dome Vault Canopy (The Top Roof)
    const domeRoofGeo = new THREE.SphereGeometry(2.05, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.44);
    const domeRoof = new THREE.Mesh(domeRoofGeo, goldRoofMat);
    domeRoof.position.y = 3.0;
    domeRoof.castShadow = true;
    domeRoof.receiveShadow = true;
    domeGroup.add(domeRoof);

    // Polished Golden Architectural Structural Ribs
    const ribCount = 8;
    for (let r = 0; r < ribCount; r++) {
      const ribAngle = (r / ribCount) * Math.PI * 2;
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(Math.cos(ribAngle) * 2.08, 3.03, Math.sin(ribAngle) * 2.08),
        new THREE.Vector3(Math.cos(ribAngle) * 1.55, 4.32, Math.sin(ribAngle) * 1.55),
        new THREE.Vector3(0, 4.62, 0)
      );
      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.055, 12, false);
      const ribMesh = new THREE.Mesh(tubeGeo, polishedGoldMat);
      ribMesh.castShadow = true;
      domeGroup.add(ribMesh);
    }

    // Dome apex lantern collar ring in Polished Gold
    const lanternRing = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.06, 16, 32), polishedGoldMat);
    lanternRing.rotation.x = Math.PI / 2;
    lanternRing.position.y = 4.62;
    lanternRing.castShadow = true;
    domeGroup.add(lanternRing);

    // Dome Lantern Cupola Base in Gold
    const cupolaBase = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.32, 0.22, 24), goldRoofMat);
    cupolaBase.position.y = 4.74;
    cupolaBase.castShadow = true;
    domeGroup.add(cupolaBase);

    // Golden Finial Spire
    const finialSpire = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.65, 16), polishedGoldMat);
    finialSpire.position.y = 5.15;
    finialSpire.castShadow = true;
    domeGroup.add(finialSpire);

    // Golden Crown Orb at Spire Apex
    const spireOrb = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), polishedGoldMat);
    spireOrb.position.y = 5.52;
    spireOrb.castShadow = true;
    domeGroup.add(spireOrb);

    campusGroup.add(domeGroup);

    // 5. Center Armillary Sphere of Knowledge & Character (Animated)
    const armillaryGroup = new THREE.Group();
    armillaryGroup.position.set(0, 1.6, 0);

    const ringMat1 = victoryLightBlueMat;
    const ringMat2 = deepMulberryMat;

    // Equator Ring
    const equatorRing = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.025, 16, 48), ringMat1);
    armillaryGroup.add(equatorRing);

    // Meridian Ring
    const meridianRing = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.025, 16, 48), ringMat2);
    meridianRing.rotation.x = Math.PI / 2;
    armillaryGroup.add(meridianRing);

    // Oblique Zodiac Band
    const zodiacRing = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.035, 16, 48), ringMat1);
    zodiacRing.rotation.y = Math.PI / 4;
    zodiacRing.rotation.x = Math.PI / 6;
    armillaryGroup.add(zodiacRing);

    // Core Gem / Star of Wisdom in Pure White
    const coreSphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.24, 2),
      surfaceMat
    );
    armillaryGroup.add(coreSphere);

    campusGroup.add(armillaryGroup);

    // 6. Perimeter Botanical Trees of Assam (Stylized Low-poly evergreen academic grove)
    const foliageGroup = new THREE.Group();
    const treePositions = [
      [-2.8, -2.2],
      [-3.2, 0.5],
      [-2.5, 2.6],
      [2.7, -2.4],
      [3.1, 0.8],
      [2.6, 2.5],
    ];

    treePositions.forEach(([tx, tz]) => {
      // Trunk
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.12, 0.8, 8),
        victoryBlueMat
      );
      trunk.position.set(tx, 0.4, tz);
      trunk.castShadow = true;
      foliageGroup.add(trunk);

      // Tiered canopy in slate victory blue
      const c1 = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.9, 7), foliageMat);
      c1.position.set(tx, 1.0, tz);
      c1.castShadow = true;
      foliageGroup.add(c1);

      const c2 = new THREE.Mesh(new THREE.ConeGeometry(0.48, 0.75, 7), foliageMat);
      c2.position.set(tx, 1.5, tz);
      c2.castShadow = true;
      foliageGroup.add(c2);
    });
    campusGroup.add(foliageGroup);

    // Fine wireframe orbital ring for subtle spatial depth in Victory Light Blue
    const haloGeo = new THREE.RingGeometry(4.2, 4.22, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x89acc7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 2;
    halo.position.y = -0.05;
    campusGroup.add(halo);

    // Interaction State
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.x = Math.max(-1, Math.min(1, x));
      mouse.y = Math.max(-1, Math.min(1, y));
      targetRotation.y = mouse.x * 0.45;
      targetRotation.x = mouse.y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle rotation of the pavilion
      campusGroup.rotation.y = elapsedTime * 0.08 + currentRotation.y;

      // Armillary internal rotations
      equatorRing.rotation.z = elapsedTime * 0.25;
      meridianRing.rotation.y = elapsedTime * 0.35;
      zodiacRing.rotation.z = -elapsedTime * 0.2;
      coreSphere.rotation.y = elapsedTime * 0.4;
      coreSphere.rotation.x = elapsedTime * 0.2;

      // Floating gentle oscillation
      campusGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.06;

      // Smooth mouse follow interpolation
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;

      if (camera) {
        camera.position.x = Math.sin(currentRotation.y * 0.8) * 2.2;
        camera.position.y = 4.2 + currentRotation.x * 2.5;
        camera.lookAt(0, 1.25, 0);
      }

      renderer?.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer) {
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center rounded-2xl border border-[#DCE8F2]/20 bg-[#0F2030] p-8 text-center">
        <div className="max-w-md space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#132638] text-[#FAF8F5] flex items-center justify-center font-serif text-2xl font-bold border border-[#89ACC7]/40">
            SM
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#FAF8F5]">
            St. Mary&apos;s School, Jorhat
          </h3>
          <p className="text-xs text-[#DCE8F2]/80 leading-relaxed">
            Architectural Rotunda of Knowledge & Character Formation · Rowriah, Jorhat, Assam
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0F2030]/70 backdrop-blur-xs rounded-2xl z-10 transition-opacity duration-300">
          <div className="flex flex-col items-center gap-2 text-[#FAF8F5] text-xs font-mono">
            <span className="w-6 h-6 border-2 border-[#89ACC7] border-t-transparent rounded-full animate-spin"></span>
            <span>Initializing 3D Campus Viewport...</span>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D Architectural Pavilion of St. Mary's School Jorhat"
        role="img"
      />
      {/* Subtle interaction cue in Victory Navy & Light Blue */}
      <div className="absolute bottom-3 right-4 pointer-events-none hidden sm:flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#FAF8F5] bg-[#0F2030]/90 px-2.5 py-1 rounded backdrop-blur-xs border border-[#DCE8F2]/20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#89ACC7]" />
        <span>Interactive 3D · Move pointer to inspect</span>
      </div>
    </div>
  );
}
