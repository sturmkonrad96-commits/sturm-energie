import Icon from './Icon'

const stats = [
  { val: '180.000+', label: 'Zufriedene Kunden' },
  { val: '98,7%', label: 'Kundenzufriedenheit' },
  { val: '2,4 Mio.', label: 'tCO₂ eingespart' },
  { val: '48 h', label: 'Ø Wechseldauer' },
]

export default function Why() {
  return (
    <section id="warum" style={{
      padding: '120px 24px',
      background: 'var(--anthracite-mid)',
      overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
      }}/>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Stats */}
        <div className="stats-grid reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1, background: 'rgba(255,255,255,0.06)',
          borderRadius: 20, overflow: 'hidden', marginBottom: 100,
        }}>
          {stats.map(s => (
            <div key={s.label} style={{
              padding: '40px 32px',
              background: 'var(--anthracite-mid)',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--white)', letterSpacing: '-0.04em', marginBottom: 6 }}>
                {s.val}
              </div>
              <div style={{ fontSize: 13, color: 'var(--white-40)', letterSpacing: '0.04em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* 2-col */}
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="section-label reveal" style={{ display: 'inline-flex' }}>
              <div className="dot"/> Unser Versprechen
            </div>
            <h2 className="reveal delay-1" style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(28px, 3vw, 48px)', lineHeight: 1.15,
              letterSpacing: '-0.03em', color: 'var(--white)', marginBottom: 24,
            }}>
              Nicht nur Energie –<br/>
              <em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>ein Versprechen</em><br/>
              an die Zukunft
            </h2>
            <p className="reveal delay-2" style={{ color: 'var(--white-70)', fontSize: 16, lineHeight: 1.75, marginBottom: 36, fontWeight: 300 }}>
              Sturm Energie wurde gegründet, weil die Energiebranche transparenter und fairer werden muss. Wir investieren 15% unseres Umsatzes direkt in neue Erneuerbare-Energien-Projekte in Deutschland.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="reveal delay-3">
              {[
                'Zertifizierter Ökostrom aus deutschen Windparks & Solaranlagen',
                'Klimaneutral seit 2022 – geprüft durch TÜV Rheinland',
                'Transparente Herkunftsnachweise für jede kWh',
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'var(--green-subtle)',
                    border: '1px solid var(--green-glow)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 1,
                  }}>
                    <Icon name="check" size={11} color="var(--green)" strokeWidth={2.5}/>
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--white-70)', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Energy flow diagram */}
          <div className="reveal-right">
            <div style={{
              padding: '44px', borderRadius: 24,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <svg viewBox="0 0 360 320" style={{ width: '100%', height: 'auto' }}>
                <defs>
                  <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0a84ff"/>
                    <stop offset="100%" stopColor="#30d158"/>
                  </linearGradient>
                </defs>
                {[
                  { x: 50, y: 60, icon: '☀️', label: 'Solar', color: '#ffd60a' },
                  { x: 50, y: 160, icon: '💨', label: 'Wind', color: '#0a84ff' },
                  { x: 50, y: 260, icon: '💧', label: 'Wasser', color: '#30d158' },
                ].map(({ x, y, icon, label, color }) => (
                  <g key={label}>
                    <circle cx={x} cy={y} r={28} fill="rgba(255,255,255,0.04)" stroke={`${color}40`} strokeWidth="1"/>
                    <text x={x} y={y - 4} textAnchor="middle" fontSize="16">{icon}</text>
                    <text x={x} y={y + 16} textAnchor="middle" fill={color} fontSize="9" fontFamily="DM Sans">{label}</text>
                    <line x1={x + 28} y1={y} x2={165} y2={160} stroke={color} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5"/>
                  </g>
                ))}
                <circle cx={193} cy={160} r={42} fill="rgba(10,132,255,0.08)" stroke="#0a84ff" strokeWidth="1.5"/>
                <circle cx={193} cy={160} r={32} fill="rgba(10,132,255,0.06)" stroke="#0a84ff" strokeWidth="1"/>
                <text x={193} y={154} textAnchor="middle" fill="#409cff" fontSize="11" fontFamily="DM Sans" fontWeight="500">Sturm</text>
                <text x={193} y={169} textAnchor="middle" fill="#409cff" fontSize="11" fontFamily="DM Sans" fontWeight="500">Energie</text>
                <line x1={235} y1={160} x2={300} y2={160} stroke="url(#lineGrad2)" strokeWidth="2.5"/>
                <polygon points="300,154 312,160 300,166" fill="#30d158"/>
                <circle cx={328} cy={160} r={24} fill="rgba(48,209,88,0.08)" stroke="#30d158" strokeWidth="1.5"/>
                <text x={328} y={154} textAnchor="middle" fill="#30d158" fontSize="11" fontFamily="DM Sans">Ihr</text>
                <text x={328} y={168} textAnchor="middle" fill="#30d158" fontSize="11" fontFamily="DM Sans">Heim</text>
                <text x={193} y={225} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="DM Sans">Intelligentes Netz</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
