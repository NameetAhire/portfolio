import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

/* ── Skill Database ─────────────────────────────────────────────────────── */
const SKILL_CATEGORIES = [
  {
    id: 'AI_CORE',
    label: 'AI / Machine Learning',
    color: '#22d3ee',
    colorRgb: '34,211,238',
    skills: [
      { name: 'Python', level: 95, note: 'Primary language — 5+ years' },
      { name: 'TensorFlow', level: 88, note: 'Production-grade model training' },
      { name: 'PyTorch', level: 82, note: 'Research & custom architectures' },
      { name: 'OpenCV', level: 79, note: 'Real-time computer vision pipelines' },
      { name: 'Scikit-learn', level: 90, note: 'Classical ML & feature engineering' },
    ],
  },
  {
    id: 'CLOUD',
    label: 'Cloud & Infrastructure',
    color: '#c084fc',
    colorRgb: '192,132,252',
    skills: [
      { name: 'AWS', level: 84, note: 'EC2, S3, Lambda, SageMaker' },
      { name: 'Docker', level: 87, note: 'Containerised ML workloads' },
      { name: 'Kubernetes', level: 72, note: 'Orchestration & auto-scaling' },
      { name: 'Terraform', level: 65, note: 'IaC for cloud provisioning' },
    ],
  },
  {
    id: 'DEV',
    label: 'Full-Stack Development',
    color: '#2dd4bf',
    colorRgb: '45,212,191',
    skills: [
      { name: 'FastAPI', level: 86, note: 'High-performance async APIs' },
      { name: 'React', level: 78, note: 'Hooks, state management, SSR' },
      { name: 'TypeScript', level: 80, note: 'Type-safe frontend & backend' },
      { name: 'PostgreSQL', level: 75, note: 'Schema design & optimisation' },
    ],
  },
  {
    id: 'SECURITY',
    label: 'Security & MLOps',
    color: '#f59e0b',
    colorRgb: '245,158,11',
    skills: [
      { name: 'MLflow', level: 82, note: 'Experiment tracking & registry' },
      { name: 'Adversarial ML', level: 70, note: 'Robustness & red-teaming' },
      { name: 'Pentesting', level: 68, note: 'OWASP, CTF background' },
      { name: 'CI/CD', level: 78, note: 'GitHub Actions, automated pipelines' },
    ],
  },
];

const ALL_CHIPS = SKILL_CATEGORIES.flatMap(c =>
  c.skills.map(s => ({ ...s, category: c.id, color: c.color }))
);

type LogLine = { id: number; text: string; color?: string; ts: string };
let logIdCounter = 0;

function nowTs() {
  return new Date().toLocaleTimeString('en-US', { hour12: false });
}

/* ── Galactic Core Console ── */
export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);

  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      setRuntimeError(e.message || String(e.error));
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  const stateRef = useRef({
    t: 0,
    glowColor: '#22d3ee',
    glowRgb: '34,211,238',
    targetGlowColor: '#22d3ee',
    targetGlowRgb: '34,211,238',
    pulse: 0,
    mouseX: 0,
    mouseY: 0,
    scanning: false,
    scanProgress: 0,
    radarAngle: 0,
    pings: [] as { r: number; age: number; color: string }[],
    activeCategory: null as string | null,
    triggerWebGLShockwave: null as ((pos: THREE.Vector3, color: string) => void) | null,
    baseZoom: 1.0,
    resetView: null as (() => void) | null,
  });

  const [logs, setLogs] = useState<LogLine[]>([
    { id: logIdCounter++, text: '> STELLAR NETWORK TERMINAL v3.0 ONLINE', color: '#22d3ee', ts: nowTs() },
    { id: logIdCounter++, text: '> GALACTIC_CORE_NET: SECURE COGNITIVE LINK ACTIVE', ts: nowTs() },
    { id: logIdCounter++, text: '> SELECT A CELESTIAL SECTOR TO MAP SKILLS', color: '#555c80', ts: nowTs() },
  ]);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scanningSkill, setScanningSkill] = useState<string | null>(null);
  const [revealedSkills, setRevealedSkills] = useState<Set<string>>(new Set());

  const addLog = useCallback((text: string, color?: string) => {
    const entry: LogLine = { id: logIdCounter++, text, color, ts: nowTs() };
    setLogs(prev => [...prev.slice(-60), entry]);
  }, []);

  const resetView = useCallback(() => {
    if (stateRef.current.scanning) return;
    setActiveCategory(null);
    stateRef.current.activeCategory = null;
    stateRef.current.baseZoom = 1.0;
    addLog(`> RETURNING TO STELLAR SYSTEM OVERVIEW`, '#555c80');
  }, [addLog]);

  /* ── Run a scan sequence for a category ─────────────────────────────── */
  const runScan = useCallback((catId: string) => {
    const cat = SKILL_CATEGORIES.find(c => c.id === catId);
    if (!cat) return;

    const s = stateRef.current;
    s.targetGlowColor = cat.color;
    s.targetGlowRgb = cat.colorRgb;
    s.glowColor = cat.color;
    s.glowRgb = cat.colorRgb;
    s.scanning = true;
    s.activeCategory = catId;
    s.scanProgress = 0;
    s.baseZoom = 0.8; // Zoom in slightly to focus on scanned sector

    setActiveCategory(catId);
    addLog(``, undefined);
    addLog(`> SCANNING SECTOR: ${cat.label.toUpperCase()}...`, cat.color);
    addLog(`> CONSTELLATION SYNCED: ${cat.skills.length} STAR MODULES DETECTED`, undefined);

    const hubsPositions: Record<string, THREE.Vector3> = {
      AI_CORE: new THREE.Vector3(3.5, 0.15, 1.8),
      CLOUD: new THREE.Vector3(-3.2, -0.3, -2.5),
      DEV: new THREE.Vector3(-2.2, 0.6, 3.2),
      SECURITY: new THREE.Vector3(2.6, -0.4, -3.0)
    };

    if (s.triggerWebGLShockwave) {
      s.triggerWebGLShockwave(hubsPositions[catId] || new THREE.Vector3(0, 0, 0), cat.color);
    }

    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= cat.skills.length) {
        clearInterval(interval);
        s.scanning = false;
        addLog(`> SECTOR MAP COMPLETE — ${cat.skills.length} MODULES STABILISED`, cat.color);
        setScanningSkill(null);
        return;
      }
      const sk = cat.skills[idx];
      setScanningSkill(sk.name);
      setRevealedSkills(prev => new Set([...prev, sk.name]));
      addLog(`  [${String(idx + 1).padStart(2, '0')}] ${sk.name.padEnd(14)} ${sk.level}%  ${sk.note}`, cat.color);
      
      if (s.triggerWebGLShockwave) {
        s.triggerWebGLShockwave(hubsPositions[catId] || new THREE.Vector3(0, 0, 0), cat.color);
      }
      idx++;
    }, 420);
  }, [addLog]);

  /* ── Three.js Scene Setup & Animation Loop ──────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    try {
      // ── Three.js Scene Setup ──
      const scene = new THREE.Scene();
      
      // Sizing with safe fallbacks to prevent NaN camera aspect or 0px sizes
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 360;
      
      const camera = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        1000
      );
      camera.position.set(0, 7, 10);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      // ── Galaxy Group ──
      const galaxyGroup = new THREE.Group();
      scene.add(galaxyGroup);

      // Procedural Particle Texture
      const createParticleTexture = () => {
        const pCanvas = document.createElement('canvas');
        pCanvas.width = 16;
        pCanvas.height = 16;
        const pCtx = pCanvas.getContext('2d')!;
        const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
        grad.addColorStop(0.5, 'rgba(34, 211, 238, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        pCtx.fillStyle = grad;
        pCtx.fillRect(0, 0, 16, 16);
        return new THREE.CanvasTexture(pCanvas);
      };
      const particleTexture = createParticleTexture();

      const particleCount = 2200;
      const starGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const initialPositions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const arm = i % 2;
        const theta = Math.random() * Math.PI * 4;
        const r = Math.pow(theta / (Math.PI * 4), 1.5) * 6.0;
        const angle = theta + (arm * Math.PI);

        const dispersion = 0.45 * (1.0 - (theta / (Math.PI * 4)) * 0.7);
        const x = Math.cos(angle) * r + (Math.random() - 0.5) * dispersion * 3.0;
        const y = (Math.random() - 0.5) * dispersion * 1.2;
        const z = Math.sin(angle) * r + (Math.random() - 0.5) * dispersion * 3.0;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        initialPositions[i * 3] = x;
        initialPositions[i * 3 + 1] = y;
        initialPositions[i * 3 + 2] = z;

        velocities[i] = 0.08 + (1.0 - r / 6.0) * 0.14;

        const mixRatio = r / 6.0;
        const color = new THREE.Color();
        if (mixRatio < 0.22) {
          color.setHSL(0.55, 0.3, 0.98); // Bright stellar core
        } else if (arm === 0) {
          color.lerpColors(new THREE.Color('#22d3ee'), new THREE.Color('#c084fc'), (mixRatio - 0.22) / 0.78);
        } else {
          color.lerpColors(new THREE.Color('#2dd4bf'), new THREE.Color('#f59e0b'), (mixRatio - 0.22) / 0.78);
        }

        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const starMaterial = new THREE.PointsMaterial({
        size: 0.22,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true
      });
      const starField = new THREE.Points(starGeo, starMaterial);
      galaxyGroup.add(starField);

      // Glowing Galactic Center Core Mesh
      const coreGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      galaxyGroup.add(coreMesh);

      // ── Glowing Sector Hubs ──
      const hubs = [
        { id: 'AI_CORE', color: 0x22d3ee, pos: new THREE.Vector3(3.5, 0.15, 1.8) },
        { id: 'CLOUD', color: 0xc084fc, pos: new THREE.Vector3(-3.2, -0.3, -2.5) },
        { id: 'DEV', color: 0x2dd4bf, pos: new THREE.Vector3(-2.2, 0.6, 3.2) },
        { id: 'SECURITY', color: 0xf59e0b, pos: new THREE.Vector3(2.6, -0.4, -3.0) }
      ];

      const hubMeshes: THREE.Mesh[] = [];

      hubs.forEach(h => {
        const group = new THREE.Group();
        group.position.copy(h.pos);
        galaxyGroup.add(group);

        // Star core mesh
        const hubCoreGeo = new THREE.SphereGeometry(0.12, 12, 12);
        const hubCoreMat = new THREE.MeshBasicMaterial({ color: h.color });
        const hubCoreMesh = new THREE.Mesh(hubCoreGeo, hubCoreMat);
        group.add(hubCoreMesh);

        // Star outer wireframe shell
        const shellGeo = new THREE.IcosahedronGeometry(0.24, 1);
        const shellMat = new THREE.MeshBasicMaterial({
          color: h.color,
          wireframe: true,
          transparent: true,
          opacity: 0.45
        });
        const shellMesh = new THREE.Mesh(shellGeo, shellMat);
        shellMesh.userData = { categoryId: h.id };
        group.add(shellMesh);
        hubMeshes.push(shellMesh);

        // Planetary orbital rings
        const ringGeo = new THREE.RingGeometry(0.32, 0.34, 30);
        const ringMat = new THREE.MeshBasicMaterial({
          color: h.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.2
        });
        const orbitRing = new THREE.Mesh(ringGeo, ringMat);
        orbitRing.rotation.x = Math.PI / 2;
        group.add(orbitRing);
      });

      // Ambient Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
      scene.add(ambientLight);

      // ── Raycasting Setup ──
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // Bind resetView to ref so events can trigger it cleanly
      stateRef.current.resetView = resetView;

      // ── Interaction Variables ──
      let isDragging = false;
      let prevMouseX = 0;
      let prevMouseY = 0;
      let targetRotY = 0.0;
      let targetRotX = 0.0;
      let hoveredHubId: string | null = null;

      const clock = new THREE.Clock();

      // Camera targets
      const targetCamPos = new THREE.Vector3(0, 7, 10);
      const targetLookAt = new THREE.Vector3(0, 0, 0);
      const currentLookAt = new THREE.Vector3(0, 0, 0);

      // Helper to trigger view reset safely
      const triggerReset = () => {
        if (stateRef.current.resetView) {
          stateRef.current.resetView();
        }
      };

      // ── Custom shockwaves ──
      const customShockwave = { active: false, source: new THREE.Vector3(), progress: 0 };
      const triggerShockwave = (pos: THREE.Vector3, color: string) => {
        customShockwave.active = true;
        customShockwave.source.copy(pos);
        if (pos.lengthSq() > 0.01) {
          // It's a hub position, convert to world coordinates based on current galaxy rotation
          customShockwave.source.applyMatrix4(galaxyGroup.matrixWorld);
        }
        customShockwave.progress = 0;
        
        stateRef.current.pings.push({
          r: 0,
          age: 0,
          color: color
        });
      };
      stateRef.current.triggerWebGLShockwave = triggerShockwave;

      // Resize Handler
      const handleResize = () => {
        const w = container.clientWidth || 400;
        const h = container.clientHeight || 360;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // ── Event Handlers ──
      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        if (!isDragging) {
          const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          galaxyGroup.position.x = px * 0.3;
          galaxyGroup.position.y = -py * 0.3;
        }

        if (isDragging) {
          const deltaX = e.clientX - prevMouseX;
          const deltaY = e.clientY - prevMouseY;
          targetRotY += deltaX * 0.005;
          targetRotX += deltaY * 0.005;
          targetRotX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotX));
          prevMouseX = e.clientX;
          prevMouseY = e.clientY;
        }
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const direction = Math.sign(e.deltaY);
        let currentZoom = stateRef.current.baseZoom;
        
        // Dynamic step for zoom
        currentZoom = Math.max(0.4, Math.min(2.5, currentZoom + direction * 0.08));
        
        // If focusing a sector, zooming out past 1.3 automatically resets to overview
        if (stateRef.current.activeCategory && currentZoom > 1.3) {
          triggerReset();
        } else {
          stateRef.current.baseZoom = currentZoom;
        }
      };

      // Keyboard controls for zoom fallback (redundancy for trackpads)
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === '=' || e.key === '+') {
          stateRef.current.baseZoom = Math.max(0.4, Math.min(2.5, stateRef.current.baseZoom - 0.08)); // Zoom in
        } else if (e.key === '-' || e.key === '_') {
          const nextZoom = stateRef.current.baseZoom + 0.08;
          if (stateRef.current.activeCategory && nextZoom > 1.3) {
            triggerReset();
          } else {
            stateRef.current.baseZoom = Math.max(0.4, Math.min(2.5, nextZoom)); // Zoom out
          }
        }
      };

      const onClick = () => {
        if (hoveredHubId) {
          runScan(hoveredHubId);
        } else {
          if (stateRef.current.activeCategory) {
            triggerReset();
          } else {
            triggerShockwave(new THREE.Vector3(0, 0, 0), stateRef.current.glowColor);
            addLog(`> COSMIC WARP RIPPLE TRANSMITTED`, '#555c80');
          }
        }
      };

      canvas.addEventListener('mousedown', onMouseDown);
      canvas.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('wheel', onWheel, { passive: false });
      canvas.addEventListener('click', onClick);
      window.addEventListener('keydown', onKeyDown);

      // ── Animation loop ──
      const loop = () => {
        try {
          animRef.current = requestAnimationFrame(loop);

          const delta = clock.getDelta();
          const time = clock.getElapsedTime();

          const s = stateRef.current;
          s.t = time;

          // 1. Rotate galaxy group
          galaxyGroup.rotation.y = THREE.MathUtils.lerp(galaxyGroup.rotation.y, targetRotY + time * 0.03, 0.05);
          galaxyGroup.rotation.x = THREE.MathUtils.lerp(galaxyGroup.rotation.x, targetRotX, 0.05);

          // Core glow pulse
          const corePulse = 0.8 + Math.sin(time * 2.5) * 0.15;
          coreMesh.scale.setScalar(corePulse);

          // Rotate celestial hubs
          hubMeshes.forEach(m => {
            m.rotation.y += delta * 0.8;
            m.rotation.x += delta * 0.4;
          });

          // 2. Shockwave logic
          if (s.scanning) {
            s.scanProgress += delta * 0.55;
            if (s.scanProgress > 1.0) s.scanProgress = 0;
          }

          // Update particle positions
          const positionAttr = starGeo.getAttribute('position') as THREE.BufferAttribute;
          const rawPos = positionAttr.array as Float32Array;

          let waveActive = false;
          let waveSource = new THREE.Vector3(0, 0, 0);
          let waveRadius = 0;

          if (s.scanning) {
            waveActive = true;
            const activeCatObj = hubs.find(h => h.id === s.activeCategory);
            if (activeCatObj) {
              // Get actual rotating world position of the hub
              galaxyGroup.updateMatrixWorld(true);
              waveSource = activeCatObj.pos.clone().applyMatrix4(galaxyGroup.matrixWorld);
            } else {
              waveSource = new THREE.Vector3(0, 0, 0);
            }
            waveRadius = s.scanProgress * 10.0;
          } else if (customShockwave.active) {
            waveActive = true;
            waveSource = customShockwave.source;
            customShockwave.progress += delta * 0.8;
            waveRadius = customShockwave.progress * 12.0;
            if (customShockwave.progress > 1.0) {
              customShockwave.active = false;
            }
          }

          for (let i = 0; i < particleCount; i++) {
            const bx = initialPositions[i * 3];
            const by = initialPositions[i * 3 + 1];
            const bz = initialPositions[i * 3 + 2];

            const orbitAngle = velocities[i] * time * 0.35;
            const cosO = Math.cos(orbitAngle);
            const sinO = Math.sin(orbitAngle);

            let rx = bx * cosO - bz * sinO;
            let ry = by;
            let rz = bx * sinO + bz * cosO;

            if (waveActive) {
              const dx = rx - waveSource.x;
              const dy = ry - waveSource.y;
              const dz = rz - waveSource.z;
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
              const distDiff = dist - waveRadius;

              if (distDiff > 0 && distDiff < 1.4) {
                const pushFactor = (1.0 - distDiff / 1.4) * 0.65;
                const len = dist || 1;
                rx += (dx / len) * pushFactor;
                ry += (dy / len) * pushFactor * 0.25;
                rz += (dz / len) * pushFactor;
              }
            }

            rawPos[i * 3] = rx;
            rawPos[i * 3 + 1] = ry;
            rawPos[i * 3 + 2] = rz;
          }
          positionAttr.needsUpdate = true;

          // 3. Raycasting to check hovered hubs
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(hubMeshes);

          let foundHover: string | null = null;
          if (intersects.length > 0) {
            const hitShell = intersects[0].object as THREE.Mesh;
            foundHover = hitShell.userData.categoryId;
          }

          hubMeshes.forEach(mesh => {
            const catId = mesh.userData.categoryId;
            const parentGroup = mesh.parent;
            if (parentGroup) {
              if (catId === foundHover) {
                parentGroup.scale.setScalar(THREE.MathUtils.lerp(parentGroup.scale.x, 1.35, 0.15));
                mesh.rotation.y += delta * 1.5;
              } else {
                parentGroup.scale.setScalar(THREE.MathUtils.lerp(parentGroup.scale.x, 1.0, 0.1));
              }
            }
          });
          hoveredHubId = foundHover;

          // 4. Smooth camera pan transitions tracking the dynamic world position of hubs
          const activeCatObj = hubs.find(h => h.id === s.activeCategory);
          if (activeCatObj) {
            galaxyGroup.updateMatrixWorld(true);
            const worldFocusPos = activeCatObj.pos.clone().applyMatrix4(galaxyGroup.matrixWorld);
            
            targetCamPos.copy(worldFocusPos).add(new THREE.Vector3(1.4, 1.0, 2.2).multiplyScalar(s.baseZoom));
            targetLookAt.copy(worldFocusPos);
          } else {
            targetCamPos.set(0, 6.2, 8.8).multiplyScalar(s.baseZoom);
            targetLookAt.set(0, 0, 0);
          }

          camera.position.lerp(targetCamPos, 0.05);
          currentLookAt.lerp(targetLookAt, 0.05);
          camera.lookAt(currentLookAt);

          renderer.render(scene, camera);
        } catch (loopErr: any) {
          cancelAnimationFrame(animRef.current);
          console.error("WebGL Animation Loop Crash:", loopErr);
          addLog(`> ERROR: Animation Loop Crash: ${loopErr.message || loopErr}`, '#ff5f57');
        }
      };
      loop();

      // ── Cleanup ──
      return () => {
        cancelAnimationFrame(animRef.current);
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        canvas.removeEventListener('wheel', onWheel);
        canvas.removeEventListener('click', onClick);
        window.removeEventListener('keydown', onKeyDown);

        renderer.dispose();
        starGeo.dispose();
        starMaterial.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        particleTexture.dispose();

        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(m => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      };
    } catch (err: any) {
      console.error("WebGL Setup Crash:", err);
      addLog(`> ERROR: WebGL Setup Crash: ${err.message || err}`, '#ff5f57');
      return () => {};
    }
  }, []);


  const handleCategoryClick = useCallback((catId: string) => {
    if (stateRef.current.scanning) return;
    if (stateRef.current.activeCategory === catId) {
      resetView();
    } else {
      runScan(catId);
    }
  }, [runScan, resetView]);

  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  if (runtimeError) {
    return (
      <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', color: '#f87171', fontFamily: 'monospace', maxWidth: '1060px', margin: '0 auto 64px' }}>
        <h3 style={{ marginBottom: '10px', color: '#ef4444' }}>✦ [SYSTEM_CRASH] RUNTIME EXCEPTION DETECTED</h3>
        <p style={{ fontSize: '13px', lineHeight: '1.6' }}>{runtimeError}</p>
        <button onClick={() => setRuntimeError(null)} style={{ marginTop: '16px', background: '#ef4444', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '10px' }}>DISMISS</button>
      </div>
    );
  }

  const activeCat = SKILL_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="bc-wrap">
      {/* ── Header ── */}
      <div className="bc-header">
        <span className="bc-header-icon">✦</span>
        <div>
          <div className="bc-header-title">STELLAR_COSMOS_NAVIGATOR</div>
          <div className="bc-header-sub">Select a cosmic sector to scan skill nodes. Drag to navigate 3D space.</div>
        </div>
        <div className="bc-status-pill">● COGNITIVE CORE STABLE</div>
      </div>

      {/* ── Main Panel ── */}
      <div className="bc-main">
        {/* Left: Canvas */}
        <div className="bc-canvas-panel">
          <div className="bc-canvas-bracket tl" />
          <div className="bc-canvas-bracket tr" />
          <div className="bc-canvas-bracket bl" />
          <div className="bc-canvas-bracket br" />
          <canvas
            ref={canvasRef}
            className="bc-canvas"
            style={{ cursor: 'grab' }}
          />
          <div className="bc-canvas-label-top">STELLAR SURVEY SCANNER</div>

          {activeCategory && (
            <button 
              className="bc-reset-view-btn" 
              onClick={resetView}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(5, 8, 16, 0.75)',
                border: `1px solid ${activeCat?.color || '#22d3ee'}`,
                color: activeCat?.color || '#22d3ee',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '9px',
                fontFamily: 'var(--font-display)',
                cursor: 'pointer',
                zIndex: 10,
                backdropFilter: 'blur(4px)',
                transition: 'all 0.2s ease',
                boxShadow: `0 0 10px rgba(${activeCat?.colorRgb || '34,211,238'}, 0.2)`,
              } as any}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = activeCat?.color || '#22d3ee';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(5, 8, 16, 0.75)';
                e.currentTarget.style.color = activeCat?.color || '#22d3ee';
              }}
            >
              RETURN TO OVERVIEW
            </button>
          )}

          <div className="bc-canvas-label-bottom">
            {scanningSkill
              ? `SCANNING: ${scanningSkill}...`
              : activeCategory
              ? `SECTOR LOCKED: ${activeCategory}`
              : 'AWAITING SECTOR LOCK COMMAND'}
          </div>
        </div>

        {/* Right: Terminal */}
        <div className="bc-terminal">
          <div className="bc-terminal-header">
            <span className="bc-terminal-dot" style={{ background: '#ff5f57' }} />
            <span className="bc-terminal-dot" style={{ background: '#febc2e' }} />
            <span className="bc-terminal-dot" style={{ background: '#28c840' }} />
            <span className="bc-terminal-title">COSMIC_INDEX // STELLAR_DB</span>
          </div>
          <div className="bc-terminal-body" ref={logRef}>
            {logs.map(l => (
              <div
                key={l.id}
                className="bc-log-line"
                style={{ color: l.color || 'var(--color-text-secondary)' }}
              >
                <span className="bc-log-ts">{l.ts}</span>
                <span>{l.text}</span>
              </div>
            ))}
            <div className="bc-terminal-cursor" />
          </div>

          {/* Skill bars (shown after scan) */}
          {activeCat && (
            <div className="bc-skill-bars">
              {activeCat.skills.map(sk => (
                <div
                  key={sk.name}
                  className={`bc-skill-row ${revealedSkills.has(sk.name) ? 'revealed' : ''}`}
                >
                  <span className="bc-skill-name" style={{ color: activeCat.color }}>{sk.name}</span>
                  <div className="bc-bar-track">
                    <div
                      className="bc-bar-fill"
                      style={{
                        '--bar-w': `${sk.level}%`,
                        '--bar-color': activeCat.color,
                        '--bar-rgb': activeCat.colorRgb,
                        width: revealedSkills.has(sk.name) ? `${sk.level}%` : '0%',
                      } as React.CSSProperties}
                    />
                  </div>
                  <span className="bc-skill-pct">{revealedSkills.has(sk.name) ? `${sk.level}%` : '--'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Category Chips ── */}
      <div className="bc-cats">
        {SKILL_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`bc-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
            style={{ '--cat-color': cat.color, '--cat-rgb': cat.colorRgb } as React.CSSProperties}
            onClick={() => handleCategoryClick(cat.id)}
          >
            <span className="bc-cat-dot" />
            {cat.label}
            <span className="bc-cat-count">{cat.skills.length}</span>
          </button>
        ))}
      </div>

      {/* ── All Skills Mini Chips ── */}
      <div className="bc-all-chips">
        {ALL_CHIPS.map(sk => (
          <span
            key={sk.name}
            className={`bc-chip ${revealedSkills.has(sk.name) ? 'revealed' : ''}`}
            style={{ '--chip-color': sk.color } as React.CSSProperties}
          >
            {sk.name}
          </span>
        ))}
      </div>
    </div>
  );
}
