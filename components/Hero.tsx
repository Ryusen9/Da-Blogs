import { Highlighter } from "./ui/highlighter";
import { ShinyButton } from "./ui/shiny-button";

const Hero = () => {
  return (
    <div className="flex flex-col gap-2.5 items-center justify-center min-h-screen">
      <div className="backdrop-blur-md p-2 rounded-3xl">
        <p className="text-xs">
          A personal blog site built with Next.js 16 and TypeScript. ✨
        </p>
      </div>
      <p className="text-2xl md:text-5xl lg:text-7xl uppercase font-bold text-center">
        Welcome to <Highlighter action="underline">Da-Blogs</Highlighter>
      </p>
      <p className="text-sm text-gray-400 mt-4">
        Sharing insights, stories, and code snippets on web development and
        beyond.
      </p>
      <ShinyButton>Explore Now!</ShinyButton>
    </div>
  );
};
export default Hero;
