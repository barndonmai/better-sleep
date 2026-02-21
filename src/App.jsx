import { Moon } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import SleepCalculatorCard from "@/components/SleepCalculatorCard";
import SleepResultsCard from "@/components/SleepResultsCard";
import { useTheme } from "@/hooks/useTheme";
import { useSleepCalculator } from "@/hooks/useSleepCalculator";

export default function BetterSleep() {
  const { darkMode, setDarkMode, classes } = useTheme(true);

  const {
    wakeTime,
    setWakeTime,
    mode,
    setMode,
    subtitle,
    results,
    resetToNow,
  } = useSleepCalculator();

  return (
      <div className={classes.page}>
        {darkMode && (
          <>
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -top-20 left-[-40px] h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />
              <div className="absolute top-24 right-[-30px] h-64 w-64 rounded-full bg-fuchsia-300/10 blur-3xl" />
              <div className="absolute bottom-[-40px] left-1/3 h-56 w-56 rounded-full bg-sky-300/10 blur-3xl" />
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14)_1px,transparent_1px),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.1)_1px,transparent_1px),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:140px_140px,180px_180px,220px_220px]" />
          </>
        )}

        <div className="relative z-10 mx-auto max-w-4xl">        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className={classes.pill}>
            <Moon className="h-4 w-4" />
            Sleep Cycle Calculator
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Better Sleep
          </h1>
          <p className={classes.subtitle}>{subtitle}</p>
        </div>

        <ThemeToggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          className={`w-full sm:w-auto sm:shrink-0 ${classes.outlineBtn}`}
        />
      </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
          <SleepCalculatorCard
            classes={classes}
            mode={mode}
            setMode={setMode}
            wakeTime={wakeTime}
            setWakeTime={setWakeTime}
            resetToNow={resetToNow}
          />

          <SleepResultsCard classes={classes} mode={mode} results={results} darkMode={darkMode} />
        </div>

        <p className={classes.footer}>
          Note: This is a sleep cycle estimate, not medical advice. Individual sleep needs vary.
        </p>
      </div>
    </div>
  );
}