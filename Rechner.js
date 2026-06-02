import { useState } from 'react'
import Icon from './Icon'

export default function Rechner() {
  const [kwh, setKwh] = useState(2500)
  const [type, setType] = useState('haushalt')

  const pricePerKwh = 0.269
  const basePerMonth = 7.90
  const total = ((kwh * pricePerKwh) + (basePerMonth * 12)).toFixed(2)
  const monthly = (parseFloat(total) / 12).toFixed(2)
  const saving = (((kwh * 0.314) + (basePerMonth * 12)) - parseFloat(total)).toFixed(2)

  const maxKwh = type === 'haushalt' ? 6000 : 20000
  const pct = ((kwh - 500) / (maxKwh - 500)) * 100

  return (
    <section id="rechner" style={{
      padding: '120px 24px',
      background: 'var(--anthracite-deep)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(10,132,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label reveal" style={{ display: 'inline-flex' }}>
            <div className="dot"/> Tarifrechner
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: 'var(--white)', marginBottom: 20,
          }}>
            Was kostet Ihr Strom<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>wirklich?</em>
          </h2>
        </div>

        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          {/* Controls */}
          <div className="glass-card reveal" style={{ padding: '48px 44px' }}>
            <div style={{ marginBottom: 40 }}>
              <label style={{ fontSize: 13, color: 'var(--white-40)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
                Verbrauchstyp
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { val: 'haushalt', label: 'Haushalt' },
                  { val: 'gewerbe', label: 'Gewerbe' },
                ].map(o => (
                  <button key={o.val}
                    onClick={() => { setType(o.val); setKwh(o.val === 'haushalt' ? 2500 : 8000) }}
                    style={{
                      flex: 1, padding: '12px', borderRadius: 10, cursor: 'pointer',
                      background: type === o.val ? 'var(--blue)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${type === o.val ? 'var(--blue)' : 'rgba(255,255,255,0.1)'}`,
                      color: 'var(--white)', fontSize: 14, fontFamily: 'var(--font-body)',
                      transition: 'all var(--transition-fast)',
                    }}
                  >{o.label}</button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <label style={{ fontSize: 13, color: 'var(--white-40)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Jahresverbrauch
                </label>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--blue-bright)', letterSpacing: '-0.02em' }}>
                  {kwh.toLocaleString('de-DE')} kWh
                </span>
              </div>
              <input
                type="range" min={500} max={maxKwh} step={100}
                value={kwh}
                onChange={e => setKwh(Number(e.target.value))}
                style={{ '--range-pct': `${pct}%` }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'var(--white-40)' }}>
                <span>500 kWh</span>
                <span>{maxKwh.toLocaleString('de-DE')} kWh</span>
              </div>
            </div>

            <div style={{
              marginTop: 28, padding: '16px 20px', borderRadius: 12,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <p style={{ fontSize: 13, color: 'var(--white-40)', marginBottom: 10 }}>Typische Verbräuche</p>
              {[
                ['1-Person Haushalt', '≈ 1.500 kWh'],
                ['2-Personen Haushalt', '≈ 2.500 kWh'],
                ['4-Personen Haushalt', '≈ 4.000 kWh'],
                ['Kleines Gewerbe', '≈ 10.000 kWh'],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--white-70)', padding: '4px 0' }}>
                  <span>{label}</span>
                  <span style={{ color: 'var(--white-40)' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="glass-card reveal delay-1" style={{
              padding: '44px 40px', flex: 1,
              border: '1px solid rgba(10,132,255,0.2)',
              background: 'linear-gradient(135deg, rgba(10,132,255,0.06), rgba(10,132,255,0.02))',
            }}>
              <p style={{ fontSize: 13, color: 'var(--white-40)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
                Ihre Jahreskosten (Komfort)
              </p>
              <div style={{ marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.04em' }}>
                  {total.replace('.', ',')}
                </span>
                <span style={{ fontSize: 20, color: 'var(--white-70)', marginLeft: 4 }}>€</span>
              </div>
              <p style={{ color: 'var(--white-40)', fontSize: 14, marginBottom: 32 }}>
                ≈ <span style={{ color: 'var(--white-70)' }}>{monthly.replace('.', ',')} €/Monat</span>
              </p>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 24 }}/>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '16px',
                background: 'var(--green-subtle)', borderRadius: 12,
                border: '1px solid var(--green-glow)',
              }}>
                <Icon name="trendUp" size={20} color="var(--green)"/>
                <div>
                  <p style={{ fontSize: 13, color: 'var(--green)', fontWeight: 500 }}>Gegenüber Bundesdurchschnitt:</p>
                  <p style={{ fontSize: 18, fontWeight: 500, color: 'var(--white)' }}>
                    {saving.replace('.', ',')} € jährlich sparen
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card reveal delay-2" style={{ padding: '32px 36px' }}>
              <p style={{ fontSize: 14, color: 'var(--white-70)', marginBottom: 20, lineHeight: 1.6 }}>
                Ihr individuelles Angebot dauert nur 2 Minuten. Kostenlos, unverbindlich, sofort.
              </p>
              <a href="#kontakt" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Jetzt wechseln & sparen <Icon name="arrowRight" size={16}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
