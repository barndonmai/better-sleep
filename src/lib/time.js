export function pad(n) {
    return String(n).padStart(2, "0");
}

export function formatTime(date) {
    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}

export function parseTimeToDate(timeStr) {
    if (!timeStr) return null;
    const [h, m] = timeStr.split(":").map(Number);
    const now = new Date();
    const d = new Date(now);
    d.setHours(h, m, 0, 0);
    return d;
}

export function getNowTimeString() {
    const now = new Date();
    return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}