import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-600 dark:text-orange-500 transition-colors duration-300">
          SaaS Product
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#features"
                className="text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-500 transition-colors duration-300"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-500 transition-colors duration-300"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-500 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
            <li>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-md hover:bg-orange-100 dark:hover:bg-gray-800 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {mounted &&
                  (theme === "dark" ? (
                    <Sun className="h-5 w-5 text-orange-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-800" />
                  ))}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

