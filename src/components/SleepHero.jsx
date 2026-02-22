import { useState } from "react";
import { AlarmClock, BedDouble, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const minutes = Array.from({ length: 12 }, (_, i) =>
  String(i * 5).padStart(2, "0"),
);
const meridiems = ["AM", "PM"];

function parseTime(
  timeStr,
  fallback = { hour12: "7", minute: "00", meridiem: "AM" },
) {
  if (!timeStr || !timeStr.includes(":")) return fallback;

  const [hRaw, mRaw] = timeStr.split(":").map(Number);
  if (!Number.isFinite(hRaw) || !Number.isFinite(mRaw)) return fallback;

  const meridiem = hRaw >= 12 ? "PM" : "AM";
  const hour12 = String(hRaw % 12 || 12);
  const minute = String(mRaw).padStart(2, "0");

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
        <option
          key={option}
          value={option}
          className="bg-zinc-950 text-zinc-100"
        >
          {option}
        </option>
      ))}
    </select>
  );
}

function TimePickerRow({ label, icon: Icon, value, onChangeTime }) {
  const { hour12, minute, meridiem } = parseTime(value);

  const controlTone =
    "border border-indigo-200/15 bg-indigo-300/10 text-zinc-200 shadow-sm backdrop-blur-sm hover:bg-indigo-300/15";
  const interactiveMotion =
    "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]";
  const selectClass = `h-12 w-full rounded-xl px-3 text-base ${controlTone} focus:outline-none focus:ring-2 focus:ring-white/20 ${interactiveMotion}`;

  const updateHour = (nextHour) =>
    onChangeTime(to24Hour(nextHour, minute, meridiem));
  const updateMinute = (nextMinute) =>
    onChangeTime(to24Hour(hour12, nextMinute, meridiem));
  const updateMeridiem = (nextMeridiem) =>
    onChangeTime(to24Hour(hour12, minute, nextMeridiem));

  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200">
        <Icon className="h-4 w-4 opacity-90" />
        <span>{label}</span>
      </div>

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
  );
}

function FlowEntryCard({
  classes,
  title,
  helperLabel,
  helperEmphasis,
  icon: Icon,
  ctaText,
  onChoose,
}) {
  return (
    <Card className={classes.card}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 pt-0">
        <Button
          onClick={onChoose}
          className={[
            "h-12 w-full justify-start gap-2 rounded-xl px-4 text-base font-medium",
            "border border-indigo-200/15 bg-indigo-300/10 text-zinc-200 shadow-sm backdrop-blur-sm hover:bg-indigo-300/15",
            "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]",
          ].join(" ")}
        >
          <Icon className="h-4 w-4 opacity-90" />
          {ctaText}
        </Button>

        <div className="text-xs text-zinc-400 leading-snug">
          {helperLabel} <span className="text-zinc-200">{helperEmphasis}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function FlowExpandedCard({
  classes,
  title,
  helperLabel,
  helperEmphasis,
  timeLabel,
  timeIcon: TimeIcon,
  timeValue,
  onTimeChange,
  actionIcon: ActionIcon,
  actionText,
  onAction,
  onBack,
}) {
  const controlTone =
    "border border-indigo-200/15 bg-indigo-300/10 text-zinc-200 shadow-sm backdrop-blur-sm hover:bg-indigo-300/15";
  const interactiveMotion =
    "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]";
  const buttonClass = `h-12 w-full rounded-xl text-base font-medium ${controlTone} ${interactiveMotion}`;

  return (
    <Card className={classes.card}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <div className="text-xs text-zinc-400">
              {helperLabel}{" "}
              <span className="text-zinc-200">{helperEmphasis}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="text-xs text-zinc-400 underline underline-offset-4 hover:text-zinc-200"
          >
            Change
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <TimePickerRow
          label={timeLabel}
          icon={TimeIcon}
          value={timeValue}
          onChangeTime={onTimeChange}
        />

        <Button className={buttonClass} onClick={onAction}>
          <ActionIcon className="h-4 w-4" />
          {actionText}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SleepHero({
  classes,
  wakeTime,
  setWakeTime,
  sleepTime,
  setSleepTime,
  onSleepNow,
  onWakeAtTime,
  onSleepAtTime,
}) {
  const [activeFlow, setActiveFlow] = useState(null);

  return (
    <div className="mt-6 space-y-4">
      {/* Sleep now moved to top */}
      <div
        className={`rounded-2xl border border-indigo-200/10 bg-zinc-900/50 p-4 ${classes.card}`}
      >
        <Button
          onClick={onSleepNow}
          className={[
            "h-14 w-full rounded-2xl text-base font-semibold",
            "bg-gradient-to-r from-indigo-400/25 via-sky-400/15 to-fuchsia-400/20",
            "border border-indigo-200/20 text-zinc-100 shadow-lg shadow-black/20",
            "transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400/20 active:translate-y-0 active:scale-[0.99]",
          ].join(" ")}
        >
          <Zap className="h-4 w-4" />
          Sleep now
        </Button>

        <div className="mt-2 text-center text-xs text-zinc-400">
          Uses current time
        </div>
      </div>

      {/* Entry point + expanded flow (only one picker visible at a time) */}
      <div className="grid gap-3 md:grid-cols-2">
        {activeFlow === "wake" ? (
          <FlowExpandedCard
            classes={classes}
            title="I want to wake up at…"
            helperLabel="Calculates"
            helperEmphasis="best time to go to sleep"
            timeLabel="Wake-up time"
            timeIcon={AlarmClock}
            timeValue={wakeTime}
            onTimeChange={setWakeTime}
            actionIcon={BedDouble}
            actionText="Calculate when I should sleep"
            onAction={onWakeAtTime}
            onBack={() => setActiveFlow(null)}
          />
        ) : (
          <FlowEntryCard
            classes={classes}
            title="I want to wake up at…"
            helperLabel="Calculates"
            helperEmphasis="best time to go to sleep"
            icon={AlarmClock}
            ctaText="Calculate when I should sleep"
            onChoose={() => setActiveFlow("wake")}
          />
        )}

        {activeFlow === "sleep" ? (
          <FlowExpandedCard
            classes={classes}
            title="I want to sleep at…"
            helperLabel="Calculates"
            helperEmphasis="best time to wake up"
            timeLabel="Sleep time"
            timeIcon={BedDouble}
            timeValue={sleepTime}
            onTimeChange={setSleepTime}
            actionIcon={AlarmClock}
            actionText="Calculate when I should wake up"
            onAction={onSleepAtTime}
            onBack={() => setActiveFlow(null)}
          />
        ) : (
          <FlowEntryCard
            classes={classes}
            title="I want to sleep at…"
            helperLabel="Calculates"
            helperEmphasis="best time to wake up"
            icon={BedDouble}
            ctaText="Calculate when I should wake up"
            onChoose={() => setActiveFlow("sleep")}
          />
        )}
      </div>
    </div>
  );
}
