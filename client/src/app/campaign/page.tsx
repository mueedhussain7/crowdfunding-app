"use client";
import { useSearchParams } from "next/navigation";
import FundingDetails from "@/sections/campaign/campaign-page/funding-details";
import { useRead } from "@/hooks/useRead";
import React from "react";
import { CampaignSummary } from "@/sections/campaign/campaign-page";
import useCampaignMetaDataService from "@/hooks/useCampaignMetaService";
import { CampaignMetadata } from "@/types/interfaces";

export default function Campaign() {
  const urlParams = useSearchParams();
  const id = urlParams.get("id");

  const {
    data: campaign,
    isLoading: loadingCampaigns,
    refetch: refetchCampaign,
  } = useRead("getCampaign", [[id]]);

  const {
    data: supporters,
    isError,
    isLoading: loadingSupporters,
    error,
    refetch: refetchSupporters,
  } = useRead("getContributors", [[id]]);

  const handleRefetch = () => {
    refetchCampaign();
    refetchSupporters();
  };

  const { getCampaignById } = useCampaignMetaDataService();
  const [metadata, setMetadata] = React.useState<CampaignMetadata>();
  React.useEffect(() => {
    if (id) {
      getCampaignById(id!!).then((metadata) => {
        setMetadata(metadata);
      });
    }
  }, [urlParams]);

  return (
    <main className="flex min-h-screen flex-col">
      <h1 className="text-2xl mt-5 font-semibold text-primary"><span className="text-secondary">Campaign</span> Details</h1>
      <CampaignSummary
        id={id!!}
        metadata={metadata!!}
        campaign={campaign!!}
        loading={loadingCampaigns}
        refetch={handleRefetch}
      />
      <FundingDetails
        metadata={metadata!!}
        campaign={campaign}
        supporters={supporters}
        isLoadingSupporters={loadingSupporters}
      />
    </main>
  );
}
