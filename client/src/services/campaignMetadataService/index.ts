import { deleteCallAxios, getCallAxios, postCallAxios, putCallAxios } from "../api";

export default class CampaignMetaDataService {
  async getAllCampaigns(): Promise<any> {
    try {
      const url = `/campaign`;
      const res = await getCallAxios(url);
      return res.campaigns;
    } catch (err) {
      const error = err as Error;
      throw error;
    }
  }

  async getCampaignById(id: string): Promise<any> {
    try {
      const url = `/campaign/${id}`;
      const res = await getCallAxios(url);
      return res.campaign;
    } catch (err) {
      const error = err as Error;
      throw error;
    }
  }

  async lockCampaign(
    imageUrl: string,
    ownerAddress: string,
    category: string,
    description: string
  ): Promise<any> {
    try {
      const url = `/campaign`;

      const body = {
        imageUrl: imageUrl,
        ownerAddress: ownerAddress,
        category: category,
        description: description,
      };
      const res = await postCallAxios(url, body);
      return res;
    } catch (err) {
      const error = err as Error;
      throw error;
    }
  }

  async updateCampaign(id: string, txHash: string): Promise<any> {
    try {
      const url = `/campaign/${id}`;
      const body = {
        transactionHash: txHash,
      };
      const res = await putCallAxios(url, body);
      return res;
    } catch (err) {
      const error = err as Error;
      throw error;
    }
  }

  async deleteCampaign(id: string): Promise<any> {
    try {
      const url = `/campaign/${id}`;
      const res = await deleteCallAxios(url);
      return res;
    } catch (err) {
      const error = err as Error;
      throw error;
    }
  }
}
