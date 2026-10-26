import { motion } from 'framer-motion';
import { ArrowUpRight, Award, Download, GraduationCap } from 'lucide-react';
import ActIntro from './ActIntro';
import { certifications, education, experience, profile, stats } from '../data/site';

const ease = [0.16, 1, 0.3, 1];

export default function Record() {
  return (
    <section className="record act" id="record">
      <div className="shell">
        <ActIntro
          num="05"
          chapter="THE RECORD"
          title={<>The receipts, in <em>daylight</em>.</>}
          lead="Where I have worked, what I studied, and the certificates that came with the long nights."
        />

        <div className="record-grid">
          <div className="record-main">
            <div className="record-label">
              <span className="mono">EXPERIENCE</span>
              <span className="mono">01 ROLE</span>
            </div>
            {experience.map((job, i) => (
              <motion.article
                key={job.company}
                className="job"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{ duration: 0.75, delay: i * 0.08, ease }}
              >
                <div className="job-top">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="job-company">{job.company} <span>· {job.location}</span></p>
                  </div>
                  <span className="job-period mono">{job.period}</span>
                </div>
                <ul className="job-list">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </motion.article>
            ))}

            <div className="record-label record-label--gap">
              <span className="mono">EDUCATION</span>
              <span className="mono">MCA · 2025</span>
            </div>
            <motion.article
              className="edu"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.75, ease }}
            >
              <GraduationCap size={26} strokeWidth={1.4} />
              <div>
                <h3>{education.degree}</h3>
                <p>{education.school}</p>
                <span className="mono">{education.place} · {education.year} · {education.score}</span>
              </div>
            </motion.article>
          </div>

          <aside className="record-side">
            <div className="record-label">
              <span className="mono">CERTIFICATIONS</span>
              <span className="mono">CODING NINJAS</span>
            </div>
            <div className="certs">
              {certifications.map((cert, i) => (
                <motion.a
                  key={cert.title}
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="cert"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease }}
                >
                  <Award size={18} strokeWidth={1.4} />
                  <div>
                    <h4>{cert.title}</h4>
                    <p className="mono">{cert.issuer} · VERIFIED</p>
                  </div>
                  <ArrowUpRight size={16} className="cert-arrow" />
                </motion.a>
              ))}
            </div>

            <div className="record-numbers">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <span className="mono">{s.label}</span>
                </div>
              ))}
            </div>

            <a className="record-cv" href={profile.resume} target="_blank" rel="noreferrer">
              <span>
                <strong>Download the full résumé</strong>
                <small className="mono">PDF · updated 2026</small>
              </span>
              <Download size={18} />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
