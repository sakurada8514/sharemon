import React, { useGlobal, useEffect, useState } from "reactn";
import useSWR from "swr";
import { useHistory } from "react-router";
import { Box, Typography, Avatar } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { getMember as getMemberApi } from "../../../api/Room/room";
import { getBalanceThisMonth as getBalanceThisMonthApi } from "../../../api/Analysis/Balance";
import { formatDate } from "../../../utils/handy";
type HomeProps = {
  roomName: string;
};

const Home: React.FC<HomeProps> = ({ roomName }) => {
  const history = useHistory();
  const thisMonth = formatDate(new Date(), "MM").replace(/^0/g, "");

  const { data: member, error: memberError } = useSWR("/member", getMemberApi);
  const { data: balance, error: balanceError } = useSWR(
    "balance/month",
    getBalanceThisMonthApi
  );

  if (memberError || balanceError) {
    history.push("/error");
  }

  return (
    <div className="p-3">
      <Box className="w-full bg-white p-3 rounded shadow mb-6">
        {roomName ? (
          <Typography variant="h5" gutterBottom>
            {roomName}
          </Typography>
        ) : (
          <Skeleton className="w-1/2 h-10 mb-2" />
        )}
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {!member ? (
            <>
              <Box className="w-full justify-between flex-wrap">
                <Skeleton className="w-full h-10" />
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
              <div className=" w-2/3 mr-6">
                <div className="flex justify-between">
                  <p className="w-1/2 text-left text-gray-600">合計：</p>
                  {!balance ? (
                    <Skeleton className="w-2/3 h-7" />
                  ) : (
                    <p className="text-lg font-medium">
                      {balance.expense.total}円
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="w-1/2 text-left text-gray-600">記録数：</p>
                  {!balance ? (
                    <Skeleton className="w-2/3 h-7" />
                  ) : (
                    <p className="text-lg font-medium">
                      {balance.expense.count}円
                    </p>
                  )}
                </div>
              </div>
              <div className=" w-1/3">
                <p className="text-gray-600">予算残り</p>
                <p className="text-lg font-medium">12000円</p>
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
                      {balance.income.total}円
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="w-1/2 text-left text-gray-600">記録数：</p>
                  {!balance ? (
                    <Skeleton className="w-2/3 h-7" />
                  ) : (
                    <p className="text-lg font-medium">
                      {balance.income.count}回
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
