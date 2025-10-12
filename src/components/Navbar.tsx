import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);

  const communityLinks = [
    { name: 'YouTube', url: 'https://www.youtube.com/@DuelWarriors_Core', icon: '▶️' },
    { name: 'Discord', url: 'https://discord.com/invite/duelcore', icon: '💬' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@coregamestv?is_from_webapp=1&sender_device=pc', icon: '🎵' },
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
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden">
                {communityLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all group"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="flex-1">{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
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
