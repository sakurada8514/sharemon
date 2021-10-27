import React from "reactn";
import useSWR from "swr";
import { useHistory } from "react-router";
import { Box, Typography, Avatar } from "@material-ui/core";
import { Skeleton } from "@mui/material";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { fetcherApi } from "api/fetcher";
import { formatDate } from "../../../utils/handy";
type HomeProps = {
  roomName: string;
};

const Home: React.FC<HomeProps> = ({ roomName }) => {
  const history = useHistory();
  const thisMonth = formatDate(new Date(), "MM").replace(/^0/g, "");

  const { data: member, error: memberError } = useSWR(
    ["/member", "memberList"],
    fetcherApi
  );
  const { data: balance, error: balanceError } = useSWR(
    "balance/month/" + formatDate(new Date(), "yyyy-MM-dd"),
    fetcherApi
  );
  const { data: budget, error: budgetError } = useSWR(
    ["budget/total", "total"],
    fetcherApi
  );

  if (memberError || balanceError || budgetError) {
    history.push("/error");
  }

  return (
    <div className="p-3">
      <Box className="w-full bg-white p-3 rounded shadow mb-6">
        {roomName ? (
          <Typography variant="h5" className="mb-2">
            {roomName}
          </Typography>
        ) : (
          <Skeleton variant="rectangular" className="w-1/2 h-8 mb-2" />
        )}
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {!member ? (
            <>
              <Box className="w-full justify-between flex-wrap">
                <Skeleton variant="rectangular" className="w-full h-8 my-1" />
                {/* <Skeleton className="w-full h-9" /> */}
              </Box>
            </>
          ) : (
            member.map(
              (data: { name: string; nickname: string; id: number }) => {
                return (
                  <Box className="w-1/2 my-1 flex items-center" key={data.id}>
                    <Avatar className="w-8 h-8 mr-3">
                      <AccountCircleIcon className="w-8 h-8" />
                    </Avatar>
                    <Typography variant="subtitle1">
                      {data.nickname === null ? data.name : data.nickname}
                    </Typography>
                  </Box>
                );
              }
            )
          )}
        </Box>
      </Box>
      <Box className="w-full bg-white p-3 rounded shadow mb-6">
        <Typography variant="h5" gutterBottom>
          {thisMonth}月の収支
        </Typography>
        <div className="flex justify-around flex-col">
          <div className="w-full text-center mb-6">
            <Typography
              variant="h6"
              className="bg-green-400 text-white rounded rounded-b-none py-1"
            >
              支出
            </Typography>
            <div className="flex bg-green-50 border-green-400 border-2 border-t-0 rounded rounded-t-none p-4">
              <div className=" w-3/5 mr-3">
                <div className="flex justify-between">
                  <p className="w-2/5 text-left text-gray-600">合計：</p>
                  {!balance ? (
                    <Skeleton className="w-2/3 h-7" />
                  ) : (
                    <p className="text-lg font-medium">
                      {balance.data.expense.total}円
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="w-2/5 text-left text-gray-600">記録数：</p>
                  {!balance ? (
                    <Skeleton className="w-1/3 h-7" />
                  ) : (
                    <p className="text-lg font-medium">
                      {balance.data.expense.count}回
                    </p>
                  )}
                </div>
              </div>
              <div className=" w-2/5">
                {balance && budget ? (
                  budget - balance.data.expense.total > 0 ? (
                    <>
                      <p className="text-gray-600">予算残り</p>
                      <p className="text-lg font-medium">
                        {budget - balance.data.expense.total}円
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600">予算より</p>
                      <p className="text-lg font-medium">
                        {budget - balance.data.expense.total}円
                      </p>
                    </>
                  )
                ) : (
                  <Skeleton variant="rectangular" className="h-14 w-full" />
                )}
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            <Typography
              variant="h6"
              className="bg-blue-400 text-white rounded rounded-b-none py-1"
            >
              収入
            </Typography>
            <div className="flex bg-blue-50 border-blue-400 border-2 border-t-0 rounded rounded-t-none p-4">
              <div className=" w-full mr-6">
                <div className="flex justify-between">
                  <p className="w-1/2 text-left text-gray-600">合計：</p>
                  {!balance ? (
                    <Skeleton className="w-2/3 h-7" />
                  ) : (
                    <p className="text-lg font-medium">
                      {balance.data.income.total}円
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="w-1/2 text-left text-gray-600">記録数：</p>
                  {!balance ? (
                    <Skeleton className="w-2/3 h-7" />
                  ) : (
                    <p className="text-lg font-medium">
                      {balance.data.income.count}回
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box className="w-full bg-white p-3 rounded shadow mb-6">
          <Typography variant="h5" gutterBottom>
            グラフ
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
export default Home;
