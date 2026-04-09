import { Compass, Moon, Sun, User, LogOut, BookOpen, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUser();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-purple-600">Career Compass</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">
            Home
          </a>
          <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">
            About Us
          </a>
          <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors">
            Contact Us
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center hover:scale-105 transition-transform">
                  <User className="w-5 h-5 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{user?.name}</span>
                    <span className="text-xs text-gray-500">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <User className="mr-2 h-4 w-4" />
                  My Profile & Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/bookings")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/roadmap")}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  My Career Roadmap
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}