export default function NightBackground() {
  return (
    <>
      {/* Base sky gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070214] via-[#12062a] to-[#1b1250]" />

      {/* Soft glow around the content */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_50%_60%,rgba(56,189,248,0.10),transparent_55%)]" />

      {/* Pixel stars (true squares via box-shadow) */}
      /* Crisp pixel stars using viewport-based positions */
.pixel-stars,
.pixel-stars-dim {
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  animation: stars-twinkle 5s ease-in-out infinite;
}

.pixel-stars {
  width: 2px;
  height: 2px;
  box-shadow:
    6vw 8vh #fff, 14vw 5vh #fff, 22vw 11vh #fff, 30vw 7vh #fff,
    38vw 12vh #fff, 46vw 6vh #fff, 54vw 9vh #fff, 62vw 4vh #fff,
    70vw 13vh #fff, 78vw 6vh #fff, 86vw 11vh #fff, 94vw 5vh #fff,

    10vw 20vh #fff, 18vw 24vh #fff, 28vw 21vh #fff, 36vw 26vh #fff,
    44vw 22vh #fff, 52vw 25vh #fff, 60vw 21vh #fff, 68vw 27vh #fff,
    76vw 23vh #fff, 84vw 26vh #fff, 92vw 22vh #fff,

    8vw 34vh #fff, 20vw 31vh #fff, 32vw 36vh #fff, 48vw 33vh #fff,
    58vw 38vh #fff, 72vw 35vh #fff, 88vw 32vh #fff;
  opacity: 0.9;
}

.pixel-stars-dim {
  width: 1px;
  height: 1px;
  animation: stars-twinkle 7s ease-in-out infinite;
  box-shadow:
    3vw 6vh rgba(196,181,253,0.9), 9vw 12vh rgba(255,255,255,0.7),
    17vw 9vh rgba(147,197,253,0.8), 26vw 14vh rgba(255,255,255,0.55),
    34vw 3vh rgba(196,181,253,0.7), 42vw 16vh rgba(255,255,255,0.6),
    51vw 5vh rgba(147,197,253,0.7), 59vw 15vh rgba(255,255,255,0.55),
    68vw 10vh rgba(196,181,253,0.6), 77vw 4vh rgba(255,255,255,0.55),
    86vw 14vh rgba(147,197,253,0.65), 95vw 8vh rgba(255,255,255,0.5),

    6vw 22vh rgba(196,181,253,0.55), 15vw 28vh rgba(255,255,255,0.5),
    24vw 20vh rgba(147,197,253,0.55), 40vw 27vh rgba(255,255,255,0.5),
    57vw 24vh rgba(196,181,253,0.55), 73vw 29vh rgba(255,255,255,0.5),
    89vw 25vh rgba(147,197,253,0.55);
  opacity: 0.7;
}

      {/* Pixel crescent moon */}
      <div className="pointer-events-none absolute left-[10%] top-[10%] opacity-90">
        <div className="pixel-moon" />
      </div>

      {/* Floating sparkle instead of fast shooting star */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="sky-sparkle" />
      </div>

      {/* Horizon mist (raised) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-36 h-44 bg-gradient-to-t from-indigo-400/10 to-transparent blur-2xl" />

      {/* Mountains raised upward */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-70"
        style={{
          clipPath:
            "polygon(0% 65%, 6% 40%, 12% 68%, 18% 46%, 26% 68%, 32% 52%, 40% 76%, 48% 50%, 56% 70%, 64% 48%, 72% 74%, 80% 54%, 88% 70%, 96% 44%, 100% 64%, 100% 100%, 0% 100%)",
          backgroundColor: "#16133c",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-46 opacity-85"
        style={{
          clipPath:
            "polygon(0% 78%, 8% 58%, 16% 82%, 24% 64%, 32% 86%, 40% 62%, 48% 84%, 56% 56%, 64% 82%, 72% 60%, 80% 88%, 88% 66%, 96% 82%, 100% 72%, 100% 100%, 0% 100%)",
          backgroundColor: "#100a33",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
        style={{
          clipPath:
            "polygon(0% 92%, 10% 62%, 20% 92%, 30% 70%, 40% 98%, 50% 66%, 60% 94%, 70% 72%, 80% 99%, 90% 64%, 100% 92%, 100% 100%, 0% 100%)",
          backgroundColor: "#07041f",
        }}
      />
    </>
  );
}
