import React, { useGlobal } from "reactn";
import useSWR from "swr";
import { useState } from "react";
import { Box } from "@material-ui/core";
import Calendar from "react-calendar";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { formatDate } from "utils/handy";
import { getExpenseList as getExpenseListApi } from "api/Expense";

import "../../../../styles/Calendar.css";

export default function List() {
  const setError = useGlobal("error")[1];
  const [monthDay, setMonthDay] = useState({
    20210914: { text: "129084" },
    20210915: { text: "129084" },
    20210926: { text: "129084" },
    20210917: { text: "2000" },
  });

  const { data, error } = useSWR("expense", getExpenseListApi);

  // state の日付と同じ表記に変換
  function getFormatDate(date: Date) {
    return `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${(
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
        {monthDay[day] && monthDay[day].text ? monthDay[day].text + "円" : ""}
      </p>
    );
  }

  const formatDay = (locale, date) => formatDate(date, "dd").replace(/0/g, "");

  return (
    <Box className="pt-3">
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
      {data &&
        data.map((data: any) => {
          return <p>{data}</p>;
        })}
    </Box>
  );
}
