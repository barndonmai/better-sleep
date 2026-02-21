export const CYCLE_MINUTES = 90;
export const FALL_ASLEEP_MINUTES = 14;

function parseTimeToDate(timeStr) {
    if (!timeStr) return null;

    const [h, m] = timeStr.split(":").map(Number);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return null;

    const now = new Date();
    const date = new Date(now);
    date.setHours(h, m, 0, 0);

    return date;
}

export function getSleepTimesFromWake(wakeTime) {
    const wake = parseTimeToDate(wakeTime);
    if (!wake) return [];

    const results = [];

    for (let cycles = 6; cycles >= 3; cycles -= 1) {
        const totalMinutes = cycles * CYCLE_MINUTES + FALL_ASLEEP_MINUTES;
        const bedtime = new Date(wake.getTime() - totalMinutes * 60 * 1000);

        results.push({
            time: bedtime,
            cycles,
            type: "sleep",
        });
    }

    return results;
}

export function getWakeTimesFromNow() {
    const now = new Date();
    const start = new Date(now.getTime() + FALL_ASLEEP_MINUTES * 60 * 1000);
    const results = [];

    // Best cycle count first (6), then down to shortest
    for (let cycles = 6; cycles >= 1; cycles -= 1) {
        const wakeTime = new Date(start.getTime() + cycles * CYCLE_MINUTES * 60 * 1000);

        results.push({
            time: wakeTime,
            cycles,
            type: "wake",
        });
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