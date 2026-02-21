import { useMemo, useState } from "react";
import { getNowTimeString } from "@/lib/time";
import { getSleepTimesFromWake, getWakeTimesFromNow } from "@/lib/sleep";

export function useSleepCalculator() {
    const [wakeTime, setWakeTime] = useState(getNowTimeString());
    const [mode, setMode] = useState("sleep");
    const [hasCalculated, setHasCalculated] = useState(false);

    const bedTimes = useMemo(() => getSleepTimesFromWake(wakeTime), [wakeTime]);
    const wakeTimes = useMemo(() => getWakeTimesFromNow(), [hasCalculated, mode]);

    const subtitle =
        mode === "wake"
            ? "Pick a wake-up time and get suggested bedtimes based on 90-minute sleep cycles."
            : "Tap Sleep now to see ideal wake-up times (includes ~14 minutes to fall asleep).";

    const results = mode === "wake" ? bedTimes : wakeTimes;

    const calculateSleepNow = () => {
        setMode("sleep");
        setHasCalculated(true);
    };

    const calculateFromWakeTime = () => {
        setMode("wake");
        setHasCalculated(true);
    };

    const resetCalculator = () => {
        setWakeTime(getNowTimeString());
        setHasCalculated(false);
    };

    return {
        wakeTime,
        setWakeTime,
        mode,
        setMode,
        subtitle,
        results,
        hasCalculated,
        calculateSleepNow,
        calculateFromWakeTime,
        resetCalculator,
    };
}