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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
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

  const controlTone =
    "border border-indigo-200/15 bg-indigo-300/10 text-zinc-200 shadow-sm backdrop-blur-sm hover:bg-indigo-300/15";
  const interactiveMotion =
    "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]";

  const buttonClass = `h-12 w-full rounded-xl text-base font-medium ${controlTone} ${interactiveMotion}`;
  const selectClass = `h-12 w-full rounded-xl px-3 text-base ${controlTone} focus:outline-none focus:ring-2 focus:ring-white/20`;

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
        <Button onClick={onSleepNow} variant="ghost" className={buttonClass}>
          <BedDouble className="mr-2 h-4 w-4" />
          Sleep now
        </Button>

        <Button onClick={onWakeAtTime} variant="ghost" className={buttonClass}>
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
