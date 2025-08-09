// src/components/ThemeToggle.jsx
import { useTheme } from "next-themes"; // will need to install `next-themes`
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-200 dark:bg-zinc-700 text-zinc-800 dark:text-white"
    >
      {theme === "dark" ? <Sun className="text-yellow-300" size={18} /> : <Moon className="text-zinc-800" size={18} />}
    </button>
  );
};

export default ThemeToggle;
