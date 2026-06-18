
import AnalyticsDashboardGrid from "@/component/AnalyticsDashboardGrid";
import HeroSection from "@/component/Banner";
import FeaturedLifeLessons from "@/component/FeaturedLifeLessons";
import WhyLearningMatters from "@/component/WhyLearningMatters,";


export default function Home() {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <FeaturedLifeLessons></FeaturedLifeLessons>
      <WhyLearningMatters/>
      <AnalyticsDashboardGrid></AnalyticsDashboardGrid>
    </div>
  );
}
