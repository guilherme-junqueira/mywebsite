// Shared layout: nav + content wrapper + footer. Single-column. No left rail.

(function () {
  const D = window.SITE_DATA;

  function Nav({ active }) {
    const items = [
      { id: 'home', label: 'Home', href: 'index.html' },
      { id: 'research', label: 'Research', href: 'research.html' },
      { id: 'talks', label: 'Talks', href: 'talks.html' },
      { id: 'discussions', label: 'Discussions', href: 'discussions.html' },
      { id: 'teaching', label: 'Teaching', href: 'teaching.html' },
      { id: 'gallery', label: 'Gallery', href: 'gallery.html' },
      { id: 'cv', label: 'CV', href: D.cvUrl, external: true },
      { id: 'contact', label: 'Contact', href: 'contact.html' },
    ];
    return (
      <div className="cl-nav-wrap">
        <header className="cl-nav">
          <a href="index.html" className="brand">Guilherme Junqueira</a>
          <nav>
            {items.map(i => (
              <a key={i.id} href={i.href}
                 target={i.external ? '_blank' : undefined}
                 rel={i.external ? 'noopener' : undefined}
                 className={active === i.id ? 'active' : ''}>{i.label}</a>
            ))}
          </nav>
        </header>
      </div>
    );
  }

  function Footer() {
    return (
      <footer className="cl-footer">
        <div>Guilherme Junqueira</div>
        <div>Finance Ph.D. Candidate, University of Florida</div>
        <div><a href={`mailto:${D.email}`}>Email</a></div>
        <div>© 2026</div>
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
