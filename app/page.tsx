import ContactInfo from "@/components/ContactInfo";
import ExploreBlogs from "@/components/ExploreBlogs";
import Hero from "@/components/Hero";
import Insight from "@/components/Insight";

const Home = () => {
  return (
    <section>
      <Hero />
      <Insight />
      <ContactInfo />
      <ExploreBlogs />
    </section>
  );
};
export default Home;
