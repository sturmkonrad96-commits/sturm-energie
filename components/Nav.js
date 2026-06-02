import { useState, useEffect } from 'react'
import Icon from './Icon'

const navLinks = [
  { label: 'Tarife', href: '#tarife' },
  { label: 'Vorteile', href: '#vorteile' },
  { label: 'Nachhaltigkeit', href: '#nachhaltigkeit' },
  { label: 'Kundenstimmen', href: '#bewertungen' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 24px',
      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      background: scrolled ? 'rgba(17,19,20,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72,
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--blue), var(--blue-deep))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(10,132,255,0.4)',
          }}>
            <Icon name="zap" size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Sturm<span style={{ color: 'var(--blue-bright)' }}>Energie</span>
          </span>
        </a>

        <div className="hide-mobile" style={{ display: 'flex', gap: 4 }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} style={{
              padding: '8px 16px', borderRadius: 8,
              color: 'var(--white-70)', textDecoration: 'none',
              fontSize: 14, fontWeight: 400,
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.background = 'var(--white-08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--white-70)'; e.currentTarget.style.background = 'transparent' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#portal" className="btn-ghost hide-mobile" style={{ padding: '9px 20px', fontSize: 14 }}>Kundenportal</a>
          <a href="#tarife" className="btn-primary" style={{ padding: '9px 20px', fontSize: 14 }}>Jetzt wechseln</a>
          <button
            className="btn-ghost"
            style={{ padding: '9px 12px', display: mobileOpen ? 'flex' : 'none' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            <Icon name={mobileOpen ? 'x' : 'menu'} size={18} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{
          background: 'rgba(17,19,20,0.98)', backdropFilter: 'blur(24px)',
          padding: '20px 24px 28px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '14px 0',
                color: 'var(--white-70)', textDecoration: 'none',
                fontSize: 16, borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}
