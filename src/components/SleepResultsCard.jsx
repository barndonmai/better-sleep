import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimePill from "@/components/TimePill";

function formatTimeLabel(timeStr) {
  if (!timeStr || !timeStr.includes(":")) return "your selected time";

  const [hourRaw, minuteRaw] = timeStr.split(":").map(Number);
  if (!Number.isFinite(hourRaw) || !Number.isFinite(minuteRaw))
    return "your selected time";

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
  sleepTime,
}) {
  const nowLabel = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const wakeTimeLabel = formatTimeLabel(wakeTime);
  const sleepTimeLabel = formatTimeLabel(sleepTime);

  // Single headline, same size/font as the old "Calculate bedtimes" title
  const headline =
    mode === "wakeAt"
      ? `If you want to wake up at ${wakeTimeLabel}, the best times to go to sleep would be:`
      : mode === "sleepAt"
        ? `If you want to sleep at ${sleepTimeLabel}, the best times to wake up would be:`
        : `If you sleep now (${nowLabel}), the best times to wake up would be:`;

  return (
    <Card className={classes.card}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{headline}</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-3">
        {results.map((item, index) => (
          <TimePill
            key={`${item.type}-${item.cycles}-${index}`}
            item={item}
            darkMode={darkMode}
          />
        ))}
      </CardContent>
    </Card>
  );
}
