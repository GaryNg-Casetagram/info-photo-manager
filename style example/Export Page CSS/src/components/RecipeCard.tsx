import { Clock, Utensils, Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface RecipeCardProps {
  title: string;
  image?: string;
  time: string;
  category: string;
  liked?: boolean;
  className?: string;
}

export function RecipeCard({ title, image, time, category, liked = false, className = "" }: RecipeCardProps) {
  return (
    <Card className={`overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
            <span className="text-gray-500 text-2xl">🍽️</span>
          </div>
        )}
        
        {/* Heart Icon */}
        <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200">
          <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {time}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Utensils className="w-3 h-3 mr-1" />
            {category}
          </Badge>
        </div>
        
        <h3 className="text-xl font-semibold text-black leading-tight">{title}</h3>
      </CardContent>
    </Card>
  );
}