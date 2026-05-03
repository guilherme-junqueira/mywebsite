// Shared layout: nav (with theme toggle + mobile More) + footer.
// Changes vs production:
//   ⑥ mobile nav — primary 4 inline + "More" disclosure for the rest
//   ⑧ dark mode — sun/moon toggle, persists to localStorage
//   ⑨ footer — two-line hierarchy

(function () {
  const D = window.SITE_DATA;
  const PRIMARY = ['home', 'research', 'talks', 'cv'];

  // ── Icons ─────────────────────────────────────────────────────
  const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  );
  const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );

  // ── Theme toggle ─────────────────────────────────────────────
  function ThemeToggle() {
    const [theme, setTheme] = React.useState(() =>
      document.documentElement.getAttribute('data-theme') || 'light'
    );
    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      try { localStorage.setItem('gj-theme', theme); } catch (e) {}
    }, [theme]);
    const flip = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
    return (
      <button
        type="button"
        className="cl-theme-toggle"
        onClick={flip}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    );
  }

  // ── Nav ──────────────────────────────────────────────────────
  function Nav({ active }) {
    const items = [
      { id: 'home', label: 'Home', href: 'index.html' },
      { id: 'research', label: 'Research', href: 'research.html' },
      { id: 'talks', label: 'Talks', href: 'talks.html' },
      { id: 'discussions', label: 'Discussions', href: 'discussions.html' },
      { id: 'teaching', label: 'Teaching', href: 'teaching.html' },
      { id: 'gallery', label: 'Gallery', href: 'gallery.html' },
      { id: 'cv', label: 'CV (PDF) ↗', href: D.cvUrl, external: true, cta: true },
    ];
    const primary = items.filter(i => PRIMARY.includes(i.id));
    const overflow = items.filter(i => !PRIMARY.includes(i.id));

    const [moreOpen, setMoreOpen] = React.useState(false);
    const moreRef = React.useRef(null);
    React.useEffect(() => {
      const onClickAway = (e) => {
        if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
      };
      const onKey = (e) => { if (e.key === 'Escape') setMoreOpen(false); };
      document.addEventListener('mousedown', onClickAway);
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('mousedown', onClickAway);
        document.removeEventListener('keydown', onKey);
      };
    }, []);

    const linkFor = (i) => (
      <a key={i.id} href={i.href}
         target={i.external ? '_blank' : undefined}
         rel={i.external ? 'noopener' : undefined}
         className={[active === i.id ? 'active' : '', i.cta ? 'cv-cta' : ''].filter(Boolean).join(' ')}>{i.label}</a>
    );

    return (
      <div className="cl-nav-wrap">
        <header className="cl-nav">
          <a href="index.html" className="brand">Guilherme Junqueira</a>
          <nav>
            {primary.map(linkFor)}
            <span className="cl-nav-overflow">{overflow.map(linkFor)}</span>
            <span className="cl-mobile-more" ref={moreRef}>
              <button
                type="button"
                className="cl-mobile-more-btn"
                onClick={() => setMoreOpen(o => !o)}
                aria-expanded={moreOpen}
                aria-label="More navigation"
              >
                More ▾
              </button>
              {moreOpen && (
                <div className="cl-mobile-more-panel">
                  {overflow.map(i => (
                    <a key={i.id} href={i.href}
                       target={i.external ? '_blank' : undefined}
                       rel={i.external ? 'noopener' : undefined}
                       onClick={() => setMoreOpen(false)}>{i.label}</a>
                  ))}
                </div>
              )}
            </span>
            <ThemeToggle />
          </nav>
        </header>
      </div>
    );
  }

  // ⑨ Footer
  function Footer() {
    return (
      <footer className="cl-footer">
        <div className="row1">
          <span className="name-f">Guilherme Junqueira</span>
          <span className="role-f">Finance Ph.D. Candidate · University of Florida</span>
        </div>
        <div className="row2">
          <a href={`mailto:${D.email}`}>Email</a>
          <a href={D.cvUrl} target="_blank" rel="noopener">CV (PDF)</a>
          <a href={D.twitter} target="_blank" rel="noopener">X</a>
          <a href={D.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          <span className="yr">© 2026</span>
        </div>
      </footer>
    );
  }

  function Layout({ active, children, wide, mm }) {
    return (
      <React.Fragment>
        <Nav active={active} />
        <main className={"cl-main" + (wide ? " wide" : "") + (mm ? " mm" : "")}>
          {children}
        </main>
        <Footer />
      </React.Fragment>
    );
  }

  Object.assign(window, { Layout, Nav, Footer, ThemeToggle });
})();
