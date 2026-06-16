// Shared layout: sticky nav + footer.
(function () {
  const D = window.SITE_DATA;

  function Nav({ active }) {
    const items = [
      { id: 'home', label: 'Home', href: 'index.html' },
      { id: 'research', label: 'Research', href: 'research.html' },
      { id: 'talks', label: 'Presentations', href: 'talks.html' },
      { id: 'cv', label: 'CV (PDF) ↗', href: D.cvUrl, external: true, cta: true },
    ];
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
          <nav>{items.map(linkFor)}</nav>
        </header>
      </div>
    );
  }

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

  Object.assign(window, { Layout, Nav, Footer });
})();
