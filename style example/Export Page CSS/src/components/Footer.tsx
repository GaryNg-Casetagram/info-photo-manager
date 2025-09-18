import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-lobster mb-4">
              Foodieland<span className="text-orange-500">.</span>
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Lorem ipsum dolor sit amet, consectetuipisicing elit
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <div className="flex flex-wrap gap-6 text-base font-medium">
              <a href="#" className="text-black hover:text-orange-500">Recipes</a>
              <a href="#" className="text-black hover:text-orange-500">Blog</a>
              <a href="#" className="text-black hover:text-orange-500">Contact</a>
              <a href="#" className="text-black hover:text-orange-500">About us</a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-black hover:text-orange-500 cursor-pointer" />
              <Twitter className="w-6 h-6 text-black hover:text-orange-500 cursor-pointer" />
              <Instagram className="w-6 h-6 text-black hover:text-orange-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-center md:text-left">
            © 2020 Flowbase. Powered by <span className="text-orange-500">Webflow</span>
          </p>
        </div>
      </div>
    </footer>
  );
}