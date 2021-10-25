import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useSWR from "swr";

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

  const { data: balance, error: balanceError } = useSWR(
    "balance/month",
    fetcherApi
  );

  useEffect(() => {
    getGraphData();
  }, []);

  const getGraphData = async () => {
    const response = await fetcherApi(
      "balance/category/" + formatDate(date, "yyyy-MM-dd")
    );
    if (response.status === OK) {
      setGraphData(
        response.data.expense,
        setExpenseGraphDatas,
        setExpenseGraphLabels
      );
      setGraphData(
        response.data.income,
        setIncomeGraphDatas,
        setIncomeGraphLabels
      );
    } else {
      history.push("/error");
    }
  };

  const setGraphData = (graphDatas, setDataMethod, setLabelMethod) => {
    let datas = [];
    let labels = [];
    for (let i of graphDatas) {
      datas.push(i.total);
      labels.push(i.category_name);
    }
    setDataMethod(datas);
    setLabelMethod(labels);
  };

  return (
    <>
      {balance && (
        <ExpenseChart
          datas={expenseGraphDatas}
          labels={expenseGraphLabels}
          total={balance.data.expense.total}
        />
      )}
    </>
  );
};
export default Graph;
