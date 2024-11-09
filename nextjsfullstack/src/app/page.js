import HeroSection from './_components/landing_page/HeroSection';
import FeatuesSection from "./_components/landing_page/FeatuesSection";
import CallToAction from "./_components/landing_page/CallToAction";

const Page = () => {
  return (
    <div className="min-h-screen mb">

      <HeroSection />

      <FeatuesSection />

      <CallToAction />

    </div>

  );
};

export default Page;