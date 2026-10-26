import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ExternalLink, Github, X } from 'lucide-react';
import Poster from './Poster';
import { profile } from '../data/site';
import { useBodyLock } from '../hooks';

const ease = [0.16, 1, 0.3, 1];

export default function ProjectModal({ project, onClose, onNext }) {
  useBodyLock(Boolean(project));
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [shot, setShot] = useState(0);

  useEffect(() => {
    if (!project) return;
    setShot(0);
    const timer = setTimeout(() => closeRef.current?.focus(), 120);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const shots = [project.image, project.image2].filter(Boolean);

  return (
    <motion.div
      className="case-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="case"
        role="dialog"
        aria-modal="true"
        aria-label={`Case file: ${project.title}`}
        ref={panelRef}
        initial={{ opacity: 0, y: 40, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.99 }}
        transition={{ duration: 0.55, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="case-close" onClick={onClose} ref={closeRef} aria-label="Close case file">
          <X size={20} />
        </button>

        <div className="case-media">
          <div className="case-still">
            {shots.length ? (
              <img src={shots[Math.min(shot, shots.length - 1)]} alt={project.imageAlt} />
            ) : (
              <Poster project={project} className="poster--case" />
            )}
            <span className="case-still-label mono">
              STILL {project.index} · {project.year}
            </span>
          </div>
          {shots.length > 1 && (
            <div className="case-thumbs">
              {shots.map((src, i) => (
                <button
                  key={src}
                  className={shot === i ? 'is-active' : ''}
                  onClick={() => setShot(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
          <div className="case-note mono">{project.note}</div>
        </div>

        <div className="case-content">
          <div className="case-kicker">
            <span className="mono">CASE FILE / {project.index}</span>
            <span className="mono">{project.type.toUpperCase()}</span>
          </div>
          <h2>{project.title}</h2>
          <p className="case-subtitle">{project.subtitle}</p>

          <div className="case-meta">
            <div><span className="mono">YEAR</span><p>{project.year}</p></div>
            <div><span className="mono">ROLE</span><p>{project.role}</p></div>
            <div><span className="mono">TYPE</span><p>{project.type}</p></div>
            <div><span className="mono">STATUS</span><p>{project.live ? 'Live' : project.repo ? 'Source available' : 'Private / NDA'}</p></div>
          </div>

          <p className="case-desc">{project.description}</p>

          <div className="case-highlights">
            <span className="mono">WHAT I DID</span>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-stack">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <div className="case-actions">
            {project.live && (
              <a className="btn btn--solid" href={project.live} target="_blank" rel="noreferrer">
                VISIT LIVE SITE <ExternalLink size={15} />
              </a>
            )}
            {project.repo && (
              <a className="btn btn--line" href={project.repo} target="_blank" rel="noreferrer">
                VIEW SOURCE <Github size={15} />
              </a>
            )}
            {!project.live && !project.repo && (
              <span className="case-private mono">SOURCE NOT PUBLIC — AVAILABLE ON REQUEST</span>
            )}
          </div>

          <div className="case-next">
            <button onClick={onNext}>
              <span className="mono">NEXT CASE <ArrowRight size={13} /></span>
            </button>
            <a href={`mailto:${profile.email}`} className="text-link">
              ASK ME ABOUT THIS BUILD <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
