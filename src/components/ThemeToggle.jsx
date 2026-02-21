import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle({ darkMode, setDarkMode, className }) {
  return (
    <Button
      variant="outline"
      className={className}
      onClick={() => setDarkMode((value) => !value)}
    >
      {darkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
      {darkMode ? "Light mode" : "Dark mode"}
    </Button>
  );
}