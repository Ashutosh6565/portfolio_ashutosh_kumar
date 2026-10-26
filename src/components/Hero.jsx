import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { asset, marquee, profile } from '../data/site';
import { scrollToId } from '../hooks';

const ease = [0.16, 1, 0.3, 1];

const line = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: 0,
    transition: { duration: 1.15, ease, delay: 0.15 + i * 0.1 },
  }),
};

export default function Hero({ introDone }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="hero-watermark">AK</div>
      </div>

      <div className="hero-inner shell">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="mono">A STORY IN SIX ACTS</span>
            <span className="hero-eyebrow-line" />
            <span className="mono">EST. 2024</span>
          </div>

          <h1 className="hero-title">
            <span className="line-mask">
              <motion.span
                custom={0}
                variants={line}
                initial={introDone ? false : "hidden"}
                animate={introDone ? 'show' : 'hidden'}
                className="hero-title-line"
              >
                ASHUTOSH
              </motion.span>
            </span>
            <span className="line-mask line-mask--second">
              <motion.span
                custom={1}
                variants={line}
                initial={introDone ? false : "hidden"}
                animate={introDone ? 'show' : 'hidden'}
                className="hero-title-line hero-title-line--italic"
              >
                KUMAR
              </motion.span>
              <span className="hero-title-dot" />
            </span>
          </h1>

          <motion.div
            className="hero-role"
            initial={introDone ? false : { opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
          >
            <span>FULL-STACK DEVELOPER</span>
            <span className="hero-role-sep">/</span>
            <span>FREELANCER</span>
          </motion.div>

          <motion.p
            className="hero-intro"
            initial={introDone ? false : { opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.65, ease }}
          >
            {profile.intro}
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={introDone ? false : { opacity: 0, y: 16 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
          >
            <button className="btn btn--solid" onClick={() => scrollToId('reel')} data-cursor="link">
              VIEW THE REEL <ArrowUpRight size={16} />
            </button>
            <button className="btn btn--line" onClick={() => scrollToId('origin')} data-cursor="link">
              START THE STORY
            </button>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={introDone ? false : { opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            <span><MapPin size={14} /> NOIDA, INDIA</span>
            <span><i className="pulse-dot" /> {profile.availability.toUpperCase()}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </motion.div>
        </div>

        <div className="hero-portrait">
          <motion.div
            className="portrait-frame"
            initial={introDone ? false : { clipPath: 'inset(100% 0 0 0)' }}
            animate={introDone ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 1.2, ease, delay: 0.35 }}
          >
            <img src={asset('img/portrait.jpg')} alt="Portrait of Ashutosh Kumar" />
            <div className="portrait-scan" aria-hidden="true" />
            <div className="portrait-tint" aria-hidden="true" />
            <span className="portrait-corner portrait-corner--tl" />
            <span className="portrait-corner portrait-corner--br" />
          </motion.div>

          <motion.div
            className="portrait-caption mono"
            initial={introDone ? false : { opacity: 0, x: 20 }}
            animate={introDone ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            FIG. 01 — THE PROTAGONIST
          </motion.div>

          <div className="hero-stat-card">
            <div className="hero-stat-head mono">CURRENT CUT</div>
            <div className="hero-stat-main">
              <strong>09</strong>
              <span>CASE FILES<br />IN THE REEL</span>
            </div>
            <div className="hero-stat-foot mono">20+ BUILDS ARCHIVED</div>
          </div>

          <div className="round-badge" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="circlePath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text>
                <textPath href="#circlePath" startOffset="0">
                  OPEN FOR FREELANCE · OPEN FOR FREELANCE ·
                </textPath>
              </text>
            </svg>
            <span>↗</span>
          </div>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((item, i) => (
              <span key={i}>
                {item}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>
        <button className="scroll-cue" onClick={() => scrollToId('origin')} aria-label="Scroll to the story">
          <span className="mono">SCROLL</span>
          <ArrowDown size={15} />
        </button>
      </div>

    </section>
  );
}
