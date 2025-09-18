import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="font-bold text-xl">CASETiFY</h1>
            <span className="text-muted-foreground text-sm hidden sm:block">Claims Portal</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#claim" className="text-sm hover:text-primary transition-colors">Submit Claim</a>
            <a href="#track" className="text-sm hover:text-primary transition-colors">Track Status</a>
            <a href="#support" className="text-sm hover:text-primary transition-colors">Support</a>
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
              <a href="#claim" className="text-sm hover:text-primary transition-colors">Submit Claim</a>
              <a href="#track" className="text-sm hover:text-primary transition-colors">Track Status</a>
              <a href="#support" className="text-sm hover:text-primary transition-colors">Support</a>
              <Button variant="outline" size="sm" className="w-fit">Sign In</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}