import { useState, useEffect } from 'react'
import Icon from './Icon'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('hero-bg')
      if (el) el.style.transform = `scale(1.08) translateY(${window.scrollY * 0.25}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh', minHeight: 700,
      display: 'flex', alignItems: 'center', overflow: 'hidden',
    }}>
      {/* Parallax background */}
      <div id="hero-bg" style={{
        position: 'absolute', inset: '-8% -5%', zIndex: 0,
        transform: 'scale(1.08)', transformOrigin: 'center center', willChange: 'transform',
      }}>
        <svg viewBox="0 0 1440 900" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
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
            <radialGradient id="cityGlow" cx="50%" cy="70%" r="60%">
              <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#0a84ff" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="sunGlow" cx="75%" cy="25%" r="30%">
              <stop offset="0%" stopColor="#30d158" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#30d158" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="textOverlay" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a0f1a" stopOpacity="0.88"/>
              <stop offset="55%" stopColor="#0a0f1a" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#0a0f1a" stopOpacity="0.05"/>
            </linearGradient>
          </defs>

          <rect width="1440" height="900" fill="url(#skyGrad)"/>
          <rect width="1440" height="900" fill="url(#cityGlow)"/>
          <rect width="1440" height="900" fill="url(#sunGlow)"/>

          {/* Stars */}
          {Array.from({ length: 80 }, (_, i) => (
            <circle key={i}
              cx={(i * 183.3 + 50) % 1440}
              cy={(i * 97.7 + 30) % 400}
              r={i % 4 === 0 ? 1.2 : 0.6}
              fill="white"
              opacity={0.2 + (i % 5) * 0.08}
            />
          ))}

          {/* Wind turbines */}
          {[200, 380, 520, 1080, 1240].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${285 + i * 8})`} opacity="0.32">
              <line x1="0" y1="0" x2="0" y2="230" stroke="#aaa" strokeWidth="2"/>
              <circle cx="0" cy="0" r="4" fill="#aaa"/>
              {[0, 120, 240].map((angle, j) => (
                <line key={j}
                  x1="0" y1="0"
                  x2={Math.sin(((angle + i * 25) * Math.PI) / 180) * 52}
                  y2={Math.cos(((angle + i * 25) * Math.PI) / 180) * -52}
                  stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.75"
                />
              ))}
            </g>
          ))}

          {/* City silhouette */}
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
              {Array.from({ length: Math.floor(h / 30) }, (_, row) =>
                Array.from({ length: Math.floor(w / 14) }, (_, col) => (
                  <rect key={`${row}-${col}`}
                    x={x + col * 14 + 3} y={y + row * 30 + 8}
                    width={6} height={10}
                    fill={(row + col + i) % 2 === 0 ? '#0a84ff' : '#1c3a5a'}
                    opacity={0.35 + ((row * col + i) % 4) * 0.12}
                  />
                ))
              )}
            </g>
          ))}

          {/* Solar panels */}
          <g transform="translate(60, 778)" opacity="0.65">
            {Array.from({ length: 5 }, (_, i) => (
              <g key={i} transform={`translate(${i * 60}, 0) rotate(-20, 20, 20)`}>
                <rect x="0" y="0" width="45" height="30" rx="2" fill="#0a1f3d" stroke="#0a84ff" strokeWidth="0.8" opacity="0.9"/>
                <line x1="22" y1="0" x2="22" y2="30" stroke="#0a84ff" strokeWidth="0.5" opacity="0.4"/>
                <line x1="0" y1="15" x2="45" y2="15" stroke="#0a84ff" strokeWidth="0.5" opacity="0.4"/>
              </g>
            ))}
          </g>

          <rect x="0" y="500" width="1440" height="400" fill="url(#glowBlue)" opacity="0.2"/>
          <rect width="1440" height="900" fill="url(#textOverlay)"/>
        </svg>
      </div>

      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '5%', width: 600, height: 600,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(10,132,255,0.07) 0%, transparent 70%)',
        animation: 'orb1 12s ease-in-out infinite', pointerEvents: 'none', zIndex: 1,
      }}/>
      <div style={{
        position: 'absolute', bottom: '10%', right: '10%', width: 500, height: 500,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(48,209,88,0.05) 0%, transparent 70%)',
        animation: 'orb2 15s ease-in-out infinite', pointerEvents: 'none', zIndex: 1,
      }}/>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>
          <div className="section-label" style={{
            display: 'inline-flex',
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(16px)',
            transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s',
          }}>
            <div className="dot"/>
            Deutschlands moderner Energieversorger
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(44px, 6vw, 80px)', lineHeight: 1.05,
            letterSpacing: '-0.03em', color: 'var(--white)', marginBottom: 28,
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(24px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s',
          }}>
            Energie. <em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>Sauber.</em><br/>
            Intelligent.<br/>
            <span className="shimmer-text">Transparent.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.65,
            color: 'var(--white-70)', marginBottom: 44,
            maxWidth: 520, fontWeight: 300,
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s',
          }}>
            100% Ökostrom. Faire Preise ohne versteckte Kosten. Digitaler Service, der wirklich funktioniert – für eine Zukunft, die wir gemeinsam gestalten.
          </p>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 14,
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(16px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.65s',
          }}>
            <a href="#tarife" className="btn-primary" style={{ fontSize: 16, padding: '16px 34px' }}>
              Tarif berechnen <Icon name="arrowRight" size={16}/>
            </a>
            <a href="#vorteile" className="btn-ghost" style={{ fontSize: 16 }}>
              Mehr erfahren
            </a>
          </div>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 52,
            opacity: loaded ? 1 : 0,
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s',
          }}>
            {[
              { val: '100%', label: 'Ökostrom' },
              { val: '48 h', label: 'Wechselgarantie' },
              { val: '4,8★', label: 'Kundenbewertung' },
              { val: '0€', label: 'Wechselgebühr' },
            ].map(({ val, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.03em' }}>{val}</span>
                <span style={{ fontSize: 12, color: 'var(--white-40)', fontWeight: 400, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2,
        opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1.2s',
      }}>
        <span style={{ fontSize: 11, color: 'var(--white-40)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Entdecken</span>
        <div style={{
          width: 24, height: 40, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12,
          display: 'flex', justifyContent: 'center', paddingTop: 7,
        }}>
          <div style={{
            width: 4, height: 8, borderRadius: 2, background: 'var(--blue-bright)',
            animation: 'heroFloat 2s ease-in-out infinite',
          }}/>
        </div>
      </div>
    </section>
  )
}
