import { apiClient } from "../../utils/api";

export async function incomeListfetcher(
  url: string,
  date: string,
  sort: number,
  pageIndex
): Promise<any> {
  const response = await apiClient
    .get(url, {
      params: {
        date: date,
        sort: sort,
        page: pageIndex,
      },
    })
    .then((res) => res.data.incomeList);

  return response;
}

export async function deleteIncomeApi(id: number) {
  const response = await apiClient
    .delete("/income/" + id)
    .catch((err) => err.response);

  return response.status;
}
