import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useSWR from "swr";
import { Skeleton } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { AlertProps } from "@material-ui/lab";

import BackButton from "components/Atoms/Buttons/BackButton";
import EditIconButton from "components/Atoms/Buttons/EditIconButton";
import DeleteIconButton from "components/Atoms/Buttons/DeleteIconButton";

import { fetcherApi } from "api/fetcher";
import { deleteExpenseApi } from "api/Expense";
import { OK } from "../../../../../utils/constant";
import AjaxLoading from "components/Atoms/Loading/AjaxLoading";

type ExpenseDetailRouteParams = {
  id: string;
};
type ExpenseDetailProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<
    React.SetStateAction<AlertProps["severity"]>
  >;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};
const ExpenseDetail: React.FC<ExpenseDetailProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
}) => {
  const classes = style();
  const history = useHistory();
  const { id } = useParams<ExpenseDetailRouteParams>();

  const [loading, setLoading] = useState(false);

  const { data: detail, error } = useSWR(
    ["expense/" + id, "detail"],
    fetcherApi
  );

  if (error) {
    history.push("/error");
  }

  const handleDeleteButtonClick = async () => {
    setLoading(true);
    const response = await deleteExpenseApi(detail.id);

    if (response === OK) {
      handleAlertOpen();
      setAlertMessage("正常に支出を削除しました");
      history.push("/mypage/list");
    } else {
      history.push("/error");
    }
  };

  const handleEditButtonClick = () => {
    history.push("/mypage/expense/edit/" + id);
  };

  return (
    <div className="px-4 py-1">
      <div className="flex justify-between">
        <BackButton />
        <div>
          <EditIconButton
            handleEditButtonClick={handleEditButtonClick}
            size="large"
          />
          <DeleteIconButton
            handleDeleteButtonClick={handleDeleteButtonClick}
            size="large"
          />
        </div>
      </div>

      <div className="flex justify-between py-5 border-b border-blue-100 md:justify-start">
        {detail ? (
          <p className="text-2xl md:mr-16">{detail.category_name}</p>
        ) : (
          <Skeleton variant="rectangular" className="h-8 w-1/3" />
        )}
        {detail ? (
          <p className="text-2xl">{detail.expense}円</p>
        ) : (
          <Skeleton variant="rectangular" className="h-8 w-1/3" />
        )}
      </div>
      <div className="flex justify-between py-5 border-b border-blue-100">
        <div className="w-3/12">
          <p>作成者</p>
          {detail ? (
            <p className="text-xl">{detail.name}</p>
          ) : (
            <Skeleton variant="rectangular" className="h-7 w-full" />
          )}
        </div>
        <div className="w-3/12">
          <p>作成日</p>
          {detail ? (
            <p className="text-xl">{detail.regist_date}</p>
          ) : (
            <Skeleton variant="rectangular" className="h-7 w-full" />
          )}
        </div>
        <div className="w-3/12">
          <p>繰り返し</p>
          {detail ? (
            <p className="text-xl">
              {detail.repetition_flg ? (
                <span>登録済み</span>
              ) : (
                <span>未登録</span>
              )}
            </p>
          ) : (
            <Skeleton variant="rectangular" className="h-7 w-full" />
          )}
        </div>
      </div>
      <div className="py-5">
        <p>コメント</p>
        {detail ? (
          <p
            className={clsx(
              "mt-2 p-2 rounded-md border bg-blue-50 border-blue-100 whitespace-pre-wrap",
              classes.comment
            )}
          >
            {detail.comment ? (
              detail.comment
            ) : (
              <span className="text-gray-400">コメントなし</span>
            )}
          </p>
        ) : (
          <Skeleton variant="rectangular" className="h-32 w-full mt-2" />
        )}
      </div>
      <div className="py-5">
        <p>レシート</p>
        {detail ? (
          detail.img_url ? (
            <img
              className="pt-2 w-full h-auto lg:w-1/2"
              src={detail.img_url}
              alt="レシート画像"
            />
          ) : (
            <p className="text-gray-400 text-sm">レシート未登録</p>
          )
        ) : (
          <Skeleton variant="rectangular" className="h-48 w-full" />
        )}
      </div>
      {loading && <AjaxLoading />}
    </div>
  );
};

const style = makeStyles(() => ({
  comment: {
    minHeight: "128px",
  },
}));

export default ExpenseDetail;
