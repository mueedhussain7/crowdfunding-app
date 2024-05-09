"use server";
import axios from "axios";
let SERVER_URL = process.env.NEXT_PORTAL_SERVER_URL;

export async function getCallAxios(url: string): Promise<any> {
  try {
    const response = await axios.get(`${SERVER_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function postCallAxios(url: string, body: any): Promise<any> {
  try {
    const response = await axios.post(`${SERVER_URL}${url}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Axios POST error:", error);
    throw error;
  }
}

export async function putCallAxios(url: string, body: any): Promise<any> {
  try {
    const response = await axios.put(`${SERVER_URL}${url}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Axios PUT error:", error);
    throw error;
  }
}

export async function deleteCallAxios(url: string): Promise<any> {
  try {
    const response = await axios.delete(`${SERVER_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Axios PUT error:", error);
    throw error;
  }
}
