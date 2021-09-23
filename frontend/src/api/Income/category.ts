import { apiClient } from "../../utils/api";

export async function getCategoryList(url: string): Promise<any> {
  const response = await apiClient
    .get(url)
    .then((res) => res.data.categoryList);

  return response;
}
