// Presentations + Quizzes pages

function PresentationsPage() {
  const [items, setItems] = React.useState(PRESENTATIONS);
  const [showForm, setShowForm] = React.useState(false);
  const [topic, setTopic] = React.useState('');
  const [subject, setSubject] = React.useState('cestina');
  const [generating, setGenerating] = React.useState(false);

  const create = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const today = new Date();
      const date = today.toISOString().slice(0, 10);
      const slides = 12 + Math.floor(Math.random() * 14);
      setItems([{ id: 'np' + Date.now(), title: topic, subject, date, slides, isNew: true }, ...items]);
      setTopic('');
      setShowForm(false);
      setGenerating(false);
    }, 900);
  };

  const fmtDate = (d) => {
    const dt = new Date(d);
    return dt.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="pp-page">
      <PageHeader
        title="Prezentace"
        subtitle="Slide decky pro výuku — generujte z tématu nebo vytvořte ručně."
        right={<Button icon="sparkle" onClick={() => setShowForm(true)}>Nová prezentace</Button>}
      />

      <div className="pp-deck-list">
        {items.map(p => (
          <Card key={p.id} interactive style={{ padding: 0, overflow: 'hidden' }}>
            <div className="pp-deck-row">
              <div className="pp-deck-thumb" style={{ background: `linear-gradient(135deg, oklch(0.94 0.025 ${SUBJECTS.find(s => s.id === p.subject)?.hue || 150}), oklch(0.97 0.01 ${SUBJECTS.find(s => s.id === p.subject)?.hue || 150}))` }}>
                <div className="pp-deck-thumb-inner">
                  <div className="pp-deck-thumb-bar" style={{ width: '60%' }}></div>
                  <div className="pp-deck-thumb-bar" style={{ width: '40%' }}></div>
                  <div className="pp-deck-thumb-bar pp-deck-thumb-bar-thin" style={{ width: '80%' }}></div>
                  <div className="pp-deck-thumb-bar pp-deck-thumb-bar-thin" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="pp-deck-meta">
                <div className="pp-deck-meta-top">
                  <SubjectBadge subjectId={p.subject} size="sm" />
                  {p.isNew && <span className="pp-pill pp-pill-new">Nové</span>}
                </div>
                <h3 className="pp-deck-title">{p.title}</h3>
                <div className="pp-deck-foot">
                  <span className="pp-meta"><Icon name="deck" size={13} />{p.slides} snímků</span>
                  <span className="pp-meta"><Icon name="clock" size={13} />{fmtDate(p.date)}</span>
                </div>
              </div>
              <div className="pp-deck-actions">
                <Button variant="ghost" size="sm" icon="play">Spustit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Nová prezentace">
        <form onSubmit={create} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="Téma prezentace" hint="Co chcete žákům vysvětlit? Buďte konkrétní.">
            <TextInput value={topic} onChange={setTopic} placeholder="Např. Pravěk — život lovců a sběračů" />
          </Field>
          <Field label="Předmět">
            <Select value={subject} onChange={setSubject} options={SUBJECTS.map(s => ({ value: s.id, label: s.label }))} />
          </Field>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', borderTop: '1px solid var(--pp-line)', paddingTop: 16 }}>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Zrušit</Button>
            <Button type="submit" icon="sparkle" disabled={!topic.trim() || generating}>
              {generating ? 'Generuji…' : 'Vytvořit prezentaci'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function QuizzesPage() {
  const [items, setItems] = React.useState(QUIZZES);
  const [launching, setLaunching] = React.useState(null);
  const [creating, setCreating] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newSubject, setNewSubject] = React.useState('cestina');
  const [newCount, setNewCount] = React.useState(10);
  const [participants, setParticipants] = React.useState(0);

  React.useEffect(() => {
    if (!launching) { setParticipants(0); return; }
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(n + 1 + Math.floor(Math.random() * 3), 24);
      setParticipants(n);
    }, 600);
    return () => clearInterval(id);
  }, [launching]);

  const code = launching ? launching.code : '';

  const create = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setItems([{ id: 'nq' + Date.now(), title: newTitle, subject: newSubject, questions: newCount, lastUsed: 'právě teď', isNew: true }, ...items]);
    setNewTitle('');
    setCreating(false);
  };

  return (
    <div className="pp-page">
      <PageHeader
        title="Kvízy"
        subtitle="Live kvízy přímo do telefonu žáka — nebo do počítače."
        right={<Button icon="plus" onClick={() => setCreating(true)}>Vytvořit kvíz</Button>}
      />

      <div className="pp-quiz-list">
        {items.map(q => (
          <Card key={q.id} style={{ padding: 18 }}>
            <div className="pp-quiz-row">
              <div className="pp-quiz-icon">
                <Icon name="quiz" size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="pp-quiz-meta">
                  <SubjectBadge subjectId={q.subject} size="sm" />
                  {q.isNew && <span className="pp-pill pp-pill-new">Nové</span>}
                </div>
                <h3 className="pp-quiz-title">{q.title}</h3>
                <div className="pp-quiz-foot">
                  <span className="pp-meta">{q.questions} otázek</span>
                  <span className="pp-meta">·</span>
                  <span className="pp-meta">naposledy {q.lastUsed}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="ghost" size="sm">Upravit</Button>
                <Button size="sm" icon="play" onClick={() => setLaunching({ ...q, code: String(1000 + Math.floor(Math.random() * 9000)) })}>
                  Spustit živě
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Live launch screen */}
      <Modal open={!!launching} onClose={() => setLaunching(null)} title="Živý kvíz" width={620}>
        {launching && (
          <div className="pp-live">
            <div className="pp-live-card">
              <div className="pp-live-eyebrow">
                <Icon name="dot" size={10} style={{ color: 'oklch(0.62 0.18 25)' }} />
                <span>Naživo</span>
              </div>
              <div className="pp-live-title">{launching.title}</div>
              <div className="pp-live-instructions">
                <span>Připojte se na</span>
                <span className="pp-live-url">priprav.cz/kvíz</span>
              </div>
              <div className="pp-live-code">
                {[...code].map((d, i) => (
                  <span key={i} className="pp-live-digit">{d}</span>
                ))}
              </div>
              <div className="pp-live-counter">
                <span className="pp-live-counter-num">{participants}</span>
                <span className="pp-live-counter-lbl">žáků připojeno</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setLaunching(null)}>Ukončit</Button>
              <Button icon="play" disabled={participants < 1}>Začít kvíz</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={creating} onClose={() => setCreating(false)} title="Vytvořit kvíz">
        <form onSubmit={create} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="Název kvízu">
            <TextInput value={newTitle} onChange={setNewTitle} placeholder="Např. Slovesa — opakování" />
          </Field>
          <Field label="Předmět">
            <Select value={newSubject} onChange={setNewSubject} options={SUBJECTS.map(s => ({ value: s.id, label: s.label }))} />
          </Field>
          <Field label="Počet otázek">
            <Segmented
              value={String(newCount)}
              options={[{value:'5',label:'5'},{value:'10',label:'10'},{value:'15',label:'15'},{value:'20',label:'20'}]}
              onChange={v => setNewCount(Number(v))}
            />
          </Field>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', borderTop: '1px solid var(--pp-line)', paddingTop: 16 }}>
            <Button variant="ghost" onClick={() => setCreating(false)}>Zrušit</Button>
            <Button type="submit" icon="sparkle" disabled={!newTitle.trim()}>Vytvořit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

window.PresentationsPage = PresentationsPage;
window.QuizzesPage = QuizzesPage;
