import { useState } from 'react'
import Icon from './Icon'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', subject: 'wechsel' })
  const [sent, setSent] = useState(false)

  return (
    <section id="kontakt" style={{
      padding: '120px 24px',
      background: 'var(--anthracite-mid)',
      overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
      }}/>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-label reveal" style={{ display: 'inline-flex' }}>
            <div className="dot"/> Kontakt
          </div>
          <h2 className="reveal delay-1" style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: 'var(--white)',
          }}>
            Wir sind für Sie da –<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--blue-bright)' }}>jederzeit</em>
          </h2>
        </div>

        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 40, alignItems: 'start' }}>
          {/* Contact cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="reveal-left">
            {[
              { icon: 'phone', title: 'Hotline', val: '0800 – 78876 0', sub: 'Mo–Fr 8–20 Uhr, Sa 9–16 Uhr', color: 'var(--blue-bright)' },
              { icon: 'mail', title: 'E-Mail', val: 'service@sturmenergie.de', sub: 'Antwort innerhalb von 4 Stunden', color: 'var(--green)' },
              { icon: 'smartphone', title: 'Kundenportal', val: 'portal.sturmenergie.de', sub: '24/7 Self-Service & Chat', color: '#bf5af2' },
            ].map(({ icon, title, val, sub, color }) => (
              <div key={title} className="glass-card" style={{ padding: '28px 28px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: `${color}15`, border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={icon} size={20} color={color}/>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: 'var(--white-40)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>{title}</p>
                  <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--white)', marginBottom: 2 }}>{val}</p>
                  <p style={{ fontSize: 12, color: 'var(--white-40)' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="glass-card reveal-right" style={{ padding: '44px 44px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'var(--green-subtle)', border: '1px solid var(--green-glow)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <Icon name="check" size={28} color="var(--green)" strokeWidth={2}/>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--white)', marginBottom: 12 }}>Nachricht erhalten!</h3>
                <p style={{ color: 'var(--white-70)', fontSize: 15 }}>Wir melden uns innerhalb von 4 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--white)', marginBottom: 32 }}>
                  Nachricht senden
                </h3>

                <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
                  {[
                    { val: 'wechsel', label: 'Wechsel' },
                    { val: 'support', label: 'Support' },
                    { val: 'abrechnung', label: 'Abrechnung' },
                    { val: 'sonstiges', label: 'Sonstiges' },
                  ].map(o => (
                    <button key={o.val}
                      onClick={() => setForm({ ...form, subject: o.val })}
                      style={{
                        padding: '8px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 13,
                        background: form.subject === o.val ? 'var(--blue)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${form.subject === o.val ? 'var(--blue)' : 'rgba(255,255,255,0.1)'}`,
                        color: 'var(--white)', fontFamily: 'var(--font-body)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >{o.label}</button>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { key: 'name', label: 'Name', type: 'text', ph: 'Max Mustermann' },
                    { key: 'email', label: 'E-Mail', type: 'email', ph: 'max@beispiel.de' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 13, color: 'var(--white-40)', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type} placeholder={f.ph}
                        value={form[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        style={{
                          width: '100%', padding: '14px 18px', borderRadius: 12,
                          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: 15, outline: 'none',
                          transition: 'border-color var(--transition-fast)',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(10,132,255,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ fontSize: 13, color: 'var(--white-40)', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>Nachricht</label>
                    <textarea
                      rows={4} placeholder="Wie können wir Ihnen helfen?"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{
                        width: '100%', padding: '14px 18px', borderRadius: 12,
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                        color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: 15,
                        outline: 'none', resize: 'vertical',
                        transition: 'border-color var(--transition-fast)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(10,132,255,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <button className="btn-primary" onClick={() => setSent(true)} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                    Nachricht senden <Icon name="arrowRight" size={16}/>
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--white-40)', textAlign: 'center' }}>
                    Mit dem Absenden stimmen Sie unserer{' '}
                    <a href="#datenschutz" style={{ color: 'var(--blue-bright)', textDecoration: 'none' }}>Datenschutzerklärung</a> zu.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
