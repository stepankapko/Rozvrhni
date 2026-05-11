// Dashboard — Home page (Quizlet-inspired tile launcher)

const DASH_SHORTCUTS = [
  { id: 'planner', label: 'Plánovač',     sub: 'Týdenní rozvrh',     icon: 'planner', hue: 240 },
  { id: 'newlesson', label: 'Nová hodina', sub: 'Naplánovat výuku',   icon: 'plans',   hue: 150 },
  { id: 'library',  label: 'Knihovna',     sub: 'Aktivity a materiály', icon: 'books',  hue: 75 },
  { id: 'decks',    label: 'Prezentace',   sub: 'Slajdy pro výuku',   icon: 'screen',  hue: 290 },
  { id: 'quizzes',  label: 'Kvízy',        sub: 'Živé i samostatné',  icon: 'flow',    hue: 25 },
  { id: 'students', label: 'Třída 6.A',    sub: '28 žáků',            icon: 'class',   hue: 200 },
];

const DASH_RECENT = [
  { id: 1, kind: 'plan',         title: 'Vyjmenovaná slova po B',        subject: 'cestina',    when: 'včera 16:42', target: 'planner' },
  { id: 2, kind: 'worksheet',    title: 'Desetinná čísla — 20 příkladů', subject: 'matematika', when: 'včera 14:10', target: 'library' },
  { id: 3, kind: 'quiz',         title: 'Přemyslovci — kontrola',         subject: 'dejepis',    when: 'po 4. 5.',     target: 'quizzes' },
  { id: 4, kind: 'presentation', title: 'Lidská práva pro 6. třídu',     subject: 'obcanka',    when: 'pá 1. 5.',     target: 'decks' },
];

const DASH_KIND_ICON = { plan: 'planner', worksheet: 'doc-plus', quiz: 'flow', presentation: 'screen' };
const DASH_KIND_LABEL = { plan: 'Plán hodiny', worksheet: 'Pracovní list', quiz: 'Kvíz', presentation: 'Prezentace' };
const DASH_KIND_HUE = { plan: 150, worksheet: 240, quiz: 75, presentation: 290 };

const DASH_TODAY = [
  { time: '8:00',  subject: 'cestina',    topic: 'Vyjmenovaná slova po B',  status: 'prepared' },
  { time: '10:00', subject: 'matematika', topic: 'Desetinná čísla — úvod',  status: 'prepared' },
];

const DASH_STATUS_COLOR = {
  prepared: 'oklch(0.62 0.12 150)',
  partial:  'oklch(0.72 0.14 75)',
  empty:    'oklch(0.78 0.01 270)',
};

function dashGreeting() {
  const h = new Date().getHours();
  if (h < 10) return 'Dobré ráno';
  if (h < 17) return 'Dobré odpoledne';
  return 'Dobrý večer';
}

function DashboardPage({ onNavigate }) {
  return (
    <div className="pp-page pp-dash">
      {/* Hero greeting */}
      <header className="pp-dash-hero">
        <div className="pp-dash-hero-text">
          <p className="pp-dash-eyebrow">Pondělí · 11. května 2026</p>
          <h1 className="pp-dash-greet">{dashGreeting()}, Marie 👋</h1>
          <p className="pp-dash-sub">
            Máte <strong>2 hodiny</strong> dnes a <strong>4 nepřipravené</strong> tento týden.
          </p>
        </div>
        <div className="pp-dash-hero-cta">
          <Button icon="sparkle" size="lg" onClick={() => onNavigate('newlesson')}>
            Vytvořit hodinu
          </Button>
          <button className="pp-dash-ghost-cta" onClick={() => onNavigate('planner')}>
            <Icon name="planner" size={15} />
            Otevřít plánovač
          </button>
        </div>
      </header>

      {/* Shortcut tiles */}
      <section className="pp-dash-section">
        <div className="pp-dash-section-head">
          <h2 className="pp-dash-section-title">Rychlý přístup</h2>
        </div>
        <div className="pp-dash-tiles">
          {DASH_SHORTCUTS.map(s => (
            <button
              key={s.id}
              className="pp-dash-tile"
              onClick={() => onNavigate(s.id)}
              style={{
                '--tile-bg': `oklch(0.97 0.025 ${s.hue})`,
                '--tile-bg-hover': `oklch(0.94 0.04 ${s.hue})`,
                '--tile-fg': `oklch(0.38 0.10 ${s.hue})`,
                '--tile-icon-bg': `oklch(0.92 0.05 ${s.hue})`,
              }}
            >
              <span className="pp-dash-tile-icon">
                <Icon name={s.icon} size={22} />
              </span>
              <span className="pp-dash-tile-body">
                <span className="pp-dash-tile-label">{s.label}</span>
                <span className="pp-dash-tile-sub">{s.sub}</span>
              </span>
              <span className="pp-dash-tile-arrow">
                <Icon name="arrow-right" size={14} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Two-column: Today + Recent */}
      <div className="pp-dash-grid">
        <section className="pp-dash-card">
          <div className="pp-dash-card-head">
            <div>
              <h2 className="pp-dash-section-title">Dnešní hodiny</h2>
              <p className="pp-dash-card-sub">Pondělí 11. 5.</p>
            </div>
            <button className="pp-dash-link" onClick={() => onNavigate('planner')}>
              Celý týden <Icon name="arrow-right" size={12} />
            </button>
          </div>
          <ul className="pp-dash-today">
            {DASH_TODAY.map((l, i) => {
              const subj = SUBJECTS.find(s => s.id === l.subject);
              return (
                <li key={i}>
                  <button className="pp-dash-today-row" onClick={() => onNavigate('planner')}>
                    <span className="pp-dash-today-time">{l.time}</span>
                    <span className="pp-dash-today-body">
                      <span className="pp-dash-today-topic">{l.topic}</span>
                      <span className="pp-dash-today-meta">
                        <SubjectBadge subjectId={l.subject} size="sm" />
                        <span className="pp-dot-sep">·</span>
                        <span>6.A · 45 min</span>
                      </span>
                    </span>
                    <span className="pp-dash-today-status" style={{ background: DASH_STATUS_COLOR[l.status] }} title="Připraveno" />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="pp-dash-upcoming">
            <span className="pp-dash-upcoming-lbl">Zítra</span>
            <span className="pp-dash-upcoming-count">2 hodiny · 1 rozpracovaná</span>
          </div>
        </section>

        <section className="pp-dash-card">
          <div className="pp-dash-card-head">
            <h2 className="pp-dash-section-title">Naposledy upraveno</h2>
            <button className="pp-dash-link" onClick={() => onNavigate('library')}>
              Knihovna <Icon name="arrow-right" size={12} />
            </button>
          </div>
          <ul className="pp-dash-recent">
            {DASH_RECENT.map(it => (
              <li key={it.id}>
                <button className="pp-dash-recent-row" onClick={() => onNavigate(it.target)}>
                  <span
                    className="pp-dash-recent-icon"
                    style={{
                      background: `oklch(0.96 0.03 ${DASH_KIND_HUE[it.kind]})`,
                      color: `oklch(0.38 0.10 ${DASH_KIND_HUE[it.kind]})`,
                    }}
                  >
                    <Icon name={DASH_KIND_ICON[it.kind]} size={14} />
                  </span>
                  <span className="pp-dash-recent-body">
                    <span className="pp-dash-recent-title">{it.title}</span>
                    <span className="pp-dash-recent-meta">
                      <SubjectBadge subjectId={it.subject} size="sm" />
                      <span className="pp-dot-sep">·</span>
                      <span>{DASH_KIND_LABEL[it.kind]}</span>
                      <span className="pp-dot-sep">·</span>
                      <span>{it.when}</span>
                    </span>
                  </span>
                  <Icon name="chevron-right" size={14} style={{ color: 'var(--pp-fg-3)' }} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* AI suggestion banner */}
      <section className="pp-dash-banner">
        <div className="pp-dash-banner-icon">
          <Icon name="sparkle" size={18} />
        </div>
        <div className="pp-dash-banner-body">
          <h3 className="pp-dash-banner-title">Návrh: připravit čtvrteční dějepis</h3>
          <p className="pp-dash-banner-text">
            Ve čtvrtek máte <strong>Husitské války — úvod</strong>. Můžu vygenerovat plán hodiny a navrhnout pracovní list.
          </p>
        </div>
        <div className="pp-dash-banner-actions">
          <Button size="sm" icon="sparkle" onClick={() => onNavigate('newlesson')}>Vygenerovat</Button>
          <button className="pp-dash-link">Skrýt</button>
        </div>
      </section>
    </div>
  );
}

window.DashboardPage = DashboardPage;
