"use client";
import { FC, useEffect, useState } from "react";
import { Button, Link, Spinner, Tab } from "@nextui-org/react";
import { useRead } from "@/hooks/useRead";
import { CampaignItemType } from "@/types/interfaces";
import { CampaignItem } from "@/sections/common/campaign-item";
import useCampaignMetaDataService from "@/hooks/useCampaignMetaService";

interface ContributionsTabProps {
  address: string;
}

const ContributionsTab: FC<ContributionsTabProps> = ({ address }) => {
  const { data, isLoading, isError } = useRead("getContributions", [address]);

  const { attachAllCampaignMetaData } = useCampaignMetaDataService();

  const [campaigns, setAllCampaigns] = useState<CampaignItemType[]>([]);

  useEffect(() => {
    let isSubscribed = true;
    const updateCampaigns = async () => {
      if (!isLoading && data) {
        const response = await attachAllCampaignMetaData(data);
        if (isSubscribed) {
          setAllCampaigns(response);
        }
      }
    };

    updateCampaigns();
  }, [isLoading]);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <div>
          {data && data.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {campaigns.map((item: CampaignItemType, index: number) => {
                return <CampaignItem userType="contributor" campaign={item} />;
              })}
            </ul>
          ) : (
            <div className="w-full h-[50vh] flex flex-col gap-2 justify-center items-center text-white">
              <h2 className="font-semibold">No Contributions Made</h2>
              <p className="text-center">
                You can always find the projects that you are excited in
              </p>
              <p>
                <Button
                  className="rounded-md w-full"
                  variant="solid"
                  color="primary"
                >
                  <Link href={"/#active"} className="text-white">
                    View Active
                  </Link>
                </Button>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { ContributionsTab };
