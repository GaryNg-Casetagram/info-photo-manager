import { Facebook, Twitter, Instagram } from "lucide-react";

export function Navigation() {
  return (
    <nav className="w-full bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-lobster">
              Foodieland<span className="text-orange-500">.</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-black hover:text-orange-500 px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="#" className="text-black hover:text-orange-500 px-3 py-2 text-base font-medium">
                Recipes
              </a>
              <a href="#" className="text-black hover:text-orange-500 px-3 py-2 text-base font-medium">
                Blog
              </a>
              <a href="#" className="text-black hover:text-orange-500 px-3 py-2 text-base font-medium">
                Contact
              </a>
              <a href="#" className="text-black hover:text-orange-500 px-3 py-2 text-base font-medium">
                About us
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <Facebook className="w-5 h-5 text-black hover:text-orange-500 cursor-pointer" />
            <Twitter className="w-5 h-5 text-black hover:text-orange-500 cursor-pointer" />
            <Instagram className="w-5 h-5 text-black hover:text-orange-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
}