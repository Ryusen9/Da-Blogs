import Image from "next/image";
import { Highlighter } from "./ui/highlighter";
import { MagicCard } from "./ui/magic-card";

const ExploreBlogs = () => {
  const data = [
    {
      id: "post_001",
      title: "Speeding Up Next.js: Practical LCP Wins",
      slug: "speeding-up-nextjs-lcp-wins",
      date: "2025-10-20T10:00:00.000Z",
      tags: ["nextjs", "performance", "lcp"],
      excerpt:
        "Small, practical changes that cut Largest Contentful Paint times — from image loading to route caching.",
      readingTime: "6 min",
      coverImage: "/image 1.jpeg",
      author: { name: "Da-Blogs", twitter: "@da_blogs" },
      draft: false,
    },
    {
      id: "post_002",
      title: "Subtle Motion with GSAP: Micro-interactions that Delight",
      slug: "subtle-motion-gsap-micro-interactions",
      date: "2025-09-12T08:30:00.000Z",
      tags: ["gsap", "animation", "ux"],
      excerpt:
        "A short guide to tasteful micro-animations using GSAP — focus, timing, and reducing motion for accessibility.",
      readingTime: "5 min",
      coverImage: "/image 2.jpeg",
      author: { name: "Da-Blogs", twitter: "@da_blogs" },
      draft: false,
    },
    {
      id: "post_003",
      title: "Glassmorphism and Accessibility: A Practical Approach",
      slug: "glassmorphism-accessibility",
      date: "2025-07-02T14:15:00.000Z",
      tags: ["css", "design", "accessibility"],
      excerpt:
        "Glass-like UI effects are trendy — here’s how to use them without hurting contrast or readability.",
      readingTime: "7 min",
      coverImage: "/image 3.jpeg",
      author: { name: "Da-Blogs", twitter: "@da_blogs" },
      draft: false,
    },
    {
      id: "post_004",
      title: "TypeScript Generics: Real-world Patterns",
      slug: "typescript-generics-real-world",
      date: "2025-05-18T09:00:00.000Z",
      tags: ["typescript", "patterns", "dev"],
      excerpt:
        "Concrete examples of generics in libraries and apps — helpers, constraints, and ergonomics.",
      readingTime: "8 min",
      coverImage: "/image 4.jpeg",
      author: { name: "Da-Blogs", twitter: "@da_blogs" },
      draft: false,
    },
    {
      id: "post_005",
      title: "Deploying a Fast Blog on Vercel — Checklist",
      slug: "deploying-fast-blog-vercel-checklist",
      date: "2025-03-10T11:20:00.000Z",
      tags: ["deployment", "vercel", "devops"],
      excerpt:
        "A checklist to keep builds fast, caching effective, and preview environments snappy when deploying to Vercel.",
      readingTime: "4 min",
      coverImage: "/image 5.jpeg",
      author: { name: "Da-Blogs", twitter: "@da_blogs" },
      draft: false,
    },
  ];

  console.log(data);
  return (
    <section>
      <div className="flex flex-col">
        <h1 className="text-center text-4xl mt-14 font-semibold">
          Explore Our Latest{" "}
          <span>
            <Highlighter action="circle">Blogs</Highlighter>
          </span>
        </h1>
        <p className="text-center text-sm mt-2 text-gray-400">
          Dive into a world of knowledge with our curated articles on web
          development, design, and more.
        </p>
      </div>

      <div className="max-w-7xl border-2 mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post) => (
          <div key={post.id}>
            <MagicCard className="flex flex-col space-y-3">
              <div>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="rounded-md"
                />
              </div>
            </MagicCard>
          </div>
        ))}
      </div>
    </section>
  );
};
export default ExploreBlogs;
