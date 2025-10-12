import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCommunity = location.pathname === '/community';
  const isAffiliate = location.pathname === '/affiliate';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/LOGO DuelCore (512x512) - by Henri.png"
            alt="Core Games Logo"
            className="h-10 w-10 object-contain group-hover:scale-110 transition-transform"
          />
          <span className="text-xl font-bold text-white">Core Games</span>
        </Link>

        <nav className="flex items-center gap-8">
          <a
            href="/#pricing"
            className={`transition-colors font-medium ${
              isHome ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
            }`}
          >
            Support
          </a>

          <Link
            to="/community"
            className={`transition-colors font-medium ${
              isCommunity ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
            }`}
          >
            Community
          </Link>

          <Link
            to="/affiliate"
            className={`transition-colors font-medium ${
              isAffiliate ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
            }`}
          >
            Affiliate - Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
