import React from "react";
import {
  CampaignItemType,
  CampaignMetadata,
  CampaignSupporterType,
} from "@/types/interfaces";
import { CampaignSupportsPreview } from "./campaign-supports-preview";
import { Spinner } from "@nextui-org/react";

interface FundingDetailsProps {
  campaign: CampaignItemType;
  supporters: CampaignSupporterType[];
  isLoadingSupporters: boolean;
  metadata: CampaignMetadata;
}

const FundingDetails: React.FC<FundingDetailsProps> = ({
  campaign,
  supporters,
  metadata,
  isLoadingSupporters,
}) => {
  return (
    <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch bg-[#080A18]">
      <div className="bg-[#21082A] text-white p-6 rounded-lg shadow-lg h-[45vh]">
        <h2 className="text-[#FF01C7] text-lg font-semibold mb-4">
          What the Funding Will Be Used For:
        </h2>

        {isLoadingSupporters ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="primary" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {metadata ? metadata.description : "No description found"}
          </div>
        )}
      </div>

      <CampaignSupportsPreview
        supporters={supporters}
        isLoading={isLoadingSupporters}
      />
    </section>
  );
};

export default FundingDetails;
