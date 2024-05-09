"use client";
import { FC, useEffect, useState } from "react";
import { Button, Spinner, Tab } from "@nextui-org/react";
import { useRead } from "@/hooks/useRead";
import { CampaignItemType } from "@/types/interfaces";
import { CampaignItem } from "@/sections/common/campaign-item";
import Link from "next/link";
import useCampaignMetaDataService from "@/hooks/useCampaignMetaService";

interface MyCampaignsTabProps {
  address: string;
}
const MyCampaignsTab: FC<MyCampaignsTabProps> = ({ address }) => {
  const { data, isLoading, isError } = useRead("getCampaignsByAddress", [
    address,
  ]);

  const { attachAllCampaignMetaData } = useCampaignMetaDataService();

  const [campaigns, setAllCampaigns] = useState<CampaignItemType[]>([]);

  useEffect(() => {
    let isSubscribed = true;
    const updateCampaigns = async () => {
      if (!isLoading && data) {
        const response = await attachAllCampaignMetaData(data);
        if (isSubscribed) {
          setAllCampaigns(response);
          console.log(response);
        }
      }
    };

    updateCampaigns();

    return () => {
      isSubscribed = false;
    };
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
                return <CampaignItem userType={"owner"} campaign={item} />;
              })}
            </ul>
          ) : (
            <div className="w-full h-[50vh] flex flex-col gap-2 justify-center items-center text-white">
              <h2 className="font-semibold">No Registered Campaigns Found</h2>
              <p className="text-center">
                But Don't Worry! You can also launch your new campaign just now!
              </p>
              <p>
                <Button
                  className="rounded-md w-full"
                  variant="solid"
                  color="primary"
                >
                  <Link
                    className="w-full h-full flex justify-center items-center"
                    href={"/campaign/post"}
                  >
                    Post Campaign
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

export { MyCampaignsTab };
