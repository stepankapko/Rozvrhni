// Teacher profile drawer — easy-to-fill personalization form

const PROFILE_DEFAULTS = {
  // Who you are
  name: 'Marie Nováková',
  title: 'Mgr.',
  school: 'ZŠ Slaný',
  region: 'Středočeský kraj',
  years: 8,
  grades: [6],           // 6, 7, 8, 9
  subjects: ['cestina', 'dejepis'],

  // Teaching style
  structure: 2,          // 0 strict ←→ 4 flexible
  approach: 'exploratory', // traditional / exploratory / project / discussion
  technology: 'moderate',  // minimal / moderate / heavy
  pace: 2,                 // 0 slow & deep ←→ 4 fast & broad

  // Your students
  classSize: 24,
  level: 'mixed',        // struggling / mixed / advanced
  challenges: ['attention', 'mixed-ability'],

  // AI output preferences
  detail: 2,             // 0 brief outline ←→ 4 fully scripted
  formality: 1,          // 0 formal ←→ 2 accessible
  creativity: 2,         // 0 safe ←→ 4 creative

  // What you care about
  rvp: ['communication', 'thinking', 'social'],
  grouping: 'mixed',     // individual / pair / group / mixed
  homework: 'light',     // none / light / regular / heavy
};

const PROFILE_GRADES = [
  { id: 6, label: '6. třída' },
  { id: 7, label: '7. třída' },
  { id: 8, label: '8. třída' },
  { id: 9, label: '9. třída' },
];

const PROFILE_APPROACH = [
  { id: 'traditional', label: 'Tradiční',     desc: 'výklad → procvičení' },
  { id: 'exploratory', label: 'Objevné',       desc: 'bádání a otázky' },
  { id: 'project',     label: 'Projektové',    desc: 'dlouhodobé úkoly' },
  { id: 'discussion',  label: 'Diskuzní',      desc: 'sokratovský dialog' },
];

const PROFILE_TECH = [
  { id: 'minimal',  label: 'Minimálně', icon: 'book' },
  { id: 'moderate', label: 'Občas',     icon: 'doc' },
  { id: 'heavy',    label: 'Hodně',     icon: 'screen' },
];

const PROFILE_LEVEL = [
  { id: 'struggling', label: 'Slabší',     desc: 'potřebují více opory' },
  { id: 'mixed',      label: 'Smíšená',    desc: 'různé úrovně' },
  { id: 'advanced',   label: 'Pokročilá',  desc: 'připravená na výzvy' },
];

const PROFILE_CHALLENGES = [
  { id: 'attention',     label: 'Pozornost' },
  { id: 'motivation',    label: 'Motivace' },
  { id: 'reading',       label: 'Čtenářská gramotnost' },
  { id: 'mixed-ability', label: 'Různorodé schopnosti' },
  { id: 'czech-l2',      label: 'Čeština jako 2. jazyk' },
  { id: 'behavior',      label: 'Kázeň' },
];

const PROFILE_RVP = [
  { id: 'communication', label: 'Komunikativní' },
  { id: 'learning',      label: 'K učení' },
  { id: 'thinking',      label: 'Řešení problémů' },
  { id: 'social',        label: 'Sociální a personální' },
  { id: 'civic',         label: 'Občanská' },
  { id: 'work',          label: 'Pracovní' },
  { id: 'digital',       label: 'Digitální' },
];

const PROFILE_GROUPING = [
  { id: 'individual', label: 'Samostatně' },
  { id: 'pair',       label: 'Ve dvojicích' },
  { id: 'group',      label: 'Ve skupinách' },
  { id: 'mixed',      label: 'Různě' },
];

const PROFILE_HOMEWORK = [
  { id: 'none',    label: 'Žádné' },
  { id: 'light',   label: 'Občas' },
  { id: 'regular', label: 'Pravidelně' },
  { id: 'heavy',   label: 'Hodně' },
];

const PROFILE_SCALE_LABELS = {
  structure:  ['Striktní načasování', 'Volné tempo'],
  pace:       ['Pomalu a do hloubky', 'Rychle a do šířky'],
  detail:     ['Stručná osnova',      'Plně rozepsané'],
  formality:  ['Formální čeština',    'Přístupný jazyk'],
  creativity: ['Spolehlivě a osvědčeně', 'Kreativní a netradiční'],
};

// ─── Reusable form atoms ──────────────────────────────────────

function ProfSection({ icon, title, sub, children }) {
  return (
    <section className="pp-prof-section">
      <header className="pp-prof-section-head">
        <span className="pp-prof-section-icon"><Icon name={icon} size={16} /></span>
        <div>
          <h3 className="pp-prof-section-title">{title}</h3>
          {sub && <p className="pp-prof-section-sub">{sub}</p>}
        </div>
      </header>
      <div className="pp-prof-section-body">{children}</div>
    </section>
  );
}

function ProfField({ label, hint, children }) {
  return (
    <div className="pp-prof-field">
      <label className="pp-prof-field-lbl">{label}</label>
      {children}
      {hint && <p className="pp-prof-field-hint">{hint}</p>}
    </div>
  );
}

function ProfChips({ options, value, onChange, multi = true }) {
  const sel = multi ? value : [value];
  const toggle = (id) => {
    if (!multi) { onChange(id); return; }
    onChange(sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]);
  };
  return (
    <div className="pp-prof-chips">
      {options.map(o => {
        const on = sel.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            className={`pp-prof-chip${on ? ' pp-prof-chip-on' : ''}`}
            onClick={() => toggle(o.id)}
          >
            {on && <Icon name="check" size={12} />}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function ProfCards({ options, value, onChange }) {
  return (
    <div className="pp-prof-cards">
      {options.map(o => {
        const on = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            className={`pp-prof-card${on ? ' pp-prof-card-on' : ''}`}
            onClick={() => onChange(o.id)}
          >
            {o.icon && <span className="pp-prof-card-icon"><Icon name={o.icon} size={18} /></span>}
            <span className="pp-prof-card-body">
              <span className="pp-prof-card-label">{o.label}</span>
              {o.desc && <span className="pp-prof-card-desc">{o.desc}</span>}
            </span>
            <span className={`pp-prof-card-radio${on ? ' pp-prof-card-radio-on' : ''}`}>
              {on && <span className="pp-prof-card-radio-dot" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ProfScale({ value, onChange, steps = 5, labels }) {
  return (
    <div className="pp-prof-scale">
      <div className="pp-prof-scale-track">
        {Array.from({ length: steps }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`pp-prof-scale-pip${value === i ? ' pp-prof-scale-pip-on' : ''}${i <= value ? ' pp-prof-scale-pip-fill' : ''}`}
            onClick={() => onChange(i)}
            aria-label={`Stupeň ${i + 1} z ${steps}`}
          >
            <span className="pp-prof-scale-pip-inner" />
          </button>
        ))}
      </div>
      {labels && (
        <div className="pp-prof-scale-labels">
          <span>{labels[0]}</span>
          <span>{labels[1]}</span>
        </div>
      )}
    </div>
  );
}

function ProfStepper({ value, onChange, min = 0, max = 50, suffix }) {
  return (
    <div className="pp-prof-stepper">
      <button type="button" className="pp-prof-stepper-btn" onClick={() => onChange(Math.max(min, value - 1))} aria-label="Méně">−</button>
      <div className="pp-prof-stepper-val">
        <span className="pp-prof-stepper-num">{value}</span>
        {suffix && <span className="pp-prof-stepper-suffix">{suffix}</span>}
      </div>
      <button type="button" className="pp-prof-stepper-btn" onClick={() => onChange(Math.min(max, value + 1))} aria-label="Více">+</button>
    </div>
  );
}

// ─── Main drawer ──────────────────────────────────────────────

function ProfileDrawer({ open, onClose }) {
  const [data, setData] = React.useState(PROFILE_DEFAULTS);

  // Compute completion %
  const completion = React.useMemo(() => {
    const checks = [
      !!data.name, !!data.school, !!data.region, data.years > 0,
      data.grades.length > 0, data.subjects.length > 0,
      true, !!data.approach, !!data.technology, true,
      data.classSize > 0, !!data.level, data.challenges.length > 0,
      true, true, true,
      data.rvp.length > 0, !!data.grouping, !!data.homework,
    ];
    const done = checks.filter(Boolean).length;
    return Math.round(done / checks.length * 100);
  }, [data]);

  if (!open) return null;

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <div className="pp-drawer-overlay" onClick={onClose}>
      <aside className="pp-drawer pp-prof-drawer" onClick={e => e.stopPropagation()}>
        <header className="pp-prof-head">
          <div className="pp-prof-head-top">
            <div className="pp-prof-identity">
              <Avatar name={data.name} initials="MN" size={44} />
              <div>
                <h2 className="pp-prof-name">{data.title} {data.name}</h2>
                <p className="pp-prof-sub">{data.school} · {data.region}</p>
              </div>
            </div>
            <button className="pp-iconbtn" onClick={onClose} aria-label="Zavřít"><Icon name="close" size={18} /></button>
          </div>
          <div className="pp-prof-progress">
            <div className="pp-prof-progress-bar">
              <div className="pp-prof-progress-fill" style={{ width: `${completion}%` }} />
            </div>
            <span className="pp-prof-progress-lbl">
              {completion === 100 ? 'Profil je úplný' : `Vyplněno ${completion} %`}
            </span>
          </div>
          <p className="pp-prof-intro">
            Čím víc nám o sobě řeknete, tím lépe vám Rozvrhni.cz připraví hodiny, materiály a kvízy přesně na míru.
          </p>
        </header>

        <div className="pp-prof-body">
          {/* Kdo jste */}
          <ProfSection icon="class" title="Kdo jste" sub="Základní informace o vás">
            <div className="pp-prof-row-2">
              <ProfField label="Jméno a příjmení">
                <input className="pp-input" value={data.name} onChange={e => set('name', e.target.value)} />
              </ProfField>
              <ProfField label="Titul">
                <input className="pp-input" value={data.title} onChange={e => set('title', e.target.value)} placeholder="Mgr." />
              </ProfField>
            </div>
            <div className="pp-prof-row-2">
              <ProfField label="Škola">
                <input className="pp-input" value={data.school} onChange={e => set('school', e.target.value)} placeholder="Název školy" />
              </ProfField>
              <ProfField label="Kraj">
                <input className="pp-input" value={data.region} onChange={e => set('region', e.target.value)} placeholder="Středočeský kraj" />
              </ProfField>
            </div>
            <ProfField label="Roky praxe">
              <ProfStepper value={data.years} onChange={v => set('years', v)} min={0} max={50} suffix={data.years === 1 ? 'rok' : data.years < 5 ? 'roky' : 'let'} />
            </ProfField>
            <ProfField label="Učím tyto ročníky" hint="Vyberte všechny, ve kterých učíte.">
              <ProfChips options={PROFILE_GRADES} value={data.grades} onChange={v => set('grades', v)} />
            </ProfField>
            <ProfField label="Předměty">
              <ProfChips
                options={SUBJECTS.map(s => ({ id: s.id, label: s.label }))}
                value={data.subjects}
                onChange={v => set('subjects', v)}
              />
            </ProfField>
          </ProfSection>

          {/* Styl výuky */}
          <ProfSection icon="sparkle" title="Váš styl výuky" sub="Jak nejraději učíte">
            <ProfField label="Struktura hodiny">
              <ProfScale
                value={data.structure}
                onChange={v => set('structure', v)}
                labels={PROFILE_SCALE_LABELS.structure}
              />
            </ProfField>
            <ProfField label="Hlavní přístup k výuce">
              <ProfCards options={PROFILE_APPROACH} value={data.approach} onChange={v => set('approach', v)} />
            </ProfField>
            <ProfField label="Technologie v hodině">
              <div className="pp-prof-segrow">
                {PROFILE_TECH.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className={`pp-prof-seg${data.technology === t.id ? ' pp-prof-seg-on' : ''}`}
                    onClick={() => set('technology', t.id)}
                  >
                    <Icon name={t.icon} size={15} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </ProfField>
            <ProfField label="Tempo výuky">
              <ProfScale
                value={data.pace}
                onChange={v => set('pace', v)}
                labels={PROFILE_SCALE_LABELS.pace}
              />
            </ProfField>
          </ProfSection>

          {/* Vaši žáci */}
          <ProfSection icon="students" title="Vaši žáci" sub="Jaká je vaše typická třída">
            <ProfField label="Průměrná velikost třídy">
              <ProfStepper value={data.classSize} onChange={v => set('classSize', v)} min={5} max={40} suffix="žáků" />
            </ProfField>
            <ProfField label="Obecná úroveň žáků">
              <ProfCards options={PROFILE_LEVEL} value={data.level} onChange={v => set('level', v)} />
            </ProfField>
            <ProfField label="Časté výzvy" hint="Vyberte vše, co se vás týká.">
              <ProfChips options={PROFILE_CHALLENGES} value={data.challenges} onChange={v => set('challenges', v)} />
            </ProfField>
          </ProfSection>

          {/* AI preference */}
          <ProfSection icon="sparkle-square" title="Jak má AI tvořit" sub="Pomůžeme vám výstupy připravit přesně">
            <ProfField label="Detail plánů hodin">
              <ProfScale
                value={data.detail}
                onChange={v => set('detail', v)}
                labels={PROFILE_SCALE_LABELS.detail}
              />
            </ProfField>
            <ProfField label="Jazyk v materiálech">
              <ProfScale
                value={data.formality}
                onChange={v => set('formality', v)}
                steps={3}
                labels={PROFILE_SCALE_LABELS.formality}
              />
            </ProfField>
            <ProfField label="Kreativita aktivit">
              <ProfScale
                value={data.creativity}
                onChange={v => set('creativity', v)}
                labels={PROFILE_SCALE_LABELS.creativity}
              />
            </ProfField>
          </ProfSection>

          {/* Na čem vám záleží */}
          <ProfSection icon="star" title="Na čem vám záleží" sub="Co dáváte při výuce na první místo">
            <ProfField label="Klíčové kompetence RVP" hint="Vyberte 1–3 nejdůležitější.">
              <ProfChips options={PROFILE_RVP} value={data.rvp} onChange={v => set('rvp', v)} />
            </ProfField>
            <ProfField label="Preferovaná forma práce">
              <div className="pp-prof-segrow">
                {PROFILE_GROUPING.map(g => (
                  <button
                    key={g.id}
                    type="button"
                    className={`pp-prof-seg${data.grouping === g.id ? ' pp-prof-seg-on' : ''}`}
                    onClick={() => set('grouping', g.id)}
                  >
                    <span>{g.label}</span>
                  </button>
                ))}
              </div>
            </ProfField>
            <ProfField label="Domácí úkoly">
              <div className="pp-prof-segrow">
                {PROFILE_HOMEWORK.map(h => (
                  <button
                    key={h.id}
                    type="button"
                    className={`pp-prof-seg${data.homework === h.id ? ' pp-prof-seg-on' : ''}`}
                    onClick={() => set('homework', h.id)}
                  >
                    <span>{h.label}</span>
                  </button>
                ))}
              </div>
            </ProfField>
          </ProfSection>
        </div>

        <footer className="pp-prof-foot">
          <div className="pp-prof-foot-hint">
            <Icon name="check-circle" size={14} />
            <span>Změny se ukládají automaticky</span>
          </div>
          <Button onClick={onClose}>Hotovo</Button>
        </footer>
      </aside>
    </div>
  );
}

window.ProfileDrawer = ProfileDrawer;
