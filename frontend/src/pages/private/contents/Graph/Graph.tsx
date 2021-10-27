import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

import MyDatePicker from "components/Atoms/Form/DatePicker";
import ExpenseChart from "components/Chart/ExpenseChart";

import { fetcherApi } from "api/fetcher";

import { formatDate } from "utils/handy";
import { OK, VALIDATION } from "utils/constant";

const Graph = () => {
  const history = useHistory();
  const [date, setDate] = useState(new Date());
  const [expenseGraphDatas, setExpenseGraphDatas] = useState([]);
  const [expenseGraphLabels, setExpenseGraphLabels] = useState([]);
  const [incomeGraphDatas, setIncomeGraphDatas] = useState([]);
  const [incomeGraphLabels, setIncomeGraphLabels] = useState([]);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const res = await getBalance(); //月毎に撮れるように
      await getGraphData(res);
    };
    setup();
  }, [date]);

  const getBalance = async () => {
    const response = await fetcherApi(
      "balance/month/" + formatDate(date, "yyyy-MM-dd")
    );

    if (response.status === OK) {
      setBalance(response.data);
    } else {
      history.push("/error");
    }
    return response.data;
  };

  const getGraphData = async (balance) => {
    const response = await fetcherApi(
      "balance/category/" + formatDate(date, "yyyy-MM-dd")
    );

    if (response.status === OK) {
      setGraphData(
        balance,
        response.data.expense,
        setExpenseGraphDatas,
        setExpenseGraphLabels
      );
      setGraphData(
        balance,
        response.data.income,
        setIncomeGraphDatas,
        setIncomeGraphLabels
      );
    } else {
      history.push("/error");
    }
  };

  const setGraphData = (balance, graphDatas, setDataMethod, setLabelMethod) => {
    let datas = [];
    let labels = [];
    let other = 0;
    for (let i of graphDatas) {
      const percent = Math.round((i.total / balance.expense.total) * 100);
      if (percent <= 5) {
        other += percent;
        continue;
      }
      datas.push(percent);
      labels.push(i.category_name);
    }
    if (other > 0) {
      datas.push(other);
      labels.push("その他");
    }
    setDataMethod(datas);
    setLabelMethod(labels);
  };

  return (
    <>
      <div className="px-2 flex">
        <div className="w-1/2 pr-1">
          <MyDatePicker
            date={date}
            setDate={setDate}
            views={["year", "month"]}
            format="yyyy/MM"
            openTo="month"
          />
        </div>
        <div className="w-1/2 pl-1">
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-outlined-label">グラフ</InputLabel>
            <Select
              labelId="select-outlined-label"
              id="select-outlined"
              // value={category}
              // onChange={handleChangeCategory}
              label="グラフ"
            >
              <MenuItem selected value="0">
                支出
              </MenuItem>
              <MenuItem value="1">収入</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {balance && (
        <ExpenseChart
          datas={expenseGraphDatas}
          labels={expenseGraphLabels}
          total={balance.expense.total}
        />
      )}
    </>
  );
};
export default Graph;
