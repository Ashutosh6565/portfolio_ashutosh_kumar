import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Gauge,
  LayoutDashboard,
  PlugZap,
  Store,
} from 'lucide-react';
import { process, profile, projectById, sampleWork, services } from '../data/site';
import { scrollToId } from '../hooks';

const ICONS = { Store, LayoutDashboard, PlugZap, Gauge };

const ease = [0.16, 1, 0.3, 1];

export default function Freelance({ onOpen }) {
  return (
    <section className="freelance act" id="freelance">
      <div className="shell">
        <div className="free-top">
          <div className="act-kicker">
            <span className="mono">ACT 04</span>
            <span className="act-rule" />
            <span className="mono">THE FREELANCE CHAPTER</span>
          </div>
          <span className="free-avail">
            <i className="pulse-dot" /> TAKING 1–2 PROJECTS THIS QUARTER
          </span>
        </div>

        <div className="free-statement-wrap">
          <motion.h2
            className="free-statement"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.9, ease }}
          >
            I’m a <em>freelancer</em>.<br />
            You bring the problem.<br />
            I bring the <span className="free-underline">build</span>.
          </motion.h2>

          <motion.div
            className="free-side"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p>
              I work directly with founders and small teams — no account manager, no handoff
              theatre. You get the person writing the code in the same room as the person
              deciding what to build.
            </p>
            <ul className="free-points">
              <li><Check size={14} /> Direct communication, weekly demos</li>
              <li><Check size={14} /> Fixed scope, clear milestones</li>
              <li><Check size={14} /> Remote worldwide, based in India</li>
              <li><Check size={14} /> Reply within 24 hours</li>
            </ul>
            <a className="btn btn--solid" href={`mailto:${profile.email}?subject=Freelance%20project%20—%20let's%20talk`}>
              START A PROJECT <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </div>

        <div className="services">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.article
                key={service.title}
                className="service"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
              >
                <div className="service-head">
                  <Icon size={22} strokeWidth={1.5} />
                  <span className="mono">0{i + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="client-strip">
          <div className="client-copy">
            <span className="mono">RECENT CLIENT / LIVE</span>
            <h3>Sanwliya Seth</h3>
            <p>
              A production marketplace with thousands of products, real customers and an
              operations team behind it. I built the front end and the API layer that keeps
              it moving.
            </p>
            <a className="text-link" href="https://www.sanwliyaseth.com" target="_blank" rel="noreferrer">
              VISIT THE LIVE STORE <ArrowUpRight size={15} />
            </a>
          </div>
          <a
            className="client-shot"
            href="https://www.sanwliyaseth.com"
            target="_blank"
            rel="noreferrer"
            data-cursor="view"
            aria-label="Visit the Sanwliya Seth store"
          >
            <img src={sampleWork[0].image} alt="" />
          </a>
        </div>

        <div className="samples-head">
          <div>
            <span className="mono">SAMPLE BUILDS</span>
            <h3>What a project can look like.</h3>
          </div>
          <p>
            Self-initiated builds that show how I approach a client brief. Open any one to see
            the full case file.
          </p>
        </div>

        <div className="samples">
          {sampleWork.map((sample, i) => {
            const project = projectById(sample.projectId);
            return (
              <motion.article
                key={sample.title}
                className="sample"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
              >
                <button className="sample-shot" onClick={() => onOpen(project)} data-cursor="view">
                  <img src={sample.image} alt="" loading="lazy" />
                  <span className="sample-badge mono">SAMPLE BUILD</span>
                  <span className="sample-open mono">OPEN CASE <ArrowUpRight size={13} /></span>
                </button>
                <div className="sample-body">
                  <h4>{sample.title}</h4>
                  <p>{sample.body}</p>
                  <div className="sample-links">
                    <button className="text-link" onClick={() => onOpen(project)}>
                      CASE FILE <ArrowUpRight size={13} />
                    </button>
                    <a className="text-link" href={sample.repo} target="_blank" rel="noreferrer">
                      GITHUB <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="process">
          <div className="process-head">
            <span className="mono">THE PROCESS</span>
            <span className="mono">FOUR STEPS, NO MYSTERY</span>
          </div>
          <div className="process-grid">
            {process.map((step, i) => (
              <motion.div
                key={step.num}
                className="process-step"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              >
                <span className="process-num">{step.num}</span>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="free-cta">
          <div>
            <span className="mono">HAVE SOMETHING IN MIND?</span>
            <h3>Tell me what you’re building.</h3>
          </div>
          <div className="free-cta-actions">
            <a className="btn btn--solid" href={`mailto:${profile.email}?subject=Freelance%20project`}>
              EMAIL ME <ArrowUpRight size={15} />
            </a>
            <button className="btn btn--line" onClick={() => scrollToId('record')}>
              SEE MY EXPERIENCE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
