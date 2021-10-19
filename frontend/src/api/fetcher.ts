import { apiClient } from "../utils/api";

export async function fetcherApi(url: string, dataName?: string): Promise<any> {
  const response = await apiClient
    .get(url)
    .then((res) => (dataName ? res.data : res))
    .catch((err) => err.response);
  console.log(response);

  return dataName ? response[dataName] : response;
}
