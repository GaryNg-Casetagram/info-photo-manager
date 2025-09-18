import { Instagram } from "lucide-react";
import { Button } from "./ui/button";

export function InstagramSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-black mb-4">
            Check out @foodieland on Instagram
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim
          </p>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-pink-200 to-orange-200 rounded-xl overflow-hidden group cursor-pointer">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
                <span className="text-white text-3xl">📸</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-2xl">
            <Instagram className="w-5 h-5 mr-2" />
            Visit Our Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}