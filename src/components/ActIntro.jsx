export default function ActIntro({ num, chapter, title, lead, align = 'left' }) {
  return (
    <header className={`act-intro act-intro--${align}`}>
      <div className="act-kicker">
        <span className="mono">ACT {num}</span>
        <span className="act-rule" />
        <span className="mono">{chapter}</span>
      </div>
      <h2 className="act-title">{title}</h2>
      {lead && <p className="act-lead">{lead}</p>}
    </header>
  );
}
