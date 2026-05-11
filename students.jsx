// Students page — roster + detail view

function StudentsPage() {
  const [selected, setSelected] = React.useState(null);
  const [query, setQuery] = React.useState('');

  const filtered = STUDENTS.filter(s => !query || s.name.toLowerCase().includes(query.toLowerCase()));
  const avgComp = (s) => Math.round((s.comp.kom + s.comp.kri + s.comp.spo + s.comp.gra) / 4);

  return (
    <div className="pp-page">
      <PageHeader
        title="Žáci 6. A"
        subtitle="Třídní přehled — kompetence, aktivita, výsledky."
        right={
          <div className="pp-class-tabs">
            <button className="pp-class-tab pp-class-tab-on">6. A</button>
            <button className="pp-class-tab">6. B</button>
            <button className="pp-class-tab">7. A</button>
          </div>
        }
      />

      <Card style={{ padding: 16, marginBottom: 20 }}>
        <div className="pp-stud-toolbar">
          <div className="pp-search" style={{ maxWidth: 320 }}>
            <Icon name="search" size={15} style={{ color: 'var(--pp-fg-3)' }} />
            <input className="pp-search-input" placeholder="Hledat žáka…" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="pp-stud-stats">
            <span className="pp-stud-stat"><b>{STUDENTS.length}</b><span>žáků</span></span>
            <span className="pp-stud-divider"></span>
            <span className="pp-stud-stat"><b>{Math.round(STUDENTS.reduce((s, x) => s + avgComp(x), 0) / STUDENTS.length)}%</b><span>průměrné kompetence</span></span>
            <span className="pp-stud-divider"></span>
            <span className="pp-stud-stat"><b>14</b><span>aktivit tento týden</span></span>
          </div>
        </div>
      </Card>

      <div className="pp-stud-grid">
        {filtered.map(s => (
          <Card key={s.id} interactive onClick={() => setSelected(s)} style={{ padding: 18 }}>
            <div className="pp-stud-head">
              <Avatar name={s.name} initials={s.initials} size={44} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="pp-stud-name">{s.name}</div>
                <div className="pp-stud-sub">průměr {avgComp(s)} %</div>
              </div>
            </div>
            <div className="pp-stud-bars">
              {COMPETENCIES.map((c, i) => (
                <div key={c.key} className="pp-stud-bar-row">
                  <span className="pp-stud-bar-lbl">{c.label}</span>
                  <Progress value={s.comp[c.key]} hue={150 + i * 35} />
                  <span className="pp-stud-bar-val">{s.comp[c.key]}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <StudentDetail student={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function StudentDetail({ student, onClose }) {
  if (!student) return null;
  const history = STUDENT_HISTORY[student.id] || STUDENT_HISTORY.default;
  const avg = Math.round((student.comp.kom + student.comp.kri + student.comp.spo + student.comp.gra) / 4);

  const kindMeta = {
    quiz: { icon: 'quiz', label: 'Kvíz' },
    worksheet: { icon: 'doc', label: 'Pracovní list' },
    discussion: { icon: 'students', label: 'Diskuze' },
    chatbot: { icon: 'sparkle', label: 'Chatbot' },
  };

  return (
    <div className="pp-drawer-overlay" onClick={onClose}>
      <div className="pp-drawer" onClick={e => e.stopPropagation()}>
        <div className="pp-drawer-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name={student.name} initials={student.initials} size={56} />
            <div>
              <h2 className="pp-drawer-title">{student.name}</h2>
              <div className="pp-drawer-sub">6. A · průměr kompetencí {avg} %</div>
            </div>
          </div>
          <button className="pp-iconbtn" onClick={onClose} aria-label="Zavřít">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="pp-drawer-body">
          <section className="pp-drawer-section">
            <h3 className="pp-section-title">Klíčové kompetence</h3>
            <div className="pp-comp-detail">
              {COMPETENCIES.map((c, i) => (
                <div key={c.key} className="pp-comp-detail-row">
                  <div className="pp-comp-detail-head">
                    <span>{c.label}</span>
                    <span className="pp-comp-detail-val">{student.comp[c.key]} %</span>
                  </div>
                  <Progress value={student.comp[c.key]} hue={150 + i * 35} />
                </div>
              ))}
            </div>
          </section>

          <section className="pp-drawer-section">
            <h3 className="pp-section-title">Nedávná aktivita</h3>
            <div className="pp-history">
              {history.map((h, i) => {
                const meta = kindMeta[h.kind] || kindMeta.worksheet;
                return (
                  <div key={i} className="pp-history-row">
                    <div className="pp-history-date">{h.date}</div>
                    <div className="pp-history-icon"><Icon name={meta.icon} size={15} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="pp-history-label">{h.label}</div>
                      <div className="pp-history-meta">
                        <span>{meta.label}</span>
                        <span className="pp-dot-sep">·</span>
                        <SubjectBadge subjectId={h.subject} size="sm" />
                      </div>
                    </div>
                    <div className="pp-history-score">{h.score}</div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="pp-drawer-section">
            <h3 className="pp-section-title">Doporučení</h3>
            <Card style={{ padding: 16, background: 'var(--pp-soft)', border: '1px solid var(--pp-line)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--pp-accent-soft)', color: 'var(--pp-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="sparkle" size={14} />
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--pp-fg-2)' }}>
                  Žák má slabší výsledky v <b>kritickém myšlení</b>. Doporučujeme aktivitu <b>„Procenta v reklamě"</b> — analýza reálných reklam podpoří argumentaci a porozumění číslům v kontextu.
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

window.StudentsPage = StudentsPage;
