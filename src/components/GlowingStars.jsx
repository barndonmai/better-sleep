export default function GlowingStars() {
  const stars = [
    {
      left: "8%",
      top: "14%",
      size: 10,
      color: "white",
      delay: "0s",
      duration: "5.2s",
      driftX: -8,
      driftY: -4,
    },
    {
      left: "18%",
      top: "9%",
      size: 8,
      color: "violet",
      delay: "1.1s",
      duration: "6.3s",
      driftX: 6,
      driftY: -6,
    },
    {
      left: "31%",
      top: "16%",
      size: 9,
      color: "sky",
      delay: "0.6s",
      duration: "5.8s",
      driftX: -5,
      driftY: 5,
    },
    {
      left: "42%",
      top: "11%",
      size: 11,
      color: "white",
      delay: "2.0s",
      duration: "7.2s",
      driftX: 10,
      driftY: -3,
    },
    {
      left: "55%",
      top: "17%",
      size: 8,
      color: "violet",
      delay: "0.9s",
      duration: "5.6s",
      driftX: -7,
      driftY: 4,
    },
    {
      left: "67%",
      top: "12%",
      size: 10,
      color: "sky",
      delay: "1.7s",
      duration: "6.8s",
      driftX: 8,
      driftY: 3,
    },
    {
      left: "79%",
      top: "18%",
      size: 9,
      color: "white",
      delay: "0.2s",
      duration: "5.4s",
      driftX: -6,
      driftY: -5,
    },
    {
      left: "90%",
      top: "10%",
      size: 8,
      color: "violet",
      delay: "2.4s",
      duration: "6.1s",
      driftX: 4,
      driftY: 6,
    },

    {
      left: "12%",
      top: "28%",
      size: 8,
      color: "sky",
      delay: "1.3s",
      duration: "6.0s",
      driftX: 7,
      driftY: -4,
    },
    {
      left: "24%",
      top: "24%",
      size: 9,
      color: "white",
      delay: "0.4s",
      duration: "5.5s",
      driftX: -4,
      driftY: 4,
    },
    {
      left: "38%",
      top: "29%",
      size: 7,
      color: "violet",
      delay: "2.1s",
      duration: "6.7s",
      driftX: 5,
      driftY: 5,
    },
    {
      left: "51%",
      top: "23%",
      size: 10,
      color: "white",
      delay: "0.8s",
      duration: "7.0s",
      driftX: -9,
      driftY: -3,
    },
    {
      left: "63%",
      top: "31%",
      size: 8,
      color: "sky",
      delay: "1.9s",
      duration: "5.9s",
      driftX: 6,
      driftY: -6,
    },
    {
      left: "76%",
      top: "26%",
      size: 9,
      color: "violet",
      delay: "0.5s",
      duration: "6.4s",
      driftX: -5,
      driftY: 3,
    },
    {
      left: "88%",
      top: "30%",
      size: 8,
      color: "white",
      delay: "2.6s",
      duration: "5.7s",
      driftX: 4,
      driftY: -4,
    },

    {
      left: "10%",
      top: "40%",
      size: 8,
      color: "white",
      delay: "0.7s",
      duration: "6.2s",
      driftX: 8,
      driftY: 4,
    },
    {
      left: "29%",
      top: "36%",
      size: 7,
      color: "sky",
      delay: "1.5s",
      duration: "5.4s",
      driftX: -6,
      driftY: 5,
    },
    {
      left: "46%",
      top: "41%",
      size: 9,
      color: "violet",
      delay: "2.2s",
      duration: "6.9s",
      driftX: 5,
      driftY: -5,
    },
    {
      left: "61%",
      top: "38%",
      size: 10,
      color: "white",
      delay: "1.0s",
      duration: "7.3s",
      driftX: -8,
      driftY: 3,
    },
    {
      left: "82%",
      top: "42%",
      size: 8,
      color: "sky",
      delay: "2.8s",
      duration: "5.8s",
      driftX: 6,
      driftY: -3,
    },
  ];

  const colorMap = {
    white: {
      core: "bg-white",
      glow: "shadow-[0_0_10px_rgba(255,255,255,0.6)]",
      cross: "bg-white/90",
    },
    violet: {
      core: "bg-violet-200",
      glow: "shadow-[0_0_10px_rgba(196,181,253,0.55)]",
      cross: "bg-violet-200/90",
    },
    sky: {
      core: "bg-sky-200",
      glow: "shadow-[0_0_10px_rgba(147,197,253,0.5)]",
      cross: "bg-sky-200/90",
    },
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, index) => {
        const palette = colorMap[star.color];

        return (
          <div
            key={`${star.left}-${star.top}-${index}`}
            className="absolute"
            style={{
              left: star.left,
              top: star.top,
              animation: `glow-star-float ${star.duration} ease-in-out ${star.delay} infinite`,
              ["--drift-x"]: `${star.driftX}px`,
              ["--drift-y"]: `${star.driftY}px`,
            }}
          >
            {/* Glow halo */}
            <div
              className="absolute rounded-full blur-[6px] opacity-40"
              style={{
                width: star.size + 10,
                height: star.size + 10,
                left: -(star.size + 10) / 2 + star.size / 2,
                top: -(star.size + 10) / 2 + star.size / 2,
                background:
                  star.color === "white"
                    ? "rgba(255,255,255,0.35)"
                    : star.color === "violet"
                      ? "rgba(196,181,253,0.3)"
                      : "rgba(147,197,253,0.28)",
              }}
            />

            {/* Pixel-ish sparkle cross */}
            <div className="relative">
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${palette.cross}`}
                style={{
                  width: Math.max(1, Math.floor(star.size * 0.2)),
                  height: star.size,
                }}
              />
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${palette.cross}`}
                style={{
                  width: star.size,
                  height: Math.max(1, Math.floor(star.size * 0.2)),
                }}
              />
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 ${palette.cross}`}
                style={{
                  width: Math.max(1, Math.floor(star.size * 0.15)),
                  height: Math.max(4, Math.floor(star.size * 0.85)),
                }}
              />
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${palette.core} ${palette.glow}`}
                style={{
                  width: Math.max(2, Math.floor(star.size * 0.32)),
                  height: Math.max(2, Math.floor(star.size * 0.32)),
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
