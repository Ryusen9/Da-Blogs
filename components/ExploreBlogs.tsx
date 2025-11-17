import Image from "next/image";
import { Highlighter } from "./ui/highlighter";
import { MagicCard } from "./ui/magic-card";
import { Clock } from "lucide-react";
import Link from "next/link";
import posts from "@/data/sample-posts.json";

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  readingTime?: string;
  coverImage?: string;
  author?: { name: string; twitter?: string };
  draft?: boolean;
}

const ExploreBlogs = () => {
  const data = posts;

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

      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post: Post) => (
          <article
            key={post.id}
            className="rounded-lg overflow-hidden bg-transparent"
          >
            <MagicCard className="flex flex-col p-0.5">
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="relative h-56 w-full">
                  <Image
                    src={post.coverImage ?? "/Logo.png"}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                    priority={false}
                  />
                </div>
              </Link>
              <div className="p-4 h-[250px] flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="hover:underline"
                  >
                    <h2 className="text-lg font-semibold leading-snug text-black">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-800 mt-2 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime}</span>
                    </div>
                    <span>•</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-700">
                      {post.author?.name}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags?.map((t: string) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded bg-black/70 text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="w-full flex items-center justify-end">
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
                    Read more
                  </button>
                </div>
              </div>
            </MagicCard>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExploreBlogs;
