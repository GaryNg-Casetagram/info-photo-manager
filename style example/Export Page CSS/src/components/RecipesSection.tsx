import { RecipeCard } from "./RecipeCard";

const recipes = [
  {
    title: "Big and Juicy Wagyu Beef Cheeseburger",
    time: "30 Minutes",
    category: "Snack",
    liked: true,
  },
  {
    title: "Fresh Lime Roasted Salmon with Ginger Sauce",
    time: "30 Minutes", 
    category: "Fish",
    liked: false,
  },
  {
    title: "Strawberry Oatmeal Pancake with Honey Syrup",
    time: "30 Minutes",
    category: "Breakfast", 
    liked: false,
  },
  {
    title: "Fresh and Healthy Mixed Mayonnaise Salad",
    time: "30 Minutes",
    category: "Healthy",
    liked: true,
  },
  {
    title: "Chicken Meatballs with Cream Cheese",
    time: "30 Minutes",
    category: "Meat",
    liked: false,
  },
  {
    title: "Fruity Pancake with Orange & Blueberry", 
    time: "30 Minutes",
    category: "Sweet",
    liked: true,
  },
  {
    title: "The Best Easy One Pot Chicken and Rice",
    time: "30 Minutes",
    category: "Snack",
    liked: false,
  },
  {
    title: "The Creamiest Creamy Chicken and Bacon Pasta",
    time: "30 Minutes", 
    category: "Noodles",
    liked: false,
  },
];

export function RecipesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-black mb-4">Simple and tasty recipes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured larger cards */}
          {recipes.slice(0, 3).map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              time={recipe.time}
              category={recipe.category}
              liked={recipe.liked}
              className={index === 0 ? "lg:col-span-1" : ""}
            />
          ))}
        </div>

        {/* Ad Card */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-center text-white relative overflow-hidden">
            <h3 className="text-2xl font-lobster mb-4">Don't forget to eat healthy food</h3>
            <div className="text-6xl mb-4">🥗</div>
            <p className="text-sm opacity-80">www.foodieland.com</p>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
          </div>
        </div>

        {/* More recipes grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.slice(3).map((recipe, index) => (
            <RecipeCard
              key={index + 3}
              title={recipe.title}
              time={recipe.time}
              category={recipe.category}
              liked={recipe.liked}
            />
          ))}
        </div>
      </div>
    </section>
  );
}