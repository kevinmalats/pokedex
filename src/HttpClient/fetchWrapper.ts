import { environtment } from "~/environment/environment";
import { RequestPostSave } from "~/types/IPokemon";

export const getPokemons = async (
  endPoint: string,
  params: string = "",
): Promise<any> => {
  console.log(params);
  const response = await fetch(`${environtment.url}/${endPoint}/${params}`);
  return response.json();
};

export const saveTeam = async (
  endPoint: string,
  data: RequestPostSave,
): Promise<any> => {
  console.log(data);
  try {
    const response = await fetch(`${environtment.url}/${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
