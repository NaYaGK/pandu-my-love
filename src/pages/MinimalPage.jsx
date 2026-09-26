import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MusicPlayer   from '../components/MusicPlayer.jsx'
import Gallery        from '../components/Gallery.jsx'
import ScrollSymbols  from '../components/ScrollSymbols.jsx'
import { NOTES, LETTER, checkPassword } from '../data.js'
import '../styles/minimal.css'
import '../styles/player.css'

const TABS = [
  { id: 'letter',  label: '❤️ Letter' },
  { id: 'music',   label: '🎵 Music' },
  { id: 'notes',   label: '📝 Notes' },
  { id: 'gallery', label: '🌷 Gallery' },
]

export default function MinimalPage() {
  const [stage,      setStage]  = useState('password')
  const [input,      setInput]  = useState('')
  const [error,      setError]  = useState('')
  const [shaking,    setShaking]= useState(false)
  const [tab,        setTab]    = useState('letter')
  const [letterOpen, setLetter] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('minimal-theme')
    return () => document.documentElement.classList.remove('minimal-theme')
  }, [])

  const handleSubmit = () => {
    if (checkPassword(input)) {
      setStage('welcome')
      setTimeout(() => setStage('main'), 2600)
    } else {
      setShaking(true)
      setError('Not quite — try again, love.')
      setInput('')
      setTimeout(() => { setShaking(false); setError('') }, 1800)
    }
  }

  const letterParagraphs = LETTER.trim().split('\n\n')

  return (
    <div className="minimal-page">

      {stage === 'main' && (
        <ScrollSymbols colorOverride="saturate(0.3) brightness(1.2)" />
      )}

      {/* ── Password ──────────────────────────────────────────── */}
      {stage === 'password' && (
        <div className="min-modal" role="dialog" aria-modal="true" aria-labelledby="mm-title">
          <div className="min-modal-card">
            <h2 id="mm-title">A Private Page</h2>
            <div className="min-rule" />
            <p>Enter the word that belongs only to us.</p>
            <input
              type="password"
              className={`min-input${shaking ? ' error' : ''}`}
              placeholder="our word…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoComplete="current-password"
              aria-label="Secret password"
            />
            <button className="min-btn" onClick={handleSubmit}>Enter →</button>
            <p className="error-text" role="alert" aria-live="polite">{error}</p>
          </div>
        </div>
      )}

      {/* ── Welcome ───────────────────────────────────────────── */}
      {stage === 'welcome' && (
        <div className="min-welcome" aria-live="polite">
          <h2>Hello, my love.</h2>
          <span>This is yours.</span>
        </div>
      )}

      {/* ── Main ──────────────────────────────────────────────── */}
      {stage === 'main' && (
        <>
          <main className="min-main" aria-label="Love page content">
            <Link to="/" className="min-back" aria-label="Back to style picker">← All Styles</Link>

            <header className="min-header">
              <p className="min-header-eyebrow">A letter, for you</p>
              <h1>For My <em>Love</em></h1>
              <p>A quiet corner of the internet — made only for you.</p>
            </header>

            {/* Tab nav */}
            <nav className="min-tabs" role="tablist" aria-label="Sections">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`min-tab${tab === t.id ? ' active' : ''}`}
                  role="tab"
                  aria-selected={tab === t.id}
                  aria-controls={`mpanel-${t.id}`}
                  id={`mtab-${t.id}`}
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

            <div className="min-panel">

              {/* Love Letter */}
              {tab === 'letter' && (
                <section id="mpanel-letter" role="tabpanel" aria-labelledby="mtab-letter" tabIndex={0}>
                  <h2 className="panel-heading">My Dearest</h2>
                  <article
                    className={`min-letter${letterOpen ? ' open' : ''}`}
                    onClick={() => setLetter(p => !p)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLetter(p => !p) } }}
                    tabIndex={0} role="button"
                    aria-expanded={letterOpen}
                    aria-label="Love letter"
                  >
                    <header className="min-letter-head">
                      <h3>A Letter For You 💌</h3>
                      <span className="min-caret" aria-hidden="true">↓</span>
                    </header>
                    <div className="min-letter-body">
                      <div className="min-letter-inner">
                        {letterParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <div className="min-letter-sig">
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
                <section id="mpanel-music" role="tabpanel" aria-labelledby="mtab-music" tabIndex={0}>
                  <h2 className="panel-heading">Our Songs</h2>
                  <MusicPlayer theme="minimal" />
                </section>
              )}

              {/* Notes */}
              {tab === 'notes' && (
                <section id="mpanel-notes" role="tabpanel" aria-labelledby="mtab-notes" tabIndex={0}>
                  <h2 className="panel-heading">Little Reminders</h2>
                  <div className="min-notes">
                    {NOTES.map((n, i) => (
                      <div key={i} className="min-note">
                        <span className="min-note-emoji">{n.emoji}</span>
                        <p>{n.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Gallery */}
              {tab === 'gallery' && (
                <section id="mpanel-gallery" role="tabpanel" aria-labelledby="mtab-gallery" tabIndex={0}>
                  <h2 className="panel-heading">Moments</h2>
                  <Gallery
                    gridClass="min-gallery"
                    cellClass="min-gallery-cell"
                  />
                </section>
              )}

            </div>
          </main>

          <footer className="min-footer">
            Made with <span>love</span> — just for you
          </footer>
        </>
      )}
    </div>
  )
}
