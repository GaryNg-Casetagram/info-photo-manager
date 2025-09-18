import { Navigation } from "./Navigation";
import { FeaturedRecipe } from "./FeaturedRecipe";
import { Categories } from "./Categories";
import { RecipesSection } from "./RecipesSection";
import { LearnMoreSection } from "./LearnMoreSection";
import { InstagramSection } from "./InstagramSection";
import { TryRecipesSection } from "./TryRecipesSection";
import { Newsletter } from "./Newsletter";
import { Footer } from "./Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FeaturedRecipe />
      <Categories />
      <RecipesSection />
      <LearnMoreSection />
      <InstagramSection />
      <TryRecipesSection />
      <Newsletter />
      <Footer />
    </div>
  );
}