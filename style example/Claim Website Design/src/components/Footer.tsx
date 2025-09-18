import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">CASETiFY</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium phone protection with lifetime warranty. Your device deserves the best.
            </p>
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Claims</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#claim" className="hover:text-white transition-colors">Submit New Claim</a></li>
              <li><a href="#track" className="hover:text-white transition-colors">Track Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#support" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Live Chat</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Installation Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get notified about claim updates and new products.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button variant="secondary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 CASETiFY. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}