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

      <section className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <div className="mb-8 flex justify-center">
              <img
                src="/LOGO DuelCore (2000x2000) (Transparente) V2 - by Design Ideal.png"
                alt="DuelCore Logo"
                className="h-48 w-48 object-contain"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Join Our Community
            </h1>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-500/30 rounded-3xl p-12 shadow-2xl shadow-cyan-500/20">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Connect With Us
            </h2>

            <div className="space-y-6">
              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-6 rounded-xl bg-gradient-to-r ${platform.color} text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl group`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{platform.icon}</span>
                    <span className="text-2xl">{platform.name}</span>
                  </div>
                  <ExternalLink className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
            </div>

            <p className="text-center text-gray-400 text-sm mt-8">
              Follow us on all platforms to stay up to date with the latest news and updates
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
