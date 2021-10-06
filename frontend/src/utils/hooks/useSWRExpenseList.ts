import useSWRInfinite from "swr/infinite";
import { expenseListfetcher } from "api/Expense";
import { formatDate } from "utils/handy";

const useSWRExpenseList = (
  calendarViewDate: Date,
  selectDay: Date | null,
  sort: number
) => {
  const getExpenseListKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && !previousPageData.length) return null; // 最後のページに到達した

    return [
      "expense",
      formatDate(calendarViewDate, "yyyy-MM-dd"),
      selectDay,
      sort,
      pageIndex + 1,
    ];
  };

  const {
    data,
    error: expenseError,
    size,
    setSize,
  } = useSWRInfinite(getExpenseListKey, expenseListfetcher);

  const loadMoreExpense = () => {
    setSize(size + 1);
  };

  const isExpenseLast = data
    ? data.filter((list) => list.length < 30).length > 0
    : true;

  const expenseList = data ? data.flat() : null;

  return { expenseList, expenseError, isExpenseLast, loadMoreExpense };
};

export default useSWRExpenseList;
