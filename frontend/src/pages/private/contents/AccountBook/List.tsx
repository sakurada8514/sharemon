import React, { useGlobal } from "reactn";
import useSWR from "swr";
import { useState } from "react";
import { Box } from "@material-ui/core";
import Calendar from "react-calendar";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { formatDate } from "utils/handy";
import { getExpenseList as getExpenseListApi } from "api/Expense";
import { fetcherApi } from "api/fetcher";

import "../../../../styles/Calendar.css";

export default function List() {
  const setError = useGlobal("error")[1];

  const { data: dailyTotal, error: dailyTotalError } = useSWR(
    ["balance/daily", "daily"],
    fetcherApi
  );

  const { data: expenseList, error: expenseListError } = useSWR(
    ["expense", "expenseList"],
    fetcherApi
  );

  if (expenseListError || dailyTotalError) {
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

  const formatDay = (locale, date) => formatDate(date, "dd").replace(/0/g, "");

  return (
    <Box className="pt-3">
      {dailyTotal && (
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
        />
      )}
      {expenseList &&
        expenseList.list.map((data: any) => {
          return <p key={data.id}>{data.expense}</p>;
        })}
    </Box>
  );
}
