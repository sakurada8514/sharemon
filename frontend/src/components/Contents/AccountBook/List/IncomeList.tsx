import React from "react";
import { Skeleton } from "@mui/material";

import LoadMoreButton from "../../../Atoms/Buttons/LoadMoreButton";

type IncomeListProps = {
  incomeList?: any[];
  isIncomeLast: boolean;
  loadMoreIncome: () => void;
};

const IncomeList: React.FC<IncomeListProps> = ({
  incomeList,
  isIncomeLast,
  loadMoreIncome,
}) => {
  return (
    <>
      {incomeList ? (
        incomeList.length > 0 ? (
          incomeList.map((data: any) => {
            return (
              <div
                key={data.id}
                className="flex justify-between px-4 py-2 border-b"
              >
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
                  <p className="text-xl mb-1">{data.income}円</p>
                  {!data.read_flg && (
                    <p className="text-white text-center font-light text-xs bg-red-500 rounded-2xl px-1 w-10">
                      new
                    </p>
                  )}
                </div>
              </div>
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
      {!isIncomeLast && <LoadMoreButton loadMore={loadMoreIncome} />}
    </>
  );
};

export default IncomeList;