import { Button } from "./ui/button";

export function LearnMoreSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <h2 className="text-4xl font-semibold text-black leading-tight">
              Everyone can be a chef in their own kitchen
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim
            </p>
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-2xl">
              Learn More
            </Button>
          </div>

          {/* Chef Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 relative overflow-hidden">
              {/* Chef placeholder */}
              <div className="aspect-[3/4] bg-gradient-to-b from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center">
                <span className="text-white text-6xl">👨‍🍳</span>
              </div>
              
              {/* Floating food elements */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">🥕</span>
              </div>
              <div className="absolute bottom-16 left-8 w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                <span className="text-xl">🥬</span>
              </div>
              <div className="absolute top-1/2 right-4 w-14 h-14 bg-red-200 rounded-full flex items-center justify-center">
                <span className="text-xl">🍅</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}