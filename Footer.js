import Icon from './Icon'

const cols = [
  {
    title: 'Produkte',
    links: [
      { label: 'Stromtarife', href: '#tarife' },
      { label: 'Tarifrechner', href: '#rechner' },
      { label: 'Kundenportal', href: '#portal' },
      { label: 'App herunterladen', href: '#' },
      { label: 'Förderprogramme', href: '#' },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Über uns', href: '/ueber-uns' },
      { label: 'Karriere', href: '/karriere', badge: 'Wir suchen!' },
      { label: 'Presse', href: '/presse' },
      { label: 'Partnerprogramm', href: '/partner' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Wissen',
    links: [
      { label: 'Stromlexikon', href: '/lexikon' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Energieführer', href: '/guide' },
      { label: 'Nachhaltigkeitsbericht', href: '/nachhaltigkeit' },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'AGB', href: '/agb' },
      { label: 'Cookie-Einstellungen', href: '#' },
      { label: 'Preisblatt', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--anthracite-deep)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '80px 24px 40px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: 40, marginBottom: 64,
        }}>
          {/* Brand */}
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 20 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, var(--blue), var(--blue-deep))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="zap" size={16} color="#fff" strokeWidth={2.5}/>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: 'var(--white)' }}>
                Sturm<span style={{ color: 'var(--blue-bright)' }}>Energie</span>
              </span>
            </a>
            <p style={{ fontSize: 14, color: 'var(--white-40)', lineHeight: 1.7, maxWidth: 260, marginBottom: 28 }}>
              Deutschlands moderner Energieversorger. 100% Ökostrom, faire Preise, digitaler Service.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Ökostrom', 'TÜV', 'CO₂-neutral'].map(badge => (
                <span key={badge} style={{
                  fontSize: 11, padding: '4px 10px', borderRadius: 6,
                  background: 'var(--green-subtle)', border: '1px solid var(--green-glow)',
                  color: 'var(--green)',
                }}>{badge}</span>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 11, color: 'var(--white-40)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <li key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <a href={l.href} style={{
                      fontSize: 14, color: 'var(--white-70)', textDecoration: 'none',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--white-70)'}
                    >{l.label}</a>
                    {l.badge && (
                      <span style={{
                        fontSize: 9, padding: '2px 6px', borderRadius: 4,
                        background: 'var(--blue-subtle)', color: 'var(--blue-bright)', fontWeight: 600,
                      }}>{l.badge}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 32 }}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--white-40)' }}>
            © 2025 Sturm Energie GmbH · Alle Rechte vorbehalten · Reguliert durch die BNetzA
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {['de', 'en'].map((lang, i) => (
              <button key={lang} style={{
                padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
                background: i === 0 ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: i === 0 ? 'var(--white)' : 'var(--white-40)',
                fontSize: 12, fontFamily: 'var(--font-body)', textTransform: 'uppercase',
              }}>{lang}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
