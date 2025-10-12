import Navbar from './Navbar';

export default function Hero() {
  return (
    <>
      <Navbar />

      <section className="pt-24 pb-8 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: "url('/LOGO DuelCore (2000x2000) Henri.png')" }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="flex justify-center">
            <img
              src="/LOGO DuelCore (2000x2000) Henri.png"
              alt="DuelCore Logo"
              className="h-40 w-40 object-contain animate-pulse"
            />
          </div>
        </div>
      </section>
    </>
  );
}
