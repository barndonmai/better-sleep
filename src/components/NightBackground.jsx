import GlowingStars from "@/components/GlowingStars";
export default function NightBackground() {
  return (
    <>
      {/* Base sky gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070214] via-[#12062a] to-[#1b1250]" />

      {/* Soft glow around the content */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_50%_60%,rgba(56,189,248,0.10),transparent_55%)]" />

      {/* Pixel stars (true squares via box-shadow) */}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="pixel-stars absolute left-0 top-0" />
        <div className="pixel-stars-dim absolute left-0 top-0" />

        <div className="pixel-stars absolute left-[38%] top-[6%] opacity-70 scale-90" />
        <div className="pixel-stars-dim absolute left-[42%] top-[10%] opacity-60 scale-90" />

        <div className="pixel-stars absolute left-[70%] top-[2%] opacity-65 scale-75" />
        <div className="pixel-stars-dim absolute left-[74%] top-[8%] opacity-55 scale-75" />
      </div>

      {/* Pixel crescent moon */}
      <div className="pointer-events-none absolute left-[10%] top-[10%] opacity-90">
        <div className="pixel-moon" />
      </div>

      <GlowingStars />

      {/* Horizon mist (raised) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-36 h-44 bg-gradient-to-t from-indigo-400/10 to-transparent blur-2xl" />

      {/* Horizon mist (raised) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-44 h-52 bg-gradient-to-t from-indigo-400/10 to-transparent blur-2xl" />

      {/* Mountains raised higher */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 opacity-70"
        style={{
          clipPath:
            "polygon(0% 65%, 6% 40%, 12% 68%, 18% 46%, 26% 68%, 32% 52%, 40% 76%, 48% 50%, 56% 70%, 64% 48%, 72% 74%, 80% 54%, 88% 70%, 96% 44%, 100% 64%, 100% 100%, 0% 100%)",
          backgroundColor: "#16133c",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-60 opacity-85"
        style={{
          clipPath:
            "polygon(0% 78%, 8% 58%, 16% 82%, 24% 64%, 32% 86%, 40% 62%, 48% 84%, 56% 56%, 64% 82%, 72% 60%, 80% 88%, 88% 66%, 96% 82%, 100% 72%, 100% 100%, 0% 100%)",
          backgroundColor: "#100a33",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{
          clipPath:
            "polygon(0% 92%, 10% 62%, 20% 92%, 30% 70%, 40% 98%, 50% 66%, 60% 94%, 70% 72%, 80% 99%, 90% 64%, 100% 92%, 100% 100%, 0% 100%)",
          backgroundColor: "#07041f",
        }}
      />
    </>
  );
}
