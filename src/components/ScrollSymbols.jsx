/**
 * ScrollSymbols — GSAP ScrollTrigger background love symbols.
 *
 * How it works:
 *  • On mount we create N symbol nodes and scatter them across the viewport.
 *  • A GSAP ScrollTrigger watches the page scroll position (0 → max).
 *  • As scroll advances, symbols fade in / drift upward / rotate in waves.
 *  • On scroll reversal they fade back out cleanly.
 *  • willChange: transform + opacity keeps it GPU-composited.
 *  • Reduced-motion media query disables all animations.
 */

import { useEffect, useRef } from 'react'
import { gsap }              from 'gsap'
import { ScrollTrigger }     from 'gsap/ScrollTrigger'
import { LOVE_SYMBOLS }      from '../data.js'

gsap.registerPlugin(ScrollTrigger)

const SYMBOL_COUNT = 22   // total floating symbols
const WAVE_SIZE    = 5    // symbols per scroll-wave

export default function ScrollSymbols({ colorOverride }) {
  const canvasRef  = useRef(null)
  const symbolsRef = useRef([])
  const tlsRef     = useRef([])

  useEffect(() => {
    /* Respect reduced-motion preference */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas  = canvasRef.current
    const symbols = []

    /* ── Create DOM nodes ────────────────────────────────────── */
    for (let i = 0; i < SYMBOL_COUNT; i++) {
      const el        = document.createElement('span')
      el.textContent  = LOVE_SYMBOLS[i % LOVE_SYMBOLS.length]
      el.className    = 'scroll-symbol'
      el.setAttribute('aria-hidden', 'true')

      /* Random horizontal position + size variation */
      const size = 16 + Math.random() * 26
      el.style.cssText = `
        left:      ${4 + Math.random() * 88}%;
        top:       ${5 + Math.random() * 85}%;
        font-size: ${size}px;
        opacity:   0;
      `
      if (colorOverride) el.style.filter = colorOverride
      canvas.appendChild(el)
      symbols.push(el)
    }
    symbolsRef.current = symbols

    /* ── Batch into waves triggered at scroll intervals ──────── */
    const totalScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight

    const waves = Math.ceil(SYMBOL_COUNT / WAVE_SIZE)
    const tls   = []

    for (let w = 0; w < waves; w++) {
      const batch  = symbols.slice(w * WAVE_SIZE, (w + 1) * WAVE_SIZE)
      const startPct = (w / waves) * 85          // % through page scroll
      const endPct   = Math.min(startPct + 28, 100)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:    document.documentElement,
          start:      `${startPct}% top`,
          end:        `${endPct}% top`,
          scrub:      1.4,
          toggleActions: 'play reverse play reverse',
        }
      })

      batch.forEach((el, j) => {
        const delay  = j * 0.12
        const driftY = -(30 + Math.random() * 55)
        const driftX = (Math.random() - 0.5) * 40
        const rot    = (Math.random() - 0.5) * 30

        tl.fromTo(
          el,
          { opacity: 0, y: 0, x: 0, rotation: 0, scale: 0.6 },
          {
            opacity:  0.22 + Math.random() * 0.25,
            y:        driftY,
            x:        driftX,
            rotation: rot,
            scale:    0.85 + Math.random() * 0.35,
            duration: 1,
            ease:     'power2.out',
            delay,
          },
          0
        )
        /* Fade out on exit */
        tl.to(el, { opacity: 0, duration: 0.4, ease: 'power1.in' }, '>')
      })
      tls.push(tl)
    }

    /* ── Ambient idle pulse on random symbols ────────────────── */
    const idleSymbols = symbols.filter((_, i) => i % 3 === 0)
    idleSymbols.forEach((el) => {
      gsap.to(el, {
        scale:    '+=0.12',
        duration: 1.6 + Math.random() * 1.2,
        yoyo:     true,
        repeat:   -1,
        ease:     'sine.inOut',
        delay:    Math.random() * 2,
      })
    })

    tlsRef.current = tls

    return () => {
      /* Cleanup */
      tls.forEach(tl => tl.kill())
      ScrollTrigger.getAll().forEach(st => st.kill())
      symbols.forEach(el => el.remove())
    }
  }, [colorOverride])

  return (
    <div
      ref={canvasRef}
      className="scroll-canvas"
      aria-hidden="true"
    />
  )
}
