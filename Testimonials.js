const reviews = [
  { name: 'Sarah M.', location: 'München', rating: 5, text: 'Wechsel in 2 Tagen erledigt, Kundensupport war top und die App ist wirklich intuitiv. Endlich ein Anbieter, der das ernst nimmt.', tarif: 'Komfort' },
  { name: 'Thomas K.', location: 'Hamburg', rating: 5, text: 'Nach Jahren bei einem der großen Anbieter bin ich froh gewechselt zu haben. Transparente Abrechnung, faire Preise und man merkt echtes Engagement.', tarif: 'Öko Plus' },
  { name: 'Lisa B.', location: 'Berlin', rating: 5, text: 'Das Kundenportal ist das beste, was ich je gesehen habe. Verbrauch in Echtzeit, Rechnungen sofort verfügbar, alles digital. Genau so soll das sein.', tarif: 'Komfort' },
  { name: 'Michael W.', location: 'Frankfurt', rating: 4, text: 'Sehr guter Service und faire Konditionen. Die Preisgarantie war für mich das entscheidende Argument. Bin sehr zufrieden.', tarif: 'Basis' },
  { name: 'Claudia R.', location: 'Stuttgart', rating: 5, text: 'Endlich ein Energieanbieter, dem Nachhaltigkeit nicht nur Marketing ist. Mein CO₂-Bericht zeigt mir wirklich, was ich einspare.', tarif: 'Öko Plus' },
  { name: 'Jan F.', location: 'Köln', rating: 5, text: 'Super schnelle Reaktionszeiten im Support, faire Preise und das Ökostrom-Zertifikat gibt mir ein gutes Gefühl. Klare Empfehlung!', tarif: 'Komfort' },
]

export default function Testimonials() {
  return (
    <section id="bewertungen" style={{
      padding: '120px 24px',
      background: 'var(--anthracite-mid)',
      overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
      }}/>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-label reveal" style={{ display: 'inline-flex' }}>
            <div className="dot"/> Kundenstimmen
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: 'var(--white)', marginBottom: 16,
          }}>
            Was unsere Kunden<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>wirklich sagen</em>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 16, alignItems: 'center' }}>
            {[1,2,3,4,5].map(i => <span key={i} className="star">★</span>)}
            <span style={{ marginLeft: 10, color: 'var(--white-70)', fontSize: 14 }}>4,8 / 5 aus 12.400 Bewertungen</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {reviews.map((r, i) => (
            <div key={r.name} className={`glass-card reveal delay-${(i % 3) + 1}`} style={{ padding: '32px 28px' }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {Array.from({ length: r.rating }, (_, j) => <span key={j} className="star">★</span>)}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--white-70)', marginBottom: 24, fontStyle: 'italic' }}>
                „{r.text}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--white)' }}>{r.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--white-40)' }}>{r.location}</p>
                </div>
                <span style={{
                  fontSize: 11, padding: '4px 12px', borderRadius: 20,
                  background: 'var(--blue-subtle)', border: '1px solid rgba(10,132,255,0.2)',
                  color: 'var(--blue-bright)', fontWeight: 500,
                }}>{r.tarif}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
