import { Moon } from "lucide-react";
import { motion } from "framer-motion";
// import ThemeToggle from "@/components/ThemeToggle";
import SleepHero from "@/components/SleepHero";
import SleepResultsCard from "@/components/SleepResultsCard";
import { useTheme } from "@/hooks/useTheme";
import { useSleepCalculator } from "@/hooks/useSleepCalculator";

export default function BetterSleep() {
  const { darkMode, setDarkMode, classes } = useTheme(true);

  const {
    wakeTime,
    setWakeTime,
    mode,
    subtitle,
    results,
    hasCalculated,
    resultsRenderKey,
    calculateSleepNow,
    calculateFromWakeTime,
  } = useSleepCalculator();

  return (
    <div className={classes.page}>
      {darkMode && (
        <>
          <div className="pointer-events-none absolute inset-0 opacity-65">
            <div className="absolute top-[12%] left-[-30px] h-44 w-44 rounded-full bg-indigo-400/15 blur-3xl" />
            <div className="absolute top-[38%] right-[-20px] h-64 w-64 rounded-full bg-fuchsia-300/10 blur-3xl" />
            <div className="absolute bottom-[8%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-300/10 blur-3xl" />
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12)_1px,transparent_1px),radial-gradient(circle_at_75%_45%,rgba(255,255,255,0.08)_1px,transparent_1px),radial-gradient(circle_at_50%_75%,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:170px_170px,210px_210px,240px_240px]" />
        </>
      )}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className={classes.pill}>
              <Moon className="h-4 w-4" />
              Sleep Cycle Calculator
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Better Sleep
            </h1>

            <p className={`${classes.subtitle} mx-auto text-center`}>{subtitle}</p>

            {/* <ThemeToggle
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              className={`sm:w-auto ${classes.outlineBtn}`}
            /> */}
          </div>
        </motion.div>

        <motion.div
          layout
          transition={{ duration: 0.25 }}
          className={hasCalculated ? "mt-6" : "mt-8"}
        >
          <SleepHero
            classes={classes}
            wakeTime={wakeTime}
            setWakeTime={setWakeTime}
            onSleepNow={calculateSleepNow}
            onWakeAtTime={calculateFromWakeTime}
          />
        </motion.div>

        {hasCalculated && (
          <motion.div
            key={resultsRenderKey}
            id="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-6 w-full max-w-2xl"
          >
            <SleepResultsCard
              classes={classes}
              mode={mode}
              results={results}
              darkMode={darkMode}
            />
          </motion.div>
        )}

        <p className={`${classes.footer} mt-8 text-center`}>
          Note: This is a sleep cycle estimate, not medical advice. Individual sleep needs vary.
        </p>
      </div>
    </div>
  );
}