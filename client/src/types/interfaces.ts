import React from "react";

type FeatureStepsItemType = {
  icon?: React.ReactNode;
  title: string;
  desc: string;
};

export type CampaignSupporterType = {
  walletAddress: string;
  amountEth: number;
};

export type CampaignItemType = {
  id: string | number;
  title: string;
  desc: string;
  requestedFunds: number;
  deadline: string;
  category?: string;
  status?: boolean;
  imageUrl?:string;
  campaignCreator?:string;
  raisedAmount?:number;
};

export type CampaignMetadata ={
  imageUrl:string,
  txHash:string,
  ownerAddress:string,
  transactionHash:string,
  category:string,
  description:string,
  id:string
}

export type CampaignContractType = {
  title: string;
  goal: number;
  completed: boolean;
  noOfContributors: number;
  raisedAmount: number;
  deadline: number;
  campaignCreator: string;
}

export type CampaignContractSummaryType = {
  id: number;
  title: string;
  goal: number;
}


export type WalletOptionType = {
  icon: string;
  alt: string;
  enabled: boolean;
  name: string;
};

export interface FeatureStepsProps {
  data: {
    title: string;
    description: string;
    featuredItems: FeatureStepsItemType[];
  };
}

export interface FeatureCollectionProps {
  data: CampaignItemType[];
  loading:boolean;
}

export type SupporterType = {
  walletAddress: string;
  amountETH: number;
};

export interface SupportFormData {
  firstName: string;
  lastName: string;
  amountEth: number;
  email: string;
  totalBalance: number;
}

export interface AboutContent {
  title: string;
  description: string;
}

export interface SupportModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  campaign: CampaignItemType;
}

export interface PostCampaign {
  names: string;
  campaignTitles: string;
  goal: number;
  deadline: Date;
  campaignImg: string;
  description: string;
}
