import { ContractAddress } from "@/data/campaignConfig";
import { transformData } from "@/utils/contract";
import { useReadContract } from "wagmi";

const campaignABI = require("../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json");

const campaignContractAddress = ContractAddress;

export const useRead = (functionName: string, args?: [any]) => {

  const { data, isError, isLoading, error, refetch } = useReadContract({
    address: campaignContractAddress,
    abi: campaignABI.abi,
    functionName: functionName,
    args: args,
  });

  const transformedData = transformData(functionName, data);
  return { data: transformedData, isError, isLoading, error, refetch };
};
