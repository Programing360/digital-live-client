import AnalyticsDashboardGrid from "@/component/AnalyticsDashboardGrid";
import HeroSection from "@/component/Banner";
import FeaturedLifeLessons from "@/component/FeaturedLifeLessons";
import FeatureShowcase from "@/component/FeatureShowcase";
import PremiumFAQ from "@/component/PremiumFAQ";
import WhyLearningMatters from "@/component/WhyLearningMatters,";
import { mostSaveFeatured } from "@/lib/action/most_saved";
import { getFeatured } from "@/lib/api/featured";
import { getTopContributors } from "@/lib/api/top_contributors";
import { getUseSession } from "@/lib/core/session";
export const metadata = {
  title: 'Home | Digital Life Lessons'
}
export default async function Home() {
  const user = await getUseSession();

  const allFeatured = await getFeatured();
  const topContributors = await getTopContributors();
  const mostSavedFeature = await mostSaveFeatured();

  return (
    <div className="min-h-screen bg-transparent dark:bg-[#12032e] transition-colors duration-500 overflow-x-hidden flex flex-col gap-y-6 sm:gap-y-12">
      <HeroSection></HeroSection>
      <FeaturedLifeLessons
        allFeatured={allFeatured}
        user={user}
      ></FeaturedLifeLessons>
      <WhyLearningMatters />
      <FeatureShowcase></FeatureShowcase>
      <AnalyticsDashboardGrid
        topContributors={topContributors}
        mostSavedFeature={mostSavedFeature}
      ></AnalyticsDashboardGrid>
      <PremiumFAQ></PremiumFAQ>
    </div>
  );
}
