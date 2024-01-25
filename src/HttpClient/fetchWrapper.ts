import { environtment } from "~/environment/environment";

export const getPokemons = async (
  endPoint: string,
  params: string = "",
): Promise<any> => {
  console.log(params);
  const response = await fetch(`${environtment.url}/${endPoint}/${params}`);
  return response.json();
};
