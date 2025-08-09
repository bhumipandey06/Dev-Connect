import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-zinc-900">
      {/* Logo or Title */}
      <h1 className="text-xl font-bold text-zinc-800 dark:text-white mb-2 sm:mb-0">
        DevConnect
      </h1>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6 text-sm sm:text-base">
        <Link
          to="/"
          className="text-zinc-800 dark:text-white hover:underline"
        >
          Home
        </Link>

        <Link
          to="/profiles"
          className="text-zinc-800 dark:text-white hover:underline"
        >
          Explore Profiles
        </Link>

        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
