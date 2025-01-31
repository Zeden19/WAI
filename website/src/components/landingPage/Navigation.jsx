import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <nav className="fixed w-full z-50 top-0 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
          Logo
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
          </button>
          <Button className="bg-gradient-to-r from-purple-400 to-blue-600 text-white rounded-full px-6 py-2 hover:opacity-90 transition-opacity duration-200">
            Join Now
          </Button>
        </div>
      </div>
    </nav>
  )
}

