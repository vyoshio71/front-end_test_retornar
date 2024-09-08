import { IAcai } from "../interfaces/interfaces";

const API_URL = process.env.REACT_APP_API_URL as string;

export async function postAcai(acaiData: IAcai) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acaiData),
    });

    return response;
  } catch (error) {
    console.error("Erro ao enviar o pedido:", error);
  }
}

export async function getAllAcai(): Promise<IAcai[]> {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao enviar o pedido:", error);
    throw error;
  }
}
