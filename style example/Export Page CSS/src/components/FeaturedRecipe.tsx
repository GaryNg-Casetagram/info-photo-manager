import { Clock, Utensils, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import imgBakedChickenWingsAsianStyleTomatoesSaucePlate1 from "../imports/HomePage";

export function FeaturedRecipe() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Hot Recipes Badge */}
            <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
              <div className="w-6 h-6 bg-orange-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-black">Hot Recipes</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-semibold text-black leading-tight">
              Spicy delicious chicken wings
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim
            </p>

            {/* Recipe Info */}
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700">
                <Clock className="w-4 h-4 mr-2" />
                30 Minutes
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700">
                <Utensils className="w-4 h-4 mr-2" />
                Chicken
              </Badge>
            </div>

            {/* Author and CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-semibold text-black">John Smith</p>
                  <p className="text-sm text-gray-500">15 March 2022</p>
                </div>
              </div>
              
              <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-2xl">
                <Play className="w-4 h-4 mr-2" />
                View Recipes
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl overflow-hidden">
              {/* Placeholder for chicken wings image */}
              <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg">🍗 Chicken Wings</span>
              </div>
            </div>
            
            {/* Circular Badge */}
            <div className="absolute top-8 right-8 w-32 h-32 bg-black rounded-full flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-xs">HAND</div>
                <div className="text-xs">PICKED</div>
                <div className="text-xs">RECIPE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}