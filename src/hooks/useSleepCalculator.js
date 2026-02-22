import { useMemo, useState } from "react";
import {
    getSleepTimesFromWake,
    getWakeTimesFromNow,
    getWakeTimesFromSleepTime,
} from "@/lib/sleep";

/**
 * Modes:
 * - wakeAt: user chooses a wake time -> show best bedtimes
 * - sleepAt: user chooses a sleep time -> show best wake times
 * - sleepNow: quick action (uses now) -> show best wake times
 */
export function useSleepCalculator() {
    // Defaults requested:
    // Wake: 8:00 AM (08:00)
    // Sleep: 11:00 PM (23:00)
    const [wakeTime, setWakeTime] = useState("08:00");
    const [sleepTime, setSleepTime] = useState("23:00");

    const [mode, setMode] = useState("wakeAt");
    const [hasCalculated, setHasCalculated] = useState(false);

    // Used to force refresh for Sleep now
    const [sleepNowRefreshKey, setSleepNowRefreshKey] = useState(0);

    const bedTimes = useMemo(() => getSleepTimesFromWake(wakeTime), [wakeTime]);

    const wakeTimesFromSleepTime = useMemo(
        () => getWakeTimesFromSleepTime(sleepTime),
        [sleepTime],
    );

    const wakeTimesFromNow = useMemo(() => getWakeTimesFromNow(), [sleepNowRefreshKey]);

    const subtitle =
        mode === "wakeAt"
            ? "Choose a wake-up time to get suggested bedtimes (90-minute cycles + ~14 minutes to fall asleep)."
            : mode === "sleepAt"
                ? "Choose a sleep time to get suggested wake-up times (90-minute cycles + ~14 minutes to fall asleep)."
                : "Sleep now uses the current time—tap again to refresh suggested wake-up times.";

    const results =
        mode === "wakeAt" ? bedTimes : mode === "sleepAt" ? wakeTimesFromSleepTime : wakeTimesFromNow;

    const resultsRenderKey = `${mode}-${sleepNowRefreshKey}-${wakeTime}-${sleepTime}`;

    const calculateSleepNow = () => {
        setMode("sleepNow");
        setHasCalculated(true);
        setSleepNowRefreshKey((value) => value + 1);
    };

    const calculateFromWakeTime = () => {
        setMode("wakeAt");
        setHasCalculated(true);
    };

    const calculateFromSleepTime = () => {
        setMode("sleepAt");
        setHasCalculated(true);
    };

    const resetCalculator = () => {
        setWakeTime("08:00");
        setSleepTime("23:00");
        setHasCalculated(false);
        setMode("wakeAt");
    };

    return {
        wakeTime,
        setWakeTime,
        sleepTime,
        setSleepTime,

        mode,
        subtitle,
        results,
        hasCalculated,
        resultsRenderKey,

        calculateSleepNow,
        calculateFromWakeTime,
        calculateFromSleepTime,
        resetCalculator,
    };
}