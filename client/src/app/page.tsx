"use client";
import { Hero, Featured, Vision } from "@/sections/home-page";
import homedata from "@/data/home.json";
import React, { useState } from "react";
import "./globals.css";
import { useRead } from "@/hooks/useRead";
import useCampaignMetaDataService from "@/hooks/useCampaignMetaService";
import { CampaignItemType } from "@/types/interfaces";

export default function Home() {
  const { data, isError, isLoading, error } = useRead("getAllCampaigns");
  const { attachAllCampaignMetaData } = useCampaignMetaDataService();

  const [campaigns, setAllCampaigns] = useState<CampaignItemType[]>([]);

  React.useEffect(() => {
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

    return () => {
      isSubscribed = false;
    };
  }, [isLoading]);
  

  return (
    <main className="flex min-h-screen flex-col">
      <Hero data={homedata.hero} />
      <Featured variant="collection" data={campaigns} loading={isLoading} />
      <Featured
        variant={homedata.howItWorks.variant}
        data={homedata.howItWorks.data}
      />
      <Vision data={homedata.vision} />
    </main>
  );
}
