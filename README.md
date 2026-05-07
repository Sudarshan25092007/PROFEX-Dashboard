<div align="center">

<img src="public/profex-banner.png" alt="PROFEX Banner" width="100%" style="border-radius: 12px; box-shadow: 0 0 20px rgba(138,43,226,0.3);" />

<br>
<br>

# 𝐏 𝐑 𝐎 𝐅 𝐄 𝐗  ///  T E R M I N A L

<p align="center">
  <b>A High-Fidelity, Interactive WebGL Landing & Broker Orchestration Platform</b><br>
  <i>Laying the visual architecture for the future PROFEX Trading Dashboard.</i>
</p>

<p align="center">
  <a href="#mission-overview"><img src="https://img.shields.io/badge/Mission-040404?style=for-the-badge&logo=target&logoColor=39FF14&border=1&borderColor=38B2AC"></a>
  <a href="#the-3d-globe"><img src="https://img.shields.io/badge/3D_Architecture-040404?style=for-the-badge&logo=three.js&logoColor=white&border=1&borderColor=38B2AC"></a>
  <a href="#the-stack"><img src="https://img.shields.io/badge/Tech_Stack-040404?style=for-the-badge&logo=react&logoColor=61DAFB&border=1&borderColor=38B2AC"></a>
  <a href="#quick-start"><img src="https://img.shields.io/badge/Quick_Start-040404?style=for-the-badge&logo=npm&logoColor=DC143C&border=1&borderColor=38B2AC"></a>
</p>

</div>

---

<h2 id="mission-overview">🌌 Mission Overview</h2>

**PROFEX** is a high-grade, institutional frontend UI acting as the premium landing page for a structured forex trading algorithm. 

Currently, it serves as a sophisticated gateway—orchestrating the user journey and executing a secure "handshake" protocol before routing users to broker referral links. More importantly, this platform establishes the **foundational "hardware interface" aesthetic** for a massive, feature-rich trading dashboard planned for the future.

By utilizing a strict "Rule of Thirds" composition, obsidian monochrome styling, and tactile CRT scanline glass textures, PROFEX sets an immediate tone of trust, technical superiority, and absolute precision.

---

<h2 id="the-3d-globe">🌍 The 3D Globe: Engineering & Purpose</h2>

The centerpiece of the landing experience is the interactive 3D globe, rendering flawlessly at 60FPS in the background. It is not merely decorative; it is a statement of capability.

> *“By flawlessly rendering complex 3D mathematics in the browser, it implicitly promises the user that the financial mathematics running the trading algorithm are equally sophisticated and robust.”*

### Architectural Breakdown:
*   **Dual-Layer Core:** Features a solid obsidian metallic base sphere overlaid with a high-resolution Earth Alpha Map.
*   **18,000-Point Stippled Matrix:** The continents are rendered using a highly dense, glowing white point matrix, while the oceans remain an absolute void.
*   **Mouse-Reactive Fresnel Spotlight:** Utilizing custom GLSL fragment and vertex shaders, an intense white rim-light (Fresnel glow) wraps the edge of the globe and dynamically biases its focus toward the user's cursor.
*   **Floating Candlesticks:** Instanced meshes of bullish/bearish candlesticks float in the parallax background, responding to user movement with zero performance degradation.

---

<h2 id="agent-capabilities">🤖 Agent Capabilities</h2>

The UI operates as an orchestrated unit of specialized components:

| Agent / Subsystem | Capability |
| :--- | :--- |
| 🛡️ **`Agent: Architect`** | Maintains strict layout alignment and responsive scaling. Enforces the obsidian black styling with Electric Violet and Acid Green data accents. |
| 🌐 **`Agent: Renderer`** | Drives the WebGL environment. Renders the dual-layer Earth and instanced meshes using `Three.js` and `@react-three/fiber`. |
| 🔦 **`Agent: Spotlight`** | Injects interactive dynamics via custom GLSL Shaders, tracking pointer movements to cast a responsive glow over the 3D globe. |
| 🔒 **`Agent: Orchestrator`** | Manages the tactical transition ("DECRYPTING ACCESS..."), generating CRT overlays and loading bars before brokering redirects. |

---

<h2 id="the-stack">💻 The Stack</h2>

PROFEX leverages a modern, highly optimized React ecosystem to deliver its complex visuals without compromising load times.

<div align="center">
  <br>
  <img src="https://img.shields.io/badge/Next.js%2014-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white" />
  <br>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue" />
  <img src="https://img.shields.io/badge/React_Three_Fiber-black?style=for-the-badge&logo=react&logoColor=white" />
  <br>
  <br>
</div>

<details>
<summary><b>📂 View Workspace Structure</b></summary>

```bash
PROFEX/
├── app/                  # Next.js 14 App Router, Layouts, and Core Pages
│   ├── page.tsx          # High-Fidelity Landing & Authentication UI
│   └── referrals/        # Secure Broker Selection Terminal
├── components/           # React UI Components & 3D Elements
│   └── ThreeCyberGlobe.tsx # WebGL Canvas, GLSL Shaders, Instanced Meshes
├── config/               # Application Config (Referral routing logic)
├── public/               # Static Assets (Logos, Metallic Seals, Banners)
└── tailwind.config.ts    # Glassmorphism & custom utility classes
```

</details>

---

<h2 id="quick-start">⚡ Quick Start</h2>

Initialize the terminal locally and test the WebGL environment:

```bash
# Clone and install dependencies
npm install

# Boot the terminal
npm run dev
```

> **Requirements:** Ensure you are running Node.js 18+ to support Next.js App Router features.

<br>

<div align="center">
  <p><i>System Online. Awaiting Commands.</i></p>
</div>
