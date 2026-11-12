import { useState, useEffect, useCallback, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Sample pages from Wilted Promises (line breaks kept as in the book) */
/* ------------------------------------------------------------------ */

const Verse = ({ children, align = "center", style }) => (
  <p className="br-verse" style={{ textAlign: align, ...style }}>{children}</p>
);

const SAMPLE_PAGES = [
  {
    num: 4,
    content: (
      <div className="br-chapter">
        <p className="br-chapter-title">Chapter I</p>
        <p className="br-chapter-sub">Bittersweet, all of you.</p>
        <div className="br-chapter-orn">✦</div>
      </div>
    ),
  },
  {
    num: 5,
    content: (
      <Verse>
        {"I believe "}<em>love</em>{"\ndoesn’t begin with words.\nIt rather begins with a look,\nthat feels like remembering something\nYou’ve never lived before."}
      </Verse>
    ),
  },
  {
    num: 7,
    scale: 0.92,
    content: (
      <div>
        <p className="br-poem-title">Let me</p>
        <div className="br-split">
          <span>Let me</span><span>hold you.</span>
          <span>Let your worries</span><span>sink into me,</span>
        </div>
        <Verse>
          {"let me fight your demons like I've gone mad,\nfor in loving you, I am drunk with madness.\nLet me love you recklessly, endlessly, without doubt\nas if the universe carved your name into my bones,\nLet me be your shelter when the world turns cold,\nthe hands that catch you when you fall,\nthe quiet voice that soothes your storms.\nLet me love you without reason.\nWithout a question.\nWithout doubt.\nLet me."}
        </Verse>
      </div>
    ),
  },
  {
    num: 8,
    content: (
      <div>
        <Verse align="left">
          {"I’m not like everyone else,\nwhen I love you,\na revolution begins in my body,\nmy blood turns into ink,\nmy ribs into pages,\nmy heart will turn into an ocean,"}
        </Verse>
        <Verse align="right" style={{ marginTop: "1.6em", paddingRight: "8%" }}>
          <span style={{ display: "inline-block", textAlign: "center" }}>{"drowning\nyou\nwith\nwords."}</span>
        </Verse>
      </div>
    ),
  },
  {
    num: 12,
    content: (
      <div>
        <Verse align="left">
          {"I can read those eyes of yours,\npretty fluently,\nas if I'm holding a book,\nwritten for me only."}
        </Verse>
        <Verse align="left" style={{ marginTop: "1.2em" }}>{"And I can always read that one line;"}</Verse>
        <Verse align="left" style={{ marginTop: "1.2em", fontStyle: "italic" }}>
          {"‘Come closer, and I will love you until ruin.’"}
        </Verse>
      </div>
    ),
  },
  {
    num: 14,
    scale: 0.86,
    content: (
      <div>
        <Verse align="left">{"Take my heart\nmake it a pillow...\nand sleep fondly,\nso I can guard you,\nfrom everything this world has ruined in you."}</Verse>
        <Verse align="left" style={{ marginTop: "1em" }}>{"Let your fears spill into me,\nlet your breathing mend in my chest,\nI will stitch your broken dreams\nwith the threads of relentless love."}</Verse>
        <Verse align="left" style={{ marginTop: "1em" }}>{"I will dry your tears,\nwith a tender hand\nand lift the world\nif I felt it collapsing on top of you."}</Verse>
        <Verse align="left" style={{ marginTop: "1em" }}>{"Because you, my love,\neven in your ruin\nare the only thing in this world\nstill worth saving."}</Verse>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */

function useBookSize() {
  const calc = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const spread = vw >= 820;
    const byHeight = (vh - 170) / 1.45;
    const pageW = spread
      ? Math.floor(Math.min(400, (vw - 120) / 2, byHeight))
      : Math.floor(Math.min(380, vw - 48, byHeight));
    return { spread, pageW, pageH: Math.round(pageW * 1.45) };
  };
  const [size, setSize] = useState(calc);
  useEffect(() => {
    const onResize = () => setSize(calc());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}

export default function BookReader({ coverSrc, title = "Wilted Promises", author = "bleedinginsilence", buyLink, onClose }) {
  const { spread, pageW, pageH } = useBookSize();
  const [pos, setPos] = useState(0);          // number of leaves turned
  const [moving, setMoving] = useState(null); // leaf currently turning (kept on top)
  const touchX = useRef(null);

  // spread: cover + 3 poem leaves + final leaf; phone: one page per leaf
  const maxPos = spread ? 4 : SAMPLE_PAGES.length + 2;

  const posRef = useRef(0);
  const movingTimer = useRef(null);

  const goTo = useCallback((target) => {
    const cur = posRef.current;
    const nextPos = Math.max(0, Math.min(maxPos, target));
    if (nextPos === cur) return;
    posRef.current = nextPos;
    setMoving(nextPos > cur ? cur : nextPos);
    window.clearTimeout(movingTimer.current);
    movingTimer.current = window.setTimeout(() => setMoving(null), 900);
    setPos(nextPos);
  }, [maxPos]);

  const next = useCallback(() => goTo(posRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(posRef.current - 1), [goTo]);

  /* ---------- page faces ---------- */
  const Cover = (
    <div className="br-face br-cover">
      <img src={coverSrc} alt={`${title} book cover`} draggable="false" />
    </div>
  );

  const TitlePage = (
    <div className="br-face br-paper">
      <div className="br-titlepage">
        <p className="br-tp-title">{title}</p>
        <div className="br-chapter-orn">✦</div>
        <p className="br-tp-author">BleedingInSilence</p>
        <p className="br-tp-note">a sample of six pages</p>
      </div>
    </div>
  );

  const poemFace = (p) => (
    <div className="br-face br-paper">
      <div className="br-page-inner" style={{ fontSize: `${pageW * 0.04 * (p.scale || 1)}px` }}>
        {p.content}
      </div>
      <span className="br-pagenum">{p.num}</span>
    </div>
  );

  const CtaPage = (
    <div className="br-face br-paper">
      <div className="br-cta">
        <p className="br-cta-label">the sample ends here</p>
        <p className="br-cta-title">130 more poems are waiting.</p>
        <div className="br-chapter-orn">✦</div>
        <a
          className="br-cta-btn"
          href={buyLink || "https://getbook.to/wiltedpromises"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Order the Book
        </a>
        <button
          className="br-cta-link"
          onClick={(e) => { e.stopPropagation(); goTo(0); }}
        >
          ← back to the cover
        </button>
      </div>
    </div>
  );

  const BackCover = (
    <div className="br-face br-backcover">
      <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: `${pageW * 0.08}px`, color: "rgba(200,160,128,0.7)" }}>{author}</p>
    </div>
  );

  /* ---------- leaves (front / back) ---------- */
  const pages = SAMPLE_PAGES.map(poemFace);
  let leaves;
  if (spread) {
    // two-page spreads: each leaf's back is the next left-hand page
    leaves = [
      { front: Cover, back: TitlePage },
      { front: pages[0], back: pages[1] },
      { front: pages[2], back: pages[3] },
      { front: pages[4], back: pages[5] },
      { front: CtaPage, back: BackCover },
    ];
  } else {
    leaves = [Cover, TitlePage, ...pages, CtaPage].map((front) => ({ front, back: <div className="br-face br-paper-back" /> }));
  }


  // open the cover shortly after the reader appears
  useEffect(() => {
    const t = setTimeout(() => goTo(1), 450);
    return () => clearTimeout(t);
  }, [goTo]);

  // keep position valid when switching between phone and desktop layouts
  useEffect(() => {
    if (posRef.current > maxPos) { posRef.current = maxPos; setPos(maxPos); }
  }, [maxPos]);

  // lock page scroll + keyboard
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [next, prev, onClose]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  // centre the closed book on desktop
  const shift = spread && pos === 0 ? -pageW / 2 : 0;
  const bookW = spread ? pageW * 2 : pageW;
  const n = leaves.length;

  const label = pos === 0 ? "cover" : `${pos} / ${maxPos}`;

  return (
    <div className="br-overlay" role="dialog" aria-modal="true" aria-label={`${title} — sample pages`} onClick={onClose}>
      <style>{READER_CSS}</style>

      <button className="br-close" onClick={onClose} aria-label="Close sample">✕</button>

      <div
        className="br-stage"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="br-book"
          style={{ width: bookW, height: pageH, transform: `translateX(${shift}px)` }}
        >
          {leaves.map((leaf, i) => {
            const turned = i < pos;
            const z = moving === i ? n + 5 : turned ? i + 1 : n - i;
            return (
              <div
                key={i}
                className={`br-leaf${turned ? " is-turned" : ""}${!spread && turned ? " is-gone" : ""}`}
                style={{ left: spread ? pageW : 0, width: pageW, height: pageH, zIndex: z }}
              >
                <div className="br-side br-front" onClick={() => (turned ? prev() : next())}>{leaf.front}</div>
                <div className="br-side br-back" onClick={() => prev()}>{leaf.back}</div>
              </div>
            );
          })}
          {spread && pos > 0 && <div className="br-gutter" style={{ left: pageW - 14, height: pageH }} />}
        </div>
      </div>

      <div className="br-controls" onClick={(e) => e.stopPropagation()}>
        <button className="br-nav" onClick={prev} disabled={pos === 0} aria-label="Previous page">←</button>
        <span className="br-count">{label}</span>
        <button className="br-nav" onClick={next} disabled={pos === maxPos} aria-label="Next page">→</button>
      </div>
    </div>
  );
}

const READER_CSS = `
.br-overlay {
  position: fixed; inset: 0; z-index: 2000;
  background: radial-gradient(ellipse at center, rgba(40,8,18,0.92) 0%, rgba(5,3,5,0.97) 70%);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 28px;
  animation: brFade 0.4s ease;
}
@keyframes brFade { from { opacity: 0; } to { opacity: 1; } }

.br-close {
  position: absolute; top: 18px; right: 22px;
  background: none; border: 1px solid rgba(160,120,50,0.35); color: #c8a080;
  width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 14px;
  transition: border-color 0.3s, color 0.3s;
}
.br-close:hover { border-color: rgba(160,120,50,0.9); color: #ede5d8; }

.br-stage { perspective: 2400px; }
.br-book {
  position: relative;
  transition: transform 0.9s cubic-bezier(.645,.045,.355,1);
  transform-style: preserve-3d;
}

.br-leaf {
  position: absolute; top: 0;
  transform-origin: left center;
  transform-style: preserve-3d;
  transition: transform 0.9s cubic-bezier(.645,.045,.355,1), opacity 0.5s ease 0.45s;
}
.br-leaf.is-turned { transform: rotateY(-180deg); }
.br-leaf.is-gone { opacity: 0; pointer-events: none; }

.br-side {
  position: absolute; inset: 0;
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
  cursor: pointer;
}
.br-back { transform: rotateY(180deg); }

.br-face { width: 100%; height: 100%; position: relative; overflow: hidden; }

.br-cover { border-radius: 0 3px 3px 0; box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 50px rgba(107,26,46,0.25); background: #1a0810; }
.br-cover img { width: 100%; height: 100%; object-fit: cover; display: block; user-select: none; }
.br-cover::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: 0; width: 14px;
  background: linear-gradient(90deg, rgba(0,0,0,0.55), rgba(255,255,255,0.06) 60%, transparent);
}

.br-paper {
  background:
    radial-gradient(ellipse at 50% 40%, rgba(255,250,240,0.55), transparent 70%),
    linear-gradient(180deg, #f3ebdc 0%, #ece1cd 100%);
  color: #2a1d16;
  box-shadow: inset 0 0 40px rgba(120,80,40,0.12), 0 20px 50px rgba(0,0,0,0.6);
}
.br-front .br-paper { border-radius: 0 3px 3px 0; }
.br-back .br-paper { border-radius: 3px 0 0 3px; }
/* soft shading toward the spine */
.br-front .br-paper::before, .br-back .br-paper::before {
  content: ''; position: absolute; top: 0; bottom: 0; width: 30px; pointer-events: none;
}
.br-front .br-paper::before { left: 0; background: linear-gradient(90deg, rgba(90,60,30,0.18), transparent); }
.br-back .br-paper::before { right: 0; background: linear-gradient(270deg, rgba(90,60,30,0.18), transparent); }

.br-paper-back { background: linear-gradient(180deg, #e6dac4, #dfd2ba); }
.br-backcover {
  background: linear-gradient(160deg, #1a0810 0%, #2d0a1a 100%);
  display: flex; align-items: center; justify-content: center; border-radius: 3px 0 0 3px;
}

.br-page-inner {
  position: absolute; inset: 9% 10% 11%;
  display: flex; flex-direction: column; justify-content: center;
  font-family: 'Libre Baskerville', Georgia, serif;
}
.br-verse { white-space: pre-line; line-height: 1.75; margin: 0; }
.br-poem-title { text-align: center; margin-bottom: 1.8em; letter-spacing: 0.04em; }
.br-split {
  display: grid; grid-template-columns: 1fr 1fr; column-gap: 2.2em;
  line-height: 1.75; margin-bottom: 0;
}
.br-split span:nth-child(odd) { text-align: right; }
.br-split span:nth-child(even) { text-align: left; }

.br-pagenum {
  position: absolute; bottom: 4.5%; left: 0; right: 0; text-align: center;
  font-family: 'Cormorant Garamond', Georgia, serif; font-size: 12px; color: rgba(42,29,22,0.45);
  letter-spacing: 0.15em;
}

.br-chapter, .br-titlepage, .br-cta {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 10%;
}
.br-chapter-title { font-family: 'Libre Baskerville', serif; font-size: 1.9em; color: #6b1a2e; margin-bottom: 0.5em; }
.br-chapter-sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.3em; color: #4a3428; }
.br-chapter-orn { color: rgba(107,26,46,0.55); margin: 1.4em 0; letter-spacing: 0.4em; font-size: 0.9em; }

.br-titlepage { font-size: 16px; }
.br-tp-title { font-family: 'Libre Baskerville', serif; font-size: 2em; color: #2a1d16; line-height: 1.15; }
.br-tp-author { font-family: 'Great Vibes', cursive; font-size: 1.9em; color: #6b1a2e; }
.br-tp-note { margin-top: 2.5em; font-family: 'Cormorant Garamond', serif; font-size: 0.75em; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(42,29,22,0.5); }

.br-cta-label { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(42,29,22,0.5); margin-bottom: 1.2em; }
.br-cta-title { font-family: 'Libre Baskerville', serif; font-size: 22px; line-height: 1.35; color: #2a1d16; }
.br-cta-btn {
  display: inline-block; margin-top: 0.4em;
  background: #6b1a2e; color: #f3ebdc; text-decoration: none;
  font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase;
  padding: 14px 30px; border-radius: 1px; transition: background 0.3s;
}
.br-cta-btn:hover { background: #8a2440; }
.br-cta-link {
  margin-top: 1.4em; background: none; border: none; cursor: pointer;
  font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 15px; color: rgba(42,29,22,0.6);
}
.br-cta-link:hover { color: #6b1a2e; }

.br-gutter {
  position: absolute; top: 0; width: 28px; pointer-events: none; z-index: 50;
  background: linear-gradient(90deg, transparent, rgba(40,20,10,0.22) 50%, transparent);
}

.br-controls { display: flex; align-items: center; gap: 22px; }
.br-nav {
  background: none; border: 1px solid rgba(139,26,26,0.4); color: #c8a080;
  width: 44px; height: 44px; border-radius: 50%; cursor: pointer; font-size: 16px;
  transition: border-color 0.3s, color 0.3s, opacity 0.3s;
}
.br-nav:hover:not(:disabled) { border-color: rgba(160,120,50,0.9); color: #ede5d8; }
.br-nav:disabled { opacity: 0.25; cursor: default; }
.br-count {
  font-family: 'Cormorant Garamond', serif; font-size: 12px; letter-spacing: 0.3em;
  text-transform: uppercase; color: rgba(160,120,50,0.7); min-width: 70px; text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .br-leaf, .br-book { transition-duration: 0.01s; }
}
`;
