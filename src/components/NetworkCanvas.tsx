import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

interface Props {
  theme?: 'dark' | 'light';
}

export default function NetworkCanvas({ theme = 'dark' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const currentPathRef = useRef(location.pathname);
  const themeRef = useRef(theme);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    // 1. WebGL Detection
    try {
      const testCanvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
      );
      if (!supported) { setWebGLSupported(false); return; }
    } catch {
      setWebGLSupported(false);
      return;
    }

    if (!containerRef.current) return;
    const container = containerRef.current;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // 2. Scene Setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();

    const fog = new THREE.FogExp2(0x060810, 0.0018);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 2000);
    camera.position.set(0, 0, 200);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // 3. Colors per theme
    const getDarkColors = () => [
      new THREE.Color(0x22d3ee), // Cyan
      new THREE.Color(0xc084fc), // Purple
      new THREE.Color(0x2dd4bf), // Teal
    ];

    // 4. Star Field (streaming lines)
    const starCount = isMobile ? 400 : 1000;
    interface Star {
      x: number; y: number; z: number;
      baseSpeed: number; color: THREE.Color;
      angleOffset: number; orbitRadius: number;
    }
    const stars: Star[] = [];
    const spreadX = 800, spreadY = 600;
    const colors = getDarkColors();

    for (let i = 0; i < starCount; i++) {
      const angle = (i / starCount) * Math.PI * 2;
      stars.push({
        x: (Math.random() - 0.5) * spreadX,
        y: (Math.random() - 0.5) * spreadY,
        z: -Math.random() * 1000,
        baseSpeed: 0.6 + Math.random() * 1.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        angleOffset: angle,
        orbitRadius: 50 + Math.random() * 250,
      });
    }

    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 2 * 3);
    const starCol = new Float32Array(starCount * 2 * 3);

    for (let i = 0; i < starCount; i++) {
      const c = stars[i].color;
      starCol[i * 6] = c.r * 0.1; starCol[i * 6 + 1] = c.g * 0.1; starCol[i * 6 + 2] = c.b * 0.1;
      starCol[i * 6 + 3] = c.r;   starCol[i * 6 + 4] = c.g;       starCol[i * 6 + 5] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));

    const starMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.8,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const starField = new THREE.LineSegments(starGeo, starMat);
    scene.add(starField);

    // 5. ── FLOATING INTERACTIVE 3D GEOMETRY ──────────────────────────────────
    const floatingObjects: {
      mesh: THREE.Mesh;
      rotX: number; rotY: number; rotZ: number;
      floatPhase: number; floatSpeed: number;
      originalY: number; targetScale: number; currentScale: number;
    }[] = [];

    const geomTypes = [
      new THREE.IcosahedronGeometry(12, 1),
      new THREE.OctahedronGeometry(10, 0),
      new THREE.TetrahedronGeometry(9, 0),
      new THREE.IcosahedronGeometry(7, 0),
      new THREE.OctahedronGeometry(13, 0),
      new THREE.TetrahedronGeometry(11, 0),
    ];

    const meshPositions = isMobile ? [
      [-220, 80, -300], [220, -60, -350],
    ] : [
      [-320, 100, -350], [300, -80, -380],
      [-200, -130, -420], [250, 120, -300],
      [-380, -40, -480], [360, 60, -450],
    ];

    meshPositions.forEach((pos, i) => {
      const geom = geomTypes[i % geomTypes.length];
      const hue = [0.55, 0.78, 0.47][i % 3]; // cyan, purple, teal
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 0.9, 0.6),
        wireframe: true,
        transparent: true,
        opacity: theme === 'dark' ? 0.18 : 0.22,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      mesh.userData.originalY = pos[1];
      scene.add(mesh);

      floatingObjects.push({
        mesh,
        rotX: (Math.random() - 0.5) * 0.006,
        rotY: (Math.random() - 0.5) * 0.008,
        rotZ: (Math.random() - 0.5) * 0.004,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.4 + Math.random() * 0.6,
        originalY: pos[1],
        targetScale: 1,
        currentScale: 1,
      });
    });

    // 6. Radar Ring (home page overlay)
    const radarGeo = new THREE.RingGeometry(90, 91.5, 64);
    const radarMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee, side: THREE.DoubleSide,
      transparent: true, opacity: 0, blending: THREE.AdditiveBlending,
    });
    const radar = new THREE.Mesh(radarGeo, radarMat);
    radar.position.set(0, 0, -180);
    scene.add(radar);

    // 7. Mouse / Touch interactivity
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    let hoveredObj: THREE.Mesh | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseClick = (e: MouseEvent) => {
      raycaster.setFromCamera(
        new THREE.Vector2(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        ),
        camera
      );
      const meshes = floatingObjects.map(o => o.mesh);
      const hits = raycaster.intersectObjects(meshes);
      if (hits.length > 0) {
        const obj = floatingObjects.find(o => o.mesh === hits[0].object);
        if (obj) {
          // Pop animation on click
          obj.targetScale = 1.6;
          setTimeout(() => { obj.targetScale = 1; }, 300);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetMouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Scroll velocity
    let scrollVelocity = 0;
    const handleScroll = () => { scrollVelocity += 1.0; };
    window.addEventListener('scroll', handleScroll);

    // 8. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const path = currentPathRef.current;
      const time = clock.getElapsedTime();
      const isDark = themeRef.current === 'dark';

      // Inertial mouse
      scrollVelocity *= 0.9;
      const speedMult = 1 + Math.min(scrollVelocity, 25);
      mouse.x += (targetMouse.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.y - mouse.y) * 0.06;
      camera.position.x += (mouse.x * 35 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 25 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, -300);

      // Fog / radar based on route
      if (path === '/contact') {
        fog.density += (0.005 - fog.density) * 0.025;
        radarMat.opacity += (0 - radarMat.opacity) * 0.06;
      } else if (path === '/') {
        fog.density += (isDark ? 0.0015 : 0.0008 - fog.density) * 0.02;
        radarMat.opacity += (0.06 - radarMat.opacity) * 0.03;
      } else {
        fog.density += (0.0012 - fog.density) * 0.02;
        radarMat.opacity += (0 - radarMat.opacity) * 0.06;
      }
      fog.color.set(isDark ? 0x060810 : 0xe8ebfa);
      radar.rotation.z += 0.0008;

      // Animate star field
      const positions = starField.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        const s = stars[i];
        if (path === '/journey') {
          const vel = s.baseSpeed * speedMult;
          s.z += vel;
          if (s.z > 220) {
            s.z = -1000 - Math.random() * 100;
            s.x = (Math.random() - 0.5) * spreadX;
            s.y = (Math.random() - 0.5) * spreadY;
          }
          const stretch = 4 + vel * 2.5;
          positions[i * 6] = s.x; positions[i * 6 + 1] = s.y; positions[i * 6 + 2] = s.z - stretch;
          positions[i * 6 + 3] = s.x; positions[i * 6 + 4] = s.y; positions[i * 6 + 5] = s.z;
        } else if (path === '/') {
          s.angleOffset += 0.0018 * s.baseSpeed;
          s.z += 0.35;
          if (s.z > 220) s.z = -800;
          const r = s.orbitRadius;
          s.x += (Math.cos(s.angleOffset) * r - s.x) * 0.05;
          s.y += (Math.sin(s.angleOffset) * r - s.y) * 0.05;
          positions[i * 6] = s.x; positions[i * 6 + 1] = s.y; positions[i * 6 + 2] = s.z - 6;
          positions[i * 6 + 3] = s.x; positions[i * 6 + 4] = s.y; positions[i * 6 + 5] = s.z;
        } else if (path === '/skills') {
          s.angleOffset += 0.001;
          const r = s.orbitRadius;
          s.x += (Math.cos(s.angleOffset) * r - s.x) * 0.05;
          s.z += (-Math.sin(s.angleOffset) * r - 200 - s.z) * 0.05;
          s.y += (Math.sin(time * 0.5 + i) * 90 - s.y) * 0.02;
          positions[i * 6] = s.x; positions[i * 6 + 1] = s.y; positions[i * 6 + 2] = s.z - 4;
          positions[i * 6 + 3] = s.x; positions[i * 6 + 4] = s.y; positions[i * 6 + 5] = s.z;
        } else {
          s.x += Math.sin(time + i) * 0.12;
          s.y += Math.cos(time + i) * 0.12;
          s.z += Math.sin(time * 0.5 + i) * 0.18;
          if (s.z > 220) s.z = -800;
          positions[i * 6] = s.x; positions[i * 6 + 1] = s.y; positions[i * 6 + 2] = s.z - 2;
          positions[i * 6 + 3] = s.x; positions[i * 6 + 4] = s.y; positions[i * 6 + 5] = s.z;
        }
      }
      starField.geometry.attributes.position.needsUpdate = true;
      starField.rotation.z += 0.0003;

      // Animate floating 3D geometry
      // Hover detection
      raycaster.setFromCamera(mouse, camera);
      const allMeshes = floatingObjects.map(o => o.mesh);
      const hits = raycaster.intersectObjects(allMeshes);
      hoveredObj = hits.length > 0 ? hits[0].object as THREE.Mesh : null;

      floatingObjects.forEach(obj => {
        // Rotation
        obj.mesh.rotation.x += obj.rotX;
        obj.mesh.rotation.y += obj.rotY;
        obj.mesh.rotation.z += obj.rotZ;

        // Float up/down
        const floatY = Math.sin(time * obj.floatSpeed + obj.floatPhase) * 18;
        obj.mesh.position.y += (obj.originalY + floatY - obj.mesh.position.y) * 0.04;

        // Hover glow / scale
        const isHovered = obj.mesh === hoveredObj;
        if (isHovered) obj.targetScale = 1.3;
        else if (obj.currentScale > 1 && !isHovered) obj.targetScale = 1;

        obj.currentScale += (obj.targetScale - obj.currentScale) * 0.08;
        obj.mesh.scale.setScalar(obj.currentScale);

        // Opacity based on theme
        const mat = obj.mesh.material as THREE.MeshBasicMaterial;
        const targetOp = isHovered ? 0.5 : (isDark ? 0.15 : 0.2);
        mat.opacity += (targetOp - mat.opacity) * 0.06;

        // Color shift on hover
        if (isHovered) {
          mat.color.lerp(new THREE.Color(isDark ? 0xffffff : 0x0f1033), 0.1);
        }
      });

      // Global opacity of starfield based on light/dark
      starMat.opacity = isDark ? 0.8 : 0.45;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  if (!webGLSupported) {
    return (
      <div
        className="canvas-container"
        style={{ background: 'radial-gradient(ellipse at center, var(--bg-space) 0%, var(--bg-deep) 100%)' }}
      >
        <div style={{ position: 'absolute', opacity: 0.12, width: '100%', height: '100%' }}>
          <div className="pulse-glow" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, var(--color-cyan-glow) 0%, transparent 70%)', position: 'absolute', top: '15%', left: '20%', borderRadius: '50%' }} />
          <div className="pulse-glow" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, var(--color-purple-glow) 0%, transparent 70%)', position: 'absolute', bottom: '10%', right: '10%', borderRadius: '50%', animationDelay: '1.5s' }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="canvas-container"
      ref={containerRef}
      style={{
        background: theme === 'dark'
          ? 'radial-gradient(ellipse at center, #0c0e1a 0%, #060810 100%)'
          : 'radial-gradient(ellipse at center, #dde1f5 0%, #eef0ff 100%)',
        transition: 'background 0.5s ease',
      }}
    />
  );
}
