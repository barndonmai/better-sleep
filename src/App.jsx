import React, { useMemo, useState } from "react";
import { Moon, AlarmClock, Coffee, BedDouble, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CYCLE_MINUTES = 90;
const FALL_ASLEEP_MINUTES = 14;

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function parseTimeToDate(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(":").map(Number);
  const now = new Date();
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  return d;
}

function getSleepTimesFromWake(wakeTime) {
  if (!wakeTime) return [];
  const wake = parseTimeToDate(wakeTime);
  if (!wake) return [];

  const results = [];
  for (let cycles = 6; cycles >= 3; cycles--) {
    const total = cycles * CYCLE_MINUTES + FALL_ASLEEP_MINUTES;
    const t = new Date(wake.getTime() - total * 60 * 1000);
    results.push({ time: t, cycles, type: "sleep" });
  }
  return results;
}

function getWakeTimesFromNow() {
  const now = new Date();
  const start = new Date(now.getTime() + FALL_ASLEEP_MINUTES * 60 * 1000);
  const results = [];
  for (let cycles = 1; cycles <= 6; cycles++) {
    const t = new Date(start.getTime() + cycles * CYCLE_MINUTES * 60 * 1000);
    results.push({ time: t, cycles, type: "wake" });
  }
  return results;
}

function qualityLabel(cycles) {
  if (cycles >= 5) return "Best";
  if (cycles === 4) return "Good";
  if (cycles === 3) return "Okay";
  return "Short";
}

function recommendationText(cycles) {
  if (cycles >= 5) return "ideal range";
  if (cycles === 4) return "solid";
  if (cycles === 3) return "minimum";
  return "power sleep";
}

function TimePill({ item }) {
  const isBest = item.cycles >= 5 || (item.type === "wake" && item.cycles >= 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl border p-4 shadow-sm ${
        isBest ? "bg-white" : "bg-zinc-50"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xl font-semibold tracking-tight">{formatTime(item.time)}</div>
          <div className="text-sm text-zinc-500">
            {item.cycles} cycles • {recommendationText(item.cycles)}
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isBest ? "bg-zinc-900 text-white" : "bg-zinc-200 text-zinc-700"
          }`}
        >
          {qualityLabel(item.cycles)}
        </span>
      </div>
    </motion.div>
  );
}

export default function SleepytimeClone() {
  const nowDefault = useMemo(() => {
    const now = new Date();
    return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }, []);

  const [wakeTime, setWakeTime] = useState(nowDefault);
  const [mode, setMode] = useState("wake"); // wake | sleep

  const bedTimes = useMemo(() => getSleepTimesFromWake(wakeTime), [wakeTime]);
  const wakeTimes = useMemo(() => getWakeTimesFromNow(), [mode]);

  const subtitle =
    mode === "wake"
      ? "Pick when you want to wake up and get suggested bedtimes based on 90-minute sleep cycles."
      : "If you go to sleep now, these are good times to wake up (includes ~14 minutes to fall asleep).";

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-white p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm shadow-sm">
            <Moon className="h-4 w-4" />
            Sleep Cycle Calculator
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Better Sleep</h1>
          <p className="mt-2 max-w-2xl text-zinc-600">{subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
          <Card className="rounded-2xl border-zinc-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-zinc-100 p-1">
                <Button
                  variant="ghost"
                  className={`rounded-lg ${mode === "wake" ? "bg-white shadow-sm" : ""}`}
                  onClick={() => setMode("wake")}
                >
                  <AlarmClock className="mr-2 h-4 w-4" />
                  Wake up at
                </Button>
                <Button
                  variant="ghost"
                  className={`rounded-lg ${mode === "sleep" ? "bg-white shadow-sm" : ""}`}
                  onClick={() => setMode("sleep")}
                >
                  <BedDouble className="mr-2 h-4 w-4" />
                  Sleep now
                </Button>
              </div>

              {mode === "wake" ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700">Desired wake time</label>
                  <Input
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="h-11 rounded-xl"
                  />
                  <p className="text-xs text-zinc-500">
                    Times include about {FALL_ASLEEP_MINUTES} minutes to fall asleep.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border bg-zinc-50 p-3 text-sm text-zinc-600">
                  Using your current local time to calculate recommended wake-up times.
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => {
                    const now = new Date();
                    setWakeTime(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
                    setMode("wake");
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to now
                </Button>
                <Button variant="outline" className="rounded-xl" disabled>
                  <Coffee className="mr-2 h-4 w-4" />
                  Avoid waking mid-cycle
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-zinc-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {mode === "wake" ? "Best bedtimes" : "Best wake-up times"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(mode === "wake" ? bedTimes : wakeTimes).map((item, idx) => (
                  <div key={`${item.cycles}-${idx}`}>
                    <TimePill item={item} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          Note: This is a sleep cycle estimate, not medical advice. Individual sleep needs vary.
        </p>
      </div>
    </div>
  );
}
