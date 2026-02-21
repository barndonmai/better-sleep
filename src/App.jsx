import { Moon } from "lucide-react";
import { motion } from "framer-motion";
import SleepHero from "@/components/SleepHero";
import SleepResultsCard from "@/components/SleepResultsCard";
import NightBackground from "@/components/NightBackground";
import { useTheme } from "@/hooks/useTheme";
import { useSleepCalculator } from "@/hooks/useSleepCalculator";

export default function BetterSleep() {
  const { darkMode, classes } = useTheme(true);

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
      {darkMode && <NightBackground />}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col">
        <div className="flex flex-1 flex-col justify-center">
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

              <p className={`${classes.subtitle} mx-auto text-center`}>
                {subtitle}
              </p>
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
                wakeTime={wakeTime}
              />
            </motion.div>
          )}

          <p className={`${classes.footer} mt-8 text-center`}>
            Note: This is a sleep cycle estimate, not medical advice. Individual
            sleep needs vary.
          </p>
        </div>

        <footer className="pb-2 pt-6 text-center">
          <div
            className={`space-y-1 text-xs ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}
          >
            <p>Built with love 🩷</p>
            <p>
              by Brandon Mai ·{" "}
              <a
                href="https://github.com/brandonmai"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:opacity-80"
              >
                GitHub
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
