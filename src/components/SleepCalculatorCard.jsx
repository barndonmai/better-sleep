import { AlarmClock, BedDouble, Coffee, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FALL_ASLEEP_MINUTES } from "@/lib/sleep";

export default function SleepCalculatorCard({
  classes,
  mode,
  setMode,
  wakeTime,
  setWakeTime,
  resetToNow,
}) {
  return (
    <Card className={classes.card}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={classes.toggleWrap}>
          <Button
            variant="ghost"
            className={`h-10 justify-center rounded-lg ${mode === "sleep" ? classes.activeToggleBtn : ""}`}
            onClick={() => setMode("sleep")}
          >
            <BedDouble className="mr-2 h-4 w-4" />
            Sleep now
          </Button>

          <Button
            variant="ghost"
            className={`h-10 justify-center rounded-lg ${mode === "wake" ? classes.activeToggleBtn : ""}`}
            onClick={() => setMode("wake")}
          >
            <AlarmClock className="mr-2 h-4 w-4" />
            Wake up at
          </Button>
        </div>

        {mode === "wake" ? (
          <div className="space-y-2">
            <label className={classes.label}>Desired wake time</label>
            <Input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className={classes.input}
            />
            <p className={classes.helperText}>
              Times include about {FALL_ASLEEP_MINUTES} minutes to fall asleep.
            </p>
          </div>
        ) : (
          <div className={classes.infoBox}>
            Using your current local time to calculate recommended wake-up
            times.
          </div>
        )}

        {mode === "wake" && (
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              variant="outline"
              className={`h-10 w-full sm:w-auto ${classes.outlineBtn}`}
              onClick={resetToNow}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
