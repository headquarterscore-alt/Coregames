import { ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface SocialPlatform {
  name: string;
  url: string;
  description: string;
  color: string;
  icon: string;
}

export default function CommunityPage() {
  const platforms: SocialPlatform[] = [
    {
      name: 'Discord',
      url: 'https://discord.com/invite/duelcore',
      description: 'Join our Discord server to chat with the community, get support, participate in events, and stay updated with the latest announcements.',
      color: 'from-[#5865F2] to-[#4752C4]',
      icon: '💬',
    },
    {
      name: 'Roblox Group',
      url: 'https://www.roblox.com/communities/33040305/DuelCore#!/about',
      description: 'Become a member of our official Roblox group to access exclusive games, special perks, and connect with fellow players.',
      color: 'from-red-500 to-red-600',
      icon: '🎮',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@DuelWarriors_Core',
      description: 'Subscribe to our YouTube channel for gameplay highlights, tutorials, updates, and exclusive content from the DuelCore community.',
      color: 'from-red-600 to-red-700',
      icon: '▶️',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@coregamestv?is_from_webapp=1&sender_device=pc',
      description: 'Follow us on TikTok for short-form content, quick tips, funny moments, and behind-the-scenes glimpses of our games.',
      color: 'from-[#00f2ea] to-[#ff0050]',
      icon: '🎵',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <section className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8 flex justify-center">
              <img
                src="/LOGO DuelCore (512x512) - by Henri.png"
                alt="DuelCore Logo"
                className="h-32 w-32 object-contain animate-pulse"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Join Our Community
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
              Connect with thousands of players, stay updated with the latest news, and be part of the DuelCore family across multiple platforms.
            </p>

            <p className="text-lg text-cyan-400 font-semibold">
              Follow us everywhere to never miss an update!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {platforms.map((platform, index) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-2xl transition-all duration-300" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {platform.name}
                        </h3>
                        <span className="text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          Click to visit <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {platform.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-6 h-6 text-cyan-400" />
                </div>
              </a>
            ))}
          </div>

          <div className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-cyan-600/20 border-2 border-cyan-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Each platform offers unique content and ways to engage with our community. Join us on all platforms to get the full DuelCore experience!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-lg bg-gradient-to-r ${platform.color} text-white font-semibold hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl flex items-center gap-2`}
                >
                  <span>{platform.icon}</span>
                  <span>{platform.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
