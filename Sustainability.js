import Icon from './Icon'

const items = [
  { icon: 'wind', pct: 68, label: 'Windkraft', color: '#0a84ff' },
  { icon: 'sun', pct: 22, label: 'Solarenergie', color: '#ffd60a' },
  { icon: 'recycling', pct: 10, label: 'Wasserkraft', color: '#30d158' },
]

export default function Sustainability() {
  return (
    <section id="nachhaltigkeit" style={{
      padding: '120px 24px',
      background: 'var(--anthracite-deep)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(48,209,88,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Chart card */}
          <div className="glass-card reveal-left" style={{ padding: '52px 44px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, marginBottom: 40, color: 'var(--white)' }}>
              Unser Energiemix 2025
            </h3>
            {items.map(item => (
              <div key={item.label} style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <Icon name={item.icon} size={16} color={item.color}/>
                    <span style={{ fontSize: 14, color: 'var(--white-70)' }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: 14, color: item.color, fontWeight: 500 }}>{item.pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${item.pct}%`, borderRadius: 3,
                    background: `linear-gradient(to right, ${item.color}80, ${item.color})`,
                    transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1)',
                  }}/>
                </div>
              </div>
            ))}

            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '32px 0' }}/>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[
                { val: '100%', label: 'Erneuerbar' },
                { val: '0g', label: 'CO₂/kWh' },
                { val: 'TÜV', label: 'Zertifiziert' },
              ].map(({ val, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--green)', letterSpacing: '-0.03em' }}>{val}</div>
                  <div style={{ fontSize: 12, color: 'var(--white-40)', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="section-label reveal" style={{ display: 'inline-flex', background: 'var(--green-subtle)', border: '1px solid rgba(48,209,88,0.2)' }}>
              <div className="dot" style={{ background: 'var(--green)' }}/>
              <span style={{ color: 'var(--green)' }}>Nachhaltigkeit</span>
            </div>
            <h2 className="reveal delay-1" style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(28px, 3vw, 48px)', lineHeight: 1.15,
              letterSpacing: '-0.03em', color: 'var(--white)', marginBottom: 24,
            }}>
              Jede Kilowattstunde<br/>
              <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>zählt für morgen</em>
            </h2>
            <p className="reveal delay-2" style={{ color: 'var(--white-70)', fontSize: 16, lineHeight: 1.75, marginBottom: 28, fontWeight: 300 }}>
              Unser Strom kommt ausschließlich aus deutschen und europäischen Erneuerbaren-Anlagen. Jede kWh ist rückverfolgbar – mit Herkunftsnachweis und jährlichem Nachhaltigkeitsbericht für jeden Kunden.
            </p>
            <p className="reveal delay-3" style={{ color: 'var(--white-70)', fontSize: 16, lineHeight: 1.75, marginBottom: 40, fontWeight: 300 }}>
              Mit dem Öko-Plus-Tarif investieren Sie zusätzlich direkt in neue Windpark- und Solarprojekte – und pflanzen pro Vertragsjahr automatisch 10 Bäume.
            </p>
            <a href="#tarife" className="btn-green reveal delay-4">
              Klimaneutral werden <Icon name="leaf" size={16} color="var(--anthracite-deep)"/>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
