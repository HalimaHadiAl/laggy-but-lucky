"use client";

import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */

const teamMembers = [
  {
    name: "Halima Hadi Alfina",
    role: "Game Programmer & Project Manager",
    desc: "Merancang mekanik gameplay yang unik dan pengalaman pemain yang tak terlupakan & Mengoordinasikan tim dan memastikan setiap milestone tercapai dengan sempurna.",
    photo: "",
    initials: "HH",
    gradient: "linear-gradient(135deg,#60a5fa,#6366f1)",
  },
  {
    name: "Eu Kharistia Banura",
    role: "Game Programmer",
    desc: "Menciptakan antarmuka visual yang intuitif dan estetika game yang memukau melalui code program.",
    photo: "",
    initials: "EK",
    gradient: "linear-gradient(135deg,#a78bfa,#7c3aed)",
  },
  {
    name: "Madania Aldanita",
    role: "Game Developer",
    desc: "Mengimplementasikan sistem gameplay dan logika permainan dengan presisi tinggi.",
    photo: "",
    initials: "MA",
    gradient: "linear-gradient(135deg,#38bdf8,#3b82f6)",
  },
  {
    name: "Nurjihan Nabila Muntaz",
    role: "Game Designer/Writer",
    desc: "Menghidupkan dunia game melalui ilustrasi karakter dan aset visual yang artistik.",
    photo: "",
    initials: "NN",
    gradient: "linear-gradient(135deg,#818cf8,#a855f7)",
  },
  {
    name: "Salmadinda Aishella",
    role: "Game Asset Developer",
    desc: "Menciptakan antarmuka visual yang intuitif dan estetika game yang memukau.",
    photo: "",
    initials: "SA",
    gradient: "linear-gradient(135deg,#c084fc,#6366f1)",
  },
];

// ── Projects with categories ──────────────────────────────────
const categories = ["All", "Unity / Game", "UI/UX", "Web Dev", "Data / AI", "IoT", "Content"];

const projects = [
  // Unity first
  { id: 1,  title: "2D Game: Unity Ping Pong",         category: "Unity / Game", emoji: "🏓", bg: "linear-gradient(135deg,#1e1b4b,#4338ca,#6366f1)", tag: "Unity",        src: "" },
  { id: 2,  title: "2D Game: Unity Object Recognition",category: "Unity / Game", emoji: "🎯", bg: "linear-gradient(135deg,#312e81,#6366f1,#818cf8)", tag: "Unity",        src: "" },
  { id: 3,  title: "3D Game Development Using Unity",   category: "Unity / Game", emoji: "🎮", bg: "linear-gradient(135deg,#0f172a,#312e81,#4f46e5)", tag: "Unity 3D",     src: "" },
  // UI/UX
  { id: 4,  title: "UI/UX Web Design Figma 1",          category: "UI/UX",       emoji: "🖌️", bg: "linear-gradient(135deg,#ede9fe,#c4b5fd,#a78bfa)", tag: "Figma",        src: "" },
  { id: 5,  title: "UI/UX Web Design Figma 2",          category: "UI/UX",       emoji: "✏️", bg: "linear-gradient(135deg,#faf5ff,#e9d5ff,#c084fc)", tag: "Figma",        src: "" },
  // Web Dev
  { id: 6,  title: "Web Invitation",                    category: "Web Dev",     emoji: "💌", bg: "linear-gradient(135deg,#ecfdf5,#a7f3d0,#34d399)", tag: "HTML/CSS",     src: "" },
  { id: 7,  title: "CRUD Java Web",                     category: "Web Dev",     emoji: "☕", bg: "linear-gradient(135deg,#fef3c7,#fde68a,#f59e0b)", tag: "Java",         src: "" },
  { id: 8,  title: "IKAPOLINES Website (Java)",         category: "Web Dev",     emoji: "🌐", bg: "linear-gradient(135deg,#fff7ed,#fed7aa,#fb923c)", tag: "Java Web",     src: "" },
  { id: 9,  title: "IKAPOLINES APP (Flutter)",          category: "Web Dev",     emoji: "📱", bg: "linear-gradient(135deg,#f0f9ff,#bae6fd,#38bdf8)", tag: "Flutter",      src: "" },
  // Data / AI
  { id: 10, title: "Chatbot AI with Gemini",            category: "Data / AI",   emoji: "🤖", bg: "linear-gradient(135deg,#0c4a6e,#0369a1,#38bdf8)", tag: "AI / Gemini",  src: "" },
  { id: 11, title: "ML Supervised Learning",            category: "Data / AI",   emoji: "📊", bg: "linear-gradient(135deg,#134e4a,#0f766e,#2dd4bf)", tag: "ML",           src: "" },
  { id: 12, title: "ML Unsupervised Learning",          category: "Data / AI",   emoji: "🧠", bg: "linear-gradient(135deg,#1e3a5f,#1d4ed8,#60a5fa)", tag: "ML",           src: "" },
  { id: 13, title: "AI Search: BFS and DFS",            category: "Data / AI",   emoji: "🔍", bg: "linear-gradient(135deg,#2e1065,#6d28d9,#a78bfa)", tag: "Algorithm",    src: "" },
  { id: 14, title: "Data Analysis with SPSS",           category: "Data / AI",   emoji: "📈", bg: "linear-gradient(135deg,#0f4c75,#1b6ca8,#4fb8f7)", tag: "SPSS",         src: "" },
  { id: 15, title: "Interactive Sales Dashboard (Looker Studio)", category: "Data / AI", emoji: "📉", bg: "linear-gradient(135deg,#14532d,#16a34a,#4ade80)", tag: "Looker", src: "" },
  { id: 16, title: "Dashboard EXCEL",                   category: "Data / AI",   emoji: "📋", bg: "linear-gradient(135deg,#166534,#15803d,#86efac)", tag: "Excel",        src: "" },
  { id: 17, title: "To Do List Spreadsheet",            category: "Data / AI",   emoji: "☑️", bg: "linear-gradient(135deg,#ecfdf5,#bbf7d0,#4ade80)", tag: "Excel",        src: "" },
  { id: 18, title: "IKAPOLINES Database",               category: "Data / AI",   emoji: "🗄️", bg: "linear-gradient(135deg,#1c1917,#57534e,#a8a29e)", tag: "Database",     src: "" },
  // IoT
  { id: 19, title: "IoT Smartbin (ESP32 + App)",        category: "IoT",         emoji: "♻️", bg: "linear-gradient(135deg,#052e16,#166534,#22c55e)", tag: "ESP32 / IoT",  src: "" },
  { id: 20, title: "WLAN Security Configuration",       category: "IoT",         emoji: "🔒", bg: "linear-gradient(135deg,#0c0a09,#292524,#78716c)", tag: "Networking",   src: "" },
  // Content
  { id: 21, title: "Daily Content",                     category: "Content",     emoji: "📸", bg: "linear-gradient(135deg,#ff6b6b,#ee5a24,#f0932b)", tag: "Content",      src: "" },
  { id: 22, title: "Infographic Communication",         category: "Content",     emoji: "🗞️", bg: "linear-gradient(135deg,#6c5ce7,#a29bfe,#fd79a8)", tag: "Design",       src: "" },
  { id: 23, title: "Daily Content BEM",                 category: "Content",     emoji: "🎓", bg: "linear-gradient(135deg,#e17055,#d63031,#fab1a0)", tag: "Content",      src: "" },
  { id: 24, title: "Instagram Feeds 1",                 category: "Content",     emoji: "📷", bg: "linear-gradient(135deg,#fd79a8,#e84393,#a29bfe)", tag: "Instagram",    src: "" },
  { id: 25, title: "Instagram Feeds 2",                 category: "Content",     emoji: "🖼️", bg: "linear-gradient(135deg,#fdcb6e,#e17055,#d63031)", tag: "Instagram",    src: "" },
  { id: 26, title: "Live Report",                       category: "Content",     emoji: "📡", bg: "linear-gradient(135deg,#2d3436,#636e72,#b2bec3)", tag: "Report",       src: "" },
];

/* ─── SCROLL FADE-IN ───────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ─── ICONS ────────────────────────────────────────────────── */
const Ico = {
  logo: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: 16, height: 16 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 7l10 5 10-5M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  arrow: () => (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 15, height: 15 }}>
      <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
    </svg>
  ),
  play: () => (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}>
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
  ),
  check: (color = "white") => (
    <svg viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth={1.8} style={{ width: 10, height: 10 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l2.5 2.5L10 3.5" />
    </svg>
  ),
  menu: (open: boolean) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 22, height: 22 }}>
      {open
        ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
    </svg>
  ),
  users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 20, height: 20 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  fire: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 20, height: 20 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
  ),
  star: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 20, height: 20 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  gdrive: () => (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }}>
      <path d="M6.812 3h10.376l4.812 8.333L17.188 21H6.812L2 11.333z" fill="#4285F4" />
      <path d="M6.812 3l4.812 8.333H2z" fill="#0F9D58" opacity=".85" />
      <path d="M21 11.333l-4.812 8.667-4.376-8.667z" fill="#FFBB00" opacity=".85" />
    </svg>
  ),
};

/* ─── CSS ──────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');

  *,*::before,*::after{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;padding:0;font-family:'DM Sans',system-ui,sans-serif;overflow-x:hidden}
  ::selection{background:#c7d2fe;color:#312e81}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:#f1f5f9}
  ::-webkit-scrollbar-thumb{background:#c7d2fe;border-radius:99px}

  .serif{font-family:'DM Serif Display',Georgia,serif}

  .gtext{
    background:linear-gradient(135deg,#6366f1 0%,#3b82f6 50%,#8b5cf6 100%);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text
  }

  .hero-bg{
    background:
      radial-gradient(ellipse 90% 55% at 50% -5%,#e0e7ff 0%,transparent 65%),
      radial-gradient(ellipse 55% 45% at 92% 38%,#dbeafe 0%,transparent 55%),
      radial-gradient(ellipse 50% 35% at 8% 65%,#ede9fe 0%,transparent 55%),
      #f9fafb
  }

  @keyframes fa{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
  @keyframes fb{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}
  @keyframes fc{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  .fa{animation:fa 6s ease-in-out infinite}
  .fb{animation:fb 8s ease-in-out infinite 1.2s}
  .fc{animation:fc 7s ease-in-out infinite 2.4s}

  @keyframes glitch{
    0%,89%,100%{clip-path:inset(0 0 100% 0);left:2px}
    91%{clip-path:inset(18% 0 60% 0);left:-2px}
    93%{clip-path:inset(55% 0 20% 0);left:2px}
    95%{clip-path:inset(8% 0 75% 0);left:-1px}
    97%{clip-path:inset(70% 0 5% 0);left:1px}
  }
  .glitch{position:relative;display:inline-block}
  .glitch::after{
    content:attr(data-text);position:absolute;left:0;top:0;
    color:#818cf8;opacity:.3;
    animation:glitch 5s infinite
  }

  .nl{
    position:relative;color:#64748b;font-size:14px;font-weight:500;
    background:none;border:none;cursor:pointer;padding:0;
    transition:color .2s
  }
  .nl::after{
    content:'';position:absolute;left:0;bottom:-4px;
    width:0;height:2px;
    background:linear-gradient(90deg,#6366f1,#3b82f6);
    border-radius:2px;transition:width .28s ease
  }
  .nl:hover{color:#4f46e5}
  .nl:hover::after{width:100%}

  .chip{
    display:inline-flex;align-items:center;gap:6px;
    background:#f0f9ff;border:1px solid #bae6fd;
    color:#0284c7;font-size:11px;font-weight:700;
    letter-spacing:.07em;text-transform:uppercase;
    padding:5px 13px;border-radius:100px
  }

  .btn-p{
    background:linear-gradient(135deg,#6366f1,#3b82f6);
    box-shadow:0 4px 18px rgba(99,102,241,.32);
    transition:transform .25s,box-shadow .25s;
    color:white;font-weight:600;border:none;cursor:pointer;
    display:inline-flex;align-items:center;gap:8px
  }
  .btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(99,102,241,.44)}

  .btn-g{
    border:1.5px solid #e2e8f0;background:white;
    transition:all .25s;cursor:pointer;
    display:inline-flex;align-items:center;gap:8px
  }
  .btn-g:hover{border-color:#a5b4fc;background:#f5f3ff;transform:translateY(-2px)}

  .lift{transition:transform .28s ease,box-shadow .28s ease}
  .lift:hover{transform:translateY(-5px);box-shadow:0 20px 40px -8px rgba(99,102,241,.16)}

  /* project card */
  .pcrd{overflow:hidden;border-radius:16px;position:relative;cursor:pointer;transition:transform .3s ease,box-shadow .3s ease}
  .pcrd:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.15)}
  .pcrd-inner{transition:transform .38s ease;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
  .pcrd:hover .pcrd-inner{transform:scale(1.06)}
  .pcrd-ov{
    position:absolute;inset:0;opacity:0;
    transition:opacity .3s ease;
    display:flex;align-items:center;justify-content:center;
    background:rgba(15,23,42,.55);backdrop-filter:blur(6px)
  }
  .pcrd:hover .pcrd-ov{opacity:1}

  /* filter tabs */
  .ftab{
    border:1.5px solid #e2e8f0;background:white;color:#64748b;
    font-size:12px;font-weight:600;padding:7px 16px;border-radius:100px;
    cursor:pointer;transition:all .22s;white-space:nowrap
  }
  .ftab:hover{border-color:#a5b4fc;color:#6366f1;background:#f5f3ff}
  .ftab.active{background:linear-gradient(135deg,#6366f1,#3b82f6);color:white;border-color:transparent;box-shadow:0 4px 12px rgba(99,102,241,.3)}

  .tph{transition:transform .3s ease}
  .tcrd:hover .tph{transform:scale(1.06)}

  .sn{font-family:'DM Serif Display',serif}
  .dots{background-image:radial-gradient(circle,#cbd5e1 1px,transparent 1px);background-size:28px 28px}

  @media(max-width:767px){
    .hide-m{display:none!important}
    .show-m{display:flex!important}
    .hero-h1{font-size:clamp(2.8rem,13vw,4rem)!important}
  }
  @media(min-width:768px){
    .show-m{display:none!important}
    .hero-h1{font-size:clamp(3.2rem,8vw,5.5rem)}
  }

  /* project grid */
  .proj-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
    gap:16px
  }

  .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
  @media(max-width:767px){.about-grid{grid-template-columns:1fr;gap:36px}}

  .pcard-grid{display:grid;grid-template-columns:1fr 1fr}
  @media(max-width:767px){.pcard-grid{grid-template-columns:1fr}}

  .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  @media(max-width:767px){.feat-grid{grid-template-columns:1fr}}

  .team-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
  @media(max-width:900px){.team-grid{grid-template-columns:repeat(3,1fr)}}
  @media(max-width:500px){.team-grid{grid-template-columns:repeat(2,1fr)}}

  .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  @media(max-width:400px){.info-grid{grid-template-columns:1fr}}

  /* filter scroll on mobile */
  .filter-wrap{display:flex;gap:8px;flex-wrap:wrap}
  @media(max-width:600px){.filter-wrap{flex-wrap:nowrap;overflow-x:auto;padding-bottom:6px;-webkit-overflow-scrolling:touch}}
  @media(max-width:600px){.filter-wrap::-webkit-scrollbar{display:none}}
`;

/* ─── PROJECT CARD ─────────────────────────────────────────── */
function ProjectCard({ p, delay }: { p: typeof projects[0]; delay: number }) {
  const isDark = !p.bg.includes("#ecfdf") && !p.bg.includes("#faf5f") && !p.bg.includes("#fff") && !p.bg.includes("#f0f9") && !p.bg.includes("#ecfd") && !p.bg.includes("#fef3");
  const textColor = isDark ? "rgba(255,255,255,.7)" : "#374151";
  const titleColor = isDark ? "white" : "#0f172a";
  const tagBg = isDark ? "rgba(255,255,255,.18)" : "rgba(0,0,0,.08)";
  const tagColor = isDark ? "white" : "#374151";

  return (
    <FadeIn delay={delay}>
      <div className="pcrd" style={{ height: 200, background: p.bg }}>
        {p.src ? (
          <img src={p.src} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div className="pcrd-inner" style={{ background: p.bg, padding: "20px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 42, filter: isDark ? "drop-shadow(0 0 12px rgba(255,255,255,.3))" : "none", lineHeight: 1 }}>{p.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: titleColor, lineHeight: 1.35, maxWidth: "85%", letterSpacing: ".01em" }}>{p.title}</div>
            <span style={{ fontSize: 10, background: tagBg, color: tagColor, padding: "3px 10px", borderRadius: 100, fontWeight: 600, backdropFilter: "blur(4px)", border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(0,0,0,.08)" }}>{p.tag}</span>
          </div>
        )}
        <div className="pcrd-ov">
          <span style={{ color: "white", fontWeight: 700, fontSize: 12, border: "1.5px solid rgba(255,255,255,.7)", padding: "8px 20px", borderRadius: 100 }}>Lihat Detail</span>
        </div>
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <span style={{ fontSize: 10, background: tagBg, color: tagColor, padding: "3px 10px", borderRadius: 100, backdropFilter: "blur(4px)", fontWeight: 600, border: isDark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(0,0,0,.06)" }}>{p.category}</span>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── PAGE ─────────────────────────────────────────────────── */
export default function Page() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const navLinks = ["about", "project", "gallery", "team", "contact"];

  const wrap: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 24px" };
  const sec = (bg: string): React.CSSProperties => ({ padding: "96px 24px", background: bg });

  const Dot = () => <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0ea5e9", display: "inline-block" }} />;

  const Heading = ({ eyebrow, title, accent, sub }: { eyebrow: string; title: string; accent: string; sub?: string }) => (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <div className="chip" style={{ margin: "0 auto 14px", width: "fit-content" }}><Dot />{eyebrow}</div>
      <h2 className="serif" style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.1 }}>
        {title} <span className="gtext" style={{ fontStyle: "italic" }}>{accent}</span>
      </h2>
      {sub && <p style={{ color: "#94a3b8", maxWidth: 420, margin: "12px auto 0", fontWeight: 300, fontSize: 14, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <style>{css}</style>

      {/* ══ NAVBAR ════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        boxShadow: scrolled ? "0 1px 28px rgba(99,102,241,.07)" : "none",
        borderBottom: scrolled ? "1px solid rgba(226,232,240,.7)" : "none",
        transition: "all .3s ease",
      }}>
        <div style={{ ...wrap, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ico.logo />
            </div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>Laggy But Lucky</span>
          </div>

          <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 30 }}>
            {navLinks.map(id => (
              <button key={id} className="nl" onClick={() => go(id)} style={{ textTransform: "capitalize" }}>{id}</button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="btn-p hide-m" onClick={() => window.open("https://drive.google.com", "_blank")}
              style={{ padding: "10px 18px", borderRadius: 12, fontSize: 13 }}>
              Portfolio <Ico.arrow />
            </button>
            <button className="show-m" onClick={() => setOpen(!open)}
              style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#475569", display: "none" }}>
              <Ico.menu open={open} />
            </button>
          </div>
        </div>

        {open && (
          <div style={{ background: "white", borderTop: "1px solid #f1f5f9", padding: "12px 24px 20px" }}>
            {navLinks.map(id => (
              <button key={id} onClick={() => go(id)}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", color: "#374151", fontWeight: 500, fontSize: 15, background: "none", border: "none", cursor: "pointer", textTransform: "capitalize", borderBottom: "1px solid #f8fafc" }}>
                {id}
              </button>
            ))}
            <button className="btn-p" onClick={() => { window.open("https://drive.google.com", "_blank"); setOpen(false); }}
              style={{ marginTop: 14, width: "100%", padding: "13px 0", borderRadius: 12, fontSize: 14, justifyContent: "center" }}>
              Buka Portfolio
            </button>
          </div>
        )}
      </nav>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="hero-bg" style={{ minHeight: "100svh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 64 }}>
        <div className="fa" style={{ position: "absolute", top: 120, right: "7%", width: 84, height: 84, borderRadius: 20, background: "linear-gradient(135deg,#e0e7ff,#c7d2fe)", border: "1px solid #a5b4fc", opacity: .6, pointerEvents: "none" }} />
        <div className="fb" style={{ position: "absolute", top: "42%", left: "3%", width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#dbeafe,#bfdbfe)", opacity: .5, pointerEvents: "none" }} />
        <div className="fc" style={{ position: "absolute", bottom: 130, right: "20%", width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", opacity: .5, pointerEvents: "none" }} />
        <div className="fa" style={{ position: "absolute", bottom: 220, left: "11%", width: 28, height: 28, borderRadius: 8, background: "#dbeafe", opacity: .45, transform: "rotate(20deg)", pointerEvents: "none" }} />

        <div style={{ ...wrap, padding: "80px 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div className="chip" style={{ marginBottom: 20, alignSelf: "flex-start" }}><Dot />Game Development Studio · POLINES 2025</div>

            <h1 className="serif glitch hero-h1" data-text="Laggy But Lucky."
              style={{ fontWeight: 700, color: "#0f172a", lineHeight: 1.04, letterSpacing: "-.03em", margin: "0 0 22px", alignSelf: "flex-start" }}>
              Laggy But<br /><span className="gtext">Lucky.</span>
            </h1>

            <p style={{ fontSize: "clamp(1rem,2.2vw,1.12rem)", color: "#64748b", lineHeight: 1.78, margin: "0 0 34px", fontWeight: 300, maxWidth: 500 }}>
              Tim pengembang game kreatif dari{" "}
              <strong style={{ color: "#334155", fontWeight: 600 }}>Politeknik Negeri Semarang</strong>{" "}
              yang menciptakan pengalaman bermain kacau, tak terduga, dan selalu ketagihan.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button className="btn-p" onClick={() => go("project")} style={{ padding: "14px 28px", borderRadius: 14, fontSize: 14 }}>
                Lihat Portfolio <Ico.arrow />
              </button>
              <button className="btn-g" onClick={() => go("gallery")} style={{ color: "#374151", fontWeight: 600, padding: "14px 28px", borderRadius: 14, fontSize: 14 }}>
                <span style={{ color: "#6366f1" }}><Ico.play /></span> Explore Gallery
              </button>
            </div>

            <div style={{ display: "flex", gap: 36, marginTop: 52, flexWrap: "wrap" }}>
              {[{ n: "26+", l: "Projects" }, { n: "5", l: "Tim Kreatif" }, { n: "∞", l: "Chaos Level" }].map(s => (
                <div key={s.l}>
                  <div className="sn gtext" style={{ fontSize: "2rem", fontWeight: 700 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ═════════════════════════════════════════════ */}
      <section id="about" style={sec("#fff")}>
        <div style={wrap}>
          <div className="about-grid">
            <FadeIn>
              <div className="chip" style={{ marginBottom: 18 }}><Dot />Tentang Kami</div>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem,4.5vw,2.8rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.18, margin: "0 0 16px" }}>
                Dibuat dengan <span className="gtext" style={{ fontStyle: "italic" }}>Passion</span>
              </h2>
              <div style={{ width: 50, height: 3, borderRadius: 4, background: "linear-gradient(90deg,#6366f1,#3b82f6)", margin: "0 0 18px" }} />
              <p style={{ color: "#64748b", lineHeight: 1.8, fontWeight: 300, margin: "0 0 26px", fontSize: 14 }}>
                Kami adalah tim mahasiswa D3 Teknik Informatika, Jurusan Teknik Elektro di Politeknik Negeri Semarang. Di semester 4, kami menciptakan sesuatu yang berbeda — game yang merayakan kekacauan sebagai fitur utama.
              </p>
              <div className="info-grid">
                {[
                  { l: "Institusi", v: "Politeknik Negeri Semarang" },
                  { l: "Program Studi", v: "D3 Teknik Informatika" },
                  { l: "Jurusan", v: "Teknik Elektro" },
                  { l: "Semester", v: "Semester 4 · 2025" },
                ].map(item => (
                  <div key={item.l} style={{ background: "#f8fafc", borderRadius: 14, padding: "13px 15px", border: "1px solid #f1f5f9" }}>
                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>{item.l}</div>
                    <div style={{ fontSize: 13, color: "#1e293b", fontWeight: 600 }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={140}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: -12, left: -12, right: 12, bottom: 12, borderRadius: 24, border: "2px solid #e0e7ff", background: "linear-gradient(135deg,#f0f9ff,#faf5ff)" }} />
                <div style={{ position: "relative", background: "white", borderRadius: 24, padding: "28px 28px 24px", boxShadow: "0 8px 40px rgba(99,102,241,.1)", border: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} style={{ width: 18, height: 18 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </div>
                    <span style={{ fontWeight: 700, color: "#0f172a", fontSize: 15 }}>Nilai & Visi Kami</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      { t: "Inovasi Tanpa Batas", d: "Kami tidak takut mencoba mekanik yang belum pernah ada.", c: "#eef2ff", tc: "#6366f1" },
                      { t: "Kolaborasi Tim Solid", d: "Lima kepala lebih baik dari satu, terutama dalam chaos.", c: "#f5f3ff", tc: "#7c3aed" },
                      { t: "Player First", d: "Setiap keputusan desain berakar pada pengalaman pemain.", c: "#eff6ff", tc: "#3b82f6" },
                      { t: "Ship It!", d: "Lebih baik produk nyata daripada ide sempurna yang tak selesai.", c: "#f0f9ff", tc: "#0284c7" },
                    ].map(v => (
                      <div key={v.t} style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, background: v.c, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <Ico.check color={v.tc} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{v.t}</div>
                          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{v.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ PROJECT (Last Signal) ══════════════════════════════ */}
      <section id="project" style={{ ...sec("linear-gradient(160deg,#f8faff 0%,#f0f4ff 55%,#faf5ff 100%)"), position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 20% 30%,#c7d2fe 0%,transparent 38%),radial-gradient(ellipse at 80% 70%,#ddd6fe 0%,transparent 38%)", opacity: .28, pointerEvents: "none" }} />
        <div style={{ ...wrap, position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="chip" style={{ margin: "0 auto 14px", width: "fit-content" }}><Dot />Main Project</div>
              <div style={{ display: "inline-block", background: "linear-gradient(135deg,#6366f1,#3b82f6)", color: "white", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 100, marginBottom: 14 }}>Featured Game 2025</div>
              <h2 className="serif" style={{ fontSize: "clamp(3rem,8vw,5rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1, margin: "0 0 14px" }}>
                Last <span className="gtext" style={{ fontStyle: "italic" }}>Signal</span>
              </h2>
              <p style={{ color: "#64748b", maxWidth: 520, margin: "0 auto", fontSize: 15, lineHeight: 1.78, fontWeight: 300 }}>
                Game multiplayer party chaos bertema dunia digital yang mengalami glitch. Setiap sesi adalah pengalaman baru — kontrol terbalik, gravitasi berubah, movement delay, dan map error yang tak terduga.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div style={{ background: "white", borderRadius: 28, overflow: "hidden", boxShadow: "0 12px 60px rgba(99,102,241,.12)", border: "1px solid #e0e7ff", marginBottom: 24 }}>
              <div className="pcard-grid">
                <div style={{ minHeight: 300, background: "linear-gradient(155deg,#1e1b4b 0%,#312e81 35%,#4338ca 65%,#6366f1 100%)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
                  <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(129,140,248,.4) 0%,transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                  <div className="fa" style={{ textAlign: "center", color: "white", position: "relative", zIndex: 1, padding: "36px 24px" }}>
                    <div style={{ fontSize: 68, marginBottom: 14, filter: "drop-shadow(0 0 20px rgba(129,140,248,.7))" }}>📡</div>
                    <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: ".18em", opacity: .9, fontFamily: "monospace" }}>LAST SIGNAL</div>
                    <div style={{ fontSize: 11, opacity: .45, marginTop: 5, letterSpacing: ".16em" }}>DIGITAL WORLD :: GLITCHING</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginTop: 20 }}>
                      {["Multiplayer", "Party Game", "Chaos", "Digital Glitch"].map(t => (
                        <span key={t} style={{ fontSize: 11, background: "rgba(255,255,255,.18)", color: "white", padding: "4px 11px", borderRadius: 100, border: "1px solid rgba(255,255,255,.2)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: "32px 32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 className="serif" style={{ fontSize: "clamp(1.3rem,3vw,1.65rem)", fontWeight: 700, color: "#0f172a", margin: "0 0 12px", lineHeight: 1.25 }}>
                      Dunia Digital yang Hancur
                    </h3>
                    <p style={{ color: "#64748b", lineHeight: 1.8, margin: "0 0 20px", fontWeight: 300, fontSize: 14 }}>
                      Bayangkan bermain game ketika kontrol Anda terbalik, gravitasi berubah arah, karakter bergerak dengan delay aneh, dan sebagian map menghilang karena "error". Itulah Last Signal — chaos yang terencana dengan sempurna.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {["Kontrol yang bisa terbalik secara random", "Gravitasi dinamis yang berubah per ronde", "Movement delay sebagai mekanik inti", "Map error yang menciptakan tantangan unik"].map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#475569" }}>
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Ico.check />
                          </div>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #f1f5f9", display: "flex" }}>
                    {[{ n: "8P", l: "Max Players" }, { n: "∞", l: "Game Modes" }, { n: "100%", l: "Chaos" }].map((s, i) => (
                      <div key={s.l} style={{ flex: 1, textAlign: "center", borderLeft: i > 0 ? "1px solid #f1f5f9" : "none" }}>
                        <div className="sn gtext" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{s.n}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="feat-grid">
            {[
              { icon: <Ico.users />, t: "Multiplayer Chaos", d: "Hingga 8 pemain bertarung dalam kekacauan yang terencana. Setiap sesi adalah pengalaman yang berbeda.", delay: 0 },
              { icon: <Ico.fire />, t: "Viral Potential", d: "Momen-momen tak terduga setiap sesi menjadikan game ini sempurna untuk konten kreator dan streamer.", delay: 80 },
              { icon: <Ico.star />, t: "Gen Z Market", d: "Dirancang khusus untuk generasi Z dengan estetika digital glitch yang relevan dan gameplay adiktif.", delay: 160 },
            ].map(c => (
              <FadeIn key={c.t} delay={c.delay}>
                <div className="lift" style={{ background: "white", borderRadius: 20, padding: 24, border: "1px solid #f1f5f9", boxShadow: "0 2px 12px rgba(0,0,0,.04)", height: "100%" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg,#e0e7ff,#dbeafe)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1", marginBottom: 16 }}>
                    {c.icon}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{c.t}</h3>
                  <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>{c.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY / PROJECTS ════════════════════════════════ */}
      <section id="gallery" style={sec("#fff")}>
        <div style={wrap}>
          <FadeIn>
            <Heading
              eyebrow="Gallery & Projects"
              title="Projects"
              accent="2024 – 2025"
              sub={`${projects.length} proyek dari berbagai bidang — game, web, AI, IoT, hingga konten kreatif.`}
            />
          </FadeIn>

          {/* Filter tabs */}
          <FadeIn delay={60}>
            <div className="filter-wrap" style={{ marginBottom: 32, justifyContent: "center" }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`ftab${activeCategory === cat ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  {cat === "All" && <span style={{ marginLeft: 6, background: activeCategory === cat ? "rgba(255,255,255,.25)" : "#f1f5f9", color: activeCategory === cat ? "white" : "#94a3b8", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 100 }}>{projects.length}</span>}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Project cards grid */}
          <div className="proj-grid">
            {filteredProjects.map((p, i) => (
              <ProjectCard key={p.id} p={p} delay={Math.min(i * 40, 320)} />
            ))}
          </div>

          {/* Count label */}
          <FadeIn delay={100}>
            <div style={{ textAlign: "center", marginTop: 36, color: "#94a3b8", fontSize: 13 }}>
              Menampilkan <strong style={{ color: "#6366f1" }}>{filteredProjects.length}</strong> dari {projects.length} proyek
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════════════════ */}
      <section id="team" style={sec("linear-gradient(180deg,#f8faff 0%,#f0f4ff 100%)")}>
        <div style={wrap}>
          <FadeIn>
            <Heading eyebrow="Tim Kami" title="Meet the" accent="Creators" sub="Lima individu, satu visi — menciptakan kekacauan yang indah." />
          </FadeIn>

          <div className="team-grid">
            {teamMembers.map((m, i) => (
              <FadeIn key={m.name} delay={i * 70}>
                <div className="tcrd lift" style={{ background: "white", borderRadius: 20, overflow: "hidden", border: "1px solid #f1f5f9", boxShadow: "0 2px 16px rgba(0,0,0,.05)", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} className="tph" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                    ) : (
                      <div className="tph" style={{ position: "absolute", inset: 0, background: m.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="serif" style={{ fontSize: "2.4rem", fontWeight: 700, color: "rgba(255,255,255,.88)", letterSpacing: "-.02em" }}>{m.initials}</span>
                      </div>
                    )}
                    <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(255,255,255,.92)", color: "#6366f1", padding: "3px 12px", borderRadius: 100, backdropFilter: "blur(6px)", whiteSpace: "nowrap" }}>{m.role}</span>
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px 18px", flex: 1 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: "0 0 5px", lineHeight: 1.35 }}>{m.name}</h3>
                    <p style={{ fontSize: 11.5, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA / CONTACT ═════════════════════════════════════ */}
      <section id="contact" style={sec("#fff")}>
        <div style={wrap}>
          <FadeIn>
            <div style={{ borderRadius: 28, overflow: "hidden", position: "relative", background: "linear-gradient(140deg,#4338ca 0%,#6366f1 40%,#3b82f6 70%,#7c3aed 100%)" }}>
              <div className="dots" style={{ position: "absolute", inset: 0, opacity: .12, pointerEvents: "none" }} />
              <div className="fa" style={{ position: "absolute", top: 24, right: 48, width: 96, height: 96, borderRadius: 24, border: "1.5px solid rgba(255,255,255,.22)", opacity: .4, pointerEvents: "none" }} />
              <div className="fb" style={{ position: "absolute", bottom: 24, left: 36, width: 64, height: 64, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,.18)", opacity: .4, pointerEvents: "none" }} />

              <div style={{ position: "relative", zIndex: 1, padding: "72px 28px", textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.18)", color: "white", fontSize: 12, fontWeight: 700, padding: "8px 18px", borderRadius: 100, marginBottom: 28, border: "1px solid rgba(255,255,255,.25)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  Portfolio Tersedia
                </div>
                <h2 className="serif" style={{ fontSize: "clamp(2rem,6vw,3.4rem)", fontWeight: 700, color: "white", lineHeight: 1.15, margin: "0 0 16px" }}>
                  Tertarik dengan<br />karya kami?
                </h2>
                <p style={{ color: "rgba(255,255,255,.68)", maxWidth: 460, margin: "0 auto 36px", fontSize: 15, lineHeight: 1.78, fontWeight: 300 }}>
                  Lihat portfolio lengkap — dokumentasi desain, prototype, hingga presentasi proyek Last Signal.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
                  <button
                    onClick={() => window.open("https://drive.google.com/drive/folders/1V8Tn8Lzrsi4GxXjxpPm6_XDMIxETdvnd?usp=sharing", "_blank")}
                    style={{ display: "flex", alignItems: "center", gap: 10, background: "white", color: "#4f46e5", fontWeight: 700, padding: "14px 26px", borderRadius: 16, fontSize: 14, border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(0,0,0,.18)", transition: "transform .25s, box-shadow .25s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 14px 36px rgba(0,0,0,.24)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = "0 8px 28px rgba(0,0,0,.18)"; }}
                  >
                    <Ico.gdrive />
                    Buka Google Drive Portfolio
                  </button>
                  <button
                    onClick={() => go("gallery")}
                    style={{ display: "flex", alignItems: "center", gap: 8, border: "2px solid rgba(255,255,255,.4)", color: "white", fontWeight: 700, padding: "14px 26px", borderRadius: 16, fontSize: 14, background: "transparent", cursor: "pointer", transition: "all .25s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,.12)"; el.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.transform = ""; }}
                  >
                    Lihat Semua Project <Ico.arrow />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer style={{ background: "#0f172a", padding: "40px 24px" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Ico.logo />
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 13 }}>Laggy But Lucky</div>
              <div style={{ color: "#475569", fontSize: 11, marginTop: 1 }}>D3 Teknik Informatika · POLINES</div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {navLinks.map(id => (
              <button key={id} onClick={() => go(id)}
                style={{ color: "#475569", fontSize: 12, fontWeight: 500, background: "none", border: "none", cursor: "pointer", textTransform: "capitalize", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#94a3b8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
              >
                {id}
              </button>
            ))}
          </div>
          <div style={{ color: "#334155", fontSize: 11 }}>
            © 2025 Laggy But Lucky · Made with ♥ in Semarang
          </div>
        </div>
      </footer>
    </div>
  );
}