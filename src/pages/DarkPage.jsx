import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MusicPlayer  from '../components/MusicPlayer.jsx'
import Gallery       from '../components/Gallery.jsx'
import ScrollSymbols from '../components/ScrollSymbols.jsx'
import { NOTES, LETTER, checkPassword } from '../data.js'
import '../styles/dark.css'
import '../styles/player.css'

const TABS = [
  { id: 'letter',  label: '❤️ Letter' },
  { id: 'music',   label: '🎵 Music' },
  { id: 'notes',   label: '📝 Notes' },
  { id: 'gallery', label: '🌷 Gallery' },
]

export default function DarkPage() {
  const [stage,      setStage]  = useState('password')
  const [input,      setInput]  = useState('')
  const [error,      setError]  = useState('')
  const [shaking,    setShaking]= useState(false)
  const [tab,        setTab]    = useState('letter')
  const [letterOpen, setLetter] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('dark-theme')
    return () => document.documentElement.classList.remove('dark-theme')
  }, [])

  const handleSubmit = () => {
    if (checkPassword(input)) {
      setStage('welcome')
      setTimeout(() => setStage('main'), 2800)
    } else {
      setShaking(true)
      setError('That\'s not it, my love… 🖤')
      setInput('')
      setTimeout(() => { setShaking(false); setError('') }, 1800)
    }
  }

  const letterParagraphs = LETTER.trim().split('\n\n')

  return (
    <div className="dark-page">

      {stage === 'main' && (
        <ScrollSymbols colorOverride="brightness(0.55) sepia(0.4)" />
      )}

      {/* ── Password ──────────────────────────────────────────── */}
      {stage === 'password' && (
        <div className="dark-modal" role="dialog" aria-modal="true" aria-labelledby="dm-title">
          <div className="dark-modal-card">
            <span className="dark-modal-icon" aria-hidden="true">🖤</span>
            <h2 id="dm-title">A Secret Space</h2>
            <p>Only you know the way in.</p>
            <input
              type="password"
              className={`dark-input${shaking ? ' error' : ''}`}
              placeholder="enter the secret…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoComplete="current-password"
              aria-label="Secret password"
            />
            <button className="dark-btn" onClick={handleSubmit}>Enter ✦</button>
            <p className="error-text" role="alert" aria-live="polite">{error}</p>
          </div>
        </div>
      )}

      {/* ── Welcome ───────────────────────────────────────────── */}
      {stage === 'welcome' && (
        <div className="dark-welcome" aria-live="polite">
          <h2>Welcome, my love 💖</h2>
          <p>You found your way in.</p>
          <div className="wb" aria-hidden="true">❤️ 🖤 ❤️</div>
        </div>
      )}

      {/* ── Main ──────────────────────────────────────────────── */}
      {stage === 'main' && (
        <>
          <main className="dark-main" aria-label="Love page content">
            <Link to="/" className="dark-back" aria-label="Back to style picker">← All Styles</Link>

            <header className="dark-header">
              <h1>For My Love 💖</h1>
              <p>A hidden corner of the universe — made only for you.</p>
            </header>

            {/* Tab nav */}
            <nav className="dark-tabs" role="tablist" aria-label="Sections">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`dark-tab${tab === t.id ? ' active' : ''}`}
                  role="tab"
                  aria-selected={tab === t.id}
                  aria-controls={`dpanel-${t.id}`}
                  id={`dtab-${t.id}`}
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

            <div className="dark-panel">

              {/* Love Letter */}
              {tab === 'letter' && (
                <section id="dpanel-letter" role="tabpanel" aria-labelledby="dtab-letter" tabIndex={0}>
                  <h2 className="panel-heading">My Dearest</h2>
                  <article
                    className={`dark-letter${letterOpen ? ' open' : ''}`}
                    onClick={() => setLetter(p => !p)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLetter(p => !p) } }}
                    tabIndex={0} role="button"
                    aria-expanded={letterOpen}
                    aria-label="Love letter"
                  >
                    <header className="dark-letter-head">
                      <h3>A Letter For You 💌</h3>
                      <span className="dark-caret" aria-hidden="true">▼</span>
                    </header>
                    <div className="dark-letter-body">
                      <div className="dark-letter-inner">
                        {letterParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <div className="dark-letter-sig">
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
                <section id="dpanel-music" role="tabpanel" aria-labelledby="dtab-music" tabIndex={0}>
                  <h2 className="panel-heading">Songs That Remind Me of You</h2>
                  <MusicPlayer theme="dark" />
                </section>
              )}

              {/* Notes */}
              {tab === 'notes' && (
                <section id="dpanel-notes" role="tabpanel" aria-labelledby="dtab-notes" tabIndex={0}>
                  <h2 className="panel-heading">Little Reminders</h2>
                  <div className="dark-notes">
                    {NOTES.map((n, i) => (
                      <div key={i} className="dark-note">
                        <span className="dark-note-emoji">{n.emoji}</span>
                        {n.text}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Gallery */}
              {tab === 'gallery' && (
                <section id="dpanel-gallery" role="tabpanel" aria-labelledby="dtab-gallery" tabIndex={0}>
                  <h2 className="panel-heading">You Are My Love 🌷</h2>
                  <Gallery
                    gridClass="dark-gallery"
                    cellClass="dark-gallery-cell"
                  />
                </section>
              )}

            </div>
          </main>

          <footer className="dark-footer">
            Made with <span>❤️</span> just for you
          </footer>
        </>
      )}
    </div>
  )
}
