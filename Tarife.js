import { useState } from 'react'
import Icon from './Icon'

const tarife = [
  {
    name: 'Basis', tagline: 'Einfach & fair',
    priceNet: '28,9', unit: 'ct/kWh', base: '9,90',
    color: 'var(--gray-400)',
    features: ['100% Ökostrom', 'Monatliche Abrechnung', 'Online-Kundenportal', '12 Monate Preissicherheit'],
    cta: 'Basis wählen', ctaClass: 'btn-ghost',
  },
  {
    name: 'Komfort', tagline: 'Unser Bestseller',
    priceNet: '26,9', unit: 'ct/kWh', base: '7,90',
    color: 'var(--blue-bright)', featured: true,
    features: ['100% Ökostrom + Zertifikat', 'Monatliche Abrechnung', 'Premiumportal & App', '24 Monate Preissicherheit', 'Persönlicher Energieberater', 'CO₂-Ausgleich inklusive'],
    cta: 'Jetzt wechseln', ctaClass: 'btn-primary',
  },
  {
    name: 'Öko Plus', tagline: 'Für Klimapioniere',
    priceNet: '29,9', unit: 'ct/kWh', base: '8,90',
    color: 'var(--green)',
    features: ['100% Regionalstrom', 'Direktvermarktung', 'Monatlicher Klimabericht', '24 Monate Preissicherheit', 'Energieberatung Premium', 'Baumplanzprogramm inkl.', 'Förderberatung Solar'],
    cta: 'Öko Plus wählen', ctaClass: 'btn-green',
  },
]

export default function Tarife() {
  const [selected, setSelected] = useState(1)

  return (
    <section id="tarife" style={{
      padding: '120px 24px',
      background: 'var(--anthracite-mid)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
      }}/>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-label reveal" style={{ display: 'inline-flex' }}>
            <div className="dot"/> Unsere Tarife
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: 'var(--white)', marginBottom: 20,
          }}>
            Der richtige Tarif<br/>
            für <em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>jeden Haushalt</em>
          </h2>
          <p className="reveal delay-2" style={{ color: 'var(--white-70)', fontSize: 18, maxWidth: 480, margin: '0 auto', fontWeight: 300 }}>
            Alle Tarife inklusive 100% Ökostrom. Keine Vertragslaufzeit, keine versteckten Gebühren.
          </p>
        </div>

        <div className="tariff-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20, alignItems: 'start',
        }}>
          {tarife.map((t, i) => (
            <div key={t.name}
              className={`glass-card tariff-card reveal delay-${i + 1}${t.featured ? ' featured' : ''}`}
              onClick={() => setSelected(i)}
              style={{
                padding: t.featured ? '48px 32px 40px' : '40px 32px',
                border: selected === i ? `1px solid ${t.color}50` : '1px solid rgba(255,255,255,0.08)',
                boxShadow: t.featured ? '0 20px 60px rgba(10,132,255,0.15)' : 'none',
                cursor: 'pointer',
                transform: t.featured ? 'scale(1.03)' : 'scale(1)',
                position: 'relative',
              }}
            >
              {t.featured && <div className="tariff-badge">Beliebteste Wahl</div>}

              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: t.color, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {t.tagline}
                </span>
              </div>
              <h3 style={{ fontSize: 28, fontWeight: 400, fontFamily: 'var(--font-display)', color: 'var(--white)', marginBottom: 28, letterSpacing: '-0.02em' }}>
                {t.name}
              </h3>

              <div style={{ marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.04em' }}>{t.priceNet}</span>
                <span style={{ fontSize: 16, color: 'var(--white-70)', marginLeft: 4 }}>{t.unit}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--white-40)', marginBottom: 32 }}>zzgl. {t.base} €/Monat Grundpreis</p>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 28 }}/>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                {t.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--white-70)' }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: t.color === 'var(--green)' ? 'var(--green-subtle)'
                        : t.color === 'var(--blue-bright)' ? 'var(--blue-subtle)'
                        : 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon name="check" size={10} color={t.color} strokeWidth={2.5}/>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#rechner" className={t.ctaClass} style={{ width: '100%', justifyContent: 'center' }}>
                {t.cta} <Icon name="arrowRight" size={14}/>
              </a>
            </div>
          ))}
        </div>

        <p className="reveal" style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--white-40)' }}>
          Alle Preise inkl. Steuern und Abgaben. * Preise für Haushalt mit 2.500 kWh/Jahr. Gültig ab 01.07.2025.
        </p>
      </div>
    </section>
  )
}
