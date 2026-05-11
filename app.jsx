// App shell with sidebar + routing

const NAV_SECTIONS = [
  {
    id: 'main', label: 'Přehled',
    items: [
      { id: 'home', label: 'Domů', icon: 'home', short: 'Domů' },
      { id: 'planner', label: 'Plánovač', icon: 'planner', short: 'Plánovač' },
    ],
  },
  {
    id: 'vyuka', label: 'Výuka',
    items: [
      { id: 'newlesson', label: 'Nová hodina', icon: 'plans', short: 'Nová', badge: '3 nové' },
      { id: 'library', label: 'Knihovna aktivit', icon: 'books', short: 'Aktivity' },
      { id: 'decks', label: 'Prezentace', icon: 'screen', short: 'Prezentace' },
      { id: 'quizzes', label: 'Kvízy', icon: 'flow', short: 'Kvízy', dot: true },
    ],
  },
  {
    id: 'zaci', label: 'Žáci',
    items: [
      { id: 'students', label: 'Moje třída', icon: 'class', short: 'Třída' },
      { id: 'progress', label: 'Pokrok žáků', icon: 'bars', short: 'Pokrok' },
    ],
  },
];

// Flat list for topnav fallback
const NAV_ITEMS = NAV_SECTIONS.flatMap(s => s.items).filter(i => !i.target);

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "sage",
  "navStyle": "sidebar",
  "density": "regular",
  "fontStack": "inter",
  "sidebarCollapsed": false
}/*EDITMODE-END*/;

const ACCENT_PALETTES = {
  sage:    { hue: 150, chroma: 0.08, label: 'Sage' },
  indigo:  { hue: 265, chroma: 0.12, label: 'Indigo' },
  amber:   { hue: 60,  chroma: 0.13, label: 'Amber' },
  coral:   { hue: 25,  chroma: 0.14, label: 'Coral' },
};

const FONT_STACKS = {
  inter: { sans: '"Inter Tight", "Inter", system-ui, -apple-system, sans-serif', body: '"Inter", system-ui, -apple-system, sans-serif' },
  serif: { sans: '"Fraunces", "Source Serif 4", Georgia, serif', body: '"Inter", system-ui, sans-serif' },
  mono: { sans: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace', body: '"Inter", system-ui, sans-serif' },
};

function App() {
  const [active, setActive] = React.useState('home');
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [openLessonState, setOpenLessonState] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const accent = ACCENT_PALETTES[t.accent] || ACCENT_PALETTES.sage;
  const fonts = FONT_STACKS[t.fontStack] || FONT_STACKS.inter;

  // Apply CSS vars
  React.useEffect(() => {
    const r = document.documentElement;
    // Override accent dynamically from tweak
    const palettes = {
      blue:   { c: '#4b8bff', c2: '#2563eb', soft: '#eaf1ff', line: '#c9dbff' },
      purple: { c: '#a259ff', c2: '#7c3aed', soft: '#f3ebff', line: '#dcc8ff' },
      pink:   { c: '#ec4899', c2: '#db2777', soft: '#fde6f1', line: '#fbc8df' },
      teal:   { c: '#14b8a6', c2: '#0d9488', soft: '#d9f5f1', line: '#a4e9de' },
      sage:   { c: '#4b8bff', c2: '#2563eb', soft: '#eaf1ff', line: '#c9dbff' },
      indigo: { c: '#6366f1', c2: '#4f46e5', soft: '#ecedff', line: '#c7caff' },
      amber:  { c: '#f59e0b', c2: '#d97706', soft: '#fef3d8', line: '#fcd9a3' },
      coral:  { c: '#fb7185', c2: '#f43f5e', soft: '#ffe6ea', line: '#ffc4cf' },
    };
    const p = palettes[t.accent] || palettes.blue;
    r.style.setProperty('--pp-accent', p.c);
    r.style.setProperty('--pp-accent-2', p.c2);
    r.style.setProperty('--pp-accent-soft', p.soft);
    r.style.setProperty('--pp-accent-line', p.line);
    r.style.setProperty('--pp-font-display', fonts.sans);
    r.style.setProperty('--pp-font-body', fonts.body);
    const dens = t.density === 'compact' ? 0.85 : t.density === 'comfy' ? 1.1 : 1;
    r.style.setProperty('--pp-density', dens);
  }, [t.accent, t.fontStack, t.density]);

  const renderPage = () => {
    switch (active) {
      case 'home': return <DashboardPage onNavigate={setActive} />;
      case 'planner': return <HomePage onNavigate={setActive} />;
      case 'newlesson': return <LessonPlannerPage />;
      case 'library': return <LibraryPage openLesson={setOpenLessonState} onNavigate={setActive} />;
      case 'decks': return <PresentationsPage />;
      case 'quizzes': return <QuizzesPage />;
      case 'students': return <StudentsPage />;
      case 'progress': return <StudentsPage />;
      default: return <DashboardPage onNavigate={setActive} />;
    }
  };

  const isTopnav = t.navStyle === 'topnav';
  const collapsed = !!t.sidebarCollapsed;

  return (
    <div className={`pp-app pp-nav-${t.navStyle} pp-density-${t.density}${collapsed ? ' pp-sidebar-collapsed' : ''}`}>
      {!isTopnav && <Sidebar active={active} setActive={setActive} collapsed={collapsed} onToggle={() => setTweak('sidebarCollapsed', !collapsed)} onOpenProfile={() => setProfileOpen(true)} />}
      {isTopnav && <Topnav active={active} setActive={setActive} />}
      <main className="pp-main" data-screen-label={`screen-${active}`}>
        {renderPage()}
      </main>

      <SavedLessonModal lesson={openLessonState} onClose={() => setOpenLessonState(null)} />
      <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} />

      <TweaksPanel>
        <TweakSection label="Vzhled" />
        <TweakRadio
          label="Navigace"
          value={t.navStyle}
          options={['sidebar', 'topnav']}
          onChange={v => setTweak('navStyle', v)}
        />
        <TweakSelect
          label="Barva akcentu"
          value={t.accent}
          options={Object.keys(ACCENT_PALETTES)}
          onChange={v => setTweak('accent', v)}
        />
        <TweakSelect
          label="Písmo"
          value={t.fontStack}
          options={['inter', 'serif', 'mono']}
          onChange={v => setTweak('fontStack', v)}
        />
        <TweakRadio
          label="Hustota"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={v => setTweak('density', v)}
        />
      </TweaksPanel>
    </div>
  );
}

function Sidebar({ active, setActive, collapsed, onToggle, onOpenProfile }) {
  const [query, setQuery] = React.useState('');

  const handleClick = (item) => {
    setActive(item.target || item.id);
  };

  const filterItems = (items) => {
    if (!query) return items;
    return items.filter(i => i.label.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <aside className={`pp-sidebar${collapsed ? ' pp-sidebar-mini' : ''}`}>
      <div className="pp-sb-inner">
        {/* Top: brand + search */}
        <div className="pp-sb-top">
          <div className="pp-sb-brand-row">
            <button className="pp-sb-brand" onClick={() => setActive('home')} aria-label="Domů">
              <span className="pp-sb-logo">
                <Icon name="sparkle-square" size={20} />
              </span>
              {!collapsed && (
                <span className="pp-sb-name">
                  Rozvrhni<span className="pp-sb-dot">.cz</span>
                </span>
              )}
            </button>
            {!collapsed && (
              <button className="pp-sb-toggle" onClick={onToggle} aria-label="Sbalit menu" title="Sbalit menu">
                <Icon name="sidebar-collapse" size={16} />
              </button>
            )}
          </div>
          {collapsed && (
            <button className="pp-sb-toggle pp-sb-toggle-mini" onClick={onToggle} aria-label="Rozbalit menu" title="Rozbalit menu">
              <Icon name="sidebar-expand" size={16} />
            </button>
          )}

          {!collapsed && (
            <div className="pp-sb-search">
              <Icon name="search" size={14} style={{ color: 'var(--pp-sb-fg-3)' }} />
              <input
                className="pp-sb-search-input"
                placeholder="Hledat…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Nav sections */}
        <nav className="pp-sb-nav">
          {NAV_SECTIONS.map((sec, si) => {
            const items = filterItems(sec.items);
            if (collapsed) {
              return (
                <React.Fragment key={sec.id}>
                  {si > 0 && <div className="pp-sb-mini-divider" />}
                  {sec.items.map(item => {
                    const isActive = active === (item.target || item.id);
                    return (
                      <button
                        key={item.id}
                        className={`pp-sb-item pp-sb-item-mini${isActive ? ' pp-sb-active' : ''}`}
                        onClick={() => handleClick(item)}
                        title={item.label}
                      >
                        <span className="pp-sb-icon-wrap">
                          <Icon name={item.icon} size={18} />
                          {item.dot && <span className="pp-sb-dot-ind" />}
                        </span>
                      </button>
                    );
                  })}
                </React.Fragment>
              );
            }
            if (items.length === 0) return null;
            return (
              <div key={sec.id} className="pp-sb-section">
                <div className="pp-sb-section-lbl">{sec.label}</div>
                {items.map(item => {
                  const isActive = active === (item.target || item.id);
                  return (
                    <button
                      key={item.id}
                      className={`pp-sb-item${isActive ? ' pp-sb-active' : ''}`}
                      onClick={() => handleClick(item)}
                    >
                      <span className="pp-sb-icon-wrap">
                        <Icon name={item.icon} size={18} />
                      </span>
                      <span className="pp-sb-label">{item.label}</span>
                      {item.badge && <span className="pp-sb-badge">{item.badge}</span>}
                      {item.dot && !item.badge && <span className="pp-sb-dot-ind pp-sb-dot-trail" />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Bottom: settings + user */}
        <div className="pp-sb-foot">
          {collapsed ? (
            <>
              <button className="pp-sb-item pp-sb-item-mini" title="Nastavení">
                <span className="pp-sb-icon-wrap"><Icon name="gear" size={18} /></span>
              </button>
              <button className="pp-sb-user-mini" title="Mgr. Marie Nováková" onClick={onOpenProfile}>
                <Avatar name="Marie Nováková" initials="MN" size={32} />
              </button>
            </>
          ) : (
            <>
              <button className="pp-sb-item pp-sb-foot-item">
                <span className="pp-sb-icon-wrap"><Icon name="gear" size={18} /></span>
                <span className="pp-sb-label">Nastavení</span>
              </button>
              <button className="pp-sb-user pp-sb-user-btn" onClick={onOpenProfile}>
                <Avatar name="Marie Nováková" initials="MN" size={36} />
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <div className="pp-sb-user-name">Mgr. Marie Nováková</div>
                  <div className="pp-sb-user-sub">ZŠ Slaný · 6. třída</div>
                </div>
                <Icon name="chevron-right" size={14} style={{ color: 'var(--pp-sb-fg-3)', flexShrink: 0 }} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

function Topnav({ active, setActive }) {
  return (
    <header className="pp-topnav">
      <div className="pp-topnav-inner">
        <div className="pp-brand pp-brand-top">
          <div className="pp-brand-mark">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path d="M6 8 L16 4 L26 8 L26 22 L16 26 L6 22 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
              <path d="M16 26 L16 14 M6 8 L16 14 M26 8 L16 14" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="pp-brand-name">rozvrhni<span className="pp-brand-dot">.cz</span></span>
        </div>
        <nav className="pp-topnav-tabs">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`pp-topnav-tab${active === item.id ? ' pp-topnav-tab-on' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <Icon name={item.icon} size={15} />
              <span>{item.short}</span>
            </button>
          ))}
        </nav>
        <div className="pp-topnav-right">
          <Avatar name="Pavla Nováková" initials="PN" size={34} />
        </div>
      </div>
    </header>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
