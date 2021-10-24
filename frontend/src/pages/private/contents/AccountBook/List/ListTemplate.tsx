import React from "react";
import { useHistory } from "react-router";
import useSWR from "swr";
import { useState } from "react";
import {
  Box,
  AppBar,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import Calendar from "react-calendar";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import TabPanel from "components/Atoms/TabPanel";
import ExpenseList from "pages/private/contents/AccountBook/List/ExpenseList";
import IncomeList from "pages/private/contents/AccountBook/List/IncomeList";

import { formatDate } from "utils/handy";
import { fetcherApi } from "api/fetcher";
import useSWRExpenseList from "utils/hooks/useSWRExpenseList";
import useSWRIncomeList from "utils/hooks/useSWRIncomeList";

import "../../../../../styles/Calendar.css";

export default function ListTemplate() {
  const history = useHistory();

  const [tabValue, setTabValue] = useState(0);
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());
  const [sort, setSort] = useState(0);
  const [isCalendarShow, setIsCalendarShow] = useState(true);

  const { data: dailyTotal, error: dailyTotalError } = useSWR(
    ["balance/daily/" + formatDate(calendarViewDate, "yyyy-MM-dd"), "daily"],
    fetcherApi
  );

  const { expenseList, expenseError, isExpenseLast, loadMoreExpense } =
    useSWRExpenseList(calendarViewDate, sort);

  const { incomeList, incomeError, isIncomeLast, loadMoreIncome } =
    useSWRIncomeList(calendarViewDate, sort);

  if (expenseError || incomeError || dailyTotalError) {
    history.push("/error");
  }
  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };
  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };
  const handleCalendarShowChange = () => {
    setIsCalendarShow(!isCalendarShow);
  };

  const handleMonthClick = (value, event) => {
    setCalendarViewDate(value);
  };
  const handleActiveStartDateChange = ({ activeStartDate, value, view }) => {
    setCalendarViewDate(activeStartDate);
  };

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
      <>
        <p className="text-xs text-red-400 h-4">
          {dailyTotal["expense"][day] ? "-" + dailyTotal["expense"][day] : ""}
        </p>
        <p className="text-xs text-blue-400 h-4">
          {dailyTotal["income"][day] ? dailyTotal["income"][day] : " "}
        </p>
      </>
    );
  }

  const formatDay = (locale, date) => formatDate(date, "dd").replace(/^0/, "");

  return (
    <Box className="pt-1">
      <div className="flex pb-2 overflow-hidden">
        <FormControl className="w-1/2 ml-1">
          <InputLabel id="sort_select">ソート</InputLabel>
          <Select
            labelId="sort_select"
            id="demo-simple-select"
            value={sort}
            onChange={handleSortChange}
          >
            <MenuItem value={0}>新しい順</MenuItem>
            <MenuItem value={1}>古い順</MenuItem>
            <MenuItem value={2}>金額少ない順</MenuItem>
            <MenuItem value={3}>金額多い順</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={isCalendarShow}
              onChange={handleCalendarShowChange}
            />
          }
          label="カレンダー表示"
          labelPlacement="start"
        />
      </div>
      {isCalendarShow &&
        (dailyTotal ? (
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
            onClickMonth={handleMonthClick}
            onActiveStartDateChange={handleActiveStartDateChange}
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
        ))}
      <AppBar position="static" className="bg-gray-50 text-black shadow-none ">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          className="flex justify-center"
        >
          <Tab
            className="text-xl w-1/2"
            label="支出"
            id="tab-0"
            aria-controls="tabpanel-0"
          />
          <Tab
            className="text-xl w-1/2"
            label="収入"
            id="tab-1"
            aria-controls="tabpanel-1"
          />
        </Tabs>
      </AppBar>

      <TabPanel value={tabValue} index={0}>
        <ExpenseList
          expenseList={expenseList}
          isExpenseLast={isExpenseLast}
          loadMoreExpense={loadMoreExpense}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <IncomeList
          incomeList={incomeList}
          isIncomeLast={isIncomeLast}
          loadMoreIncome={loadMoreIncome}
        />
      </TabPanel>
    </Box>
  );
}
