import { useState, useEffect, useRef, useCallback } from "react";

// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --anthracite: #1a1c1e;
      --anthracite-deep: #111314;
      --anthracite-mid: #242729;
      --anthracite-light: #2e3235;
      --white: #ffffff;
      --white-90: rgba(255,255,255,0.9);
      --white-70: rgba(255,255,255,0.7);
      --white-40: rgba(255,255,255,0.4);
      --white-15: rgba(255,255,255,0.15);
      --white-08: rgba(255,255,255,0.08);
      --white-04: rgba(255,255,255,0.04);
      --gray-100: #f5f5f7;
      --gray-200: #e8e8ed;
      --gray-400: #98989f;
      --gray-600: #6e6e73;
      --gray-800: #3a3a3c;
      --blue: #0a84ff;
      --blue-bright: #409cff;
      --blue-deep: #0060cc;
      --blue-glow: rgba(10,132,255,0.18);
      --blue-subtle: rgba(10,132,255,0.08);
      --green: #30d158;
      --green-subtle: rgba(48,209,88,0.12);
      --green-glow: rgba(48,209,88,0.2);
      --font-display: 'DM Serif Display', Georgia, serif;
      --font-body: 'DM Sans', system-ui, sans-serif;
      --radius-sm: 8px;
      --radius-md: 16px;
      --radius-lg: 24px;
      --radius-xl: 32px;
      --radius-full: 9999px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
      --shadow-md: 0 4px 16px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2);
      --shadow-lg: 0 12px 40px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.25);
      --shadow-blue: 0 0 40px rgba(10,132,255,0.25), 0 0 80px rgba(10,132,255,0.1);
      --transition-fast: 200ms cubic-bezier(0.25,0.46,0.45,0.94);
      --transition-mid: 400ms cubic-bezier(0.25,0.46,0.45,0.94);
      --transition-slow: 700ms cubic-bezier(0.16,1,0.3,1);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-body);
      background: var(--anthracite-deep);
      color: var(--white);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    ::selection { background: var(--blue); color: var(--white); }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--anthracite-deep); }
    ::-webkit-scrollbar-thumb { background: var(--anthracite-light); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--blue); }

    /* ── ANIMATIONS ── */
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.94); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes heroFloat {
      0%, 100% { transform: translateY(0px) scale(1.08); }
      50%       { transform: translateY(-12px) scale(1.1); }
    }
    @keyframes bgPulse {
      0%, 100% { opacity: 0.4; }
      50%       { opacity: 0.7; }
    }
    @keyframes orb1 {
      0%, 100% { transform: translate(0,0) scale(1); }
      33%  { transform: translate(40px,-30px) scale(1.05); }
      66%  { transform: translate(-20px,20px) scale(0.97); }
    }
    @keyframes orb2 {
      0%, 100% { transform: translate(0,0) scale(1); }
      33%  { transform: translate(-50px,25px) scale(1.08); }
      66%  { transform: translate(30px,-15px) scale(0.95); }
    }
    @keyframes shimmer {
      from { background-position: -200% center; }
      to   { background-position: 200% center; }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes countUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes borderGlow {
      0%, 100% { border-color: rgba(10,132,255,0.2); box-shadow: 0 0 20px rgba(10,132,255,0.05); }
      50%       { border-color: rgba(10,132,255,0.5); box-shadow: 0 0 30px rgba(10,132,255,0.2); }
    }
    @keyframes navBlur {
      from { backdrop-filter: blur(0px); background: transparent; }
      to   { backdrop-filter: blur(24px); background: rgba(17,19,20,0.85); }
    }
    @keyframes gridFloat {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-8px); }
    }
    @keyframes lineGrow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes particleDrift {
      0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
      10%  { opacity: 0.6; }
      90%  { opacity: 0.4; }
      100% { transform: translateY(-120px) translateX(40px) rotate(180deg); opacity: 0; }
    }

    /* ── SCROLL REVEAL ── */
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-left { opacity: 0; transform: translateX(-28px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
    .reveal-left.visible { opacity: 1; transform: translateX(0); }
    .reveal-right { opacity: 0; transform: translateX(28px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
    .reveal-right.visible { opacity: 1; transform: translateX(0); }
    .reveal-scale { opacity: 0; transform: scale(0.93); transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1); }
    .reveal-scale.visible { opacity: 1; transform: scale(1); }
    .delay-1 { transition-delay: 0.1s; }
    .delay-2 { transition-delay: 0.2s; }
    .delay-3 { transition-delay: 0.3s; }
    .delay-4 { transition-delay: 0.4s; }
    .delay-5 { transition-delay: 0.5s; }
    .delay-6 { transition-delay: 0.6s; }

    /* ── NAV ── */
    .nav-scrolled {
      background: rgba(17,19,20,0.88) !important;
      backdrop-filter: blur(24px) saturate(180%) !important;
      border-bottom: 1px solid rgba(255,255,255,0.06) !important;
    }

    /* ── BUTTONS ── */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 16px 32px; border-radius: var(--radius-full);
      background: var(--blue); color: var(--white);
      font-family: var(--font-body); font-size: 16px; font-weight: 500; letter-spacing: -0.01em;
      border: none; cursor: pointer;
      box-shadow: 0 0 0 0 rgba(10,132,255,0.4);
      transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
      text-decoration: none;
    }
    .btn-primary:hover { background: var(--blue-bright); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(10,132,255,0.4); }
    .btn-primary:active { transform: translateY(0); }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 15px 31px; border-radius: var(--radius-full);
      background: transparent; color: var(--white-90);
      font-family: var(--font-body); font-size: 16px; font-weight: 400;
      border: 1px solid var(--white-15); cursor: pointer;
      transition: all var(--transition-fast);
      text-decoration: none;
    }
    .btn-ghost:hover { background: var(--white-08); border-color: var(--white-40); color: var(--white); }

    .btn-green {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 16px 32px; border-radius: var(--radius-full);
      background: var(--green); color: var(--anthracite-deep);
      font-family: var(--font-body); font-size: 16px; font-weight: 600;
      border: none; cursor: pointer;
      transition: all var(--transition-fast);
      text-decoration: none;
    }
    .btn-green:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(48,209,88,0.35); }

    /* ── SECTION LABELS ── */
    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 16px; border-radius: var(--radius-full);
      background: var(--blue-subtle); border: 1px solid rgba(10,132,255,0.2);
      color: var(--blue-bright); font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;
      margin-bottom: 24px;
    }
    .section-label .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--blue-bright); animation: bgPulse 2s ease-in-out infinite; }

    /* ── CARD BASE ── */
    .glass-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      backdrop-filter: blur(8px);
      border-radius: var(--radius-lg);
      transition: all var(--transition-mid);
    }
    .glass-card:hover {
      background: rgba(255,255,255,0.07);
      border-color: rgba(255,255,255,0.14);
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    /* ── FAQ ── */
    .faq-item { border-bottom: 1px solid rgba(255,255,255,0.07); }
    .faq-answer { overflow: hidden; transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease; }

    /* ── TARIFF CARDS ── */
    .tariff-card { position: relative; overflow: hidden; }
    .tariff-card.featured::before {
      content: ''; position: absolute; inset: 0; border-radius: var(--radius-lg);
      background: linear-gradient(135deg, rgba(10,132,255,0.12), rgba(10,132,255,0.03));
      pointer-events: none;
    }
    .tariff-badge {
      position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
      background: var(--blue); color: white; font-size: 11px; font-weight: 600;
      padding: 5px 18px; border-radius: 0 0 12px 12px; letter-spacing: 0.05em; text-transform: uppercase;
      white-space: nowrap;
    }

    /* ── RANGE SLIDER ── */
    input[type=range] {
      -webkit-appearance: none; width: 100%; height: 4px;
      background: linear-gradient(to right, var(--blue) var(--range-pct, 50%), rgba(255,255,255,0.12) var(--range-pct, 50%));
      border-radius: 2px; outline: none; cursor: pointer;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
      background: var(--white); border: 3px solid var(--blue);
      box-shadow: 0 2px 8px rgba(0,0,0,0.4); cursor: pointer;
      transition: transform var(--transition-fast);
    }
    input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }

    /* ── STAR RATING ── */
    .star { color: #ffd60a; font-size: 14px; }

    /* ── GRID BG ── */
    .grid-bg {
      background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* ── SHIMMER TEXT ── */
    .shimmer-text {
      background: linear-gradient(90deg, #fff 30%, var(--blue-bright) 50%, #fff 70%);
      background-size: 200% auto;
      background-clip: text; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .hero-title { font-size: clamp(36px, 9vw, 56px) !important; }
    }
    @media (max-width: 480px) {
      .hero-title { font-size: 32px !important; }
    }
  `}</style>
);

// ─── ICONS (inline SVG) ──────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.5 }) => {
  const paths = {
    zap: <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
    leaf: <><path d="M17 8C8 10 5.9 16.17 3.82 19.41c-.38.59.07 1.34.75 1.17C11 19 13 7 20 5"/><path d="M3.82 19.41C4.67 17.5 6 15 8 13"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></>,
    sun: <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>,
    wind: <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></>,
    bolt: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    chevronDown: <><polyline points="6 9 12 15 18 9"/></>,
    chevronRight: <><polyline points="9 18 15 12 9 6"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></>,
    menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    recycling: <><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/></>,
    trendUp: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ─── SCROLL HOOK ─────────────────────────────────────────────────────────────
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// ─── PARALLAX HOOK ───────────────────────────────────────────────────────────
const useParallax = () => {
  const scrollY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
      const heroEl = document.getElementById("hero-bg");
      if (heroEl) heroEl.style.transform = `scale(1.08) translateY(${scrollY.current * 0.25}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
const Nav = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "Tarife", href: "#tarife" },
    { label: "Vorteile", href: "#vorteile" },
    { label: "Nachhaltigkeit", href: "#nachhaltigkeit" },
    { label: "Kundenstimmen", href: "#bewertungen" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "0 24px",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      background: scrolled ? "rgba(17,19,20,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, var(--blue), var(--blue-deep))",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(10,132,255,0.4)",
          }}>
            <Icon name="zap" size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400, color: "var(--white)", letterSpacing: "-0.02em" }}>
            Sturm<span style={{ color: "var(--blue-bright)" }}>Energie</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hide-mobile" style={{ display: "flex", gap: 4 }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} style={{
              padding: "8px 16px", borderRadius: 8, color: "var(--white-70)",
              textDecoration: "none", fontSize: 14, fontWeight: 400,
              transition: "all var(--transition-fast)",
            }}
            onMouseEnter={e => { e.target.style.color = "var(--white)"; e.target.style.background = "var(--white-08)"; }}
            onMouseLeave={e => { e.target.style.color = "var(--white-70)"; e.target.style.background = "transparent"; }}>
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="#portal" className="btn-ghost hide-mobile" style={{ padding: "9px 20px", fontSize: 14 }}>Kundenportal</a>
          <a href="#tarife" className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>Jetzt wechseln</a>
          <button className="btn-ghost" style={{ padding: "9px 12px", display: "none" }} onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "x" : "menu"} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: "rgba(17,19,20,0.98)", backdropFilter: "blur(24px)",
          padding: "20px 24px 28px", borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              display: "block", padding: "14px 0", color: "var(--white-70)",
              textDecoration: "none", fontSize: 16, borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section id="hero" style={{ position: "relative", height: "100vh", minHeight: 700, display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Cinematic Background */}
      <div id="hero-bg" style={{
        position: "absolute", inset: "-8% -5%", zIndex: 0,
        transform: "scale(1.08)",
        transformOrigin: "center center",
        willChange: "transform",
      }}>
        {/* SVG Energy Landscape */}
        <svg viewBox="0 0 1440 900" style={{ width: "100%", height: "100%", objectFit: "cover" }} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#050a14"/>
              <stop offset="40%" stopColor="#0a1525"/>
              <stop offset="70%" stopColor="#0d1f3a"/>
              <stop offset="100%" stopColor="#111314"/>
            </linearGradient>
            <linearGradient id="glowBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#0a84ff" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="glowGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#30d158" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#30d158" stopOpacity="0"/>
            </linearGradient>
            <radialGradient id="cityGlow" cx="50%" cy="70%" r="60%">
              <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#0a84ff" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="sunGlow" cx="75%" cy="25%" r="30%">
              <stop offset="0%" stopColor="#30d158" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#30d158" stopOpacity="0"/>
            </radialGradient>
            <filter id="blur4"><feGaussianBlur stdDeviation="4"/></filter>
            <filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>
            <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter>
          </defs>

          {/* Sky */}
          <rect width="1440" height="900" fill="url(#skyGrad)"/>
          <rect width="1440" height="900" fill="url(#cityGlow)"/>
          <rect width="1440" height="900" fill="url(#sunGlow)"/>

          {/* Stars */}
          {[...Array(80)].map((_, i) => (
            <circle key={i} cx={(i * 183.3 + 50) % 1440} cy={(i * 97.7 + 30) % 400}
              r={i % 4 === 0 ? 1.2 : 0.6} fill="white" opacity={0.3 + (i % 5) * 0.1}/>
          ))}

          {/* Wind turbines background */}
          {[200, 350, 500, 1100, 1250].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${280 + i * 10})`} opacity="0.35">
              <line x1="0" y1="0" x2="0" y2="240" stroke="#ccc" strokeWidth="2"/>
              <circle cx="0" cy="0" r="4" fill="#ccc"/>
              {[0, 120, 240].map((angle, j) => (
                <line key={j}
                  x1="0" y1="0"
                  x2={Math.sin(((angle + i * 20) * Math.PI) / 180) * 55}
                  y2={Math.cos(((angle + i * 20) * Math.PI) / 180) * -55}
                  stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
              ))}
            </g>
          ))}

          {/* City Silhouette */}
          <g opacity="0.85">
            {/* Buildings */}
            {[
              [0,680,80,220],[80,720,50,180],[130,700,40,200],[170,730,60,170],
              [230,710,45,190],[275,740,35,160],[310,700,55,200],[365,720,40,180],
              [405,690,70,210],[475,715,50,185],[525,730,40,170],[565,705,55,195],
              [620,720,45,180],[665,695,65,205],[730,710,50,190],[780,730,40,170],
              [820,700,60,200],[880,715,45,185],[925,740,35,160],[960,705,55,195],
              [1015,720,50,180],[1065,690,70,210],[1135,715,45,185],[1180,730,40,170],
              [1220,700,60,200],[1280,715,50,185],[1330,740,35,160],[1365,705,75,195],
            ].map(([x, y, w, h], i) => (
              <g key={i}>
                <rect x={x} y={y} width={w} height={h} fill="#0d1a2e" opacity="0.95"/>
                {/* Windows */}
                {[...Array(Math.floor(h / 30))].map((_, row) =>
                  [...Array(Math.floor(w / 14))].map((_, col) => (
                    <rect key={`${row}-${col}`}
                      x={x + col * 14 + 3} y={y + row * 30 + 8} width={6} height={10}
                      fill={Math.random() > 0.5 ? "#0a84ff" : "#1c3a5a"}
                      opacity={0.4 + Math.random() * 0.5}/>
                  ))
                )}
              </g>
            ))}
          </g>

          {/* Ground reflection / glow */}
          <rect x="0" y="840" width="1440" height="60" fill="url(#glowBlue)" opacity="0.5"/>

          {/* Solar panels foreground */}
          <g transform="translate(60, 780)" opacity="0.7">
            {[0,1,2,3,4].map(i => (
              <g key={i} transform={`translate(${i * 60}, 0) rotate(-20, 20, 20)`}>
                <rect x="0" y="0" width="45" height="30" rx="2" fill="#0a1f3d" stroke="#0a84ff" strokeWidth="0.8" opacity="0.9"/>
                <line x1="22" y1="0" x2="22" y2="30" stroke="#0a84ff" strokeWidth="0.5" opacity="0.4"/>
                <line x1="0" y1="15" x2="45" y2="15" stroke="#0a84ff" strokeWidth="0.5" opacity="0.4"/>
              </g>
            ))}
          </g>

          {/* Energy grid lines */}
          <g opacity="0.12" filter="url(#blur2)">
            {[...Array(8)].map((_, i) => (
              <line key={i} x1={i * 200} y1="0" x2={i * 200 + 300} y2="900" stroke="#0a84ff" strokeWidth="1" strokeDasharray="4 8"/>
            ))}
          </g>

          {/* Atmospheric haze */}
          <rect x="0" y="500" width="1440" height="400" fill="url(#glowBlue)" opacity="0.2"/>
          <rect x="0" y="0" width="1440" height="300" fill="black" opacity="0.15"/>

          {/* Overlay gradient for text readability */}
          <defs>
            <linearGradient id="textOverlay" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a0f1a" stopOpacity="0.85"/>
              <stop offset="55%" stopColor="#0a0f1a" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#0a0f1a" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#textOverlay)"/>
        </svg>
      </div>

      {/* Ambient orbs */}
      <div style={{
        position: "absolute", top: "15%", left: "5%", width: 600, height: 600,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(10,132,255,0.08) 0%, transparent 70%)",
        animation: "orb1 12s ease-in-out infinite", pointerEvents: "none", zIndex: 1,
      }}/>
      <div style={{
        position: "absolute", bottom: "10%", right: "10%", width: 500, height: 500,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(48,209,88,0.06) 0%, transparent 70%)",
        animation: "orb2 15s ease-in-out infinite", pointerEvents: "none", zIndex: 1,
      }}/>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div style={{ maxWidth: 680 }}>
          {/* Badge */}
          <div className="section-label" style={{
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)",
            transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}>
            <div className="dot"/>
            Deutschlands moderner Energieversorger
          </div>

          {/* Headline */}
          <h1 className="hero-title" style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(44px, 6vw, 80px)", lineHeight: 1.05, letterSpacing: "-0.03em",
            color: "var(--white)", marginBottom: 28,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s",
          }}>
            Energie. <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>Sauber.</em><br/>
            Intelligent.<br/>
            <span className="shimmer-text">Transparent.</span>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.65, color: "var(--white-70)",
            marginBottom: 44, maxWidth: 520, fontWeight: 300,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}>
            100% Ökostrom. Faire Preise ohne versteckte Kosten. Digitaler Service, der wirklich funktioniert – für eine Zukunft, die wir gemeinsam gestalten.
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 14,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.65s",
          }}>
            <a href="#tarife" className="btn-primary" style={{ fontSize: 16, padding: "16px 34px" }}>
              Tarif berechnen <Icon name="arrowRight" size={16}/>
            </a>
            <a href="#vorteile" className="btn-ghost" style={{ fontSize: 16 }}>
              Mehr erfahren
            </a>
          </div>

          {/* Trust indicators */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 28, marginTop: 52,
            opacity: loaded ? 1 : 0,
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s",
          }}>
            {[
              { val: "100%", label: "Ökostrom" },
              { val: "48 h", label: "Wechselgarantie" },
              { val: "4,8★", label: "Kundenbewertung" },
              { val: "0€", label: "Wechselgebühr" },
            ].map(({ val, label }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400, color: "var(--white)", letterSpacing: "-0.03em" }}>{val}</span>
                <span style={{ fontSize: 12, color: "var(--white-40)", fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2,
        opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.2s",
      }}>
        <span style={{ fontSize: 11, color: "var(--white-40)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Entdecken</span>
        <div style={{
          width: 24, height: 40, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12,
          display: "flex", justifyContent: "center", paddingTop: 7,
        }}>
          <div style={{
            width: 4, height: 8, borderRadius: 2, background: "var(--blue-bright)",
            animation: "heroFloat 2s ease-in-out infinite",
          }}/>
        </div>
      </div>
    </section>
  );
};

// ─── FEATURES / VORTEILE ─────────────────────────────────────────────────────
const Features = () => {
  const features = [
    {
      icon: "leaf", color: "var(--green)", bg: "var(--green-subtle)",
      title: "100% Ökostrom",
      desc: "Ausschließlich Strom aus erneuerbaren Quellen – zertifiziert, transparent und ohne Greenwashing.",
    },
    {
      icon: "shield", color: "var(--blue-bright)", bg: "var(--blue-subtle)",
      title: "Faire Preise",
      desc: "Keine versteckten Kosten, keine Preisüberraschungen. Volle Kostentransparenz von Beginn an.",
    },
    {
      icon: "trendUp", color: "#ff9f0a", bg: "rgba(255,159,10,0.1)",
      title: "Preisgarantie",
      desc: "12 Monate Preissicherheit für Neukunden. Planen Sie Ihre Energiekosten verlässlich.",
    },
    {
      icon: "smartphone", color: "#bf5af2", bg: "rgba(191,90,242,0.1)",
      title: "Digitaler Service",
      desc: "Ihr Kundenportal – rund um die Uhr. Verbrauch, Rechnungen, Zählerstand – alles digital.",
    },
    {
      icon: "bolt", color: "var(--blue-bright)", bg: "var(--blue-subtle)",
      title: "Schneller Wechsel",
      desc: "In nur 48 Stunden gewechselt. Wir kümmern uns um die Kündigung bei Ihrem alten Anbieter.",
    },
    {
      icon: "globe", color: "var(--green)", bg: "var(--green-subtle)",
      title: "CO₂-neutral",
      desc: "Jede kWh, die Sie verbrauchen, wird durch Investitionen in erneuerbare Energieprojekte kompensiert.",
    },
  ];

  return (
    <section id="vorteile" style={{ padding: "120px 24px", background: "var(--anthracite-deep)", position: "relative", overflow: "hidden" }}>
      {/* Subtle bg grid */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="section-label reveal" style={{ display: "inline-flex" }}>
            <div className="dot"/> Warum Sturm Energie
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.03em",
            color: "var(--white)", marginBottom: 20,
          }}>
            Energie, die für Sie<br/>
            <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>arbeitet</em>
          </h2>
          <p className="reveal delay-2" style={{ color: "var(--white-70)", fontSize: 18, maxWidth: 520, margin: "0 auto", fontWeight: 300 }}>
            Wir verbinden modernste Technologie mit echtem Engagement für die Energiewende.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20,
        }}>
          {features.map((f, i) => (
            <div key={f.title} className={`glass-card reveal delay-${(i % 3) + 1}`} style={{ padding: "36px 32px" }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: f.bg, border: `1px solid ${f.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 24,
              }}>
                <Icon name={f.icon} size={22} color={f.color} strokeWidth={1.8}/>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: "var(--white)", marginBottom: 10, letterSpacing: "-0.02em" }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--white-70)", fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── TARIFE ───────────────────────────────────────────────────────────────────
const Tarife = () => {
  const [selected, setSelected] = useState(1);
  const tarife = [
    {
      name: "Basis",
      tagline: "Einfach & fair",
      priceNet: "28,9",
      unit: "ct/kWh",
      base: "9,90",
      color: "var(--gray-400)",
      features: ["100% Ökostrom", "Monatliche Abrechnung", "Online-Kundenportal", "12 Monate Preissicherheit"],
      cta: "Basis wählen",
      ctaClass: "btn-ghost",
    },
    {
      name: "Komfort",
      tagline: "Unser Bestseller",
      priceNet: "26,9",
      unit: "ct/kWh",
      base: "7,90",
      color: "var(--blue-bright)",
      featured: true,
      features: ["100% Ökostrom + Zertifikat", "Monatliche Abrechnung", "Premiumportal & App", "24 Monate Preissicherheit", "Persönlicher Energieberater", "CO₂-Ausgleich inklusive"],
      cta: "Jetzt wechseln",
      ctaClass: "btn-primary",
    },
    {
      name: "Öko Plus",
      tagline: "Für Klimapioniere",
      priceNet: "29,9",
      unit: "ct/kWh",
      base: "8,90",
      color: "var(--green)",
      features: ["100% Regionalstrom", "Direktvermarktung", "Monatlicher Klimabericht", "24 Monate Preissicherheit", "Energieberatung Premium", "Baumplanzprogramm inkl.", "Förderberatung Solar"],
      cta: "Öko Plus wählen",
      ctaClass: "btn-green",
    },
  ];

  return (
    <section id="tarife" style={{ padding: "120px 24px", background: "var(--anthracite-mid)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
      }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="section-label reveal" style={{ display: "inline-flex" }}>
            <div className="dot"/> Unsere Tarife
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.03em",
            color: "var(--white)", marginBottom: 20,
          }}>
            Der richtige Tarif<br/>
            für <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>jeden Haushalt</em>
          </h2>
          <p className="reveal delay-2" style={{ color: "var(--white-70)", fontSize: 18, maxWidth: 480, margin: "0 auto", fontWeight: 300 }}>
            Alle Tarife inklusive 100% Ökostrom. Keine Vertragslaufzeit, keine versteckten Gebühren.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, alignItems: "start" }}>
          {tarife.map((t, i) => (
            <div
              key={t.name}
              className={`glass-card tariff-card reveal delay-${i + 1} ${t.featured ? "featured" : ""}`}
              onClick={() => setSelected(i)}
              style={{
                padding: t.featured ? "48px 32px 40px" : "40px 32px",
                border: selected === i ? `1px solid ${t.color}50` : "1px solid rgba(255,255,255,0.08)",
                boxShadow: t.featured ? "0 20px 60px rgba(10,132,255,0.15)" : "none",
                cursor: "pointer",
                transform: t.featured ? "scale(1.03)" : "scale(1)",
                position: "relative",
              }}>
              {t.featured && <div className="tariff-badge">Beliebteste Wahl</div>}

              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: t.color, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.tagline}</span>
              </div>
              <h3 style={{ fontSize: 28, fontWeight: 400, fontFamily: "var(--font-display)", color: "var(--white)", marginBottom: 28, letterSpacing: "-0.02em" }}>{t.name}</h3>

              <div style={{ marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 400, color: "var(--white)", letterSpacing: "-0.04em" }}>{t.priceNet}</span>
                <span style={{ fontSize: 16, color: "var(--white-70)", marginLeft: 4 }}>{t.unit}</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--white-40)", marginBottom: 32 }}>zzgl. {t.base} €/Monat Grundpreis</p>

              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 28 }}/>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                {t.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--white-70)" }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%",
                      background: t.color === "var(--green)" ? "var(--green-subtle)" : t.color === "var(--blue-bright)" ? "var(--blue-subtle)" : "rgba(255,255,255,0.05)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon name="check" size={10} color={t.color} strokeWidth={2.5}/>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#rechner" className={t.ctaClass} style={{ width: "100%", justifyContent: "center" }}>
                {t.cta} <Icon name="arrowRight" size={14}/>
              </a>
            </div>
          ))}
        </div>

        <p className="reveal" style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "var(--white-40)" }}>
          Alle Preise inkl. Steuern und Abgaben. * Preise für Haushalt mit 2.500 kWh/Jahr. Gültig ab 01.07.2025.
        </p>
      </div>
    </section>
  );
};

// ─── RECHNER ──────────────────────────────────────────────────────────────────
const Rechner = () => {
  const [kwh, setKwh] = useState(2500);
  const [type, setType] = useState("haushalt");

  const pricePerKwh = 0.269;
  const basePerMonth = 7.90;
  const total = ((kwh * pricePerKwh) + (basePerMonth * 12)).toFixed(2);
  const monthly = (parseFloat(total) / 12).toFixed(2);
  const saving = (((kwh * 0.314) + (basePerMonth * 12)) - parseFloat(total)).toFixed(2);

  const maxKwh = type === "haushalt" ? 6000 : 20000;
  const pct = ((kwh - 500) / (maxKwh - 500)) * 100;

  return (
    <section id="rechner" style={{ padding: "120px 24px", background: "var(--anthracite-deep)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 800, height: 800,
        background: "radial-gradient(circle, rgba(10,132,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label reveal" style={{ display: "inline-flex" }}>
            <div className="dot"/> Tarifrechner
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.03em",
            color: "var(--white)", marginBottom: 20,
          }}>
            Was kostet Ihr Strom<br/>
            <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>wirklich?</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="reveal">
          {/* Left: Controls */}
          <div className="glass-card" style={{ padding: "48px 44px" }}>
            {/* Type selector */}
            <div style={{ marginBottom: 40 }}>
              <label style={{ fontSize: 13, color: "var(--white-40)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 14 }}>Verbrauchstyp</label>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { val: "haushalt", label: "Haushalt" },
                  { val: "gewerbe", label: "Gewerbe" },
                ].map(o => (
                  <button key={o.val} onClick={() => { setType(o.val); setKwh(o.val === "haushalt" ? 2500 : 8000); }}
                    style={{
                      flex: 1, padding: "12px", borderRadius: 10, cursor: "pointer",
                      background: type === o.val ? "var(--blue)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${type === o.val ? "var(--blue)" : "rgba(255,255,255,0.1)"}`,
                      color: "var(--white)", fontSize: 14, fontFamily: "var(--font-body)",
                      transition: "all var(--transition-fast)",
                    }}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <label style={{ fontSize: 13, color: "var(--white-40)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Jahresverbrauch</label>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--blue-bright)", letterSpacing: "-0.02em" }}>
                  {kwh.toLocaleString("de-DE")} kWh
                </span>
              </div>
              <input
                type="range" min={500} max={maxKwh} step={100}
                value={kwh}
                onChange={e => setKwh(Number(e.target.value))}
                style={{ "--range-pct": `${pct}%` }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "var(--white-40)" }}>
                <span>500 kWh</span>
                <span>{maxKwh.toLocaleString("de-DE")} kWh</span>
              </div>
            </div>

            {/* Reference */}
            <div style={{
              marginTop: 28, padding: "16px 20px", borderRadius: 12,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <p style={{ fontSize: 13, color: "var(--white-40)", marginBottom: 10 }}>Typische Verbräuche</p>
              {[
                ["1-Person Haushalt", "≈ 1.500 kWh"],
                ["2-Personen Haushalt", "≈ 2.500 kWh"],
                ["4-Personen Haushalt", "≈ 4.000 kWh"],
                ["Kleines Gewerbe", "≈ 10.000 kWh"],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--white-70)", padding: "4px 0" }}>
                  <span>{label}</span><span style={{ color: "var(--white-40)" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Result */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Main result */}
            <div className="glass-card" style={{
              padding: "44px 40px", flex: 1,
              border: "1px solid rgba(10,132,255,0.2)",
              background: "linear-gradient(135deg, rgba(10,132,255,0.06), rgba(10,132,255,0.02))",
            }}>
              <p style={{ fontSize: 13, color: "var(--white-40)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>Ihre Jahreskosten (Komfort)</p>
              <div style={{ marginBottom: 6 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 400, color: "var(--white)", letterSpacing: "-0.04em" }}>
                  {total.replace(".", ",")}
                </span>
                <span style={{ fontSize: 20, color: "var(--white-70)", marginLeft: 4 }}>€</span>
              </div>
              <p style={{ color: "var(--white-40)", fontSize: 14, marginBottom: 32 }}>
                ≈ <span style={{ color: "var(--white-70)" }}>{monthly.replace(".", ",")} €/Monat</span>
              </p>

              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 24 }}/>

              <div style={{
                display: "flex", alignItems: "center", gap: 12, padding: "16px",
                background: "var(--green-subtle)", borderRadius: 12, border: "1px solid var(--green-glow)",
              }}>
                <Icon name="trendUp" size={20} color="var(--green)"/>
                <div>
                  <p style={{ fontSize: 13, color: "var(--green)", fontWeight: 500 }}>Gegenüber Bundesdurchschnitt:</p>
                  <p style={{ fontSize: 18, fontWeight: 500, color: "var(--white)" }}>
                    {saving.replace(".", ",")} € jährlich sparen
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card" style={{ padding: "32px 36px" }}>
              <p style={{ fontSize: 14, color: "var(--white-70)", marginBottom: 20, lineHeight: 1.6 }}>
                Ihr individuelles Angebot dauert nur 2 Minuten. Kostenlos, unverbindlich, sofort.
              </p>
              <a href="#kontakt" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Jetzt wechseln & sparen <Icon name="arrowRight" size={16}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── STATS / WHY ─────────────────────────────────────────────────────────────
const Why = () => {
  const stats = [
    { val: "180.000+", label: "Zufriedene Kunden" },
    { val: "98,7%", label: "Kundenzufriedenheit" },
    { val: "2,4 Mio.", label: "tCO₂ eingespart" },
    { val: "48 h", label: "Ø Wechseldauer" },
  ];

  return (
    <section id="warum" style={{ padding: "120px 24px", background: "var(--anthracite-mid)", overflow: "hidden", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
      }}/>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
      }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden",
          marginBottom: 100,
        }} className="reveal">
          {stats.map((s, i) => (
            <div key={s.label} style={{
              padding: "40px 32px", background: "var(--anthracite-mid)",
              textAlign: "center",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "var(--white)", letterSpacing: "-0.04em", marginBottom: 6 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "var(--white-40)", letterSpacing: "0.04em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* 2-col feature */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="section-label reveal" style={{ display: "inline-flex" }}>
              <div className="dot"/> Unser Versprechen
            </div>
            <h2 className="reveal delay-1" style={{
              fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: "clamp(28px, 3vw, 48px)", lineHeight: 1.15, letterSpacing: "-0.03em",
              color: "var(--white)", marginBottom: 24,
            }}>
              Nicht nur Energie –<br/>
              <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>ein Versprechen</em><br/>
              an die Zukunft
            </h2>
            <p className="reveal delay-2" style={{ color: "var(--white-70)", fontSize: 16, lineHeight: 1.75, marginBottom: 36, fontWeight: 300 }}>
              Sturm Energie wurde gegründet, weil die Energiebranche transparenter und fairer werden muss. Wir investieren 15% unseres Umsatzes direkt in neue Erneuerbare-Energien-Projekte in Deutschland.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="reveal delay-3">
              {[
                "Zertifizierter Ökostrom aus deutschen Windparks & Solaranlagen",
                "Klimaneutral seit 2022 – geprüft durch TÜV Rheinland",
                "Transparente Herkunftsnachweise für jede kWh",
              ].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", background: "var(--green-subtle)",
                    border: "1px solid var(--green-glow)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
                  }}>
                    <Icon name="check" size={11} color="var(--green)" strokeWidth={2.5}/>
                  </div>
                  <span style={{ fontSize: 14, color: "var(--white-70)", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: Energy flow diagram */}
          <div className="reveal-right" style={{ position: "relative" }}>
            <div style={{
              padding: "44px", borderRadius: 24,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              {/* Energy chain SVG */}
              <svg viewBox="0 0 360 320" style={{ width: "100%", height: "auto" }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0a84ff"/>
                    <stop offset="100%" stopColor="#30d158"/>
                  </linearGradient>
                </defs>

                {/* Sources */}
                {[
                  { x: 50, y: 60, icon: "☀️", label: "Solar", color: "#ffd60a" },
                  { x: 50, y: 160, icon: "💨", label: "Wind", color: "#0a84ff" },
                  { x: 50, y: 260, icon: "💧", label: "Wasser", color: "#30d158" },
                ].map(({ x, y, icon, label, color }) => (
                  <g key={label}>
                    <circle cx={x} cy={y} r={28} fill="rgba(255,255,255,0.04)" stroke={`${color}40`} strokeWidth="1"/>
                    <text x={x} y={y - 4} textAnchor="middle" fontSize="16">{icon}</text>
                    <text x={x} y={y + 16} textAnchor="middle" fill={color} fontSize="9" fontFamily="DM Sans">{label}</text>
                    {/* flow lines */}
                    <line x1={x + 28} y1={y} x2={165} y2={160}
                      stroke={color} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
                  </g>
                ))}

                {/* Central hub */}
                <circle cx={193} cy={160} r={42} fill="rgba(10,132,255,0.08)" stroke="#0a84ff" strokeWidth="1.5"/>
                <circle cx={193} cy={160} r={32} fill="rgba(10,132,255,0.06)" stroke="#0a84ff" strokeWidth="1"/>
                <text x={193} y={154} textAnchor="middle" fill="#409cff" fontSize="11" fontFamily="DM Sans" fontWeight="500">Sturm</text>
                <text x={193} y={169} textAnchor="middle" fill="#409cff" fontSize="11" fontFamily="DM Sans" fontWeight="500">Energie</text>

                {/* Output line */}
                <line x1={235} y1={160} x2={300} y2={160} stroke="url(#lineGrad)" strokeWidth="2.5"/>
                <polygon points="300,154 312,160 300,166" fill="#30d158"/>

                {/* Customer */}
                <circle cx={328} cy={160} r={24} fill="rgba(48,209,88,0.08)" stroke="#30d158" strokeWidth="1.5"/>
                <text x={328} y={154} textAnchor="middle" fill="#30d158" fontSize="11" fontFamily="DM Sans">Ihr</text>
                <text x={328} y={168} textAnchor="middle" fill="#30d158" fontSize="11" fontFamily="DM Sans">Heim</text>

                {/* Labels */}
                <text x={193} y={225} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="DM Sans">Intelligentes Netz</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SUSTAINABILITY ───────────────────────────────────────────────────────────
const Sustainability = () => {
  const items = [
    { icon: "wind", pct: 68, label: "Windkraft", color: "#0a84ff" },
    { icon: "sun", pct: 22, label: "Solarenergie", color: "#ffd60a" },
    { icon: "recycling", pct: 10, label: "Wasserkraft", color: "#30d158" },
  ];

  return (
    <section id="nachhaltigkeit" style={{ padding: "120px 24px", background: "var(--anthracite-deep)", position: "relative", overflow: "hidden" }}>
      {/* Bg decoration */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%", width: 700, height: 700,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(48,209,88,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Visual */}
          <div className="reveal-left" style={{ order: 1 }}>
            <div className="glass-card" style={{ padding: "52px 44px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 400, marginBottom: 40, color: "var(--white)" }}>
                Unser Energiemix 2025
              </h3>
              {items.map((item, i) => (
                <div key={item.label} style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <Icon name={item.icon} size={16} color={item.color}/>
                      <span style={{ fontSize: 14, color: "var(--white-70)" }}>{item.label}</span>
                    </div>
                    <span style={{ fontSize: 14, color: item.color, fontWeight: 500 }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${item.pct}%`, borderRadius: 3,
                      background: `linear-gradient(to right, ${item.color}80, ${item.color})`,
                      transition: "width 1.5s cubic-bezier(0.16,1,0.3,1)",
                    }}/>
                  </div>
                </div>
              ))}

              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "32px 0" }}/>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {[
                  { val: "100%", label: "Erneuerbar" },
                  { val: "0g", label: "CO₂/kWh" },
                  { val: "TÜV", label: "Zertifiziert" },
                ].map(({ val, label }) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--green)", letterSpacing: "-0.03em" }}>{val}</div>
                    <div style={{ fontSize: 12, color: "var(--white-40)", marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text */}
          <div style={{ order: 2 }}>
            <div className="section-label reveal" style={{ display: "inline-flex" }}>
              <div className="dot" style={{ background: "var(--green)" }}/>
              <span style={{ color: "var(--green)" }}>Nachhaltigkeit</span>
            </div>
            <h2 className="reveal delay-1" style={{
              fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: "clamp(28px, 3vw, 48px)", lineHeight: 1.15, letterSpacing: "-0.03em",
              color: "var(--white)", marginBottom: 24,
            }}>
              Jede Kilowattstunde<br/>
              <em style={{ fontStyle: "italic", color: "var(--green)" }}>zählt für morgen</em>
            </h2>
            <p className="reveal delay-2" style={{ color: "var(--white-70)", fontSize: 16, lineHeight: 1.75, marginBottom: 28, fontWeight: 300 }}>
              Unser Strom kommt ausschließlich aus deutschen und europäischen Erneuerbaren-Anlagen. Jede kWh ist rückverfolgbar – mit Herkunftsnachweis und jährlichem Nachhaltigkeitsbericht für jeden Kunden.
            </p>
            <p className="reveal delay-3" style={{ color: "var(--white-70)", fontSize: 16, lineHeight: 1.75, marginBottom: 40, fontWeight: 300 }}>
              Mit dem Öko-Plus-Tarif investieren Sie zusätzlich direkt in neue Windpark- und Solarprojekte – und pflanzen pro Vertragsjahr automatisch 10 Bäume.
            </p>
            <a href="#tarife" className="btn-green reveal delay-4">
              Klimaneutral werden <Icon name="leaf" size={16} color="var(--anthracite-deep)"/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah M.", location: "München", rating: 5,
      text: "Wechsel in 2 Tagen erledigt, Kundensupport war top und die App ist wirklich intuitiv. Endlich ein Anbieter, der das ernst nimmt.",
      tarif: "Komfort",
    },
    {
      name: "Thomas K.", location: "Hamburg", rating: 5,
      text: "Nach Jahren bei einem der großen Anbieter bin ich froh gewechselt zu haben. Transparente Abrechnung, faire Preise und man merkt echtes Engagement.",
      tarif: "Öko Plus",
    },
    {
      name: "Lisa B.", location: "Berlin", rating: 5,
      text: "Das Kundenportal ist das beste, was ich je gesehen habe. Verbrauch in Echtzeit, Rechnungen sofort verfügbar, alles digital. Genau so soll das sein.",
      tarif: "Komfort",
    },
    {
      name: "Michael W.", location: "Frankfurt", rating: 4,
      text: "Sehr guter Service und faire Konditionen. Die Preisgarantie war für mich das entscheidende Argument. Bin sehr zufrieden.",
      tarif: "Basis",
    },
    {
      name: "Claudia R.", location: "Stuttgart", rating: 5,
      text: "Endlich ein Energieanbieter, dem Nachhaltigkeit nicht nur Marketing ist. Mein CO₂-Bericht zeigt mir wirklich, was ich einspare.",
      tarif: "Öko Plus",
    },
    {
      name: "Jan F.", location: "Köln", rating: 5,
      text: "Super schnelle Reaktionszeiten im Support, faire Preise und das Ökostrom-Zertifikat gibt mir ein gutes Gefühl. Klare Empfehlung!",
      tarif: "Komfort",
    },
  ];

  return (
    <section id="bewertungen" style={{ padding: "120px 24px", background: "var(--anthracite-mid)", overflow: "hidden", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
      }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label reveal" style={{ display: "inline-flex" }}>
            <div className="dot"/> Kundenstimmen
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.03em",
            color: "var(--white)", marginBottom: 16,
          }}>
            Was unsere Kunden<br/>
            <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>wirklich sagen</em>
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 16 }}>
            {[1,2,3,4,5].map(i => <span key={i} className="star">★</span>)}
            <span style={{ marginLeft: 10, color: "var(--white-70)", fontSize: 14 }}>4,8 / 5 aus 12.400 Bewertungen</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {reviews.map((r, i) => (
            <div key={r.name} className={`glass-card reveal delay-${(i % 3) + 1}`} style={{ padding: "32px 28px" }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {[...Array(r.rating)].map((_, j) => <span key={j} className="star">★</span>)}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--white-70)", marginBottom: 24, fontStyle: "italic" }}>
                „{r.text}"
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--white)" }}>{r.name}</p>
                  <p style={{ fontSize: 12, color: "var(--white-40)" }}>{r.location}</p>
                </div>
                <span style={{
                  fontSize: 11, padding: "4px 12px", borderRadius: 20,
                  background: "var(--blue-subtle)", border: "1px solid rgba(10,132,255,0.2)",
                  color: "var(--blue-bright)", fontWeight: 500,
                }}>{r.tarif}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState(null);

  const items = [
    {
      q: "Wie lange dauert der Wechsel zu Sturm Energie?",
      a: "In der Regel dauert der Wechsel nur 48 Stunden. Wir kümmern uns um die Kündigung bei Ihrem alten Anbieter und koordinieren alles – Sie müssen nichts weiter tun als das Bestellformular ausfüllen.",
    },
    {
      q: "Gibt es eine Mindestvertragslaufzeit?",
      a: "Nein. Alle unsere Tarife sind monatlich kündbar. Es gibt keine Mindestlaufzeit und keine Wechselgebühren – wir setzen auf Qualität, nicht auf Bindungsklauseln.",
    },
    {
      q: "Was bedeutet 100% Ökostrom bei Sturm Energie?",
      a: "Für jede Kilowattstunde, die Sie verbrauchen, kaufen wir eine Kilowattstunde aus zertifizierten erneuerbaren Quellen (Wind, Solar, Wasser) ein – mit lückenlosem Herkunftsnachweis gemäß EEG.",
    },
    {
      q: "Wie hoch ist mein Abschlag und kann ich ihn anpassen?",
      a: "Ihr monatlicher Abschlag wird anhand Ihres Jahresverbrauchs berechnet. Im Kundenportal können Sie ihn jederzeit flexibel anpassen – nach oben oder nach unten.",
    },
    {
      q: "Was passiert, wenn ich umziehe?",
      a: "Kein Problem – melden Sie uns Ihren Umzug einfach im Kundenportal. Wir begleiten Sie zu Ihrer neuen Adresse, sofern wir dort liefern. Andernfalls können Sie ohne Gebühren kündigen.",
    },
    {
      q: "Wie kann ich meinen Verbrauch verfolgen?",
      a: "Im Kundenportal und in der Sturm-Energie-App sehen Sie Ihren Verbrauch in Echtzeit (bei Smart Meter), Ihre monatlichen Abrechnungen und alle Vertragsdetails – jederzeit, auf allen Geräten.",
    },
    {
      q: "Ist die Preisgarantie wirklich verbindlich?",
      a: "Ja. Die Preisgarantie gilt vertraglich für die angegebene Laufzeit. Preisanpassungen während der Garantiephase sind ausgeschlossen – das ist unser schriftliches Versprechen an Sie.",
    },
  ];

  return (
    <section id="faq" style={{ padding: "120px 24px", background: "var(--anthracite-deep)", overflow: "hidden" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label reveal" style={{ display: "inline-flex" }}>
            <div className="dot"/> Häufige Fragen
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--white)",
          }}>
            Ihre Fragen,<br/>
            <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>unsere Antworten</em>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }} className="reveal">
          {items.map((item, i) => (
            <div key={i} className="faq-item" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "24px 4px", background: "none", border: "none", cursor: "pointer",
                  color: "var(--white)", fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 400,
                  textAlign: "left", letterSpacing: "-0.01em",
                }}>
                <span>{item.q}</span>
                <div style={{
                  transform: open === i ? "rotate(45deg)" : "none",
                  transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                  flexShrink: 0, marginLeft: 16, color: open === i ? "var(--blue-bright)" : "var(--white-40)",
                }}>
                  <Icon name="plus" size={18}/>
                </div>
              </button>
              <div className="faq-answer" style={{ maxHeight: open === i ? 200 : 0, opacity: open === i ? 1 : 0 }}>
                <p style={{ padding: "0 4px 24px", fontSize: 15, lineHeight: 1.75, color: "var(--white-70)", fontWeight: 300 }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CONTACT ─────────────────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", subject: "wechsel" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="kontakt" style={{ padding: "120px 24px", background: "var(--anthracite-mid)", overflow: "hidden", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
      }}/>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 900, height: 600,
        background: "radial-gradient(circle, rgba(10,132,255,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label reveal" style={{ display: "inline-flex" }}>
            <div className="dot"/> Kontakt
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: "var(--font-display)", fontWeight: 400,
            fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--white)",
          }}>
            Wir sind für Sie da –<br/>
            <em style={{ fontStyle: "italic", color: "var(--blue-bright)" }}>jederzeit</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 40, alignItems: "start" }}>
          {/* Contact cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="reveal-left">
            {[
              { icon: "phone", title: "Hotline", val: "0800 – 78876 0", sub: "Mo–Fr 8–20 Uhr, Sa 9–16 Uhr", color: "var(--blue-bright)" },
              { icon: "mail", title: "E-Mail", val: "service@sturmenergie.de", sub: "Antwort innerhalb von 4 Stunden", color: "var(--green)" },
              { icon: "smartphone", title: "Kundenportal", val: "portal.sturmenergie.de", sub: "24/7 Self-Service & Chat", color: "#bf5af2" },
            ].map(({ icon, title, val, sub, color }) => (
              <div key={title} className="glass-card" style={{ padding: "28px 28px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: `${color}15`, border: `1px solid ${color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon name={icon} size={20} color={color}/>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: "var(--white-40)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>{title}</p>
                  <p style={{ fontSize: 15, fontWeight: 500, color: "var(--white)", marginBottom: 2 }}>{val}</p>
                  <p style={{ fontSize: 12, color: "var(--white-40)" }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="glass-card reveal-right" style={{ padding: "44px 44px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--green-subtle)", border: "1px solid var(--green-glow)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Icon name="check" size={28} color="var(--green)" strokeWidth={2}/>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--white)", marginBottom: 12 }}>Nachricht erhalten!</h3>
                <p style={{ color: "var(--white-70)", fontSize: 15 }}>Wir melden uns innerhalb von 4 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400, color: "var(--white)", marginBottom: 32 }}>Nachricht senden</h3>

                {/* Subject tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                  {[
                    { val: "wechsel", label: "Wechsel" },
                    { val: "support", label: "Support" },
                    { val: "abrechnung", label: "Abrechnung" },
                    { val: "sonstiges", label: "Sonstiges" },
                  ].map(o => (
                    <button key={o.val} onClick={() => setForm({ ...form, subject: o.val })}
                      style={{
                        padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 13,
                        background: form.subject === o.val ? "var(--blue)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${form.subject === o.val ? "var(--blue)" : "rgba(255,255,255,0.1)"}`,
                        color: "var(--white)", fontFamily: "var(--font-body)",
                        transition: "all var(--transition-fast)",
                      }}>{o.label}</button>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { key: "name", label: "Name", type: "text", ph: "Max Mustermann" },
                    { key: "email", label: "E-Mail", type: "email", ph: "max@beispiel.de" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 13, color: "var(--white-40)", letterSpacing: "0.04em", display: "block", marginBottom: 8 }}>{f.label}</label>
                      <input
                        type={f.type} placeholder={f.ph}
                        value={form[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        style={{
                          width: "100%", padding: "14px 18px", borderRadius: 12,
                          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                          color: "var(--white)", fontFamily: "var(--font-body)", fontSize: 15,
                          outline: "none", transition: "border-color var(--transition-fast)",
                        }}
                        onFocus={e => e.target.style.borderColor = "rgba(10,132,255,0.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ fontSize: 13, color: "var(--white-40)", letterSpacing: "0.04em", display: "block", marginBottom: 8 }}>Nachricht</label>
                    <textarea
                      rows={4} placeholder="Wie können wir Ihnen helfen?"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{
                        width: "100%", padding: "14px 18px", borderRadius: 12,
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "var(--white)", fontFamily: "var(--font-body)", fontSize: 15,
                        outline: "none", resize: "vertical", transition: "border-color var(--transition-fast)",
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(10,132,255,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>

                  <button className="btn-primary" onClick={handleSubmit} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                    Nachricht senden <Icon name="arrowRight" size={16}/>
                  </button>
                  <p style={{ fontSize: 12, color: "var(--white-40)", textAlign: "center" }}>
                    Mit dem Absenden stimmen Sie unserer <a href="#datenschutz" style={{ color: "var(--blue-bright)", textDecoration: "none" }}>Datenschutzerklärung</a> zu.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const cols = [
    {
      title: "Produkte",
      links: [
        { label: "Stromtarife", href: "#tarife" },
        { label: "Tarifrechner", href: "#rechner" },
        { label: "Kundenportal", href: "#portal" },
        { label: "App herunterladen", href: "#" },
        { label: "Förderprogramme", href: "#" },
      ],
    },
    {
      title: "Unternehmen",
      links: [
        { label: "Über uns", href: "#" },
        { label: "Karriere", href: "#", badge: "Wir suchen!" },
        { label: "Presse", href: "#" },
        { label: "Partnerprogramm", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      title: "Wissen",
      links: [
        { label: "Stromlexikon", href: "#" },
        { label: "FAQ", href: "#faq" },
        { label: "Energieführer", href: "#" },
        { label: "Nachhaltigkeitsbericht", href: "#" },
      ],
    },
    {
      title: "Rechtliches",
      links: [
        { label: "Impressum", href: "#" },
        { label: "Datenschutz", href: "#" },
        { label: "AGB", href: "#" },
        { label: "Cookie-Einstellungen", href: "#" },
        { label: "Preisblatt", href: "#" },
      ],
    },
  ];

  return (
    <footer style={{ background: "var(--anthracite-deep)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 64 }}>
          {/* Brand */}
          <div>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 20 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "linear-gradient(135deg, var(--blue), var(--blue-deep))",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="zap" size={16} color="#fff" strokeWidth={2.5}/>
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "var(--white)" }}>
                Sturm<span style={{ color: "var(--blue-bright)" }}>Energie</span>
              </span>
            </a>
            <p style={{ fontSize: 14, color: "var(--white-40)", lineHeight: 1.7, maxWidth: 260, marginBottom: 28 }}>
              Deutschlands moderner Energieversorger. 100% Ökostrom, faire Preise, digitaler Service.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["Ökostrom", "TÜV", "CO₂-neutral"].map(badge => (
                <span key={badge} style={{
                  fontSize: 11, padding: "4px 10px", borderRadius: 6,
                  background: "var(--green-subtle)", border: "1px solid var(--green-glow)",
                  color: "var(--green)",
                }}>{badge}</span>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 11, color: "var(--white-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <li key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <a href={l.href} style={{
                      fontSize: 14, color: "var(--white-70)", textDecoration: "none",
                      transition: "color var(--transition-fast)",
                    }}
                    onMouseEnter={e => e.target.style.color = "var(--white)"}
                    onMouseLeave={e => e.target.style.color = "var(--white-70)"}>{l.label}</a>
                    {l.badge && (
                      <span style={{
                        fontSize: 9, padding: "2px 6px", borderRadius: 4,
                        background: "var(--blue-subtle)", color: "var(--blue-bright)", fontWeight: 600,
                      }}>{l.badge}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 32 }}/>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 13, color: "var(--white-40)" }}>
            © 2025 Sturm Energie GmbH · Alle Rechte vorbehalten · Reguliert durch die BNetzA
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {["de", "en"].map(lang => (
              <button key={lang} style={{
                padding: "6px 14px", borderRadius: 6, cursor: "pointer",
                background: lang === "de" ? "rgba(255,255,255,0.08)" : "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: lang === "de" ? "var(--white)" : "var(--white-40)",
                fontSize: 12, fontFamily: "var(--font-body)", textTransform: "uppercase",
              }}>{lang}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal();
  useParallax();

  return (
    <>
      <GlobalStyles/>
      <Nav/>
      <main>
        <Hero/>
        <Features/>
        <Tarife/>
        <Rechner/>
        <Why/>
        <Sustainability/>
        <Testimonials/>
        <FAQ/>
        <Contact/>
      </main>
      <Footer/>
    </>
  );
}
