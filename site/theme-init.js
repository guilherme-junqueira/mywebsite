// Theme bootstrap — runs in <head> before paint to avoid FOUC.
(function () {
  try {
    var t = localStorage.getItem('gj-theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    } else {
      // Default: light, regardless of OS preference (per user spec)
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
