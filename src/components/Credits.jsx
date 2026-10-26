import { ArrowUp } from 'lucide-react';
import { profile } from '../data/site';
import { scrollToId } from '../hooks';

const credits = [
  {
    label: 'CAST',
    lines: [
      ['Ashutosh Kumar', 'The Developer'],
      ['React', 'The Front End'],
      ['Node.js', 'The Back End'],
      ['MongoDB', 'The Memory'],
      ['Socket.io', 'The Messenger'],
      ['Coffee', 'The Fuel'],
    ],
  },
  {
    label: 'CREW',
    lines: [
      ['Written, designed & built by', 'Ashutosh Kumar'],
      ['Motion', 'Framer Motion'],
      ['Smooth operator', 'Lenis'],
      ['Gaffer', 'A stack trace at 1am'],
      ['Catering', 'Maggi'],
    ],
  },
  {
    label: 'SHOT ON',
    lines: [
      ['Location', 'Noida, India'],
      ['Year', '2026'],
      ['Format', 'React · Vite'],
      ['Aspect', '16:9, mostly'],
    ],
  },
  {
    label: 'SPECIAL THANKS',
    lines: [
      ['Everyone who reviewed a PR', ''],
      ['Every bug that taught me something', ''],
      ['Every client who said “one small change”', ''],
      ['You, for scrolling this far', ''],
    ],
  },
];

function CreditBlock({ block }) {
  return (
    <div className="credit-block">
      <span className="mono">{block.label}</span>
      <div>
        {block.lines.map(([left, right]) => (
          <p key={left}>
            <span>{left}</span>
            {right && <em>{right}</em>}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function Credits() {
  return (
    <footer className="credits">
      <div className="credits-top shell">
        <span className="mono">END CREDITS</span>
        <span className="mono">A PORTFOLIO IN SIX ACTS</span>
      </div>

      <div className="credits-window">
        <div className="credits-track">
          {[0, 1].map((copy) => (
            <div className="credits-set" key={copy} aria-hidden={copy === 1}>
              {credits.map((block) => (
                <CreditBlock key={block.label} block={block} />
              ))}
              <div className="credit-fin">
                <span className="mono">THE END</span>
                <strong>FIN</strong>
                <p>Thanks for watching.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="credits-bottom shell">
        <span>© 2026 {profile.name}. Built, not templated.</span>
        <div>
          <a href={profile.github} target="_blank" rel="noreferrer">GITHUB</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a>
          <button onClick={() => scrollToId('top')} aria-label="Back to top">
            BACK TO TOP <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
