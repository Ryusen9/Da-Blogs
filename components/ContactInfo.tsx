import { Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const ContactInfo = () => {
  return (
    <section className="pt-12">
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl lg:h-[20vh] mx-auto p-2">
        {/* Newsletter Section */}
        <div className="w-full h-full md:w-4/5 flex flex-col items-center justify-center lg:items-start lg:justify-center p-8 space-y-9 border-b lg:border-r border-gray-400">
          <h2 className="text-2xl">
            Subscribe to our newsletter for daily industry insights
          </h2>
          <label htmlFor="email" className="relative">
            <button className="p-4 cursor-pointer rounded-full bg-white text-black text-sm font-semibold absolute top-1/2 -translate-y-1/2 right-0">
              Start Free Trial
            </button>
            <input
              type="text"
              id="email"
              placeholder="Enter Your Email"
              className="placeholder-gray-400 p-3 pl-5 border rounded-full w-80 md:w-96"
            />
          </label>
        </div>

        {/* Follow Us Section */}
        <div className="w-full mt-4 lg:mt-0 lg:w-1/5 px-8 flex flex-col pb-3 space-y-4 items-center justify-between lg:items-start lg:border-b border-gray-400 h-full">
          <h1 className="text-3xl font-bold text-center lg:text-left">
            Follow Us!
          </h1>
          <p className="text-sm text-gray-400 text-center lg:text-left">
            Get the latest updates and news by following us on our social media
            channels.
          </p>
          <div className="flex gap-6">
            <Link href="#" aria-label="Facebook">
              <Facebook className="hover:text-blue-600 transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="hover:text-sky-500 transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="hover:text-blue-700 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
