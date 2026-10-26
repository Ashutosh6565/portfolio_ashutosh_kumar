import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { profile } from '../data/site';

function LocalClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="mono">{time} IST</span>;
}

export default function Invitation() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="invitation act" id="invitation">
      <div className="invitation-glow" aria-hidden="true" />
      <div className="shell">
        <div className="inv-top">
          <div className="act-kicker">
            <span className="mono">ACT 06</span>
            <span className="act-rule" />
            <span className="mono">THE INVITATION</span>
          </div>
          <span className="free-avail">
            <i className="pulse-dot" /> AVAILABLE NOW
          </span>
        </div>

        <motion.h2
          className="inv-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Let’s make something
          <br />
          <em>worth watching.</em>
        </motion.h2>

        <div className="inv-grid">
          <div className="inv-left">
            <p className="inv-lead">
              I’m taking on freelance projects for 2026 — storefronts, dashboards, APIs,
              or a product that doesn’t have a name yet. If you have a problem and a
              deadline, I’d like to hear about it.
            </p>

            <div className="inv-email">
              <a href={`mailto:${profile.email}`} className="inv-email-link">
                {profile.email}
                <ArrowUpRight size={26} />
              </a>
              <button className="copy-btn" onClick={copyEmail} aria-label="Copy email address">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>

            <div className="inv-actions">
              <a
                className="btn btn--solid"
                href={`mailto:${profile.email}?subject=Project%20enquiry&body=Hi%20Ashutosh%2C%0A%0AWhat%20I%27m%20building%3A%20%0ATimeline%3A%20%0ABudget%3A%20`}
              >
                <Mail size={15} /> START A CONVERSATION
              </a>
              <a className="btn btn--line" href={profile.resume} target="_blank" rel="noreferrer">
                <Download size={15} /> RÉSUMÉ
              </a>
            </div>

            <div className="inv-socials">
              <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
            </div>
          </div>

          <div className="inv-right">
            <div className="inv-card">
              <span className="mono">DIRECT LINE</span>
              <a href={`tel:${profile.phone}`}><Phone size={15} /> {profile.phone}</a>
              <span className="mono">BASE</span>
              <p><MapPin size={15} /> {profile.location}</p>
              <span className="mono">LOCAL TIME</span>
              <p><LocalClock /></p>
              <span className="mono">RESPONSE</span>
              <p>Within 24 hours, usually sooner.</p>
            </div>
            <div className="inv-stamp" aria-hidden="true">
              <span>AK</span>
              <small>FREELANCE<br />2026</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
