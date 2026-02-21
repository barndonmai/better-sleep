import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimePill from "@/components/TimePill";

export default function SleepResultsCard({ classes, mode, results, darkMode }) {
  return (
    <Card className={classes.card}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          {mode === "wake" ? "Best bedtimes" : "Best wake-up times"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {results.map((item, idx) => (
            <div key={`${item.cycles}-${idx}`}>
              <TimePill item={item} darkMode={darkMode} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}