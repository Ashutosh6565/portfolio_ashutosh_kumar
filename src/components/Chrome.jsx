import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import { acts, profile } from '../data/site';
import { scrollToId, useActiveSection, useBodyLock } from '../hooks';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.2 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function Header({ introDone }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const closeRef = useRef(null);
  useBodyLock(open);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <header className={`header${solid ? ' is-solid' : ''}${introDone ? ' is-in' : ''}`}>
        <button className="brand" onClick={() => go('top')} aria-label="Ashutosh Kumar — back to top">
          <span className="brand-mark">AK</span>
          <span className="brand-text">
            ASHUTOSH KUMAR
            <small>FULL-STACK / FREELANCE</small>
          </span>
        </button>

        <nav className="header-nav" aria-label="Primary">
          <button onClick={() => go('reel')}>The Reel</button>
          <button onClick={() => go('freelance')}>Freelance</button>
          <button onClick={() => go('record')}>The Record</button>
          <button onClick={() => go('invitation')}>Contact</button>
        </nav>

        <div className="header-actions">
          <span className="status">
            <i /> AVAILABLE FOR FREELANCE
          </span>
          <a className="btn btn--ghost btn--small" href={profile.resume} target="_blank" rel="noreferrer">
            <Download size={14} /> RÉSUMÉ
          </a>
          <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </header>

      {open && (
        <div className="menu-sheet" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="menu-sheet-top">
            <span className="mono">INDEX / 2026</span>
            <button className="menu-close" onClick={() => setOpen(false)} aria-label="Close menu" ref={closeRef}>
              <X size={22} />
            </button>
          </div>
          <nav className="menu-list">
            {acts.map((act) => (
              <button key={act.id} onClick={() => go(act.id)} className="menu-item">
                <span className="menu-num">{act.num}</span>
                <span className="menu-label">{act.label}</span>
                <ArrowUpRight size={20} />
              </button>
            ))}
          </nav>
          <div className="menu-foot">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <div>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function FilmRail() {
  const active = useActiveSection(acts.map((a) => a.id));
  return (
    <aside className="film-rail" aria-label="Chapters">
      <span className="film-rail-label">SCENES</span>
      <div className="film-rail-line" />
      {acts.map((act) => (
        <button
          key={act.id}
          className={`film-rail-item${active === act.id ? ' is-active' : ''}`}
          onClick={() => scrollToId(act.id)}
          aria-label={`Go to ${act.label}`}
          data-cursor="link"
        >
          <span className="film-rail-num">{act.num}</span>
          <span className="film-rail-name">{act.label}</span>
        </button>
      ))}
    </aside>
  );
}

