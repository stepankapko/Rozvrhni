// Lesson Planner page

const KIND_ICONS = {
  worksheet: 'doc-plus',
  presentation: 'screen',
  quiz: 'flow',
  game: 'books',
  chatbot: 'books',
  discussion: 'books',
};
const KIND_LABELS = {
  worksheet: 'Pracovní list',
  presentation: 'Prezentace',
  quiz: 'Kvíz',
  game: 'Hra',
  chatbot: 'Chatbot',
  discussion: 'Diskuze',
};
const KIND_HUES = {
  worksheet: '#dbeafe',
  presentation: '#fce7f3',
  quiz: '#fef3c7',
  game: '#fed7aa',
  chatbot: '#e0e7ff',
  discussion: '#d1fae5',
};

function LessonPlannerPage() {
  const [subject, setSubject] = React.useState('cestina');
  const [topic, setTopic] = React.useState('Vyjmenovaná slova po B');
  const [length, setLength] = React.useState(45);
  const [focus, setFocus] = React.useState('new');
  const [frameworkId, setFrameworkId] = React.useState('classic');
  const [plan, setPlan] = React.useState(null);
  const [generating, setGenerating] = React.useState(false);
  const [savedFlash, setSavedFlash] = React.useState(false);
  const [attached, setAttached] = React.useState({}); // phaseIdx -> [materialIds]
  const [dismissed, setDismissed] = React.useState({}); // phaseIdx -> Set(materialIds)

  const framework = FRAMEWORKS.find(f => f.id === frameworkId) || FRAMEWORKS[0];

  const generate = (e) => {
    e?.preventDefault();
    setGenerating(true);
    setPlan(null);
    setAttached({});
    setDismissed({});
    setSavedFlash(false);
    setTimeout(() => {
      // Scale phase weights to fit requested length
      const tpl = framework.phases;
      const totalW = tpl.reduce((s, p) => s + p.weight, 0);
      let acc = 0;
      const phases = tpl.map((p, i) => {
        const mins = i === tpl.length - 1
          ? length - acc
          : Math.max(3, Math.round((p.weight / totalW) * length));
        const start = acc;
        acc += mins;
        return { ...p, minutes: mins, start, end: acc };
      });
      // Pre-pick top suggestion per phase
      const initAttached = {};
      phases.forEach((p, i) => {
        const sug = suggestForPhase({ phase: p, subject, topic, limit: 1 });
        if (sug[0]) initAttached[i] = [sug[0].id];
      });
      setAttached(initAttached);
      setPlan({ subject, topic, length, focus, framework, phases });
      setGenerating(false);
    }, 700);
  };

  const toggleAttach = (phaseIdx, matId) => {
    setAttached(prev => {
      const cur = prev[phaseIdx] || [];
      if (cur.includes(matId)) return { ...prev, [phaseIdx]: cur.filter(id => id !== matId) };
      return { ...prev, [phaseIdx]: [...cur, matId] };
    });
  };
  const dismissSug = (phaseIdx, matId) => {
    setDismissed(prev => ({ ...prev, [phaseIdx]: new Set([...(prev[phaseIdx] || []), matId]) }));
  };

  const savePlan = () => {
    if (!plan) return;
    // Collect all attached materials across phases
    const allMaterials = getAllMaterials();
    const attachmentIds = new Set();
    Object.values(attached).forEach(arr => arr.forEach(id => attachmentIds.add(id)));
    const attachments = [...attachmentIds].map(id => {
      const m = allMaterials.find(x => x.id === id);
      return m ? { id: m.id, title: m.title, kind: m.kind } : null;
    }).filter(Boolean);
    MyLessonsStore.add({
      topic: plan.topic,
      subject: plan.subject,
      length: plan.length,
      focus: plan.focus,
      frameworkId: plan.framework.id,
      phases: plan.phases.map(p => ({
        phase: p.phase, badge: p.badge, minutes: p.minutes, start: p.start, end: p.end,
        title: p.title, desc: p.desc,
      })),
      attachments,
    });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2200);
  };

  const fmt = (m) => {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    if (h === 0) return `0:${String(mm).padStart(2, '0')}`;
    return `${h}:${String(mm).padStart(2, '0')}`;
  };

  const competencies = COMPETENCIES_BY_SUBJECT[subject] || [];

  return (
    <div className="pp-page">
      <PageHeader
        title="Plánovač hodiny"
        subtitle="Vyberte rámec hodiny a téma — vygenerujeme strukturovaný plán s časováním a pokrytými kompetencemi."
      />

      <div className="pp-planner-grid">
        {/* Form column */}
        <Card style={{ padding: 24 }}>
          <form onSubmit={generate} className="pp-form">
            <div className="pp-form-section-lbl">Parametry hodiny</div>

            <Field label="Předmět">
              <Select
                value={subject}
                onChange={setSubject}
                options={SUBJECTS.map(s => ({ value: s.id, label: s.label }))}
              />
            </Field>

            <Field label="Téma" hint={'Konkrétní učivo, např. „Sčítání zlomků se stejným jmenovatelem".'}>
              <TextInput value={topic} onChange={setTopic} placeholder="Např. Stavba věty jednoduché" />
            </Field>

            <Field label="Délka hodiny">
              <Segmented
                value={String(length)}
                options={[
                  { value: '30', label: '30 min' },
                  { value: '45', label: '45 min' },
                  { value: '60', label: '60 min' },
                  { value: '90', label: '90 min' },
                ]}
                onChange={v => setLength(Number(v))}
              />
            </Field>

            <Field label="Typ hodiny">
              <Segmented
                value={focus}
                options={FOCUS_TYPES.map(f => ({ value: f.id, label: f.label }))}
                onChange={setFocus}
              />
            </Field>

            <Field label="Struktura hodiny" hint={framework.desc}>
              <div className="pp-fw-list">
                {FRAMEWORKS.map(f => {
                  const on = f.id === frameworkId;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFrameworkId(f.id)}
                      className={`pp-fw${on ? ' pp-fw-on' : ''}`}
                    >
                      <span className="pp-fw-radio">
                        <span className="pp-fw-radio-dot" />
                      </span>
                      <span className="pp-fw-body">
                        <span className="pp-fw-title">{f.label}</span>
                        <span className="pp-fw-phases">
                          {f.phases.map((p, i) => (
                            <React.Fragment key={i}>
                              {i > 0 && <span className="pp-fw-arrow">›</span>}
                              <span
                                className="pp-fw-pip"
                                style={{ background: PHASE_BADGE_COLORS[p.badge].dot }}
                                title={p.phase}
                              />
                              <span className="pp-fw-pip-lbl">{p.phase}</span>
                            </React.Fragment>
                          ))}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Field>

            <div className="pp-form-actions">
              <Button type="submit" icon="sparkle" full>
                {generating ? 'Vytvářím plán…' : 'Vygenerovat plán'}
              </Button>
            </div>

            <div className="pp-form-foot">
              <Icon name="check-circle" size={14} />
              <span>Plán respektuje RVP pro 6. ročník 2. stupně.</span>
            </div>
          </form>
        </Card>

        {/* Plan column */}
        <div className="pp-plan-col">
          {!plan && !generating && (
            <Card style={{ padding: 40, textAlign: 'center', minHeight: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--pp-fg-3)' }}>
              <div className="pp-empty-icon"><Icon name="planner" size={28} /></div>
              <p style={{ marginTop: 16, maxWidth: 360, textWrap: 'pretty' }}>
                Vyplňte parametry a vygenerujte strukturovaný plán hodiny podle vybraného pedagogického rámce.
              </p>
            </Card>
          )}

          {generating && (
            <Card style={{ padding: 40, minHeight: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, color: 'var(--pp-fg-2)' }}>
              <div className="pp-spinner" />
              <span>Vytvářím plán pro „{topic}"…</span>
            </Card>
          )}

          {plan && !generating && (
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div className="pp-plan-head" style={{ borderBottom: '1px solid var(--pp-line)' }}>
                <div>
                  <div className="pp-plan-eyebrow">
                    <SubjectBadge subjectId={subject} />
                    <span className="pp-dot-sep">·</span>
                    <span>{length} min</span>
                    <span className="pp-dot-sep">·</span>
                    <span>{plan.framework.short}</span>
                    <span className="pp-dot-sep">·</span>
                    <span>{FOCUS_TYPES.find(f => f.id === focus).label}</span>
                  </div>
                  <h2 className="pp-plan-title">{plan.topic}</h2>
                </div>
                <Button size="sm" icon={savedFlash ? 'check' : 'plus'} onClick={savePlan}>
                  {savedFlash ? 'Uloženo do Mé lekce' : 'Uložit do knihovny'}
                </Button>
              </div>

              <div className="pp-phases">
                {plan.phases.map((p, i) => {
                  const attachedIds = attached[i] || [];
                  const dismissedSet = dismissed[i] || new Set();
                  const allSug = suggestForPhase({ phase: p, subject, topic, limit: 4 });
                  const visibleSug = allSug.filter(m => !dismissedSet.has(m.id));
                  return (
                    <div key={i} className="pp-phase">
                      <div className="pp-phase-time">
                        <span className="pp-phase-range">{fmt(p.start)}–{fmt(p.end)}</span>
                        <span className="pp-phase-mins">{p.minutes} min</span>
                      </div>
                      <div className="pp-phase-rail">
                        <span className="pp-phase-rail-dot" style={{ background: PHASE_BADGE_COLORS[p.badge].dot }}></span>
                        {i < plan.phases.length - 1 && <span className="pp-phase-rail-line" />}
                      </div>
                      <div className="pp-phase-body">
                        <div className="pp-phase-row">
                          <h3 className="pp-phase-title">{p.title}</h3>
                          <PhaseBadge kind={p.badge} />
                        </div>
                        <div className="pp-phase-meta">{p.phase}</div>
                        <p className="pp-phase-desc">{p.desc}</p>

                        {visibleSug.length > 0 && (
                          <div className="pp-sug-block">
                            <div className="pp-sug-head">
                              <Icon name="sparkle" size={12} />
                              <span>Návrhy z knihovny</span>
                            </div>
                            <div className="pp-sug-list">
                              {visibleSug.map(m => {
                                const isOn = attachedIds.includes(m.id);
                                return (
                                  <div key={m.id} className={`pp-sug-row${isOn ? ' pp-sug-on' : ''}`}>
                                    <span className="pp-sug-icon" style={{ background: KIND_HUES[m.kind] || '#eef0f5' }}>
                                      <Icon name={KIND_ICONS[m.kind] || 'doc-plus'} size={13} />
                                    </span>
                                    <div className="pp-sug-body">
                                      <div className="pp-sug-title">{m.title}</div>
                                      <div className="pp-sug-meta">{KIND_LABELS[m.kind] || m.kind}{m.duration ? ` · ${m.duration}` : ''}{m.pages ? ` · ${m.pages} stran` : ''}{m.slides ? ` · ${m.slides} slidů` : ''}{m.questions ? ` · ${m.questions} otázek` : ''}</div>
                                    </div>
                                    <div className="pp-sug-actions">
                                      {isOn ? (
                                        <button className="pp-sug-btn pp-sug-btn-on" onClick={() => toggleAttach(i, m.id)} title="Odebrat z hodiny">
                                          <Icon name="check" size={13} />
                                          <span>Přidáno</span>
                                        </button>
                                      ) : (
                                        <button className="pp-sug-btn" onClick={() => toggleAttach(i, m.id)} title="Přidat do hodiny">
                                          <Icon name="plus" size={13} />
                                          <span>Přidat</span>
                                        </button>
                                      )}
                                      <button className="pp-sug-x" onClick={() => dismissSug(i, m.id)} title="Skrýt návrh">×</button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pp-plan-foot">
                <div className="pp-foot-lbl">Pokryté klíčové kompetence (RVP)</div>
                <div className="pp-comp-tags">
                  {competencies.map(c => (
                    <span key={c} className="pp-comp-tag">
                      <Icon name="check" size={12} />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

window.LessonPlannerPage = LessonPlannerPage;
