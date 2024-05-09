import { useState } from 'react';
import { ContractAddress } from "@/data/campaignConfig";
import { toast } from "react-toastify";
import { useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from "wagmi";

const campaignABI = require("../artifacts/contracts/CampaignFactory.sol/CampaignFactory.json");
const campaignContractAddress = ContractAddress;

export const useWrite = () => {

  const {
    
    data: hash,
    isPending: isPendingWrite,
    isError: isErrorWrite,
    error: errorWrite,
    writeContractAsync,
  } = useWriteContract();

  const {
    isSuccess: txSuccess,
    isLoading: txLoading,
    isError: isErrorTx,
    error: errorTx,
  } = useWaitForTransactionReceipt({
    hash: hash,
    query: {
      enabled: Boolean(hash),
    },
  });

  const executeFunc = async (functionName: string, args: any, value?: any) => {
    try {
      await writeContractAsync({
        address: campaignContractAddress,
        abi: campaignABI.abi,
        functionName: functionName,
        args: args,
        value: value,
      });
      return true;
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.cause ? (e.cause as string) : e.message);
      }
      return false;
    }
  };

  return {
    hash,
    isError: isErrorWrite || isErrorTx,
    isPending: isPendingWrite || txLoading,
    error: errorWrite || errorTx,
    executeFunc,
    txSuccess
  };
};
