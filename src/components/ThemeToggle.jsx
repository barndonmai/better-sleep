import { Button } from "@/components/ui/button";

export default function ThemeToggle({ darkMode, setDarkMode, className }) {
  return (
    <Button
      variant="outline"
      className={className}
      onClick={() => setDarkMode((value) => !value)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Light mode" : "Dark mode"}
    >
      <span className="text-base leading-none" aria-hidden="true">
        {darkMode ? "☀️" : "🌙"}
      </span>
    </Button>
  );
}
