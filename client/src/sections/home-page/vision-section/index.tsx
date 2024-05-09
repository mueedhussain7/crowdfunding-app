import { FC } from "react";

interface VisionProps {
  data: {
    title: string;
    desc: string;
  };
}
const Vision: FC<VisionProps> = ({ data }) => {
  return (
    <section id="vision">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt=""
              src="https://blog.radialcode.com/_next/image?url=https%3A%2F%2Fradialcode-cms.s3.ap-south-1.amazonaws.com%2FThumbnail_40_fd1e2efc9d.png&w=3840&q=75"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent  text-3xl font-bold sm:text-4xl">
              {data.title}
            </h2>
            <p className="text-text mt-4 ">{data.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Vision };
