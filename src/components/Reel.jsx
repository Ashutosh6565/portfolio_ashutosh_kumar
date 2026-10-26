import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Poster from './Poster';
import { archive, projects } from '../data/site';
import { scrollToId, useMediaQuery } from '../hooks';

const rowColors = ['#ff6a45', '#8fd3ff', '#e6be7d', '#b6f09c', '#d8c7ff', '#ff9f7a'];

function Frame({ project, onOpen, mobile = false }) {
  return (
    <article className={`frame${mobile ? ' frame--stacked' : ''}`}>
      <button
        className="frame-visual"
        onClick={() => onOpen(project)}
        data-cursor="view"
        aria-label={`Open case file: ${project.title}`}
      >
        {project.image ? (
          <img src={project.image} alt={project.imageAlt} loading="lazy" />
        ) : (
          <Poster project={project} />
        )}
        <span className="frame-shade" aria-hidden="true" />
        <span className="frame-stamp mono">
          {project.index} <i>/ 09</i>
        </span>
        <span className="frame-kind mono">{project.type.toUpperCase()}</span>
        <span className="frame-open mono">OPEN CASE FILE <ArrowUpRight size={14} /></span>
      </button>

      <div className="frame-body">
        <div className="frame-head">
          <span className="mono">{project.year}</span>
          <span className="mono">{project.role}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="frame-stack">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
          {project.stack.length > 4 && <span>+{project.stack.length - 4}</span>}
        </div>
        {project.highlights?.length > 0 && (
          <ul className="frame-highlights">
            {project.highlights.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <div className="frame-links">
          <button onClick={() => onOpen(project)}>
            CASE FILE <ArrowUpRight size={14} />
          </button>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              LIVE <ExternalLink size={13} />
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer">
              CODE <Github size={13} />
            </a>
          )}
          {!project.live && !project.repo && <span className="frame-private">PRIVATE / NDA</span>}
        </div>
      </div>
    </article>
  );
}

function Archive() {
  return (
    <div className="archive shell" id="archive">
      <div className="archive-head">
        <div>
          <span className="mono">B-SIDE / THE ARCHIVE</span>
          <h3>Every other build.</h3>
        </div>
        <div className="archive-count mono">{String(archive.length).padStart(2, '0')} FILES</div>
      </div>

      <div className="archive-list">
        {archive.map((item, i) => (
          <motion.div
            key={item.id}
            className="archive-row"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.02, 0.2) }}
            style={{ '--row': rowColors[i % rowColors.length] }}
          >
            <span className="archive-index mono">{String(i + 1).padStart(2, '0')}</span>
            <div className="archive-thumb">
              {item.image ? (
                <img src={item.image} alt="" loading="lazy" />
              ) : (
                <span>{item.title.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="archive-main">
              <h4>{item.title}</h4>
              <p className="mono">{item.stack}</p>
              <span className="archive-note">{item.note}</span>
            </div>
            <span className="archive-type mono">{item.type}</span>
            <span className="archive-year mono">{item.year}</span>
            <div className="archive-links">
              {item.live && (
                <a href={item.live} target="_blank" rel="noreferrer" aria-label={`${item.title} live site`}>
                  <ExternalLink size={15} />
                </a>
              )}
              {item.repo && (
                <a href={item.repo} target="_blank" rel="noreferrer" aria-label={`${item.title} on GitHub`}>
                  <Github size={15} />
                </a>
              )}
              {!item.live && !item.repo && <span className="archive-none mono">NO LINK</span>}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="archive-foot">
        <p>Learning builds, client samples and a few things built purely out of curiosity.</p>
        <a className="text-link" href="https://github.com/Ashutosh6565?tab=repositories" target="_blank" rel="noreferrer">
          THE FULL GITHUB ARCHIVE <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  );
}

export default function Reel({ onOpen }) {
  const isDesktop = useMediaQuery('(min-width: 980px)');
  const wrapRef = useRef(null);
  const rowRef = useRef(null);
  const [max, setMax] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isDesktop) {
      setMax(0);
      return;
    }
    const measure = () => {
      if (!rowRef.current) return;
      setMax(Math.max(0, rowRef.current.scrollWidth - window.innerWidth + 48));
    };
    measure();
    const timer = setTimeout(measure, 700);
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 0, -max, -max]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(value * (projects.length - 1)))
    );
    setCurrent((prev) => (prev === next ? prev : next));
  });

  return (
    <section className="reel act" id="reel">
      <div
        className="reel-scroll"
        ref={wrapRef}
        style={{ height: isDesktop ? `${projects.length * 60 + 100}vh` : 'auto' }}
      >
        <div className="reel-sticky">
          <div className="reel-top shell">
            <div className="act-kicker">
              <span className="mono">ACT 03</span>
              <span className="act-rule" />
              <span className="mono">THE REEL</span>
            </div>
            <div className="reel-heading">
              <h2>
                THE REEL<em>.</em>
              </h2>
              <p>
                Nine case files from the last two years — client storefronts, full-stack products,
                internal tools and one hospital system that runs on real working days.
              </p>
            </div>
            <div className="reel-counter" aria-live="polite">
              <strong>{String(current + 1).padStart(2, '0')}</strong>
              <span>/ {String(projects.length).padStart(2, '0')}</span>
            </div>
          </div>

          <div className="reel-viewport">
            {isDesktop ? (
              <motion.div className="reel-row" ref={rowRef} style={{ x }}>
                {projects.map((project) => (
                  <Frame key={project.id} project={project} onOpen={onOpen} />
                ))}
                <button className="reel-endcard" onClick={() => scrollToId('archive')} data-cursor="link">
                  <span className="mono">END OF REEL</span>
                  <strong>{archive.length}</strong>
                  <p>more builds in the archive</p>
                  <span className="reel-endcard-cta">
                    OPEN ARCHIVE <ArrowDown size={16} />
                  </span>
                </button>
              </motion.div>
            ) : (
              <div className="reel-stack">
                {projects.map((project) => (
                  <Frame key={project.id} project={project} onOpen={onOpen} mobile />
                ))}
                <button className="reel-endcard reel-endcard--mobile" onClick={() => scrollToId('archive')}>
                  <span className="mono">END OF REEL</span>
                  <strong>{archive.length}</strong>
                  <p>more builds in the archive</p>
                  <span className="reel-endcard-cta">
                    OPEN ARCHIVE <ArrowDown size={16} />
                  </span>
                </button>
              </div>
            )}
          </div>

          {isDesktop && (
            <div className="reel-foot shell">
              <span className="mono">SCROLL TO PAN · CLICK A STILL TO OPEN</span>
              <div className="reel-progress" aria-hidden="true">
                <motion.span style={{ scaleX: scrollYProgress }} />
              </div>
              <span className="mono">{String(projects.length).padStart(2, '0')} FILES</span>
            </div>
          )}
        </div>
      </div>

      <Archive />
    </section>
  );
}
