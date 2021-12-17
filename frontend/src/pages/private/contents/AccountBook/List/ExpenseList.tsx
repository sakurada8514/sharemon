import React from "react";
import { Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";

import LoadMoreButton from "components/Base/Buttons/LoadMoreButton";

type ExpemseListProps = {
  expenseList?: any[];
  isExpenseLast: boolean;
  loadMoreExpense: () => void;
};

const ExpenseList: React.FC<ExpemseListProps> = ({
  expenseList,
  isExpenseLast,
  loadMoreExpense,
}) => {
  return (
    <div className="lg:w-2/3 lg:mx-auto">
      {expenseList ? (
        expenseList.length > 0 ? (
          expenseList.map((data: any) => {
            return (
              <NavLink to={"/mypage/expense/" + data.id} key={data.id}>
                <div className="flex justify-between px-4 py-2 border-b">
                  <div>
                    <p className="text-xl">{data.category_name}</p>
                    {data.repetition_flg === 0 ? (
                      <p className="text-gray-500">{data.regist_date}</p>
                    ) : (
                      <p className="text-gray-500">
                        {data.regist_date}から毎月繰り返し
                      </p>
                    )}
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="text-xl mb-1">{data.expense}円</p>
                    {!data.read_flg && (
                      <p className="text-white text-center font-light text-xs bg-red-500 rounded-2xl px-1 w-10">
                        new
                      </p>
                    )}
                  </div>
                </div>
              </NavLink>
            );
          })
        ) : (
          <p className="text-gray-500 text-center pt-4">登録なし</p>
        )
      ) : (
        <div className="p-4">
          <Skeleton className="h-20 pb-2" />
          <Skeleton className="h-20 pb-2" />
          <Skeleton className="h-20 pb-2" />
          <Skeleton className="h-20 pb-2" />
        </div>
      )}
      {!isExpenseLast && <LoadMoreButton loadMore={loadMoreExpense} />}
    </div>
  );
};

export default ExpenseList;
