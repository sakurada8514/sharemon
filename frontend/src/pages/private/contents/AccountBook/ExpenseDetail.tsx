import React from "react";
import { useParams, useHistory } from "react-router-dom";
import useSWR from "swr";
import { IconButton, Skeleton } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { fetcherApi } from "api/fetcher";

type ExpenseDetailRouteParams = {
  id: string;
};

const ExpenseDetail = () => {
  const classes = style();
  const history = useHistory();
  const { id } = useParams<ExpenseDetailRouteParams>();

  const { data: detail, error } = useSWR(
    ["expense/" + id, "detail"],
    fetcherApi
  );

  if (error) {
    history.push("/error");
  }

  const handleBackClick = () => [history.goBack()];
  return (
    <div className="px-2 py-2">
      <div className="flex justify-between">
        <button className="flex items-center py-2" onClick={handleBackClick}>
          <NavigateBeforeIcon className="w-7 h-7" />
          <span className="text-lg">戻る</span>
        </button>
        <div>
          <IconButton aria-label="edit" size="large" color="primary">
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" className="text-red-500" />
          </IconButton>
        </div>
      </div>

      <div className="flex justify-between py-5 border-b border-blue-100">
        {detail ? (
          <p className="text-2xl">{detail.category_name}</p>
        ) : (
          <Skeleton className="h-8 w-1/3" />
        )}
        {detail ? (
          <p className="text-2xl">{detail.expense}円</p>
        ) : (
          <Skeleton className="h-8 w-1/3" />
        )}
      </div>
      <div className="flex justify-between py-5 border-b border-blue-100">
        <div>
          <p>作成者</p>
          {detail ? (
            <p className="text-xl">{detail.name}</p>
          ) : (
            <Skeleton className="h-7 w-full" />
          )}
        </div>
        <div>
          <p>作成日</p>
          {detail ? (
            <p className="text-xl">{detail.regist_date}</p>
          ) : (
            <Skeleton className="h-7 w-full" />
          )}
        </div>
        <div>
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
            <Skeleton className="h-7 w-full" />
          )}
        </div>
      </div>
      <div className="py-5">
        <p>コメント</p>
        {detail ? (
          <p
            className={clsx(
              "mt-2 p-2 rounded-md border border-blue-100 whitespace-pre-wrap",
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
          <img
            className="pt-2 w-full h-auto"
            src={detail.img_url}
            alt="レシート画像"
          />
        ) : (
          <Skeleton variant="rectangular" className="h-48 w-full" />
        )}
      </div>
    </div>
  );
};

const style = makeStyles(() => ({
  comment: {
    minHeight: "128px",
  },
}));

export default ExpenseDetail;
