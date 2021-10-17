import React, { useState } from "react";
import useSWR from "swr";
import { useHistory } from "react-router";
import { Fab, Modal, Fade } from "@mui/material";
import { Skeleton } from "@mui/material";
import { LinearProgress } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MoneyIcon from "@mui/icons-material/Money";

import { fetcherApi } from "api/fetcher";
const BudgetList = () => {
  const history = useHistory();
  const { data: budgetList, error } = useSWR(
    ["/budget", "budgetList"],
    fetcherApi
  );

  if (error) {
    history.push("/error");
  }

  const handleRegistClick = () => {
    history.push("/mypage/budget/regist");
  };
  return (
    <>
      <div className="pt-3">
        {budgetList ? (
          budgetList.map((data: any) => {
            return (
              <div
                key={data.id}
                className="flex justify-between px-4 py-6 border-b"
              >
                <div className="w-1/3">
                  <p className="text-xl">{data.category_name}</p>
                  <div className="flex items-center">
                    <MoneyIcon className="w-6 h-6 bg-yellow-400 text-white mr-2 rounded-full p-1" />
                    <p>{data.budget}円</p>
                  </div>
                </div>
                <div className="w-2/3 flex flex-col justify-between">
                  <LinearProgress className="h-5" variant="buffer" value={30} />
                  <div className="flex items-end justify-end">
                    <p className="text-sm">30%</p>
                    <p className="text-sm w-3/5 text-right">今月残り 10000円</p>
                  </div>
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
            <Skeleton className="h-20 pb-2" />
            <Skeleton className="h-20 pb-2" />
          </div>
        )}
      </div>
      <Fab
        color="primary"
        aria-label="add"
        className=" w-12 h-12 fixed bottom-20 right-6 z-10"
        onClick={handleRegistClick}
      >
        <EditIcon />
      </Fab>
    </>
  );
};
export default BudgetList;
