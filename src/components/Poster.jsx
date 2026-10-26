function Motif({ motif, accent }) {
  const stroke = accent;
  const dim = 'rgba(242,236,225,0.16)';

  switch (motif) {
    case 'route':
      return (
        <g fill="none" stroke={stroke} strokeWidth="2">
          <path d="M40 430 C 180 350, 220 250, 360 280 S 600 380, 760 210" strokeDasharray="8 10" opacity="0.8" />
          <path d="M120 120 H 680 M120 200 H 520 M120 280 H 760" stroke={dim} strokeWidth="1" />
          <path d="M200 80 V 430 M420 80 V 430 M640 80 V 430" stroke={dim} strokeWidth="1" />
          <circle cx="360" cy="280" r="14" fill={stroke} stroke="none" />
          <circle cx="360" cy="280" r="34" opacity="0.35" />
          <circle cx="760" cy="210" r="10" fill={stroke} stroke="none" />
          <circle cx="40" cy="430" r="10" fill={stroke} stroke="none" />
          <path d="M330 270 l20 -34 l20 34 z" fill={stroke} stroke="none" />
        </g>
      );
    case 'books':
      return (
        <g>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={120 + i * 72}
              y={300 - (i % 3) * 26 - 40}
              width="48"
              height={190 + (i % 3) * 26}
              rx="4"
              fill={i % 2 ? 'rgba(242,236,225,0.06)' : 'rgba(242,236,225,0.02)'}
              stroke={i === 2 ? stroke : dim}
              strokeWidth={i === 2 ? 2 : 1}
            />
          ))}
          <path d="M80 450 H 720" stroke={stroke} strokeWidth="2" />
        </g>
      );
    case 'chat':
      return (
        <g>
          <rect x="120" y="120" width="270" height="86" rx="26" fill="rgba(242,236,225,0.05)" stroke={stroke} strokeWidth="1.5" />
          <path d="M160 206 l-12 30 l38 -30 z" fill={stroke} opacity="0.7" />
          <rect x="410" y="230" width="270" height="86" rx="26" fill="none" stroke={dim} />
          <path d="M640 316 l12 28 l-38 -28 z" fill={dim} />
          <circle cx="190" cy="163" r="5" fill={stroke} />
          <circle cx="220" cy="163" r="5" fill={stroke} opacity="0.7" />
          <circle cx="250" cy="163" r="5" fill={stroke} opacity="0.4" />
          <path d="M150 380 H 650" stroke={dim} strokeDasharray="3 7" />
          <rect x="450" y="350" width="180" height="60" rx="18" fill="none" stroke={stroke} opacity="0.5" />
        </g>
      );
    case 'graph':
      return (
        <g stroke={dim} strokeWidth="1.5" fill="none">
          <path d="M400 250 L250 140 M400 250 L560 150 M400 250 L220 330 M400 250 L580 340 M250 140 L120 190 M560 150 L690 100 M220 330 L100 400 M580 340 L700 420" />
          <circle cx="400" cy="250" r="16" fill={stroke} stroke="none" />
          {[
            [250, 140],
            [560, 150],
            [220, 330],
            [580, 340],
            [120, 190],
            [690, 100],
            [100, 400],
            [700, 420],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8" fill="#0b0f0c" stroke={stroke} strokeWidth="2" />
          ))}
          <rect x="310" y="80" width="180" height="28" rx="6" stroke={stroke} opacity="0.3" />
        </g>
      );
    case 'code':
      return (
        <g>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <g key={i}>
              <rect x="120" y={120 + i * 34} width="26" height="8" rx="3" fill={dim} />
              <rect
                x={160 + (i % 3) * 20}
                y={120 + i * 34}
                width={220 + ((i * 73) % 200)}
                height="8"
                rx="3"
                fill={i % 3 === 0 ? stroke : 'rgba(242,236,225,0.22)'}
                opacity={i % 3 === 0 ? 0.8 : 1}
              />
            </g>
          ))}
          <rect x="160" y="392" width="12" height="18" fill={stroke} />
        </g>
      );
    case 'pulse':
      return (
        <g fill="none" stroke={stroke} strokeWidth="2">
          <path d="M80 260 H 250 l 30 -60 l 40 120 l 34 -90 l 26 30 H 500 l 34 -50 l 40 100 l 30 -70 H 720" opacity="0.9" />
          <path d="M80 300 H 720" stroke={dim} strokeDasharray="4 8" />
          <circle cx="520" cy="200" r="42" opacity="0.25" />
          <path d="M500 200 h40 M520 180 v40" strokeWidth="1.5" opacity="0.5" />
        </g>
      );
    case 'store':
    default:
      return (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={120 + (i % 3) * 200}
              y={110 + Math.floor(i / 3) * 160}
              width="160"
              height="120"
              rx="10"
              fill="rgba(242,236,225,0.035)"
              stroke={i === 4 ? stroke : dim}
              strokeWidth={i === 4 ? 2 : 1}
            />
          ))}
          <circle cx="200" cy="150" r="8" fill={stroke} opacity="0.8" />
          <path d="M160 210 h80 M160 230 h50" stroke={dim} strokeWidth="3" />
        </g>
      );
  }
}

export default function Poster({ project, className = '' }) {
  const gid = `pg-${project.id}`;
  return (
    <div className={`poster ${className}`} style={{ '--a': project.accent, '--b': project.accent2 }}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="poster-svg" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={project.accent2} />
            <stop offset="0.65" stopColor="#08080b" />
            <stop offset="1" stopColor="#08080b" />
          </linearGradient>
          <radialGradient id={`${gid}-glow`} cx="50%" cy="45%" r="55%">
            <stop offset="0" stopColor={project.accent} stopOpacity="0.32" />
            <stop offset="1" stopColor={project.accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill={`url(#${gid})`} />
        <circle cx="400" cy="240" r="280" fill={`url(#${gid}-glow)`} />
        <Motif motif={project.motif} accent={project.accent} />
        <path d="M0 470 H800" stroke="rgba(242,236,225,0.12)" />
      </svg>
      <div className="poster-overlay">
        <span className="poster-index">{project.index}</span>
        <div className="poster-type">
          <strong>{project.title}</strong>
          <em>{project.subtitle}</em>
        </div>
        <div className="poster-meta">
          <span>STILL {project.index}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </div>
  );
}
