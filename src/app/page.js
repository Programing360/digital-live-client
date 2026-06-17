import HeroSection from "@/component/Banner";
import FeaturedLifeLessons from "@/component/FeaturedLifeLessons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <HeroSection></HeroSection>
      <FeaturedLifeLessons></FeaturedLifeLessons>
    </div>
  );
}
