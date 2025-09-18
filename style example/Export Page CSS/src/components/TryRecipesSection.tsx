import { RecipeCard } from "./RecipeCard";

const featuredRecipes = [
  {
    title: "Mixed Tropical Fruit Salad with Superfood Boosts",
    time: "30 Minutes",
    category: "Healthy",
    liked: true,
  },
  {
    title: "Big and Juicy Wagyu Beef Cheeseburger", 
    time: "30 Minutes",
    category: "Western",
    liked: false,
  },
  {
    title: "Healthy Japanese Fried Rice with Asparagus",
    time: "30 Minutes", 
    category: "Healthy",
    liked: true,
  },
  {
    title: "Cauliflower Walnut Vegetarian Taco Meat",
    time: "30 Minutes",
    category: "Eastern", 
    liked: false,
  },
  {
    title: "Rainbow Chicken Salad with Almond Honey Mustard Dressing",
    time: "30 Minutes",
    category: "Healthy",
    liked: true,
  },
  {
    title: "Barbeque Spicy Sandwiches with Chips",
    time: "30 Minutes",
    category: "Snack",
    liked: false,
  },
  {
    title: "Firecracker Vegan Lettuce Wraps - Spicy!",
    time: "30 Minutes", 
    category: "Seafood",
    liked: false,
  },
  {
    title: "Chicken Ramen Soup with Mushroom",
    time: "30 Minutes",
    category: "Japanese",
    liked: true,
  },
];

export function TryRecipesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-4xl font-semibold text-black mb-4 leading-tight">
              Try this delicious recipe<br />
              to make your day
            </h2>
          </div>
          <div className="max-w-lg">
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
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