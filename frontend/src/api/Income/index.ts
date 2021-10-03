import { apiClient } from "../../utils/api";

export async function incomeListfetcher(
  url: string,
  date: string,
  pageIndex
): Promise<any> {
  const response = await apiClient
    .get(url, {
      params: {
        date: date,
        page: pageIndex,
      },
    })
    .then((res) => res.data.incomeList);

  return response;
}
