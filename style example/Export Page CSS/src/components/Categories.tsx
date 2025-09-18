import { Button } from "./ui/button";

const categories = [
  { name: "Breakfast", emoji: "🥞", color: "from-green-100 to-green-200" },
  { name: "Vegan", emoji: "🥗", color: "from-green-100 to-green-200" },
  { name: "Meat", emoji: "🥩", color: "from-red-100 to-red-200" },
  { name: "Dessert", emoji: "🍰", color: "from-yellow-100 to-yellow-200" },
  { name: "Lunch", emoji: "🍱", color: "from-gray-100 to-gray-200" },
  { name: "Chocolate", emoji: "🍫", color: "from-gray-100 to-gray-200" },
];

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-semibold text-black">Categories</h2>
          <Button variant="outline" className="border-blue-200 text-black hover:bg-blue-50">
            View All Categories
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className={`relative bg-gradient-to-b ${category.color} rounded-3xl p-8 mb-4 group-hover:scale-105 transition-transform duration-200`}>
                <div className="text-6xl mb-4">{category.emoji}</div>
                {/* Blur effect for background */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 rounded-3xl"></div>
              </div>
              <h3 className="text-lg font-semibold text-black">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}