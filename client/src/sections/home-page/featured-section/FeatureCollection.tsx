import { FeatureCollectionProps } from "@/types/interfaces";
import { FC } from "react";
import { CampaignItem } from "../../common/campaign-item";
import { Spinner } from "@nextui-org/react";

const FeatureCollection: FC<FeatureCollectionProps> = ({ data, loading }) => {
  return (
    <section id="active">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-primary sm:text-3xl">
            Active Campaigns
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text">
          Explore inspiring crowdfunding campaigns from around the globe. Be a part of groundbreaking ideas and help bring them to life. Ready to make an impact?
          </p>
        </header>

        {loading ? (
          <div className="w-full bg-red min-h-[40vh] flex justify-center items-center">
            <Spinner color="primary" />
          </div>
        ) : data.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((item, index) => {
              return (
                <li>
                  <CampaignItem key={index} campaign={item} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="h-[30vh] flex flex-col w-full justify-center items-center text-white">
            <p className="font-semibold">No Active Campaigns at the moment</p>
            <p>Please check again later</p>
          </div>
        )}
      </div>
    </section>
  );
};

export { FeatureCollection };
