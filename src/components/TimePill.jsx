import { motion } from "framer-motion";
import { formatTime } from "@/lib/time";
import { qualityLabel, recommendationText } from "@/lib/sleep";

export default function TimePill({ item, darkMode }) {
  const isBest = item.cycles >= 5 || (item.type === "wake" && item.cycles >= 5);

  const wrapperClass = darkMode
    ? `rounded-2xl border border-zinc-700 p-4 shadow-sm ${isBest ? "bg-zinc-800" : "bg-zinc-900"}`
    : `rounded-2xl border p-4 shadow-sm ${isBest ? "bg-white" : "bg-zinc-50"}`;

  const subTextClass = darkMode
    ? "text-sm text-zinc-400"
    : "text-sm text-zinc-500";

  const badgeClass = darkMode
    ? `rounded-full px-2.5 py-1 text-xs font-medium ${
        isBest ? "bg-zinc-100 text-zinc-900" : "bg-zinc-700 text-zinc-200"
      }`
    : `rounded-full px-2.5 py-1 text-xs font-medium ${
        isBest ? "bg-zinc-900 text-white" : "bg-zinc-200 text-zinc-700"
      }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={wrapperClass}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xl font-semibold tracking-tight">
            {formatTime(item.time)}
          </div>
          <div className={subTextClass}>
            {item.cycles} cycles • {recommendationText(item.cycles)}
          </div>
        </div>
        <span className={badgeClass}>{qualityLabel(item.cycles)}</span>
      </div>
    </motion.div>
  );
}
