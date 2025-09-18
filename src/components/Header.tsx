import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="font-bold text-xl">📊 Expense Manager</h1>
              <span className="text-muted-foreground text-sm hidden sm:block">Professional Receipt Tracking</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/expenses" className="text-sm hover:text-primary transition-colors">
              Expenses
            </Link>
            <a href="#reports" className="text-sm hover:text-primary transition-colors">
              Reports
            </a>
            <a href="#settings" className="text-sm hover:text-primary transition-colors">
              Settings
            </a>
            <Button variant="outline" size="sm">Sign In</Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/expenses" className="text-sm hover:text-primary transition-colors">
                Expenses
              </Link>
              <a href="#reports" className="text-sm hover:text-primary transition-colors">
                Reports
              </a>
              <a href="#settings" className="text-sm hover:text-primary transition-colors">
                Settings
              </a>
              <Button variant="outline" size="sm" className="w-fit">Sign In</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
