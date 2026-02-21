import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimePill from "@/components/TimePill";

function formatWakeTimeLabel(wakeTime) {
  if (!wakeTime || !wakeTime.includes(":")) return "your selected time";

  const [hourRaw, minuteRaw] = wakeTime.split(":").map(Number);

  if (!Number.isFinite(hourRaw) || !Number.isFinite(minuteRaw)) {
    return "your selected time";
  }

  const suffix = hourRaw >= 12 ? "PM" : "AM";
  const hour12 = hourRaw % 12 || 12;
  const minute = String(minuteRaw).padStart(2, "0");

  return `${hour12}:${minute} ${suffix}`;
}

export default function SleepResultsCard({
  classes,
  mode,
  results,
  darkMode,
  wakeTime,
}) {
  const sleepNowLabel = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const wakeTimeLabel = formatWakeTimeLabel(wakeTime);

  const title =
    mode === "wake"
      ? `If you want to wake up at ${wakeTimeLabel}, the best times to sleep would be:`
      : `If you sleep at ${sleepNowLabel}, the best time to wake up would be`;

  return (
    <Card className={classes.card}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-snug">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {results.map((item, index) => (
            <div key={`${item.cycles}-${index}`}>
              <TimePill item={item} darkMode={darkMode} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
