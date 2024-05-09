import { useState, useEffect } from "react";
import CampaignMetaDataService from "@/services/campaignMetadataService";
import { CampaignItemType } from "@/types/interfaces";

const campaignService = new CampaignMetaDataService();

const useCampaignMetaDataService = () => {
  const [isLoading, setIsLoading] = useState(false);

  const attachAllCampaignMetaData = async (
    campaignItems: CampaignItemType[]
  ): Promise<CampaignItemType[]> => {
    const allCampaigns = await campaignService.getAllCampaigns();
    return campaignItems.map((campaign: CampaignItemType) => {
      const matchingMeta: any = allCampaigns.find(
        (meta: CampaignItemType) => meta.id === campaign.id
      );
      if (matchingMeta && matchingMeta.imageUrl) {
        return { ...campaign, imageUrl: matchingMeta.imageUrl };
      }
      return campaign;
    });
  };

  const getAllCampaigns = async () => {
    setIsLoading(true);
    try {
      const campaigns = await campaignService.getAllCampaigns();
      return campaigns;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCampaignById = async (id: string) => {
    setIsLoading(true);
    try {
      const campaign = await campaignService.getCampaignById(id);
      return campaign;
    } catch (error) {
      console.error("Error fetching campaign by Id:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  async function saveCampaign(
    imageUrl: string,
    ownerAddress: string,
    category: string,
    description: string
  ) {
    setIsLoading(true);
    try {
      const newCampaign = await campaignService.lockCampaign(
        imageUrl,
        ownerAddress,
        category,
        description
      );
      return newCampaign;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }
  async function updateCampaignTx(id: string, txHash: string) {
    try {
      const newCampaign = await campaignService.updateCampaign(id, txHash);
      setIsLoading(false);
      return newCampaign;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  async function removeCampaign(id: string) {
    try {
      await campaignService.deleteCampaign(id);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    getAllCampaigns,
    getCampaignById,
    saveCampaign,
    attachAllCampaignMetaData,
    updateCampaignTx,
    removeCampaign
  };
};

export default useCampaignMetaDataService;
