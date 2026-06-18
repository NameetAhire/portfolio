import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function InteractiveCore3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeOrb, setActiveOrb] = useState<string>('NEURAL_CORE');

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const coreColor = isDark ? 0x22d3ee : 0x0891b2;
    const ringColors = isDark ? [0xc084fc, 0x2dd4bf, 0x22d3ee] : [0x7c3aed, 0x0d9488, 0x0891b2]; // Purple, Teal, Cyan

    // 1. Create Glowing Center Sphere
    const coreGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: coreColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.65 : 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Outer glow ring
    const coreGlowGeo = new THREE.RingGeometry(1.4, 1.45, 64);
    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: coreColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.3 : 0.45,
    });
    const coreGlowMesh = new THREE.Mesh(coreGlowGeo, coreGlowMat);
    scene.add(coreGlowMesh);

    // 2. Create Three Orbital Rings (AI/ML, Cloud, Security)
    const ringCount = 3;
    const ringGroups: THREE.Group[] = [];
    const ringNames = ['AI/ML_PIPELINE', 'CLOUD_DEVOPS_NEST', 'CYBER_SECURITY_CORE'];
    const ringRadius = [2.2, 3.2, 4.2];

    for (let r = 0; r < ringCount; r++) {
      const ringGroup = new THREE.Group();
      
      // Ring path line
      const segments = 128;
      const ringGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array((segments + 1) * 3);
      
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        positions[i * 3] = Math.cos(theta) * ringRadius[r];
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = Math.sin(theta) * ringRadius[r];
      }
      
      ringGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const ringMaterial = new THREE.LineBasicMaterial({
        color: ringColors[r],
        transparent: true,
        opacity: isDark ? 0.35 : 0.5,
      });
      const ringLine = new THREE.Line(ringGeometry, ringMaterial);
      ringGroup.add(ringLine);

      // Orbiting particles (nodes)
      const particleCount = 12;
      const particlesGeometry = new THREE.BufferGeometry();
      const pPositions = new Float32Array(particleCount * 3);
      
      for (let p = 0; p < particleCount; p++) {
        const theta = (p / particleCount) * Math.PI * 2;
        pPositions[p * 3] = Math.cos(theta) * ringRadius[r];
        pPositions[p * 3 + 1] = (Math.random() - 0.5) * 0.15; // minor noise
        pPositions[p * 3 + 2] = Math.sin(theta) * ringRadius[r];
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      
      // Circle dot texture
      const createDotTexture = (colorHex: number) => {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const colorString = `#${colorHex.toString(16).padStart(6, '0')}`;
          const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
          gradient.addColorStop(0, colorString);
          gradient.addColorStop(0.3, colorString);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 16, 16);
        }
        return new THREE.CanvasTexture(canvas);
      };

      const pMaterial = new THREE.PointsMaterial({
        size: 0.3,
        map: createDotTexture(ringColors[r]),
        transparent: true,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });
      const points = new THREE.Points(particlesGeometry, pMaterial);
      ringGroup.add(points);

      // Set unique tilts for each orbital ring group
      if (r === 0) {
        ringGroup.rotation.x = Math.PI / 4;
        ringGroup.rotation.y = Math.PI / 6;
      } else if (r === 1) {
        ringGroup.rotation.x = -Math.PI / 4;
        ringGroup.rotation.z = Math.PI / 5;
      } else {
        ringGroup.rotation.y = Math.PI / 3;
        ringGroup.rotation.z = -Math.PI / 6;
      }

      scene.add(ringGroup);
      ringGroups.push(ringGroup);
    }

    // 3. Interactive rotation via mouse dragging
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    const handleMouseDown = () => {
      isDragging = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y,
      };

      if (isDragging) {
        // Rotate the orbital rings slightly based on drag delta
        ringGroups.forEach((group, index) => {
          const factor = 0.005 * (index + 1);
          group.rotation.y += deltaMove.x * factor;
          group.rotation.x += deltaMove.y * factor;
        });
        coreMesh.rotation.y += deltaMove.x * 0.004;
      }

      previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY,
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    domEl.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // 4. Raycast to identify active closest ring on hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleHover = (e: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = domEl.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      
      let closestRingName = 'NEURAL_CORE';
      let minDistance = 9999;

      ringGroups.forEach((group, idx) => {
        // Check distance from raycaster to group center in screen space
        const groupWorldPos = new THREE.Vector3();
        group.getWorldPosition(groupWorldPos);
        const distance = raycaster.ray.distanceToPoint(groupWorldPos);
        if (distance < minDistance && distance < 1.8) {
          minDistance = distance;
          closestRingName = ringNames[idx];
        }
      });

      setActiveOrb(closestRingName);
    };
    domEl.addEventListener('mousemove', handleHover);

    // 5. Animation Loop
    let animFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Spin core
      coreMesh.rotation.y += 0.003;
      coreMesh.rotation.x += 0.001;
      coreGlowMesh.rotation.z -= 0.002;

      // Orbit rings
      ringGroups.forEach((group, idx) => {
        group.rotation.y += 0.002 * (idx + 1);
        
        // Pulse particles slightly
        const points = group.children[1] as THREE.Points;
        if (points && points.material) {
          const material = points.material as THREE.PointsMaterial;
          material.size = 0.25 + Math.sin(elapsedTime * 3 + idx) * 0.05;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 350;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      if (domEl) {
        domEl.removeEventListener('mousedown', handleMouseDown);
        domEl.removeEventListener('mousemove', handleMouseMove);
        domEl.removeEventListener('mousemove', handleHover);
      }
      if (mountRef.current && domEl) {
        mountRef.current.removeChild(domEl);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.canvasContainer} ref={mountRef}></div>
      <div style={styles.overlayText} className="pulse-glow">
        CORE_SECTOR: <span style={styles.sectorHighlight}>{activeOrb}</span>
      </div>
      <div style={styles.hudHelp}>
        [DRAG MOUSE TO ADJUST RADAR PERSPECTIVE]
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    position: 'relative' as const,
    zIndex: 10,
  },
  canvasContainer: {
    width: '100%',
    height: '350px',
    cursor: 'grab',
  },
  overlayText: {
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    letterSpacing: '0.15em',
    color: 'var(--color-text-secondary)',
    marginTop: '-20px',
  },
  sectorHighlight: {
    color: 'var(--color-cyan)',
    textShadow: '0 0 10px var(--color-cyan-glow)',
    fontWeight: 'bold',
  },
  hudHelp: {
    fontFamily: 'monospace',
    fontSize: '9px',
    color: 'var(--color-text-muted)',
    marginTop: '6px',
    letterSpacing: '0.05em',
  },
};
