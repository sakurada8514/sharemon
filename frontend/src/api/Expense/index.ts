import { apiClient } from "../../utils/api";

export async function expenseListfetcher(
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
    .then((res) => res.data.expenseList);

  return response;
}

export async function deleteExpenseApi(id: number) {
  const response = await apiClient
    .delete("/expense/" + id)
    .catch((err) => err.response);

  return response.status;
}
