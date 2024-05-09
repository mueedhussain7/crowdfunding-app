"use client";
import useCampaignMetaDataService from "@/hooks/useCampaignMetaService";
import { ContributionsTab } from "@/sections/campaign/dashboard-page/contributions-tab";
import { MyCampaignsTab } from "@/sections/campaign/dashboard-page/my-campaigns";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { useAccount } from "wagmi";

export default function DashboardPage() {
  const { address } = useAccount();

  if (!address) {
    return <div></div>;
  }

  return (
    <Tabs
      aria-label="Options"
      color="primary"
      classNames={{
        cursor: ["bg-bg"],
        tabContent: ["text-white"],
        base: ["bg-primary rounded-md my-2 flex justify-center"],
        tabList: ["bg-transparent rounded-md"],
      }}
    >
      <Tab key="myCampaigns" title="My Campaigns">
        <MyCampaignsTab address={address} />
      </Tab>
      <Tab key="contributions" title="Contributions">
        <ContributionsTab address={address} />
      </Tab>
    </Tabs>
  );
}
