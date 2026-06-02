import { useState } from 'react'
import Icon from './Icon'

const items = [
  { q: 'Wie lange dauert der Wechsel zu Sturm Energie?', a: 'In der Regel dauert der Wechsel nur 48 Stunden. Wir kümmern uns um die Kündigung bei Ihrem alten Anbieter und koordinieren alles – Sie müssen nichts weiter tun als das Bestellformular ausfüllen.' },
  { q: 'Gibt es eine Mindestvertragslaufzeit?', a: 'Nein. Alle unsere Tarife sind monatlich kündbar. Es gibt keine Mindestlaufzeit und keine Wechselgebühren – wir setzen auf Qualität, nicht auf Bindungsklauseln.' },
  { q: 'Was bedeutet 100% Ökostrom bei Sturm Energie?', a: 'Für jede Kilowattstunde, die Sie verbrauchen, kaufen wir eine Kilowattstunde aus zertifizierten erneuerbaren Quellen (Wind, Solar, Wasser) ein – mit lückenlosem Herkunftsnachweis gemäß EEG.' },
  { q: 'Wie hoch ist mein Abschlag und kann ich ihn anpassen?', a: 'Ihr monatlicher Abschlag wird anhand Ihres Jahresverbrauchs berechnet. Im Kundenportal können Sie ihn jederzeit flexibel anpassen – nach oben oder nach unten.' },
  { q: 'Was passiert, wenn ich umziehe?', a: 'Kein Problem – melden Sie uns Ihren Umzug einfach im Kundenportal. Wir begleiten Sie zu Ihrer neuen Adresse, sofern wir dort liefern. Andernfalls können Sie ohne Gebühren kündigen.' },
  { q: 'Wie kann ich meinen Verbrauch verfolgen?', a: 'Im Kundenportal und in der Sturm-Energie-App sehen Sie Ihren Verbrauch in Echtzeit (bei Smart Meter), Ihre monatlichen Abrechnungen und alle Vertragsdetails – jederzeit, auf allen Geräten.' },
  { q: 'Ist die Preisgarantie wirklich verbindlich?', a: 'Ja. Die Preisgarantie gilt vertraglich für die angegebene Laufzeit. Preisanpassungen während der Garantiephase sind ausgeschlossen – das ist unser schriftliches Versprechen an Sie.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" style={{ padding: '120px 24px', background: 'var(--anthracite-deep)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-label reveal" style={{ display: 'inline-flex' }}>
            <div className="dot"/> Häufige Fragen
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: 'var(--white)',
          }}>
            Ihre Fragen,<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>unsere Antworten</em>
          </h2>
        </div>

        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '24px 4px', background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--white)', fontFamily: 'var(--font-body)',
                  fontSize: 16, fontWeight: 400, textAlign: 'left', letterSpacing: '-0.01em',
                }}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <div style={{
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  flexShrink: 0, marginLeft: 16,
                  color: open === i ? 'var(--blue-bright)' : 'var(--white-40)',
                }}>
                  <Icon name="plus" size={18}/>
                </div>
              </button>
              <div className="faq-answer" style={{ maxHeight: open === i ? 200 : 0, opacity: open === i ? 1 : 0 }}>
                <p style={{ padding: '0 4px 24px', fontSize: 15, lineHeight: 1.75, color: 'var(--white-70)', fontWeight: 300 }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
