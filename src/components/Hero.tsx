export default function Hero() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#pricing" className="flex items-center gap-3 group">
          <img
            src="/LOGO DuelCore (512x512) - by Henri.png"
            alt="Core Games Logo"
            className="h-10 w-10 object-contain group-hover:scale-110 transition-transform"
          />
          <span className="text-xl font-bold text-white">Core Games</span>
        </a>

        <nav className="flex items-center gap-8">
          <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
            VIP
          </a>
          <a href="#affiliate" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
            Affiliate
          </a>
          <a href="#admin" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
            Dashboard
          </a>
        </nav>
      </div>
    </header>
  );
}
