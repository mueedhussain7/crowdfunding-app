import { FeatureStepsProps } from "@/types/interfaces";
import { LightBulbIcon } from '@heroicons/react/24/outline';


const FeatureSteps: React.FC<FeatureStepsProps> = ({ data }) => {
  return (
    <section id="how">
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <h2 className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent  text-3xl font-bold sm:text-4xl">{data.title}</h2>
          <p className="text-text mt-4 ">{data.description}</p>
        </div>

        <div className="text-text mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {data.featuredItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gradient-to-r from-primary to-secondary p-2">
                <LightBulbIcon className="w-5 h-5 text-bg" />
              </span>
              <div>
                <h3 className="text-lg font-bold">{index + 1}{". "}{item.title}</h3>
                <p className="mt-1 text-sm text-gray-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { FeatureSteps };
