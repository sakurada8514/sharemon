import React, { useGlobal } from "reactn";
import useSWR from "swr";
import { useState } from "react";
import { Box } from "@material-ui/core";
import Calendar from "react-calendar";
import { Skeleton } from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { formatDate } from "utils/handy";
import { fetcherApi } from "api/fetcher";
import useSWRExpenseList from "utils/hooks/useSWRExpenseList";

import "../../../../styles/Calendar.css";

export default function List() {
  const setError = useGlobal("error")[1];

  const [calendarViewDate, setCalendarViewDate] = useState(new Date());

  const { data: dailyTotal, error: dailyTotalError } = useSWR(
    ["balance/daily/" + formatDate(calendarViewDate, "yyyy-MM-dd"), "daily"],
    fetcherApi
  );

  const { expenseList, expenseError, isLast, loadMore } =
    useSWRExpenseList(calendarViewDate);

  if (expenseError || dailyTotalError) {
    setError(true);
  }

  // state の日付と同じ表記に変換
  function getFormatDate(date: Date) {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;
  }

  function getTileContent({ date, view }) {
    // 月表示のときのみ
    if (view !== "month") {
      return null;
    }
    const day = getFormatDate(date);

    return (
      <p className="text-xs text-gray-600 pt-1">
        {dailyTotal[day] ? dailyTotal[day] + "円" : ""}
      </p>
    );
  }

  const formatDay = (locale, date) => formatDate(date, "dd").replace(/^0/, "");

  return (
    <Box className="pt-3">
      {dailyTotal ? (
        <Calendar
          locale="ja-JP"
          calendarType="US"
          value={new Date()}
          formatDay={formatDay}
          nextLabel={<NavigateNextIcon />}
          next2Label={null}
          prevLabel={<NavigateBeforeIcon />}
          prev2Label={null}
          tileContent={getTileContent}
          onClickDay={(value, event) => {
            console.log(value);
          }}
          onClickMonth={(value, event) => {
            setCalendarViewDate(value);
          }}
          onActiveStartDateChange={({ activeStartDate, value, view }) => {
            setCalendarViewDate(activeStartDate);
          }}
        />
      ) : (
        <Calendar
          locale="ja-JP"
          calendarType="US"
          value={new Date()}
          formatDay={formatDay}
          nextLabel={<NavigateNextIcon />}
          next2Label={null}
          prevLabel={<NavigateBeforeIcon />}
          prev2Label={null}
        />
      )}
      {expenseList ? (
        expenseList.map((data: any) => {
          return (
            <div key={data.id} className="flex justify-between p-4 border-b">
              <div>
                <p className="text-xl">{data.category_name}</p>
                {data.repetition_flg === 0 ? (
                  <p className="text-gray-500">{data.regist_date}</p>
                ) : (
                  <p className="text-gray-500">繰り返し登録</p>
                )}
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="text-xl mb-1">{data.expense}円</p>
                {!data.read_flg && (
                  <p className="text-white text-center font-light text-xs bg-red-500 rounded-2xl px-1 w-10">
                    new
                  </p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-4">
          <Skeleton className="h-20 pb-2" />
          <Skeleton className="h-20 pb-2" />
          <Skeleton className="h-20 pb-2" />
          <Skeleton className="h-20 pb-2" />
        </div>
      )}
      {!isLast && <button onClick={loadMore}>読み込む</button>}
    </Box>
  );
}
