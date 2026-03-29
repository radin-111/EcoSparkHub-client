import Banner from "@/components/modules/Home/Banner";
import { Categories } from "@/components/modules/Home/Categories";
import { FeaturedIdeas } from "@/components/modules/Home/FeaturedIdeas";
import { HowItWorks } from "@/components/modules/Home/HowItWorks";
import { Stats } from "@/components/modules/Home/Stats";
import {  SubmitCTA } from "@/components/modules/Home/SubmitCTA";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <FeaturedIdeas />
      <SubmitCTA />
      <Categories />
      <Stats />
      <HowItWorks />
    </div>
  );
}
