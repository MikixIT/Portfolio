import devImage from "@/assets/images/developer.png";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="py-32">
      <div className="container">
        <div className="flex flex-col items-center">
          <Image
            src={devImage}
            className="size-[200px]"
            alt="guy who dev this Portfolio"
          />
          <div className="bg-gray-900 border border-gray-600 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
            <div className="bg-green-500 size-2.5 rounded-full"></div>
            <div className="text-sm font-semibold">Here for help you!</div>
          </div>
        </div>
        <h1 className="text-3xl text-center mt-8 tracking-wide">
          UX & UI Specialist
        </h1>
        <p className="mt-4 text-center text-white/80">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam rerum
          nihil asperiores, ipsa corporis optio voluptates tenetur repellendus
          sed eius, rem amet. Dolores, iusto quas? Deserunt placeat ratione
          error a.
        </p>
        <div>
          <button>
            <span>Take a look</span>
            <span>✨</span>
          </button>
          <button>
            <span>🚀</span>
            <span>Contact me now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
