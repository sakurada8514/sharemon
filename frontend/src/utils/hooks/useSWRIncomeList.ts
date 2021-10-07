import useSWRInfinite from "swr/infinite";
import { incomeListfetcher } from "api/Income";
import { formatDate } from "utils/handy";

const useSWRIncomeList = (calendarViewDate: Date, sort: number) => {
  const getIncomeListKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && !previousPageData.length) return null; // 最後のページに到達した

    return [
      "income",
      formatDate(calendarViewDate, "yyyy-MM-dd"),
      sort,
      pageIndex + 1,
    ];
  };

  const {
    data,
    error: incomeError,
    size,
    setSize,
  } = useSWRInfinite(getIncomeListKey, incomeListfetcher);

  const loadMoreIncome = () => {
    setSize(size + 1);
  };

  const isIncomeLast = data
    ? data.filter((list) => list.length < 30).length > 0
    : true;

  const incomeList = data ? data.flat() : null;

  return { incomeList, incomeError, isIncomeLast, loadMoreIncome };
};

export default useSWRIncomeList;
