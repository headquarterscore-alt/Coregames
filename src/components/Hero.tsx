import Navbar from './Navbar';

export default function Hero() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: "url('/LOGO DuelCore (2000x2000) Henri.png')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="mb-8 flex justify-center">
            <img
              src="/LOGO DuelCore (2000x2000) Henri.png"
              alt="DuelCore Logo"
              className="h-40 w-40 object-contain animate-pulse"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
            Welcome to Core Games
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience premium gaming with exclusive VIP features and benefits
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#pricing"
              className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 transition-all duration-300 group"
            >
              <span className="flex items-center gap-3">
                Get Started
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#pricing" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
