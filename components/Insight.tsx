import { Calendar, Rocket } from "lucide-react";
import ShinyText from "./ShinyText";
import image from "../public/Surreal Glass Forms.png";
import Image from "next/image";
import { ShineBorder } from "./ui/shine-border";

const Insight = () => {
  return (
    <section className="my-12">
      <div className="max-w-7xl md:h-[55vh] rounded-xl px-5 mx-auto flex flex-col md:flex-row items-center justify-center overflow-hidden group">
        {/* Left Side */}
        <div className="flex h-full flex-col w-full md:w-1/2 items-start justify-between space-y-12 p-8 backdrop-blur-md md:rounded-l-xl">
          <ShineBorder duration={20} />
          <div className="flex space-x-2 items-center justify-center">
            <ShinyText text="Insight" speed={3} className="text-2xl" />
            <Rocket />
          </div>
          <div>
            <p className="text-3xl md:text-5xl">
              Dive into a world of knowledge with Da-Blogs!
            </p>
            <p className="text-sm text-gray-400 mt-3">
              Explore articles, tutorials, and stories on web development,
              design, and more!
            </p>
          </div>
          <div className="flex space-x-3">
            <Calendar />
            <p className="">
              Posted on <span className="underline">June 20, 2024</span>
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-full md:w-1/2 h-full rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <Image src={image} alt="image" className="h-full object-cover" />
        </div>
      </div>
    </section>
  );
};
export default Insight;
