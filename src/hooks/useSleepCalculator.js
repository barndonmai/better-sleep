import { useMemo, useState } from "react";
import { getNowTimeString } from "@/lib/time";
import { getSleepTimesFromWake, getWakeTimesFromNow } from "@/lib/sleep";

export function useSleepCalculator() {
    const [wakeTime, setWakeTime] = useState(getNowTimeString());
    const [mode, setMode] = useState("sleep");
    const bedTimes = useMemo(() => getSleepTimesFromWake(wakeTime), [wakeTime]);
    const wakeTimes = useMemo(() => getWakeTimesFromNow(), [mode]);

    const subtitle =
        mode === "wake"
            ? "Pick when you want to wake up and get suggested bedtimes based on 90-minute sleep cycles."
            : "If you go to sleep now, these are good times to wake up (includes ~14 minutes to fall asleep).";

    const results = mode === "wake" ? bedTimes : wakeTimes;

    const resetToNow = () => {
        setWakeTime(getNowTimeString());
        setMode("sleep");
    };

    return {
        wakeTime,
        setWakeTime,
        mode,
        setMode,
        subtitle,
        results,
        resetToNow,
    };
}