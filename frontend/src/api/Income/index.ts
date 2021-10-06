import { apiClient } from "../../utils/api";

export async function incomeListfetcher(
  url: string,
  date: string,
  selectDay: string | null,
  sort: number,
  pageIndex
): Promise<any> {
  console.log(selectDay);

  const response = await apiClient
    .get(url, {
      params: {
        date: date,
        select_day: selectDay,
        sort: sort,
        page: pageIndex,
      },
    })
    .then((res) => res.data.incomeList);

  return response;
}
