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
    <div className={`${classes.page} min-h-screen flex flex-col`}>
      {darkMode && <NightBackground />}

      <div className="relative mx-auto w-full max-w-3xl flex flex-col flex-1">
        <motion.div
          className="flex flex-col flex-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Main content */}
          <div className="w-full">
            <div className="flex flex-col items-center text-center">
              <div className={`${classes.pill} w-fit`}>
                <Moon className="h-4 w-4 opacity-90" />
                Sleep Cycle Calculator
              </div>

              <h1 className="text-4xl font-semibold tracking-tight">
                Better Sleep
              </h1>

              <p className={`${classes.subtitle} text-center max-w-2xl`}>
                {subtitle}
              </p>
            </div>

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
          </div>

          {/* Footer pinned to bottom when there's extra space */}
          <div className={`${classes.footer} mt-auto w-full text-center`}>
            <div className="mt-6">
              Note: This is a sleep cycle estimate, not medical advice.
              Individual sleep needs vary.
            </div>
            <div className="mt-3">
              Built with ❤︎⁠ <span className="opacity-70">by Brandon Mai</span> ·{" "}
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
