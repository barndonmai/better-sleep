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
    sleepTime,
    setSleepTime,

    mode,
    subtitle,
    results,
    hasCalculated,
    resultsRenderKey,

    calculateSleepNow,
    calculateFromWakeTime,
    calculateFromSleepTime,
  } = useSleepCalculator();

  return (
    <div className={classes.page}>
      {darkMode && <NightBackground />}

      <div className="relative mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className={classes.pill}>
            <Moon className="h-4 w-4 opacity-90" />
            Sleep Cycle Calculator
          </div>

          <h1 className="text-4xl font-semibold tracking-tight">
            Better Sleep
          </h1>
          <p className={classes.subtitle}>{subtitle}</p>

          <SleepHero
            classes={classes}
            wakeTime={wakeTime}
            setWakeTime={setWakeTime}
            sleepTime={sleepTime}
            setSleepTime={setSleepTime}
            onSleepNow={calculateSleepNow}
            onWakeAtTime={calculateFromWakeTime}
            onSleepAtTime={calculateFromSleepTime}
          />

          {hasCalculated && (
            <div className="mt-6">
              <SleepResultsCard
                key={resultsRenderKey}
                classes={classes}
                mode={mode}
                results={results}
                darkMode={darkMode}
                wakeTime={wakeTime}
                sleepTime={sleepTime}
              />
            </div>
          )}

          <div className={classes.footer}>
            <div className="mt-6">
              Note: This is a sleep cycle estimate, not medical advice.
              Individual sleep needs vary.
            </div>
            <div className="mt-3">
              Built with love <span className="opacity-70">by Brandon Mai</span>{" "}
              ·{" "}
              <a
                href="https://github.com/barndonmai/better-sleep"
                className="underline underline-offset-4 hover:opacity-90"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
