import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const PUZZLE_N = 3;
const PUZZLE_VIEW = 840;
const PUZZLE_CELL = 160;
const PUZZLE_TAB = 30;
const PUZZLE_AREA = PUZZLE_CELL * PUZZLE_N;
const PUZZLE_OFFSET = (PUZZLE_VIEW - PUZZLE_AREA) / 2;
const SNAP_DIST = 36;

function jigsawPath(edges) {
  const s = PUZZLE_CELL;
  const t = PUZZLE_TAB;
  let d = `M 0 0 `;

  d += `L ${s * 0.35} 0 `;
  if (edges.top !== 0) {
    const sign = -edges.top;
    d += `C ${s * 0.30} ${t * sign * 0.6}, ${s * 0.25} ${t * sign * 1.4}, ${s * 0.4} ${t * sign * 1.4} `;
    d += `C ${s * 0.45} ${t * sign * 1.5}, ${s * 0.55} ${t * sign * 1.5}, ${s * 0.6} ${t * sign * 1.4} `;
    d += `C ${s * 0.75} ${t * sign * 1.4}, ${s * 0.70} ${t * sign * 0.6}, ${s * 0.65} 0 `;
  } else {
    d += `L ${s * 0.65} 0 `;
  }
  d += `L ${s} 0 `;

  d += `L ${s} ${s * 0.35} `;
  if (edges.right !== 0) {
    const sign = edges.right;
    d += `C ${s + t * sign * 0.6} ${s * 0.30}, ${s + t * sign * 1.4} ${s * 0.25}, ${s + t * sign * 1.4} ${s * 0.4} `;
    d += `C ${s + t * sign * 1.5} ${s * 0.45}, ${s + t * sign * 1.5} ${s * 0.55}, ${s + t * sign * 1.4} ${s * 0.6} `;
    d += `C ${s + t * sign * 1.4} ${s * 0.75}, ${s + t * sign * 0.6} ${s * 0.70}, ${s} ${s * 0.65} `;
  } else {
    d += `L ${s} ${s * 0.65} `;
  }
  d += `L ${s} ${s} `;

  d += `L ${s * 0.65} ${s} `;
  if (edges.bottom !== 0) {
    const sign = edges.bottom;
    d += `C ${s * 0.70} ${s + t * sign * 0.6}, ${s * 0.75} ${s + t * sign * 1.4}, ${s * 0.6} ${s + t * sign * 1.4} `;
    d += `C ${s * 0.55} ${s + t * sign * 1.5}, ${s * 0.45} ${s + t * sign * 1.5}, ${s * 0.4} ${s + t * sign * 1.4} `;
    d += `C ${s * 0.25} ${s + t * sign * 1.4}, ${s * 0.30} ${s + t * sign * 0.6}, ${s * 0.35} ${s} `;
  } else {
    d += `L ${s * 0.35} ${s} `;
  }
  d += `L 0 ${s} `;

  d += `L 0 ${s * 0.65} `;
  if (edges.left !== 0) {
    const sign = -edges.left;
    d += `C ${t * sign * 0.6} ${s * 0.70}, ${t * sign * 1.4} ${s * 0.75}, ${t * sign * 1.4} ${s * 0.6} `;
    d += `C ${t * sign * 1.5} ${s * 0.55}, ${t * sign * 1.5} ${s * 0.45}, ${t * sign * 1.4} ${s * 0.4} `;
    d += `C ${t * sign * 1.4} ${s * 0.25}, ${t * sign * 0.6} ${s * 0.30}, 0 ${s * 0.35} `;
  } else {
    d += `L 0 ${s * 0.35} `;
  }
  d += `Z`;
  return d;
}

export default function PhotoPuzzle() {
  const svgRef = useRef(null);
  const [solvedCount, setSolvedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const puzzleImageUrl =
    'https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/main/pandu/IMG_9779.jpg';

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    svg.innerHTML = '';

    let puzzlePieces = [];
    let dragPiece = null;
    let dragOffset = { x: 0, y: 0 };
    const slotElements = {};

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = puzzleImageUrl;
    img.onload = () => buildPuzzle(img);

    function buildPuzzle(img) {
      const puzzleEdges = [];
      for (let r = 0; r < PUZZLE_N; r++) {
        puzzleEdges[r] = [];
        for (let c = 0; c < PUZZLE_N; c++) {
          const top = r === 0 ? 0 : -puzzleEdges[r - 1][c].bottom;
          const left = c === 0 ? 0 : -puzzleEdges[r][c - 1].right;
          const right = c === PUZZLE_N - 1 ? 0 : (Math.random() < 0.5 ? 1 : -1);
          const bottom = r === PUZZLE_N - 1 ? 0 : (Math.random() < 0.5 ? 1 : -1);
          puzzleEdges[r][c] = { top, right, bottom, left };
        }
      }

      const NS = 'http://www.w3.org/2000/svg';
      const defs = document.createElementNS(NS, 'defs');

      for (let r = 0; r < PUZZLE_N; r++) {
        for (let c = 0; c < PUZZLE_N; c++) {
          const pid = `p${r}${c}`;
          const pattern = document.createElementNS(NS, 'pattern');
          pattern.setAttribute('id', `pat-${pid}`);
          pattern.setAttribute('patternUnits', 'userSpaceOnUse');
          pattern.setAttribute('x', `-${c * PUZZLE_CELL}`);
          pattern.setAttribute('y', `-${r * PUZZLE_CELL}`);
          pattern.setAttribute('width', `${PUZZLE_AREA}`);
          pattern.setAttribute('height', `${PUZZLE_AREA}`);

          const im = document.createElementNS(NS, 'image');
          im.setAttribute('href', img.src);
          im.setAttribute('x', '0');
          im.setAttribute('y', '0');
          im.setAttribute('width', `${PUZZLE_AREA}`);
          im.setAttribute('height', `${PUZZLE_AREA}`);
          im.setAttribute('preserveAspectRatio', 'xMidYMid slice');
          pattern.appendChild(im);
          defs.appendChild(pattern);
        }
      }
      svg.appendChild(defs);

      // Ghost slot outlines — stored by key so we can hide on snap
      for (let r = 0; r < PUZZLE_N; r++) {
        for (let c = 0; c < PUZZLE_N; c++) {
          const slot = document.createElementNS(NS, 'path');
          slot.setAttribute('d', jigsawPath(puzzleEdges[r][c]));
          slot.setAttribute('fill', 'rgba(255,255,255,0.05)');
          slot.setAttribute('stroke', 'rgba(236,72,153,0.25)');
          slot.setAttribute('stroke-width', '2');
          slot.setAttribute('transform',
            `translate(${PUZZLE_OFFSET + c * PUZZLE_CELL}, ${PUZZLE_OFFSET + r * PUZZLE_CELL})`);
          slotElements[`${r}_${c}`] = slot;
          svg.appendChild(slot);
        }
      }

      // Scatter positions around the puzzle grid
      const margin = 8;
      const slots = [];
      for (let i = 0; i < 3; i++) slots.push({ x: margin, y: PUZZLE_OFFSET + i * PUZZLE_CELL });
      for (let i = 0; i < 3; i++) slots.push({ x: PUZZLE_OFFSET + PUZZLE_AREA + 12, y: PUZZLE_OFFSET + i * PUZZLE_CELL });
      for (let i = 0; i < 2; i++) slots.push({ x: PUZZLE_OFFSET + 30 + i * 180, y: margin });
      for (let i = 0; i < 2; i++) slots.push({ x: PUZZLE_OFFSET + 30 + i * 180, y: PUZZLE_OFFSET + PUZZLE_AREA + margin });

      // Shuffle scatter slots
      for (let i = slots.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [slots[i], slots[j]] = [slots[j], slots[i]];
      }

      // Shuffle piece order
      const orderedRC = [];
      for (let r = 0; r < PUZZLE_N; r++)
        for (let c = 0; c < PUZZLE_N; c++)
          orderedRC.push({ r, c });
      for (let i = orderedRC.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [orderedRC[i], orderedRC[j]] = [orderedRC[j], orderedRC[i]];
      }

      orderedRC.forEach(({ r, c }, idx) => {
        const correctX = PUZZLE_OFFSET + c * PUZZLE_CELL;
        const correctY = PUZZLE_OFFSET + r * PUZZLE_CELL;
        const start = slots[idx % slots.length];

        const g = document.createElementNS(NS, 'g');
        g.setAttribute('transform', `translate(${start.x}, ${start.y})`);
        g.style.cursor = 'grab';
        g.style.touchAction = 'none';

        const fill = document.createElementNS(NS, 'path');
        fill.setAttribute('d', jigsawPath(puzzleEdges[r][c]));
        fill.setAttribute('fill', `url(#pat-p${r}${c})`);
        fill.style.filter = 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))';
        g.appendChild(fill);

        const stroke = document.createElementNS(NS, 'path');
        stroke.setAttribute('d', jigsawPath(puzzleEdges[r][c]));
        stroke.setAttribute('fill', 'none');
        stroke.setAttribute('stroke', 'rgba(255,255,255,0.4)');
        stroke.setAttribute('stroke-width', '1.5');
        g.appendChild(stroke);

        g.addEventListener('pointerdown', (e) => startDrag(e, g));
        svg.appendChild(g);

        puzzlePieces.push({
          row: r, col: c,
          x: start.x, y: start.y,
          correctX, correctY,
          placed: false,
          el: g,
        });
      });
    }

    function svgPoint(clientX, clientY) {
      const rect = svg.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * PUZZLE_VIEW,
        y: ((clientY - rect.top) / rect.height) * PUZZLE_VIEW,
      };
    }

    function startDrag(e, g) {
      const piece = puzzlePieces.find(p => p.el === g);
      if (!piece || piece.placed) return;
      e.preventDefault();
      g.setPointerCapture(e.pointerId);

      const pt = svgPoint(e.clientX, e.clientY);
      dragPiece = { piece, pointerId: e.pointerId };
      dragOffset.x = pt.x - piece.x;
      dragOffset.y = pt.y - piece.y;

      g.style.cursor = 'grabbing';
      svg.appendChild(g); // bring to front
    }

    function moveDrag(e) {
      if (!dragPiece || dragPiece.pointerId !== e.pointerId) return;
      e.preventDefault();
      const pt = svgPoint(e.clientX, e.clientY);
      const { piece } = dragPiece;
      piece.x = pt.x - dragOffset.x;
      piece.y = pt.y - dragOffset.y;
      piece.el.setAttribute('transform', `translate(${piece.x}, ${piece.y})`);
    }

    function endDrag(e) {
      if (!dragPiece || dragPiece.pointerId !== e.pointerId) return;
      const { piece } = dragPiece;

      if (piece.el.hasPointerCapture(e.pointerId)) {
        piece.el.releasePointerCapture(e.pointerId);
      }

      const dist = Math.hypot(piece.x - piece.correctX, piece.y - piece.correctY);

      if (dist < SNAP_DIST) {
        piece.x = piece.correctX;
        piece.y = piece.correctY;
        piece.el.setAttribute('transform', `translate(${piece.x}, ${piece.y})`);

        if (!piece.placed) {
          piece.placed = true;

          // Hide ghost slot — the dark hole disappears
          const slotEl = slotElements[`${piece.row}_${piece.col}`];
          if (slotEl) slotEl.style.display = 'none';

          // Dead to pointer events — can't pick up a placed piece
          piece.el.style.cursor = 'default';
          piece.el.style.pointerEvents = 'none';

          // Remove white border stroke
          const strokePath = piece.el.querySelector('path:nth-child(2)');
          if (strokePath) strokePath.setAttribute('stroke', 'transparent');

          // Pink snap glow, fades out
          const fillPath = piece.el.querySelector('path:nth-child(1)');
          if (fillPath) {
            fillPath.style.filter = 'drop-shadow(0 0 10px rgba(236,72,153,1))';
            setTimeout(() => {
              fillPath.style.transition = 'filter 0.7s ease';
              fillPath.style.filter = 'none';
            }, 50);
          }

          const solved = puzzlePieces.filter(p => p.placed).length;
          setSolvedCount(solved);
          if (solved >= PUZZLE_N * PUZZLE_N) setIsCompleted(true);
        }
      } else {
        piece.el.style.cursor = 'grab';
      }

      dragPiece = null;
    }

    const ac = new AbortController();
    window.addEventListener('pointermove', moveDrag, { passive: false, signal: ac.signal });
    window.addEventListener('pointerup', endDrag, { signal: ac.signal });
    window.addEventListener('pointercancel', endDrag, { signal: ac.signal });

    return () => ac.abort();
  }, []);

  return (
    <section className="w-full flex flex-col items-center mt-12 mb-24 relative z-20 px-4">
      <div className="w-full max-w-3xl bg-black/40 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-6 md:p-10 shadow-[0_0_40px_rgba(236,72,153,0.15)] flex flex-col items-center">
        <h2 className="font-dancing text-4xl md:text-5xl text-pink-400 mb-2">Our pic</h2>

        <motion.p
          key={isCompleted ? 'done' : 'playing'}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-pink-100/80 font-montserrat text-sm md:text-base mb-8 text-center max-w-md h-6"
        >
          {isCompleted ? 'You complete me! ❤️' : 'Drag the pieces to complete the picture.'}
        </motion.p>

        <div className="w-full max-w-[600px] aspect-square relative touch-none bg-black/60 rounded-2xl overflow-hidden border-2 border-pink-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)_inset]">
          <svg
            ref={svgRef}
            className="w-full h-full"
            viewBox={`0 0 ${PUZZLE_VIEW} ${PUZZLE_VIEW}`}
            preserveAspectRatio="xMidYMid meet"
          />
        </div>

        <div className="mt-8 px-6 py-2 bg-pink-950/40 border border-pink-500/20 rounded-full text-pink-300 font-montserrat tracking-widest text-sm">
          {solvedCount} / {PUZZLE_N * PUZZLE_N} PLACED
        </div>
      </div>
    </section>
  );
}