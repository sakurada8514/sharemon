import { apiClient } from "../../utils/api";

export async function getBalanceThisMonth(url: string): Promise<any> {
  const response = await apiClient.get(url).then((res) => res.data);
  return response;
}
