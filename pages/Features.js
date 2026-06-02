import Icon from './Icon'

const features = [
  {
    icon: 'leaf', color: 'var(--green)', bg: 'var(--green-subtle)',
    title: '100% Ökostrom',
    desc: 'Ausschließlich Strom aus erneuerbaren Quellen – zertifiziert, transparent und ohne Greenwashing.',
  },
  {
    icon: 'shield', color: 'var(--blue-bright)', bg: 'var(--blue-subtle)',
    title: 'Faire Preise',
    desc: 'Keine versteckten Kosten, keine Preisüberraschungen. Volle Kostentransparenz von Beginn an.',
  },
  {
    icon: 'trendUp', color: '#ff9f0a', bg: 'rgba(255,159,10,0.1)',
    title: 'Preisgarantie',
    desc: '12 Monate Preissicherheit für Neukunden. Planen Sie Ihre Energiekosten verlässlich.',
  },
  {
    icon: 'smartphone', color: '#bf5af2', bg: 'rgba(191,90,242,0.1)',
    title: 'Digitaler Service',
    desc: 'Ihr Kundenportal – rund um die Uhr. Verbrauch, Rechnungen, Zählerstand – alles digital.',
  },
  {
    icon: 'bolt', color: 'var(--blue-bright)', bg: 'var(--blue-subtle)',
    title: 'Schneller Wechsel',
    desc: 'In nur 48 Stunden gewechselt. Wir kümmern uns um die Kündigung bei Ihrem alten Anbieter.',
  },
  {
    icon: 'globe', color: 'var(--green)', bg: 'var(--green-subtle)',
    title: 'CO₂-neutral',
    desc: 'Jede kWh wird durch Investitionen in erneuerbare Energieprojekte kompensiert.',
  },
]

export default function Features() {
  return (
    <section id="vorteile" style={{
      padding: '120px 24px',
      background: 'var(--anthracite-deep)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}/>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-label reveal" style={{ display: 'inline-flex' }}>
            <div className="dot"/> Warum Sturm Energie
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: 'var(--white)', marginBottom: 20,
          }}>
            Energie, die für Sie<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>arbeitet</em>
          </h2>
          <p className="reveal delay-2" style={{
            color: 'var(--white-70)', fontSize: 18,
            maxWidth: 520, margin: '0 auto', fontWeight: 300,
          }}>
            Wir verbinden modernste Technologie mit echtem Engagement für die Energiewende.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {features.map((f, i) => (
            <div key={f.title}
              className={`glass-card reveal delay-${(i % 3) + 1}`}
              style={{ padding: '36px 32px' }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: f.bg, border: `1px solid ${f.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24,
              }}>
                <Icon name={f.icon} size={22} color={f.color} strokeWidth={1.8}/>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: 'var(--white)', marginBottom: 10, letterSpacing: '-0.02em' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--white-70)', fontWeight: 300 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
