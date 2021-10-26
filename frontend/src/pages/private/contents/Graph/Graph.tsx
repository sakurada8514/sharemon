import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
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
    const response = await fetcherApi("balance/month");

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
      <MyDatePicker date={date} setDate={setDate} />
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
