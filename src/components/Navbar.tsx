import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);

  const communityLinks = [
    { name: 'Discord', url: 'https://discord.com/invite/duelcore', primary: true },
    { name: 'YouTube', url: 'https://www.youtube.com/@DuelWarriors_Core', primary: false },
    { name: 'TikTok', url: 'https://www.tiktok.com/@coregamestv?is_from_webapp=1&sender_device=pc', primary: false },
  ];

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
          <a href="/#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
            VIP
          </a>

          <Link to="/affiliate" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
            Affiliate - Dashboard
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowCommunityDropdown(!showCommunityDropdown)}
              onBlur={() => setTimeout(() => setShowCommunityDropdown(false), 200)}
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium flex items-center gap-1"
            >
              Community
              <ChevronDown className={`w-4 h-4 transition-transform ${showCommunityDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showCommunityDropdown && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-sm border-2 border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
                {communityLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between px-5 py-4 transition-all group cursor-pointer ${
                      link.primary
                        ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b-2 border-cyan-500/50 hover:from-cyan-600/40 hover:to-blue-600/40'
                        : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <span className={`font-semibold ${
                      link.primary
                        ? 'text-cyan-400 text-lg'
                        : 'text-gray-300'
                    } group-hover:text-cyan-300 transition-colors`}>
                      {link.name}
                    </span>
                    <ExternalLink className={`w-4 h-4 ${
                      link.primary ? 'text-cyan-400' : 'text-gray-400'
                    } group-hover:text-cyan-300 transition-all group-hover:translate-x-1`} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
