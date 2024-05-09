import { ethers } from "ethers";

export const transformData = (functionName: string, data: any): any => {
  switch (functionName) {
    case "getAllCampaigns":
      if (data) {
        return data[0].map((_: any, index: number) => {
          return {
            id: data[0][index],
            title: data[1][index],
            requestedFunds: ethers.utils.formatEther(data[2][index]),
            deadline: new Date(Number(data[3][index]) * 1000).toDateString(),
            category: "",
            status: true,
          };
        });
      }
      return [];

    case "getCampaign":
      if (data) {
        const campaign = {
          id: 0,
          title: data[0] as string,
          requestedFunds: ethers.utils.formatEther(data[1]),
          status: data[2],
          desc: "",
          raisedAmount: ethers.utils.formatEther(data[4]),
          deadline: new Date(parseInt(data[5], 10) * 1000).toDateString(),
          campaignCreator: data[6] as string,
          category: data[7],
        };
        return campaign;
      }

    case "getCampaignsByAddress":
      if (data) {
        console.log(data);
        return data[0].map((_: any, index: number) => {
          return {
            id: data[0][index],
            title: data[1][index],
            requestedFunds: ethers.utils.formatEther(data[2][index]),
            deadline: new Date(Number(data[3][index]) * 1000).toDateString(),
            category: data[4][index],
            status: data[5][index],
            raisedAmount: ethers.utils.formatEther(data[6][index]),
          };
        });
      }
      return [];

    case "getContributions":
      if (data) {
        return data[0].map((_: any, index: number) => {
          return {
            id: data[0][index],
            title: data[1][index],
            requestedFunds: ethers.utils.formatEther(data[2][index]),
            deadline: new Date(Number(data[3][index]) * 1000).toDateString(),
            category: data[4][index],
            status: data[5][index],
            raisedAmount: ethers.utils.formatEther(data[6][index]),
          };
        });
      }
      return [];

    case "getContributors":
      if (data) {
        return data[0].map((_: any, index: number) => {
          return {
            walletAddress: data[0][index],
            amountEth: ethers.utils.formatEther( data[1][index]),
          };
        });
      }
      return [];
    default:
      return null;
  }
};
