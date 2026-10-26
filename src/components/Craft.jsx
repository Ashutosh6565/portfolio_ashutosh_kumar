import { useState } from 'react';
import { motion } from 'framer-motion';
import ActIntro from './ActIntro';
import { skills, toolkit } from '../data/site';

const COLORS = {
  frontend: '#ff6a45',
  backend: '#8fd3ff',
  data: '#e6be7d',
  tooling: '#b6f09c',
};

const USED_IN = {
  React: 'Sanwliya · Clothers · BookSelf',
  JavaScript: 'Sanwliya · Weather App · BookStore',
  TypeScript: 'BookSelf · Signal Room',
  Tailwind: 'Clothers · Book Your Ride · BookSelf',
  Vite: 'BookSelf · Clothers · CodePaste',
  'Framer Motion': 'This portfolio · Password Generator',
  'Node.js': 'Book Your Ride · BookStore',
  Express: 'Book Your Ride · BookStore · Course API',
  'REST APIs': 'Sanwliya · Pinnacleway · Book Your Ride',
  'Socket.io': 'Book Your Ride · Signal Room',
  MongoDB: 'Book Your Ride · BookStore',
  SQL: 'Coursework · learning',
  Git: 'Every single build',
  Docker: 'Signal Room',
  Vitest: 'BookSelf',
  Figma: 'Design handoff · Sanwliya',
};

export default function Craft() {
  const [active, setActive] = useState(skills[0]);
  const color = COLORS[active.group];

  return (
    <section className="craft act" id="craft">
      <div className="shell">
        <ActIntro
          num="02"
          chapter="THE CRAFT"
          title={<>Tools are cheap. <em>Taste</em> is the work.</>}
          lead="I pick the stack that gets a product shipped, then spend the extra hours on the parts people actually feel — speed, clarity, and the small interaction that makes a screen trustworthy."
        />

        <div className="craft-grid">
          <div className="constellation" aria-label="Skills constellation">
            <div className="constellation-map">
              <svg viewBox="0 0 1000 560" preserveAspectRatio="none" className="map-lines" aria-hidden="true">
                {skills.map((skill) => (
                  <line
                    key={skill.name}
                    x1="500"
                    y1="280"
                    x2={skill.x * 10}
                    y2={skill.y * 5.6}
                    stroke={COLORS[skill.group]}
                    className={active.name === skill.name ? 'is-active' : ''}
                  />
                ))}
              </svg>

              <div className="map-core" aria-hidden="true">
                <span>AK</span>
                <small>CORE</small>
              </div>

              {skills.map((skill) => (
                <button
                  key={skill.name}
                  className={`map-node${active.name === skill.name ? ' is-active' : ''}`}
                  style={{ left: `${skill.x}%`, top: `${skill.y}%`, '--node': COLORS[skill.group] }}
                  onMouseEnter={() => setActive(skill)}
                  onFocus={() => setActive(skill)}
                  onClick={() => setActive(skill)}
                >
                  <i />
                  <span>{skill.name}</span>
                </button>
              ))}

              <div className="map-legend">
                {Object.entries(COLORS).map(([group, c]) => (
                  <span key={group} style={{ '--node': c }}>
                    <i /> {group}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="craft-panel" aria-live="polite">
            <span className="mono craft-panel-kicker">NODE / {active.group.toUpperCase()}</span>
            <h3 style={{ color }}>{active.name}</h3>
            <p className="craft-panel-note">{active.note}</p>
            <div className="craft-panel-bar">
              <motion.span
                key={active.name}
                initial={{ scaleX: 0.2 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: color }}
              />
            </div>
            <div className="craft-panel-used">
              <span className="mono">USED IN</span>
              <p>{USED_IN[active.name] || 'Across the archive'}</p>
            </div>
            <div className="craft-panel-hint mono">HOVER THE CONSTELLATION →</div>
          </aside>
        </div>

        <div className="toolkit">
          {toolkit.map((group, gi) => (
            <motion.div
              key={group.label}
              className="toolkit-col"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: gi * 0.06 }}
            >
              <span className="mono">{group.label}</span>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="craft-foot">
          <span className="mono">CURRENTLY LEARNING</span>
          <p>System design · testing depth · TypeScript patterns that survive a refactor.</p>
        </div>
      </div>
    </section>
  );
}
