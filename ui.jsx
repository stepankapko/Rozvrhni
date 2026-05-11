// Shared UI primitives + design tokens

const Icon = ({ name, size = 16, stroke = 1.6, style = {} }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { display: 'block', flexShrink: 0, ...style },
  };
  switch (name) {
    case 'planner': return <svg {...props}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
    case 'library': return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case 'deck': return <svg {...props}><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M6 21h12M12 18v3"/></svg>;
    case 'quiz': return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 1-1 1.7v.5"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>;
    case 'students': return <svg {...props}><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c2.8 0 5 2.2 5 5"/></svg>;
    case 'plus': return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'search': return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'arrow-right': return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'sparkle': return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>;
    case 'play': return <svg {...props}><polygon points="6 4 20 12 6 20" fill="currentColor" stroke="none"/></svg>;
    case 'check': return <svg {...props}><path d="M20 6 9 17l-5-5"/></svg>;
    case 'clock': return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'close': return <svg {...props}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case 'dot': return <svg {...props}><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></svg>;
    case 'filter': return <svg {...props}><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
    case 'logout': return <svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    case 'chevron-right': return <svg {...props}><path d="m9 6 6 6-6 6"/></svg>;
    case 'chevron-down': return <svg {...props}><path d="m6 9 6 6 6-6"/></svg>;
    case 'check-circle': return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>;
    case 'doc': return <svg {...props}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>;
    case 'book': return <svg {...props}><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M4 17h15"/></svg>;
    case 'plans': return <svg {...props}><rect x="3" y="5" width="18" height="6" rx="2"/><rect x="3" y="13" width="18" height="6" rx="2"/><circle cx="7" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="7" cy="16" r="1" fill="currentColor" stroke="none"/></svg>;
    case 'books': return <svg {...props}><rect x="4" y="4" width="3.5" height="16" rx="1"/><rect x="9" y="4" width="3.5" height="16" rx="1"/><rect x="14.5" y="6" width="3.5" height="14" rx="1" transform="rotate(-8 16.25 13)"/></svg>;
    case 'screen': return <svg {...props}><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M7 13l3-3 3 2 4-5M9 21h6M12 17v4"/></svg>;
    case 'flow': return <svg {...props}><circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 6c0 0 5 0 7 3l3 2M7 18c0 0 5 0 7-3l3-2"/></svg>;
    case 'class': return <svg {...props}><circle cx="9" cy="9" r="3"/><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="10" r="2.5"/><path d="M21 19c0-2.5-1.8-4.5-4-4.5"/></svg>;
    case 'bars': return <svg {...props}><rect x="4" y="13" width="4" height="7" rx="1"/><rect x="10" y="8" width="4" height="12" rx="1"/><rect x="16" y="4" width="4" height="16" rx="1"/></svg>;
    case 'wand': return <svg {...props}><path d="M14 4l-9 9-2 6 6-2 9-9z"/><path d="M12 6l4 4M18 4v3M20 6h-3M19 11v2M20 12h-2"/></svg>;
    case 'doc-plus': return <svg {...props}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 12v6M9 15h6"/></svg>;
    case 'gear': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 4.36 16.94l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case 'collapse': return <svg {...props}><path d="M15 6l-6 6 6 6"/></svg>;
    case 'expand': return <svg {...props}><path d="M9 6l6 6-6 6"/></svg>;
    case 'sidebar-collapse': return <svg {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 10l-3 2 3 2"/></svg>;
    case 'sidebar-expand': return <svg {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M12 10l3 2-3 2"/></svg>;
    case 'home': return <svg {...props}><path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/></svg>;
    case 'bell': return <svg {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 0 0 4 0"/></svg>;
    case 'star': return <svg {...props}><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9"/></svg>;
    case 'sparkle-square': return <svg {...props} viewBox="0 0 24 24"><path d="M12 4l1.2 3.8L17 9l-3.8 1.2L12 14l-1.2-3.8L7 9l3.8-1.2zM18 14l.7 1.8L20.5 16.5l-1.8.7L18 19l-.7-1.8L15.5 16.5l1.8-.7z" fill="currentColor" stroke="none"/></svg>;
    default: return null;
  }
};

const Card = ({ children, style = {}, onClick, className = '', interactive = false }) => (
  <div
    className={`pp-card ${interactive ? 'pp-card-int' : ''} ${className}`}
    onClick={onClick}
    style={style}
  >
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', size = 'md', onClick, icon, type = 'button', style = {}, disabled = false, full = false }) => {
  const cls = `pp-btn pp-btn-${variant} pp-btn-${size}${full ? ' pp-btn-full' : ''}`;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} style={style}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      <span>{children}</span>
    </button>
  );
};

// Subject-specific muted badge
const SubjectBadge = ({ subjectId, size = 'md' }) => {
  const s = SUBJECTS.find(x => x.id === subjectId);
  if (!s) return null;
  const small = size === 'sm';
  return (
    <span
      className="pp-subj"
      style={{
        background: `oklch(0.95 0.025 ${s.hue})`,
        color: `oklch(0.36 0.07 ${s.hue})`,
        padding: small ? '2px 8px' : '3px 10px',
        fontSize: small ? 11 : 12,
      }}
    >
      <span className="pp-subj-dot" style={{ background: `oklch(0.55 0.12 ${s.hue})` }}></span>
      {s.label}
    </span>
  );
};

const PHASE_BADGE_COLORS = {
  engagement: { bg: 'oklch(0.94 0.04 50)', fg: 'oklch(0.40 0.10 50)', dot: 'oklch(0.65 0.14 50)' },
  concept: { bg: 'oklch(0.94 0.03 240)', fg: 'oklch(0.40 0.09 240)', dot: 'oklch(0.60 0.13 240)' },
  practice: { bg: 'oklch(0.95 0.03 150)', fg: 'oklch(0.38 0.08 150)', dot: 'oklch(0.58 0.12 150)' },
  production: { bg: 'oklch(0.95 0.04 290)', fg: 'oklch(0.40 0.09 290)', dot: 'oklch(0.60 0.12 290)' },
  reflection: { bg: 'oklch(0.95 0.03 80)', fg: 'oklch(0.40 0.08 80)', dot: 'oklch(0.62 0.12 80)' },
};

const PhaseBadge = ({ kind }) => {
  const c = PHASE_BADGE_COLORS[kind] || PHASE_BADGE_COLORS.concept;
  const labels = { engagement: 'aktivace', concept: 'koncept', practice: 'cvičení', production: 'produkce', reflection: 'reflexe' };
  return (
    <span
      className="pp-phase-badge"
      style={{ background: c.bg, color: c.fg }}
    >
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.dot }}></span>
      {labels[kind] || kind}
    </span>
  );
};

const TYPE_BADGE_COLORS = {
  Worksheet: { bg: 'oklch(0.95 0.025 240)', fg: 'oklch(0.38 0.08 240)' },
  Game: { bg: 'oklch(0.94 0.04 30)', fg: 'oklch(0.42 0.10 30)' },
  Chatbot: { bg: 'oklch(0.94 0.04 290)', fg: 'oklch(0.40 0.10 290)' },
  Discussion: { bg: 'oklch(0.95 0.03 150)', fg: 'oklch(0.38 0.08 150)' },
};

const TypeBadge = ({ type }) => {
  const c = TYPE_BADGE_COLORS[type] || TYPE_BADGE_COLORS.Worksheet;
  return (
    <span className="pp-type-badge" style={{ background: c.bg, color: c.fg }}>
      {ACTIVITY_TYPE_LABELS[type] || type}
    </span>
  );
};

// Avatar with initials, hue derived from name
const Avatar = ({ name, initials, size = 40 }) => {
  const hue = [...name].reduce((h, ch) => (h + ch.charCodeAt(0)) % 360, 0);
  return (
    <div
      className="pp-avatar"
      style={{
        width: size, height: size,
        background: `oklch(0.92 0.04 ${hue})`,
        color: `oklch(0.32 0.08 ${hue})`,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
};

// Page header — title, subtitle, optional right slot
const PageHeader = ({ title, subtitle, right }) => (
  <div className="pp-pagehead">
    <div>
      <h1 className="pp-h1">{title}</h1>
      {subtitle && <p className="pp-sub">{subtitle}</p>}
    </div>
    {right && <div className="pp-pagehead-right">{right}</div>}
  </div>
);

// Modal overlay with content
const Modal = ({ open, onClose, title, children, width = 520 }) => {
  if (!open) return null;
  return (
    <div className="pp-modal-overlay" onClick={onClose}>
      <div className="pp-modal" style={{ width }} onClick={e => e.stopPropagation()}>
        <div className="pp-modal-head">
          <h2 className="pp-modal-title">{title}</h2>
          <button className="pp-iconbtn" onClick={onClose} aria-label="Zavřít">
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="pp-modal-body">{children}</div>
      </div>
    </div>
  );
};

// Form fields
const Field = ({ label, children, hint }) => (
  <label className="pp-field">
    <span className="pp-field-lbl">{label}</span>
    {children}
    {hint && <span className="pp-field-hint">{hint}</span>}
  </label>
);

const TextInput = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    className="pp-input"
    type={type}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

const Select = ({ value, onChange, options }) => (
  <div className="pp-select-wrap">
    <select className="pp-input pp-select" value={value} onChange={e => onChange(e.target.value)}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <Icon name="chevron-down" size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--pp-fg-3)' }} />
  </div>
);

// Segmented radio
const Segmented = ({ value, options, onChange }) => (
  <div className="pp-seg">
    {options.map(o => (
      <button
        key={o.value}
        type="button"
        className={`pp-seg-btn${value === o.value ? ' pp-seg-active' : ''}`}
        onClick={() => onChange(o.value)}
      >
        {o.label}
      </button>
    ))}
  </div>
);

// Progress bar
const Progress = ({ value, hue = 150 }) => (
  <div className="pp-prog">
    <div
      className="pp-prog-fill"
      style={{
        width: `${value}%`,
        background: `oklch(0.62 0.10 ${hue})`,
      }}
    />
  </div>
);

Object.assign(window, {
  Icon, Card, Button, SubjectBadge, PhaseBadge, TypeBadge, Avatar,
  PageHeader, Modal, Field, TextInput, Select, Segmented, Progress,
});
