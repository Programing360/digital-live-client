import AnalyticsDashboardGrid from "@/component/AnalyticsDashboardGrid";
import HeroSection from "@/component/Banner";
import FeaturedLifeLessons from "@/component/FeaturedLifeLessons";
import FeatureShowcase from "@/component/FeatureShowcase";
import WhyLearningMatters from "@/component/WhyLearningMatters,";
import { getFeatured } from "@/lib/api/featured";
import { getUseSession } from "@/lib/core/session";

export default async function Home() {
  const user = await getUseSession();

  const allFeatured = await getFeatured()


  return (
    <div className="min-h-screen bg-transparent dark:bg-[#12032e] transition-colors duration-500 overflow-x-hidden flex flex-col gap-y-6 sm:gap-y-12">
      <HeroSection></HeroSection>
      <FeaturedLifeLessons allFeatured={allFeatured} user={user}></FeaturedLifeLessons>
      <WhyLearningMatters />
      <FeatureShowcase></FeatureShowcase>
      <AnalyticsDashboardGrid></AnalyticsDashboardGrid>
    </div>
  );
}
