import { parseTimeToDate } from "@/lib/time";

export const CYCLE_MINUTES = 90;
export const FALL_ASLEEP_MINUTES = 14;

export function getSleepTimesFromWake(wakeTime) {
    if (!wakeTime) return [];
    const wake = parseTimeToDate(wakeTime);
    if (!wake) return [];

    const results = [];
    for (let cycles = 6; cycles >= 3; cycles--) {
        const total = cycles * CYCLE_MINUTES + FALL_ASLEEP_MINUTES;
        const time = new Date(wake.getTime() - total * 60 * 1000);
        results.push({ time, cycles, type: "sleep" });
    }
    return results;
}

export function getWakeTimesFromNow() {
    const now = new Date();
    const start = new Date(now.getTime() + FALL_ASLEEP_MINUTES * 60 * 1000);

    const results = [];
    for (let cycles = 1; cycles <= 6; cycles++) {
        const time = new Date(start.getTime() + cycles * CYCLE_MINUTES * 60 * 1000);
        results.push({ time, cycles, type: "wake" });
    }
    return results;
}

export function qualityLabel(cycles) {
    if (cycles >= 5) return "Best";
    if (cycles === 4) return "Good";
    if (cycles === 3) return "Okay";
    return "Short";
}

export function recommendationText(cycles) {
    if (cycles >= 5) return "ideal range";
    if (cycles === 4) return "solid";
    if (cycles === 3) return "minimum";
    return "power sleep";
}