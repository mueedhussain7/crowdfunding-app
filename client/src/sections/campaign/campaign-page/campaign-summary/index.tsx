import React from "react";
import { CampaignItemType, CampaignMetadata } from "@/types/interfaces";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import { CampaignDetails } from "./campaign-details";

interface CampaignSummaryProps {
  id: string;
  campaign: CampaignItemType;
  metadata:CampaignMetadata;
  loading: boolean;
  refetch: () => void;
}

const CampaignSummary: React.FC<CampaignSummaryProps> = ({
  campaign,
  metadata,
  loading,
  id,
  refetch,
}) => {

  if (loading) {
    return (
      <div className="w-full min-h-[45vh] flex justify-center items-center">
        <Spinner color="primary" />
      </div>
    );
  } else {
    return (
      <section className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch bg-[#080A18]">
        <div className="min-h-[45vh] max-h-[50vh] col-span-1 flex relative w-full">
          {metadata ? (
            <Image
              src={metadata.imageUrl}
              alt="Detailed description of the campaign image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-md"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-[40vh] flex justify-center items-center bg-gray-200 rounded-md">
              <span>No image available</span>{" "}
            </div>
          )}
        </div>
        <div className="w-full min-h-[45vh] max-h-[50vh]">
          <CampaignDetails campaign={campaign} id={id} onComplete={refetch} />
        </div>
      </section>
    );
  }
};

export { CampaignSummary };
