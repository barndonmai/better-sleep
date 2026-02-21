import { BedDouble, AlarmClock } from "lucide-react";
import { Button } from "@/components/ui/button";

const hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const minutes = ["00", "15", "30", "45"];
const meridiems = ["AM", "PM"];

function parseWakeTime(wakeTime) {
  if (!wakeTime || !wakeTime.includes(":")) {
    return { hour12: "7", minute: "00", meridiem: "AM" };
  }

  const [hRaw, mRaw] = wakeTime.split(":").map(Number);
  const meridiem = hRaw >= 12 ? "PM" : "AM";
  const hour12 = String(hRaw % 12 || 12);
  const minute = String(Number.isFinite(mRaw) ? mRaw : 0).padStart(2, "0");

  return { hour12, minute, meridiem };
}

function to24Hour(hour12, minute, meridiem) {
  let hour = Number(hour12);

  if (meridiem === "AM") {
    if (hour === 12) hour = 0;
  } else {
    if (hour !== 12) hour += 12;
  }

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function TimeSelect({ value, onChange, options, className }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={className}>
      {options.map((option) => (
        <option key={option} value={option} className="text-black">
          {option}
        </option>
      ))}
    </select>
  );
}

export default function SleepHero({
  classes,
  wakeTime,
  setWakeTime,
  onSleepNow,
  onWakeAtTime,
}) {
  const { hour12, minute, meridiem } = parseWakeTime(wakeTime);

  const selectClass = `h-12 w-full rounded-xl border px-3 text-base ${classes.input}`;

  const updateHour = (nextHour) => {
    setWakeTime(to24Hour(nextHour, minute, meridiem));
  };

  const updateMinute = (nextMinute) => {
    setWakeTime(to24Hour(hour12, nextMinute, meridiem));
  };

  const updateMeridiem = (nextMeridiem) => {
    setWakeTime(to24Hour(hour12, minute, nextMeridiem));
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="space-y-4 text-center">
        <Button
          onClick={onSleepNow}
          className="h-12 w-full rounded-xl text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/20 active:translate-y-0 active:scale-[0.99]"
        >
          <BedDouble className="mr-2 h-4 w-4" />
          Sleep now
        </Button>

        <Button
          onClick={onWakeAtTime}
          variant="outline"
          className={`h-12 w-full rounded-xl text-base font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:text-inherit active:translate-y-0 active:scale-[0.99] ${classes.outlineBtn}`}
        >
          <AlarmClock className="mr-2 h-4 w-4" />
          Show bedtimes
        </Button>

        <div className="space-y-2 text-left">
          <label className={classes.label}>Wake-up time</label>

          <div className="grid grid-cols-3 gap-2">
            <TimeSelect
              value={hour12}
              onChange={updateHour}
              options={hours}
              className={selectClass}
            />
            <TimeSelect
              value={minute}
              onChange={updateMinute}
              options={minutes}
              className={selectClass}
            />
            <TimeSelect
              value={meridiem}
              onChange={updateMeridiem}
              options={meridiems}
              className={selectClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}