export default function NightBackground() {
  return (
    <>
      {/* Night sky gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#090314] via-[#140a2f] to-[#1b1250]" />

      {/* Soft center glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(99,102,241,0.16),transparent_42%),radial-gradient(circle_at_50%_55%,rgba(56,189,248,0.08),transparent_55%)]" />

      {/* Pixel-style stars layer 1 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.95) 1px, transparent 1.5px),
            radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1.5px),
            radial-gradient(circle, rgba(196,181,253,0.9) 1px, transparent 1.5px)
          `,
          backgroundSize: "180px 180px, 240px 240px, 320px 320px",
          backgroundPosition: "12px 18px, 90px 70px, 30px 120px",
        }}
      />

      {/* Pixel-style stars layer 2 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-45 animate-[slow-twinkle_4s_ease-in-out_infinite]"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.85) 0.8px, transparent 1.2px),
            radial-gradient(circle, rgba(147,197,253,0.8) 0.8px, transparent 1.2px)
          `,
          backgroundSize: "110px 110px, 150px 150px",
          backgroundPosition: "40px 30px, 10px 80px",
        }}
      />

      {/* Tiny pixel twinkles */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-[8%] top-[12%] h-1 w-1 bg-white" />
        <div className="absolute left-[18%] top-[8%] h-0.5 w-0.5 bg-violet-200" />
        <div className="absolute left-[31%] top-[16%] h-1 w-1 bg-white" />
        <div className="absolute left-[42%] top-[9%] h-0.5 w-0.5 bg-sky-200" />
        <div className="absolute left-[61%] top-[14%] h-1 w-1 bg-white" />
        <div className="absolute left-[74%] top-[11%] h-0.5 w-0.5 bg-violet-200" />
        <div className="absolute left-[86%] top-[18%] h-1 w-1 bg-white" />
        <div className="absolute left-[12%] top-[28%] h-0.5 w-0.5 bg-sky-200" />
        <div className="absolute left-[26%] top-[25%] h-1 w-1 bg-white" />
        <div className="absolute left-[53%] top-[23%] h-0.5 w-0.5 bg-violet-200" />
        <div className="absolute left-[69%] top-[30%] h-1 w-1 bg-white" />
        <div className="absolute left-[82%] top-[26%] h-0.5 w-0.5 bg-sky-200" />
        <div className="absolute left-[9%] top-[40%] h-1 w-1 bg-white" />
        <div className="absolute left-[36%] top-[38%] h-0.5 w-0.5 bg-violet-200" />
        <div className="absolute left-[58%] top-[42%] h-1 w-1 bg-white" />
        <div className="absolute left-[91%] top-[39%] h-0.5 w-0.5 bg-sky-200" />
      </div>

      {/* Distant mist/haze near horizon */}
      <div className="pointer-events-none absolute inset-x-0 bottom-24 h-36 bg-gradient-to-t from-indigo-400/10 to-transparent blur-2xl" />

      {/* Back mountain layer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-70"
        style={{
          clipPath:
            "polygon(0% 65%, 6% 40%, 12% 68%, 18% 46%, 26% 68%, 32% 52%, 40% 76%, 48% 50%, 56% 70%, 64% 48%, 72% 74%, 80% 54%, 88% 70%, 96% 44%, 100% 64%, 100% 100%, 0% 100%)",
          backgroundColor: "#16133c",
        }}
      />

      {/* Mid mountain layer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-85"
        style={{
          clipPath:
            "polygon(0% 78%, 8% 58%, 16% 82%, 24% 64%, 32% 86%, 40% 62%, 48% 84%, 56% 56%, 64% 82%, 72% 60%, 80% 88%, 88% 66%, 96% 82%, 100% 72%, 100% 100%, 0% 100%)",
          backgroundColor: "#100a33",
        }}
      />

      {/* Front mountain layer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          clipPath:
            "polygon(0% 90%, 10% 62%, 20% 90%, 30% 70%, 40% 96%, 50% 66%, 60% 92%, 70% 72%, 80% 98%, 90% 64%, 100% 92%, 100% 100%, 0% 100%)",
          backgroundColor: "#07041f",
        }}
      />
    </>
  );
}
