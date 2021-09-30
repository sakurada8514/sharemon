import useSWRInfinite from "swr/infinite";
import { expenseListfetcher } from "api/Expense";
import { formatDate } from "utils/handy";

const useSWRExpenseList = (calendarViewDate: Date) => {
  const getExpenseListKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && !previousPageData.length) return null; // 最後のページに到達した

    return [
      "expense",
      formatDate(calendarViewDate, "yyyy-MM-dd"),
      pageIndex + 1,
    ];
  };

  const {
    data,
    error: expenseError,
    size,
    setSize,
  } = useSWRInfinite(getExpenseListKey, expenseListfetcher);

  const loadMore = () => {
    setSize(size + 1);
  };

  const isLast = data
    ? data.filter((list) => list.length < 20).length > 0
    : true;

  const expenseList = data ? data.flat() : null;

  return { expenseList, expenseError, isLast, loadMore };
};

export default useSWRExpenseList;
