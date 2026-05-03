export default function Footer() {
  const navLinks = [
    { label: 'Functions', id: 'functions' },
    { label: 'Test', id: 'test-result' },
    { label: 'Docs', id: 'how-it-works' },
    { label: 'Discord', href: '#' },
  ];

  function handleClick(link: { label: string; id?: string; href?: string }) {
    if (link.href) {
      window.open(link.href, '_blank');
      return;
    }
    if (!link.id) return;
    const el = document.getElementById(link.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <footer
      style={{
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '60px 0 40px',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <span
            className="font-pixel text-xl font-bold"
            style={{ color: '#c0fa50' }}
          >
            mUNC
          </span>

          <div className="flex flex-wrap gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link)}
                className="font-geist text-sm font-normal transition-colors duration-300 hover:text-white"
                style={{ color: '#888888' }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Row */}
        <p
          className="font-geist text-sm font-light mt-6"
          style={{ color: '#555555' }}
        >
          The next-generation executor testing platform.
        </p>

        {/* Bottom Row */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-12 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="font-geist text-xs font-light" style={{ color: '#555555' }}>
            &copy; 2025 mUNC. Not affiliated with Roblox Corporation.
          </p>
          <p className="font-geist text-xs font-light" style={{ color: '#555555' }}>
            Built with love for the exploiting community
          </p>
        </div>
      </div>
    </footer>
  );
}
