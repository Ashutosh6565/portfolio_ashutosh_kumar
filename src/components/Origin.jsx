import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ActIntro from './ActIntro';
import { asset, profile, stats, timeline } from '../data/site';

const ease = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Origin() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 75%', 'end 60%'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="origin act" id="origin">
      <div className="shell">
        <ActIntro
          num="01"
          chapter="THE ORIGIN"
          title={<>Every product starts with a <em>blank file</em>.</>}
          lead="Mine started in 2024. No agency, no bootcamp shortcut — just a browser, a first commit, and a stubborn need to make things work."
        />

        <div className="origin-grid">
          <Reveal className="origin-photo-wrap">
            <div className="origin-photo">
              <img src={asset('img/portrait-square.jpg')} alt="Ashutosh Kumar, portrait" />
              <span className="photo-tape" aria-hidden="true" />
            </div>
            <div className="origin-photo-caption mono">
              FIG. 02 — NOIDA, 2026
              <span>Shot between deploy and coffee.</span>
            </div>
          </Reveal>

          <div className="origin-copy">
            <Reveal>
              <p className="origin-drop">
                I’m Ashutosh — a full-stack developer from Noida.
                I got here the long way: a first HTML page, an MCA, a few hundred small builds,
                and then production work where the feedback arrives from real users.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                What I care about is the whole arc of a product — the interface someone touches,
                the API underneath it, and the quiet details that make both feel inevitable.
                React on the front, Node underneath, and enough curiosity to go wherever the
                problem lives.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Today I work as a full-stack intern at <strong>Pinnacleway</strong> and take on
                freelance products directly with the people whose problem it is. Which is the
                part I like most: the conversation, the build, the launch.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <blockquote className="origin-quote">
                “I didn’t start with a plan. I started with a blank file and the refusal to leave
                it ugly.”
              </blockquote>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="origin-now">
                <span className="mono">CURRENTLY</span>
                <p>Full-stack intern · Pinnacleway</p>
                <p>Freelance developer · {profile.location}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="origin-stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="origin-stat">
              <strong>{s.value}</strong>
              <span className="mono">{s.label}</span>
            </Reveal>
          ))}
        </div>

        <div className="timeline" ref={lineRef}>
          <div className="timeline-head">
            <span className="mono">THE TIMELINE</span>
            <span className="mono">2024 — NOW</span>
          </div>
          <div className="timeline-track">
            <motion.span className="timeline-line" style={{ scaleY }} aria-hidden="true" />
            {timeline.map((item, i) => (
              <motion.article
                key={`${item.year}-${item.title}`}
                className="timeline-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.7, ease, delay: i * 0.04 }}
              >
                <div className="timeline-year mono">{item.year}</div>
                <div className="timeline-dot" aria-hidden="true" />
                <div className="timeline-body">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  {item.link && (
                    <a className="text-link" href={item.link} target="_blank" rel="noreferrer">
                      {item.linkLabel} <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
