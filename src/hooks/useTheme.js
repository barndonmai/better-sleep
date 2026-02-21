import { useMemo, useState } from "react";

export function useTheme(defaultDark = true) {
    const [darkMode, setDarkMode] = useState(defaultDark);

    const classes = useMemo(() => {
        return {
            page: darkMode
                ? "min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black p-4 text-zinc-100 md:p-8"
                : "min-h-screen bg-gradient-to-b from-zinc-100 to-white p-4 md:p-8",

            pill: darkMode
                ? "mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-sm shadow-sm"
                : "mb-2 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm shadow-sm",

            subtitle: darkMode ? "mt-2 max-w-2xl text-zinc-300" : "mt-2 max-w-2xl text-zinc-600",

            card: darkMode
                ? "rounded-2xl border-zinc-800 bg-zinc-900/80 text-zinc-100 shadow-sm"
                : "rounded-2xl border-zinc-200 shadow-sm",

            toggleWrap: darkMode
                ? "grid grid-cols-2 gap-2 rounded-xl bg-zinc-800 p-1"
                : "grid grid-cols-2 gap-2 rounded-xl bg-zinc-100 p-1",

            activeToggleBtn: darkMode ? "bg-zinc-700 text-white shadow-sm" : "bg-white shadow-sm",

            label: darkMode ? "text-sm font-medium text-zinc-200" : "text-sm font-medium text-zinc-700",

            input: darkMode
                ? "h-11 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-100"
                : "h-11 rounded-xl",

            helperText: darkMode ? "text-xs text-zinc-400" : "text-xs text-zinc-500",

            infoBox: darkMode
                ? "rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-sm text-zinc-300"
                : "rounded-xl border bg-zinc-50 p-3 text-sm text-zinc-600",

            outlineBtn: darkMode
                ? "rounded-xl border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                : "rounded-xl",

            footer: darkMode ? "mt-6 text-xs text-zinc-400" : "mt-6 text-xs text-zinc-500",
        };
    }, [darkMode]);

    return {
        darkMode,
        setDarkMode,
        classes,
    };
}