export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/LOGO DuelCore (512x512) - by Henri.png"
              alt="Core Games Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-white">Core Games</span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="/ssss.gif"
              alt="Henri"
              className="h-8 w-8 rounded-full border-2 border-gray-700"
            />
            <p className="text-gray-400 text-sm">Created by Henri</p>
          </div>

          <p className="text-gray-500 text-sm">
            © 2025 Core Games. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
