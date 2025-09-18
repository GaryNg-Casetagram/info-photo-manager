import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Newsletter() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 rounded-[60px] p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-8 left-8 w-20 h-20 bg-green-200 rounded-full opacity-50"></div>
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-orange-200 rounded-full opacity-50"></div>
          <div className="absolute top-1/2 right-12 w-16 h-16 bg-yellow-200 rounded-full opacity-50"></div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-semibold text-black mb-6">
              Deliciousness to your inbox
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Your email address..." 
                className="flex-1 bg-white border-0 rounded-2xl px-6 py-4 text-base"
              />
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-2xl whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}