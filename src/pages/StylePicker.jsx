import { Link } from 'react-router-dom'

const themes = [
  {
    key:     'glass',
    label:   'Glass',
    emoji:   '✨',
    desc:    'Frosted glassmorphism with animated rose gradient orbs',
    preview: 'linear-gradient(135deg, rgba(255,182,193,0.7), rgba(255,20,147,0.4))',
    bg:      'rgba(255,255,255,0.85)',
    color:   '#5d0e2e',
  },
  {
    key:     'minimal',
    label:   'Minimal',
    emoji:   '🌿',
    desc:    'Editorial ink-on-vellum with Playfair typography',
    preview: '#fafafa',
    bg:      '#ffffff',
    color:   '#1a1a1a',
  },
  {
    key:     'dark',
    label:   'Dark',
    emoji:   '🌙',
    desc:    'Cinematic deep burgundy with gold & neon-rose glow',
    preview: 'linear-gradient(135deg, #1a0010, #3d0020)',
    bg:      '#0d0008',
    color:   '#f8d7e3',
  },
]

export default function StylePicker() {
  return (
    <main className="style-picker">
      <h1>Choose Your Style 💖</h1>
      <p>Three ways to say "I love you"</p>

      <div className="style-cards">
        {themes.map(t => (
          <Link
            key={t.key}
            to={`/${t.key}`}
            className={`style-card ${t.key}`}
            aria-label={`Open ${t.label} theme`}
          >
            <div
              className="style-card-preview"
              style={{ background: t.preview }}
            >
              <span style={{ fontSize: 52 }}>{t.emoji}</span>
            </div>
            <div
              className="style-card-info"
              style={{ background: t.bg, color: t.color }}
            >
              <h3>{t.label}</h3>
              <p>{t.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
