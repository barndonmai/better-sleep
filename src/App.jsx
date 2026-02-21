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
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className={classes.pill}>
            <Moon className="h-4 w-4" />
            Sleep Cycle Calculator
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"> Better Sleep </h1>
          <p className={classes.subtitle}>{subtitle}</p>

          <div className="mt-3">
            <ThemeToggle
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              className={`w-full sm:w-auto ${classes.outlineBtn}`}
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