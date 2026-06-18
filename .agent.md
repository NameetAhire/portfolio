# Project Agent Instructions & Skills

Welcome! This repository is configured with local agent skills located under the [.agents/skills/](file:///d:/Mtech/portfolio/p/.agents/skills/) directory. Any AI agent working on this repository should refer to this document to understand the available specialized capabilities and guidelines.

---

## 🛠️ Installed Skills

The following skills are available in this repository. Before starting tasks related to these topics, you **must** read the corresponding `SKILL.md` file using the `view_file` tool to align with the defined patterns, validation checks, and best practices.

### 1. 🌐 [3D Web Experience](file:///d:/Mtech/portfolio/p/.agents/skills/3d-web-experience/SKILL.md)
* **Description**: Expert in building 3D experiences for the web using Three.js, React Three Fiber, Spline, WebGL, and interactive 3D scenes.
* **When to use**: When requested to build 3D elements, product configurators, 3D landing pages, interactive portfolios, or prepare 3D models.
* **Key resources**: Loading fallbacks, Draco compression guidelines, mobile performance scaling, and OrbitControls setups.

### 2. 🎨 [Threejs 3D Graphics](file:///d:/Mtech/portfolio/p/.agents/skills/threejs-3d-graphics/SKILL.md)
* **Description**: Senior WebGL/Three.js developer specializing in low-level graphics, custom shaders (GLSL), performance optimization, and asset rendering.
* **When to use**: When dealing with custom shader code (ShaderMaterial), lighting issues, draw call optimizations, post-processing, skeletal animation, or debugging rendering bugs.

### 3. 📏 [Web Design Guidelines](file:///d:/Mtech/portfolio/p/.agents/skills/web-design-guidelines/SKILL.md)
* **Description**: UI/UX review agent that verifies compliance of React, HTML, and CSS against Vercel's Web Interface Guidelines.
* **When to use**: When asked to "review UI", "check accessibility", "audit design", or "check UX".

### 4. 🎹 [HyperFrames Animation](file:///d:/Mtech/portfolio/p/.agents/skills/hyperframes-animation/SKILL.md)
* **Description**: Motion design system for GSAP, Anime.js, CSS Keyframes, Web Animations API, and Three.js animation mixers. Built for deterministic, seek-safe transitions.
* **When to use**: When choreographing transitions, page reveals, micro-animations, or multi-phase scrolling timelines.

### 5. 🌈 [Tailwind Gradient Builder](file:///d:/Mtech/portfolio/p/.agents/skills/tailwind-gradient-builder/SKILL.md)
* **Description**: Creates modern CSS gradients (linear, radial, conic, mesh, animated) and glassmorphism styling using Tailwind CSS tokens.
* **When to use**: When styling background panels, title typography gradients, glass cards, or gradient border frames.

### 6. 📐 [Designing Beautiful Websites](file:///d:/Mtech/portfolio/p/.agents/skills/designing-beautiful-websites/SKILL.md)
* **Description**: Structural and visual design agent outlining strategy, information architecture, wireframing, and visual design tokens.
* **When to use**: When planning site improvements, layouts, component specs, accessibility, and high-quality visual hierarchies.

---

## 📋 General Agent Guidelines for this Project

1. **Prioritize Performance**: 3D web applications are heavy. Always target 60 FPS on desktop and at least 30 FPS on mobile. Limit particle counts and limit screen pixel ratio (DPR) to `1` on mobile.
2. **Optimize Assets**: Never load raw `.obj` or uncompressed `.gltf` files directly. Compress them to `.glb` using Draco and compress textures to WebP.
3. **Mobile First & Fallbacks**: Always detect mobile users and scale down canvas resolution or supply high-quality static image/gradient fallbacks.
4. **Follow UI Best Practices**: Use CSS variables for design systems, avoid ad-hoc styling, keep layouts responsive, and audit components with the [Web Design Guidelines](file:///d:/Mtech/portfolio/p/.agents/skills/web-design-guidelines/SKILL.md) check.
