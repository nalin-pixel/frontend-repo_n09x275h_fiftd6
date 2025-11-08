import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Glow gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.15),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-16 sm:pt-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-100">
          Your voice-powered professional agent
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-300 text-lg">
          Speak to plan, delegate, and track work. Auralite listens, understands, and turns your words into actionable tasks with smart deadlines.
        </p>
      </div>
    </section>
  );
}
