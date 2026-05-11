// Knihovna materiálů — tabbed library: my lessons + activities + worksheets + presentations + quizzes

const LIBRARY_TABS = [
  { id: 'lessons', label: 'Moje lekce', icon: 'plans' },
  { id: 'activities', label: 'Aktivity', icon: 'books' },
  { id: 'worksheets', label: 'Pracovní listy', icon: 'doc-plus' },
  { id: 'presentations', label: 'Prezentace', icon: 'screen' },
  { id: 'quizzes', label: 'Kvízy', icon: 'flow' },
];

function LibraryPage({ openLesson, onNavigate }) {
  const [tab, setTab] = React.useState('lessons');
  const [query, setQuery] = React.useState('');

  return (
    <div className="pp-page">
      <PageHeader
        title="Knihovna materiálů"
        subtitle="Vaše lekce, aktivity, pracovní listy, prezentace a kvízy — vše na jednom místě."
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" icon="plus" onClick={() => onNavigate?.('planner')}>Nová lekce</Button>
            <Button icon="sparkle" onClick={() => onNavigate?.('planner')}>Vytvořit z AI</Button>
          </div>
        }
      />

      <div className="pp-lib-tabs">
        {LIBRARY_TABS.map(t => {
          const on = t.id === tab;
          let count = 0;
          if (t.id === 'lessons') count = MyLessonsStore.list.length;
          else if (t.id === 'activities') count = ACTIVITIES.length;
          else if (t.id === 'worksheets') count = WORKSHEETS.length;
          else if (t.id === 'presentations') count = PRESENTATIONS.length;
          else if (t.id === 'quizzes') count = QUIZZES.length;
          return (
            <button
              key={t.id}
              className={`pp-lib-tab${on ? ' pp-lib-tab-on' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <Icon name={t.icon} size={15} />
              <span>{t.label}</span>
              <span className="pp-lib-tab-count">{count}</span>
            </button>
          );
        })}
        <div className="pp-lib-search">
          <Icon name="search" size={15} style={{ color: 'var(--pp-fg-3)' }} />
          <input
            className="pp-search-input"
            placeholder={`Hledat v ${LIBRARY_TABS.find(t => t.id === tab)?.label.toLowerCase()}…`}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {tab === 'lessons'       && <MyLessonsTab query={query} openLesson={openLesson} onNavigate={onNavigate} />}
      {tab === 'activities'    && <ActivitiesTab query={query} />}
      {tab === 'worksheets'    && <WorksheetsTab query={query} />}
      {tab === 'presentations' && <PresentationsTab query={query} />}
      {tab === 'quizzes'       && <QuizzesTab query={query} />}
    </div>
  );
}

// ─── Moje lekce ───────────────────────────────────────────────────────────────

function MyLessonsTab({ query, openLesson, onNavigate }) {
  const lessons = useMyLessons();
  const [subjectFilter, setSubjectFilter] = React.useState('all');

  const filtered = lessons.filter(l => {
    if (subjectFilter !== 'all' && l.subject !== subjectFilter) return false;
    if (query && !l.topic.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const totalMin = lessons.reduce((s, l) => s + l.length, 0);

  return (
    <>
      <div className="pp-lib-stats">
        <div className="pp-stat-tile">
          <div className="pp-stat-val">{lessons.length}</div>
          <div className="pp-stat-lbl">uložených lekcí</div>
        </div>
        <div className="pp-stat-tile">
          <div className="pp-stat-val">{totalMin} min</div>
          <div className="pp-stat-lbl">celková délka</div>
        </div>
        <div className="pp-stat-tile">
          <div className="pp-stat-val">{new Set(lessons.map(l => l.subject)).size}</div>
          <div className="pp-stat-lbl">předmětů pokryto</div>
        </div>
      </div>

      <div className="pp-subject-strip">
        <button className={`pp-chip${subjectFilter === 'all' ? ' pp-chip-on' : ''}`} onClick={() => setSubjectFilter('all')}>Vše</button>
        {SUBJECTS.map(s => (
          <button key={s.id} className={`pp-chip${subjectFilter === s.id ? ' pp-chip-on' : ''}`} onClick={() => setSubjectFilter(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card style={{ padding: 56, textAlign: 'center', color: 'var(--pp-fg-3)' }}>
          <div className="pp-empty-icon"><Icon name="planner" size={28} /></div>
          <p style={{ marginTop: 14, marginBottom: 18, textWrap: 'pretty', maxWidth: 380, marginInline: 'auto' }}>
            Zatím nemáte žádné uložené lekce. Vygenerujte si plán v Plánovači a uložte ho sem.
          </p>
          <Button icon="sparkle" onClick={() => onNavigate?.('planner')}>Otevřít plánovač</Button>
        </Card>
      ) : (
        <div className="pp-lesson-grid">
          {filtered.map(l => (
            <LessonCard key={l.id} lesson={l} onOpen={() => openLesson?.(l)} />
          ))}
        </div>
      )}
    </>
  );
}

function LessonCard({ lesson, onOpen }) {
  const fw = FRAMEWORKS.find(f => f.id === lesson.frameworkId);
  const focusLbl = FOCUS_TYPES.find(f => f.id === lesson.focus)?.label;
  const daysAgo = Math.floor((Date.now() - lesson.savedAt) / (1000 * 60 * 60 * 24));
  const dateLbl = daysAgo === 0 ? 'dnes' : daysAgo === 1 ? 'včera' : `před ${daysAgo} dny`;

  return (
    <Card interactive onClick={onOpen} style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="pp-lesson-phaseribbon">
        {lesson.phases.map((p, i) => (
          <div
            key={i}
            className="pp-lesson-phaseribbon-seg"
            style={{
              flex: p.minutes,
              background: PHASE_BADGE_COLORS[p.badge].dot,
            }}
            title={`${p.phase} · ${p.minutes} min`}
          />
        ))}
      </div>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <SubjectBadge subjectId={lesson.subject} size="sm" />
          <span style={{ fontSize: 12, color: 'var(--pp-fg-3)' }}>uloženo {dateLbl}</span>
        </div>
        <h3 className="pp-lesson-title">{lesson.topic}</h3>
        <div className="pp-lesson-meta-row">
          <span className="pp-meta"><Icon name="clock" size={13} />{lesson.length} min</span>
          <span className="pp-meta"><Icon name="planner" size={13} />{fw?.short || ''}</span>
          <span className="pp-meta">{focusLbl}</span>
        </div>
        {lesson.attachments?.length > 0 && (
          <div className="pp-lesson-attachments">
            {lesson.attachments.slice(0, 3).map(a => (
              <span key={a.id} className="pp-attach-chip" title={a.title}>
                <Icon name={ATTACH_ICONS[a.kind] || 'doc-plus'} size={12} />
                <span>{a.title.length > 28 ? a.title.slice(0, 26) + '…' : a.title}</span>
              </span>
            ))}
            {lesson.attachments.length > 3 && (
              <span className="pp-attach-chip">+{lesson.attachments.length - 3}</span>
            )}
          </div>
        )}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
          <span className="pp-act-cta">Otevřít<Icon name="arrow-right" size={13} /></span>
        </div>
      </div>
    </Card>
  );
}

const ATTACH_ICONS = {
  worksheet: 'doc-plus',
  presentation: 'screen',
  quiz: 'flow',
  game: 'books',
  chatbot: 'books',
  discussion: 'books',
};

// ─── Aktivity ─────────────────────────────────────────────────────────────────

function ActivitiesTab({ query }) {
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [subjectFilter, setSubjectFilter] = React.useState('all');
  const [opened, setOpened] = React.useState(null);

  const filtered = ACTIVITIES.filter(a => {
    if (typeFilter !== 'all' && a.type !== typeFilter) return false;
    if (subjectFilter !== 'all' && a.subject !== subjectFilter) return false;
    if (query && !a.title.toLowerCase().includes(query.toLowerCase()) && !a.desc.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Card style={{ padding: 14, marginBottom: 18 }}>
        <div className="pp-filterbar">
          <div className="pp-filter-group">
            <span className="pp-filter-lbl">Typ</span>
            <div className="pp-chips">
              <button className={`pp-chip${typeFilter === 'all' ? ' pp-chip-on' : ''}`} onClick={() => setTypeFilter('all')}>Vše</button>
              {ACTIVITY_TYPES.map(t => (
                <button key={t} className={`pp-chip${typeFilter === t ? ' pp-chip-on' : ''}`} onClick={() => setTypeFilter(t)}>
                  {ACTIVITY_TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
          <div className="pp-filter-group">
            <span className="pp-filter-lbl">Předmět</span>
            <div className="pp-chips">
              <button className={`pp-chip${subjectFilter === 'all' ? ' pp-chip-on' : ''}`} onClick={() => setSubjectFilter('all')}>Vše</button>
              {SUBJECTS.map(s => (
                <button key={s.id} className={`pp-chip${subjectFilter === s.id ? ' pp-chip-on' : ''}`} onClick={() => setSubjectFilter(s.id)}>
                  {s.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="pp-act-grid">
        {filtered.map(a => (
          <Card key={a.id} interactive onClick={() => setOpened(a)} style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 180 }}>
            <div className="pp-act-head">
              <TypeBadge type={a.type} />
              <SubjectBadge subjectId={a.subject} size="sm" />
            </div>
            <h3 className="pp-act-title">{a.title}</h3>
            <p className="pp-act-desc">{a.desc}</p>
            <div className="pp-act-foot">
              <span className="pp-meta"><Icon name="clock" size={13} />{a.duration}</span>
              <span className="pp-act-cta">Otevřít<Icon name="arrow-right" size={13} /></span>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card style={{ padding: 40, textAlign: 'center', gridColumn: '1 / -1', color: 'var(--pp-fg-3)' }}>
            Žádné aktivity neodpovídají filtru.
          </Card>
        )}
      </div>

      <Modal open={!!opened} onClose={() => setOpened(null)} title={opened?.title || ''} width={560}>
        {opened && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <TypeBadge type={opened.type} />
              <SubjectBadge subjectId={opened.subject} size="sm" />
              <span className="pp-meta"><Icon name="clock" size={13} />{opened.duration}</span>
            </div>
            <p style={{ color: 'var(--pp-fg-2)', lineHeight: 1.55, margin: 0 }}>{opened.desc}</p>
            <div className="pp-act-detail-block">
              <div className="pp-foot-lbl">Materiály</div>
              <ul className="pp-bullet-list">
                <li>Pracovní list (PDF)</li>
                <li>Metodický pokyn pro učitele</li>
                <li>Klíč se správnými odpověďmi</li>
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', borderTop: '1px solid var(--pp-line)', paddingTop: 16 }}>
              <Button variant="ghost" onClick={() => setOpened(null)}>Zavřít</Button>
              <Button icon="plus">Přidat do hodiny</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

// ─── Pracovní listy ───────────────────────────────────────────────────────────

function WorksheetsTab({ query }) {
  const [subjectFilter, setSubjectFilter] = React.useState('all');

  const filtered = WORKSHEETS.filter(w => {
    if (subjectFilter !== 'all' && w.subject !== subjectFilter) return false;
    if (query && !w.title.toLowerCase().includes(query.toLowerCase()) && !w.topic.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="pp-subject-strip">
        <button className={`pp-chip${subjectFilter === 'all' ? ' pp-chip-on' : ''}`} onClick={() => setSubjectFilter('all')}>Vše</button>
        {SUBJECTS.map(s => (
          <button key={s.id} className={`pp-chip${subjectFilter === s.id ? ' pp-chip-on' : ''}`} onClick={() => setSubjectFilter(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="pp-worksheet-grid">
        {filtered.map(w => {
          const s = SUBJECTS.find(x => x.id === w.subject);
          return (
            <Card key={w.id} interactive style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div className="pp-ws-preview" style={{ background: `linear-gradient(160deg, oklch(0.97 0.012 ${s?.hue || 220}), oklch(0.93 0.022 ${s?.hue || 220}))` }}>
                <div className="pp-ws-paper">
                  <div className="pp-ws-line" style={{ width: '70%' }} />
                  <div className="pp-ws-line pp-ws-line-thin" style={{ width: '90%' }} />
                  <div className="pp-ws-line pp-ws-line-thin" style={{ width: '85%' }} />
                  <div style={{ height: 8 }} />
                  <div className="pp-ws-line" style={{ width: '40%' }} />
                  <div className="pp-ws-line pp-ws-line-thin" style={{ width: '88%' }} />
                  <div className="pp-ws-line pp-ws-line-thin" style={{ width: '76%' }} />
                </div>
                <div className="pp-ws-pages-pill">{w.pages} {w.pages === 1 ? 'strana' : w.pages < 5 ? 'strany' : 'stran'}</div>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <SubjectBadge subjectId={w.subject} size="sm" />
                  <span style={{ fontSize: 12, color: 'var(--pp-fg-3)' }}>{w.level}</span>
                </div>
                <h3 className="pp-act-title" style={{ fontSize: 15 }}>{w.title}</h3>
                <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 8 }}>
                  <Button variant="ghost" size="sm" icon="arrow-right" full>Otevřít</Button>
                </div>
              </div>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card style={{ padding: 40, textAlign: 'center', gridColumn: '1 / -1', color: 'var(--pp-fg-3)' }}>
            Žádné pracovní listy neodpovídají filtru.
          </Card>
        )}
      </div>
    </>
  );
}

// ─── Prezentace ───────────────────────────────────────────────────────────────

function PresentationsTab({ query }) {
  const [subjectFilter, setSubjectFilter] = React.useState('all');

  const filtered = PRESENTATIONS.filter(p => {
    if (subjectFilter !== 'all' && p.subject !== subjectFilter) return false;
    if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const fmtDate = (d) => new Date(d).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long' });

  return (
    <>
      <div className="pp-subject-strip">
        <button className={`pp-chip${subjectFilter === 'all' ? ' pp-chip-on' : ''}`} onClick={() => setSubjectFilter('all')}>Vše</button>
        {SUBJECTS.map(s => (
          <button key={s.id} className={`pp-chip${subjectFilter === s.id ? ' pp-chip-on' : ''}`} onClick={() => setSubjectFilter(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="pp-deck-list">
        {filtered.map(p => {
          const s = SUBJECTS.find(x => x.id === p.subject);
          return (
            <Card key={p.id} interactive style={{ padding: 0, overflow: 'hidden' }}>
              <div className="pp-deck-row">
                <div className="pp-deck-thumb" style={{ background: `linear-gradient(135deg, oklch(0.94 0.025 ${s?.hue || 150}), oklch(0.97 0.01 ${s?.hue || 150}))` }}>
                  <div className="pp-deck-thumb-inner">
                    <div className="pp-deck-thumb-bar" style={{ width: '60%' }} />
                    <div className="pp-deck-thumb-bar" style={{ width: '40%' }} />
                    <div className="pp-deck-thumb-bar pp-deck-thumb-bar-thin" style={{ width: '80%' }} />
                    <div className="pp-deck-thumb-bar pp-deck-thumb-bar-thin" style={{ width: '70%' }} />
                  </div>
                </div>
                <div className="pp-deck-meta">
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <SubjectBadge subjectId={p.subject} size="sm" />
                    <span style={{ fontSize: 12, color: 'var(--pp-fg-3)' }}>{fmtDate(p.date)}</span>
                  </div>
                  <h3 className="pp-act-title" style={{ marginTop: 6 }}>{p.title}</h3>
                  <div className="pp-meta" style={{ marginTop: 4 }}>
                    <Icon name="screen" size={13} />{p.slides} slidů
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignSelf: 'center', marginRight: 16 }}>
                  <Button variant="ghost" size="sm">Otevřít</Button>
                </div>
              </div>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card style={{ padding: 40, textAlign: 'center', color: 'var(--pp-fg-3)' }}>
            Žádné prezentace neodpovídají filtru.
          </Card>
        )}
      </div>
    </>
  );
}

// ─── Kvízy ────────────────────────────────────────────────────────────────────

function QuizzesTab({ query }) {
  const [subjectFilter, setSubjectFilter] = React.useState('all');

  const filtered = QUIZZES.filter(q => {
    if (subjectFilter !== 'all' && q.subject !== subjectFilter) return false;
    if (query && !q.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="pp-subject-strip">
        <button className={`pp-chip${subjectFilter === 'all' ? ' pp-chip-on' : ''}`} onClick={() => setSubjectFilter('all')}>Vše</button>
        {SUBJECTS.map(s => (
          <button key={s.id} className={`pp-chip${subjectFilter === s.id ? ' pp-chip-on' : ''}`} onClick={() => setSubjectFilter(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="pp-quiz-grid">
        {filtered.map(q => (
          <Card key={q.id} interactive style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <SubjectBadge subjectId={q.subject} size="sm" />
              <span style={{ fontSize: 12, color: 'var(--pp-fg-3)' }}>naposledy {q.lastUsed}</span>
            </div>
            <h3 className="pp-act-title">{q.title}</h3>
            <div className="pp-meta"><Icon name="flow" size={13} />{q.questions} otázek</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <Button size="sm" icon="play" full>Spustit</Button>
              <Button size="sm" variant="ghost">Upravit</Button>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card style={{ padding: 40, textAlign: 'center', gridColumn: '1 / -1', color: 'var(--pp-fg-3)' }}>
            Žádné kvízy neodpovídají filtru.
          </Card>
        )}
      </div>
    </>
  );
}

// ─── Saved lesson detail modal ────────────────────────────────────────────────

function SavedLessonModal({ lesson, onClose }) {
  if (!lesson) return null;
  const fw = FRAMEWORKS.find(f => f.id === lesson.frameworkId);
  const focusLbl = FOCUS_TYPES.find(f => f.id === lesson.focus)?.label;
  const fmt = (m) => `${Math.floor(m/60)}:${String(m%60).padStart(2,'0')}`;

  return (
    <Modal open={!!lesson} onClose={onClose} title={lesson.topic} width={680}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <SubjectBadge subjectId={lesson.subject} size="sm" />
          <span className="pp-meta"><Icon name="clock" size={13} />{lesson.length} min</span>
          <span className="pp-meta">{fw?.label}</span>
          <span className="pp-meta">{focusLbl}</span>
        </div>

        <div className="pp-phases" style={{ padding: 0 }}>
          {lesson.phases.map((p, i) => (
            <div key={i} className="pp-phase">
              <div className="pp-phase-time">
                <span className="pp-phase-range">{fmt(p.start)}–{fmt(p.end)}</span>
                <span className="pp-phase-mins">{p.minutes} min</span>
              </div>
              <div className="pp-phase-rail">
                <span className="pp-phase-rail-dot" style={{ background: PHASE_BADGE_COLORS[p.badge].dot }} />
                {i < lesson.phases.length - 1 && <span className="pp-phase-rail-line" />}
              </div>
              <div className="pp-phase-body">
                <div className="pp-phase-row">
                  <h3 className="pp-phase-title">{p.title}</h3>
                  <PhaseBadge kind={p.badge} />
                </div>
                <div className="pp-phase-meta">{p.phase}</div>
                <p className="pp-phase-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {lesson.attachments?.length > 0 && (
          <div className="pp-act-detail-block">
            <div className="pp-foot-lbl">Připojené materiály</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {lesson.attachments.map(a => (
                <div key={a.id} className="pp-attach-row">
                  <Icon name={ATTACH_ICONS[a.kind] || 'doc-plus'} size={14} />
                  <span>{a.title}</span>
                  <span className="pp-attach-kind">{a.kind}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', borderTop: '1px solid var(--pp-line)', paddingTop: 16 }}>
          <Button variant="ghost" onClick={() => { MyLessonsStore.remove(lesson.id); onClose(); }}>Smazat</Button>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" onClick={onClose}>Zavřít</Button>
            <Button icon="play">Začít hodinu</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

window.LibraryPage = LibraryPage;
window.SavedLessonModal = SavedLessonModal;
// Keep old name for backwards compat with app.jsx routing
window.ActivityLibraryPage = LibraryPage;
