import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { Skeleton } from "@mui/material";

import MyDatePicker from "components/Atoms/Form/DatePicker";
import DoughnutChart from "components/Chart/DoughnutChart";

import { fetcherApi } from "api/fetcher";

import { formatDate } from "utils/handy";
import { OK } from "utils/constant";

const Graph = () => {
  const history = useHistory();
  const [date, setDate] = useState(new Date());
  const [graphType, setGraphType] = useState("0");
  const [expenseGraphDatas, setExpenseGraphDatas] = useState([]);
  const [expenseGraphLabels, setExpenseGraphLabels] = useState([]);
  const [incomeGraphDatas, setIncomeGraphDatas] = useState([]);
  const [incomeGraphLabels, setIncomeGraphLabels] = useState([]);
  const [balance, setBalance] = useState(null);
  const [categoryBalance, setCategoryBalance] = useState(null);

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
      setCategoryBalance(response.data);
      setGraphData(
        balance.expense.total,
        response.data.expense,
        setExpenseGraphDatas,
        setExpenseGraphLabels
      );
      setGraphData(
        balance.income.total,
        response.data.income,
        setIncomeGraphDatas,
        setIncomeGraphLabels
      );
    } else {
      history.push("/error");
    }
  };

  const setGraphData = (total, graphDatas, setDataMethod, setLabelMethod) => {
    let datas = [];
    let labels = [];
    let other = 0;
    for (let i of graphDatas) {
      const percent = Math.round((i.total / total) * 100);
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
  const handleChangeGraphType = (e: any) => {
    setGraphType(e.target.value);
  };

  return (
    <>
      <div className="px-2 flex lg:w-2/3 lg:mx-auto">
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
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="select-outlined-label">グラフ</InputLabel>
            <Select
              labelId="select-outlined-label"
              id="select-outlined"
              value={graphType}
              onChange={handleChangeGraphType}
              label="グラフ"
              color="primary"
            >
              <MenuItem value="0">支出</MenuItem>
              <MenuItem value="1">収入</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {balance && categoryBalance ? (
        graphType === "0" ? (
          <>
            {expenseGraphDatas.length > 0 ? (
              <>
                <DoughnutChart
                  datas={expenseGraphDatas}
                  labels={expenseGraphLabels}
                  graphName="支出"
                  total={balance.expense.total}
                />
                <div className="mt-4 border-t lg:w-2/3 lg:mx-auto">
                  {categoryBalance.expense.map((data: any) => {
                    return (
                      <div
                        key={data.category_name}
                        className="flex justify-between px-4 py-4 border-b"
                      >
                        <div>
                          <p className="text-xl">{data.category_name}</p>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <p className="text-xl mb-1">{data.total}円</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-center mt-8">登録なし</p>
            )}
          </>
        ) : (
          <>
            {incomeGraphDatas.length > 0 ? (
              <>
                <DoughnutChart
                  datas={incomeGraphDatas}
                  labels={incomeGraphLabels}
                  graphName="収入"
                  total={balance.income.total}
                />
                <div className="mt-4 border-t">
                  {categoryBalance.income.map((data: any) => {
                    return (
                      <div
                        key={data.category_name}
                        className="flex justify-between px-4 py-4 border-b"
                      >
                        <div>
                          <p className="text-xl">{data.category_name}</p>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <p className="text-xl mb-1">{data.total}円</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-center mt-8">登録なし</p>
            )}
          </>
        )
      ) : (
        <div className="px-4">
          <Skeleton
            className="m-auto"
            variant="circular"
            width={300}
            height={300}
          />
          <Skeleton variant="rectangular" className="h-12 mt-8 mb-4" />
          <Skeleton variant="rectangular" className="h-12 my-4" />
          <Skeleton variant="rectangular" className="h-12 my-4" />
          <Skeleton variant="rectangular" className="h-12 my-4" />
        </div>
      )}
    </>
  );
};
export default Graph;
