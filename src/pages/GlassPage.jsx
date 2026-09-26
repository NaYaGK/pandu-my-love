import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MusicPlayer   from '../components/MusicPlayer.jsx'
import Gallery        from '../components/Gallery.jsx'
import ScrollSymbols  from '../components/ScrollSymbols.jsx'
import { NOTES, LETTER, checkPassword } from '../data.js'
import '../styles/glass.css'
import '../styles/player.css'

const TABS = [
  { id: 'letter',  label: '❤️ Love Letter' },
  { id: 'music',   label: '🎵 Music' },
  { id: 'notes',   label: '📝 Notes' },
  { id: 'gallery', label: '🌷 Gallery' },
]

export default function GlassPage() {
  const [stage,    setStage]    = useState('password') // password | welcome | main
  const [input,    setInput]    = useState('')
  const [error,    setError]    = useState('')
  const [shaking,  setShaking]  = useState(false)
  const [tab,      setTab]      = useState('letter')
  const [letterOpen, setLetter] = useState(false)

  /* Apply theme class to <html> */
  useEffect(() => {
    document.documentElement.classList.add('glass-theme')
    return () => document.documentElement.classList.remove('glass-theme')
  }, [])

  const handleSubmit = () => {
    if (checkPassword(input)) {
      setStage('welcome')
      setTimeout(() => setStage('main'), 2800)
    } else {
      setShaking(true)
      setError("Hmm… that\u2019s not it. Try again, my love. \uD83D\uDC95")
      setInput('')
      setTimeout(() => { setShaking(false); setError('') }, 1800)
    }
  }

  const letterParagraphs = LETTER.trim().split('\n\n')

  return (
    <div className="glass-page">

      {/* Scroll-triggered background symbols */}
      {stage === 'main' && <ScrollSymbols />}

      {/* Ambient orbs */}
      <div className="glass-orb" style={{ width:480,height:480, background:'radial-gradient(circle,#ff8ab5,transparent 70%)', top:-120,left:-120, '--dur':'13s','--dx':'90px','--dy':'60px' }} aria-hidden="true" />
      <div className="glass-orb" style={{ width:360,height:360, background:'radial-gradient(circle,#c2185b,transparent 70%)', bottom:-80,right:-80, '--dur':'10s','--dx':'-70px','--dy':'-50px' }} aria-hidden="true" />
      <div className="glass-orb" style={{ width:260,height:260, background:'radial-gradient(circle,#f48fb1,transparent 70%)', top:'45%',right:'20%', '--dur':'15s','--dx':'40px','--dy':'-80px' }} aria-hidden="true" />

      {/* ── Password ──────────────────────────────────────────── */}
      {stage === 'password' && (
        <div className="glass-modal" role="dialog" aria-modal="true" aria-labelledby="gm-title">
          <div className="glass-modal-card">
            <span className="glass-modal-icon" aria-hidden="true">🔐</span>
            <h2 id="gm-title">Enter the Secret</h2>
            <p>This page is just for you, my love 💕</p>
            <input
              type="password"
              className={`glass-input${shaking ? ' error' : ''}`}
              placeholder="Our special word…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoComplete="current-password"
              aria-label="Secret password"
            />
            <button className="glass-btn-primary" onClick={handleSubmit}>
              Open ✨
            </button>
            <p className="error-text" role="alert" aria-live="polite">{error}</p>
          </div>
        </div>
      )}

      {/* ── Welcome ───────────────────────────────────────────── */}
      {stage === 'welcome' && (
        <div className="glass-welcome" aria-live="polite">
          <h2>Welcome, my love 💖</h2>
          <p>I made this just for you</p>
          <div className="wb" aria-hidden="true">💗 ❤️ 💗</div>
        </div>
      )}

      {/* ── Main ──────────────────────────────────────────────── */}
      {stage === 'main' && (
        <>
          <main className="glass-main" aria-label="Love page content">
            <Link to="/" className="back-link" aria-label="Back to style picker">← All Styles</Link>

            <header className="glass-page-header">
              <h1>For My Love 💖</h1>
              <p>A little corner of the internet, made only for you.</p>
            </header>

            {/* Tab nav */}
            <nav aria-label="Sections" className="glass-tabs" role="tablist">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`glass-tab${tab === t.id ? ' active' : ''}`}
                  role="tab"
                  aria-selected={tab === t.id}
                  aria-controls={`gpanel-${t.id}`}
                  id={`gtab-${t.id}`}
                  onClick={() => setTab(t.id)}
                  onKeyDown={e => {
                    const ids = TABS.map(x => x.id)
                    const i   = ids.indexOf(t.id)
                    if (e.key === 'ArrowRight') setTab(ids[(i+1) % ids.length])
                    if (e.key === 'ArrowLeft')  setTab(ids[(i-1+ids.length) % ids.length])
                  }}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            {/* Content panel */}
            <div className="glass-panel">

              {/* Love Letter */}
              {tab === 'letter' && (
                <section id="gpanel-letter" role="tabpanel" aria-labelledby="gtab-letter" tabIndex={0}>
                  <h2 className="panel-heading">My Dearest</h2>
                  <article
                    className={`glass-letter${letterOpen ? ' open' : ''}`}
                    onClick={() => setLetter(p => !p)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLetter(p => !p) } }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={letterOpen}
                    aria-label="Love letter — click to open"
                  >
                    <header className="glass-letter-head">
                      <h3>A Letter For You 💌</h3>
                      <span className="glass-letter-caret" aria-hidden="true">▼</span>
                    </header>
                    <div className="glass-letter-body">
                      <div className="glass-letter-inner">
                        {letterParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <div className="glass-letter-sig">
                          <p>Forever yours,</p>
                          <p>Me 💕</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </section>
              )}

              {/* Music */}
              {tab === 'music' && (
                <section id="gpanel-music" role="tabpanel" aria-labelledby="gtab-music" tabIndex={0}>
                  <h2 className="panel-heading">Songs That Remind Me of You</h2>
                  <MusicPlayer theme="glass" />
                </section>
              )}

              {/* Notes */}
              {tab === 'notes' && (
                <section id="gpanel-notes" role="tabpanel" aria-labelledby="gtab-notes" tabIndex={0}>
                  <h2 className="panel-heading">Little Reminders 💌</h2>
                  <div className="glass-notes">
                    {NOTES.map((n, i) => (
                      <div key={i} className="glass-note">
                        <span className="glass-note-emoji">{n.emoji}</span>
                        {n.text}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Gallery */}
              {tab === 'gallery' && (
                <section id="gpanel-gallery" role="tabpanel" aria-labelledby="gtab-gallery" tabIndex={0}>
                  <h2 className="panel-heading">You're My L O V E 🌷</h2>
                  <Gallery
                    gridClass="glass-gallery"
                    cellClass="glass-gallery-cell"
                  />
                </section>
              )}

            </div>
          </main>

          <footer className="glass-footer">
            Made with <span>❤️</span> just for you
          </footer>
        </>
      )}
    </div>
  )
}
