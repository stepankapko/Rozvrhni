// Home / dashboard — Plánovač (the planner home view)

const HOME_WEEK_DAYS = ['Po', 'Út', 'St', 'Čt', 'Pá'];
const HOME_WEEK_DATES = ['11. 5.', '12. 5.', '13. 5.', '14. 5.', '15. 5.'];

// Today is 11. 5. 2026 (Po). Status: 'prepared' (green), 'partial' (amber), 'empty' (grey/red).
const HOME_WEEK_SCHEDULE = [
  // Po
  [
    { time: '8:00', subject: 'cestina', topic: 'Vyjmenovaná slova po B', status: 'prepared' },
    { time: '10:00', subject: 'matematika', topic: 'Desetinná čísla — úvod', status: 'prepared' },
  ],
  // Út
  [
    { time: '8:55', subject: 'cestina', topic: 'Stavba věty jednoduché', status: 'partial' },
    { time: '10:55', subject: 'dejepis', topic: 'Přemyslovci — opakování', status: 'prepared' },
  ],
  // St
  [
    { time: '8:00', subject: 'matematika', topic: 'Sčítání desetinných čísel', status: 'empty' },
    { time: '10:00', subject: 'obcanka', topic: 'Lidská práva — případové studie', status: 'partial' },
  ],
  // Čt
  [
    { time: '8:55', subject: 'cestina', topic: 'Slovní druhy — opakování', status: 'empty' },
    { time: '10:00', subject: 'dejepis', topic: 'Husitské války — úvod', status: 'empty' },
  ],
  // Pá
  [
    { time: '8:00', subject: 'matematika', topic: 'Procenta v praxi', status: 'empty' },
    { time: '8:55', subject: 'prirodopis', topic: 'Hmyz — anatomie', status: 'empty' },
  ],
];

const HOME_STATUS = {
  prepared: { dot: 'oklch(0.62 0.12 150)', soft: 'oklch(0.96 0.04 150)', line: 'oklch(0.85 0.08 150)', label: 'Připraveno' },
  partial:  { dot: 'oklch(0.72 0.14 75)',  soft: 'oklch(0.97 0.05 75)',  line: 'oklch(0.88 0.10 75)',  label: 'Rozpracováno' },
  empty:    { dot: 'oklch(0.78 0.01 270)', soft: 'oklch(0.985 0.003 270)', line: 'oklch(0.92 0.005 270)', label: 'Nepřipraveno' },
};

const HOME_RECENT = [
  { id: 1, kind: 'plan', title: 'Vyjmenovaná slova po B', subject: 'cestina', when: 'včera 16:42' },
  { id: 2, kind: 'worksheet', title: 'Desetinná čísla — 20 příkladů', subject: 'matematika', when: 'včera 14:10' },
  { id: 3, kind: 'quiz', title: 'Přemyslovci — kontrola', subject: 'dejepis', when: 'po 4. 5.' },
  { id: 4, kind: 'presentation', title: 'Lidská práva pro 6. třídu', subject: 'obcanka', when: 'pá 1. 5.' },
];

const HOME_KIND_ICON = {
  plan: 'planner', worksheet: 'doc-plus', quiz: 'flow', presentation: 'screen',
};
const HOME_KIND_LABEL = {
  plan: 'Plán hodiny', worksheet: 'Pracovní list', quiz: 'Kvíz', presentation: 'Prezentace',
};
const HOME_KIND_HUE = {
  plan: 150, worksheet: 240, quiz: 75, presentation: 290,
};
const HOME_KIND_TARGET = {
  plan: 'planner', worksheet: 'library', quiz: 'quizzes', presentation: 'decks',
};

function greeting() {
  const h = new Date().getHours();
  if (h < 10) return 'Dobré ráno';
  if (h < 17) return 'Dobré odpoledne';
  return 'Dobrý večer';
}

function HomePage({ onNavigate }) {
  // Count unprepared / partial for greeting subtitle
  let unprepared = 0, partial = 0;
  HOME_WEEK_SCHEDULE.forEach(d => d.forEach(l => {
    if (l.status === 'empty') unprepared++;
    if (l.status === 'partial') partial++;
  }));

  // Most urgent unprepared lesson (earliest day, earliest time)
  let urgent = null, urgentDay = -1;
  outer: for (let d = 0; d < HOME_WEEK_SCHEDULE.length; d++) {
    for (const lesson of HOME_WEEK_SCHEDULE[d]) {
      if (lesson.status === 'empty') {
        urgent = lesson; urgentDay = d; break outer;
      }
    }
  }

  const dismissAi = (e) => {
    const card = e.currentTarget.closest('.pp-home-ai-card');
    if (card) card.style.display = 'none';
  };

  return (
    <div className="pp-page pp-home">
      <header className="pp-home-head">
        <h1 className="pp-home-greet">{greeting()}, Marie.</h1>
        <p className="pp-home-greet-sub">
          {unprepared > 0 ? (
            <>Tento týden máte <strong>{unprepared}</strong>{' '}
            {unprepared === 1 ? 'nepřipravenou hodinu' : unprepared < 5 ? 'nepřipravené hodiny' : 'nepřipravených hodin'}
            {partial > 0 && <> a <strong>{partial}</strong> rozpracovan{partial === 1 ? 'ou' : 'é'}</>}.</>
          ) : (<>Všechny hodiny v tomto týdnu jsou připravené. Hezký týden!</>)}
        </p>
      </header>

      {/* Most urgent unprepared lesson */}
      {urgent && (
        <div className="pp-home-urgent">
          <div className="pp-home-urgent-stripe" />
          <div className="pp-home-urgent-content">
            <div className="pp-home-urgent-eyebrow">
              <span className="pp-home-urgent-pill">
                <span className="pp-home-urgent-pulse" />
                Nejbližší nepřipravená
              </span>
              <span className="pp-home-urgent-when">
                <Icon name="clock" size={13} />
                {HOME_WEEK_DAYS[urgentDay]} {HOME_WEEK_DATES[urgentDay]} · {urgent.time}
              </span>
            </div>
            <h2 className="pp-home-urgent-title">{urgent.topic}</h2>
            <div className="pp-home-urgent-meta">
              <SubjectBadge subjectId={urgent.subject} />
              <span className="pp-dot-sep">·</span>
              <span>6.A · 45 min</span>
            </div>
          </div>
          <div className="pp-home-urgent-actions">
            <Button icon="sparkle" onClick={() => onNavigate && onNavigate('planner')}>
              Připravit hodinu
            </Button>
            <button className="pp-home-link" onClick={() => onNavigate && onNavigate('planner')}>
              Odložit
            </button>
          </div>
        </div>
      )}

      {/* Week grid */}
      <section className="pp-home-card">
        <div className="pp-home-card-head">
          <div>
            <h2 className="pp-home-section-title">Tento týden</h2>
            <p className="pp-home-section-sub">Pondělí 11. 5. – Pátek 15. 5.</p>
          </div>
          <div className="pp-home-legend">
            <span className="pp-home-leg"><span className="pp-home-leg-dot" style={{ background: HOME_STATUS.prepared.dot }} />Připraveno</span>
            <span className="pp-home-leg"><span className="pp-home-leg-dot" style={{ background: HOME_STATUS.partial.dot }} />Rozpracováno</span>
            <span className="pp-home-leg"><span className="pp-home-leg-dot" style={{ background: HOME_STATUS.empty.dot, outline: '1px solid var(--pp-line-2)', outlineOffset: -1 }} />Nepřipraveno</span>
          </div>
        </div>
        <div className="pp-home-week">
          {HOME_WEEK_SCHEDULE.map((lessons, di) => {
            const isToday = di === 0;
            return (
              <div key={di} className={`pp-home-day${isToday ? ' pp-home-day-today' : ''}`}>
                <div className="pp-home-day-head">
                  <span className="pp-home-day-name">{HOME_WEEK_DAYS[di]}</span>
                  <span className="pp-home-day-date">{HOME_WEEK_DATES[di]}</span>
                  {isToday && <span className="pp-home-today-pill">dnes</span>}
                </div>
                <div className="pp-home-day-list">
                  {lessons.map((l, li) => {
                    const sc = HOME_STATUS[l.status];
                    const subj = SUBJECTS.find(s => s.id === l.subject);
                    return (
                      <button
                        key={li}
                        className={`pp-home-lesson pp-home-lesson-${l.status}`}
                        onClick={() => onNavigate && onNavigate('planner')}
                        title={`${sc.label} · ${l.topic}`}
                        style={{ borderColor: sc.line, background: sc.soft }}
                      >
                        <span className="pp-home-lesson-time">{l.time}</span>
                        <span className="pp-home-lesson-subj" style={{
                          background: `oklch(0.96 0.02 ${subj.hue})`,
                          color: `oklch(0.32 0.08 ${subj.hue})`,
                          borderColor: `oklch(0.88 0.04 ${subj.hue})`,
                        }}>{subj.short}</span>
                        <span className="pp-home-lesson-topic">{l.topic}</span>
                        <span className="pp-home-lesson-dot" style={{
                          background: sc.dot,
                          outline: l.status === 'empty' ? '1px solid var(--pp-line-2)' : 'none',
                          outlineOffset: -1,
                        }} />
                      </button>
                    );
                  })}
                  {lessons.length === 0 && <div className="pp-home-day-empty">Volný den</div>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom row: recent + AI suggestions */}
      <div className="pp-home-grid-2">
        <section className="pp-home-card">
          <div className="pp-home-card-head">
            <h2 className="pp-home-section-title">Naposledy upraveno</h2>
            <button className="pp-home-link" onClick={() => onNavigate && onNavigate('library')}>
              Knihovna
              <Icon name="arrow-right" size={12} />
            </button>
          </div>
          <ul className="pp-home-recent">
            {HOME_RECENT.map(it => (
              <li key={it.id}>
                <button className="pp-home-recent-row" onClick={() => onNavigate && onNavigate(HOME_KIND_TARGET[it.kind])}>
                  <span className="pp-home-recent-icon" style={{
                    background: `oklch(0.96 0.03 ${HOME_KIND_HUE[it.kind]})`,
                    color: `oklch(0.38 0.10 ${HOME_KIND_HUE[it.kind]})`,
                  }}>
                    <Icon name={HOME_KIND_ICON[it.kind]} size={14} />
                  </span>
                  <span className="pp-home-recent-body">
                    <span className="pp-home-recent-title">{it.title}</span>
                    <span className="pp-home-recent-meta">
                      <SubjectBadge subjectId={it.subject} size="sm" />
                      <span className="pp-dot-sep">·</span>
                      <span>{HOME_KIND_LABEL[it.kind]}</span>
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

        <section className="pp-home-card pp-home-ai-section">
          <div className="pp-home-card-head">
            <h2 className="pp-home-section-title">
              <span className="pp-home-spark">
                <Icon name="sparkle" size={12} />
              </span>
              Návrhy pro vás
            </h2>
          </div>
          <div className="pp-home-ai-list">
            <div className="pp-home-ai-card">
              <p className="pp-home-ai-text">
                Ve <strong>čtvrtek</strong> máte <strong>Dějepis</strong> — chcete, abych vám připravila plán na <em>Husitské války — úvod</em>?
              </p>
              <div className="pp-home-ai-actions">
                <Button size="sm" icon="sparkle" onClick={() => onNavigate && onNavigate('planner')}>
                  Vygenerovat plán
                </Button>
                <button className="pp-home-link pp-home-ai-dismiss" onClick={dismissAi}>Skrýt</button>
              </div>
            </div>
            <div className="pp-home-ai-card">
              <p className="pp-home-ai-text">
                Pracovní list <em>Sčítání desetinných čísel</em> už máte v knihovně. Přidat ho do <strong>středeční</strong> hodiny?
              </p>
              <div className="pp-home-ai-actions">
                <Button size="sm" variant="ghost" icon="plus">
                  Přidat k hodině
                </Button>
                <button className="pp-home-link pp-home-ai-dismiss" onClick={dismissAi}>Skrýt</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

window.HomePage = HomePage;
