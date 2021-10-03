import { apiClient } from "../utils/api";

export async function fetcherApi(url: string, dataName?: string): Promise<any> {
  const response = await apiClient.get(url).then((res) => res.data);

  return dataName ? response[dataName] : response;
}