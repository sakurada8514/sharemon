import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useSWR from "swr";
import { IconButton, Skeleton, CircularProgress } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { AlertProps } from "@material-ui/lab";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { fetcherApi } from "api/fetcher";
import { deleteIncomeApi } from "api/Income";
import { OK } from "utils/constant";
import AjaxLoading from "components/Atoms/Loading/AjaxLoading";

type IncomeDetailRouteParams = {
  id: string;
};

type IncomeDetailProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<
    React.SetStateAction<AlertProps["severity"]>
  >;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};

const IncomeDetail: React.FC<IncomeDetailProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
}) => {
  const classes = style();
  const history = useHistory();
  const { id } = useParams<IncomeDetailRouteParams>();

  const [loading, setLoading] = useState(false);

  const { data: detail, error } = useSWR(
    ["income/" + id, "detail"],
    fetcherApi
  );

  if (error) {
    history.push("/error");
  }

  const handleBackClick = () => history.goBack();

  const handleDeleteButtonClick = async () => {
    setLoading(true);
    const response = await deleteIncomeApi(detail.id);

    if (response === OK) {
      handleAlertOpen();
      setAlertMessage("正常に支出を削除しました");
      history.push("/mypage/list");
    } else {
      history.push("/error");
    }
  };
  const handleEditButtonClick = () => {
    if (detail) {
      history.push("/mypage/income/edit/" + detail.id);
    }
  };
  return (
    <div className="px-2 py-2">
      <div className="flex justify-between">
        <button className="flex items-center py-2" onClick={handleBackClick}>
          <NavigateBeforeIcon className="w-7 h-7" />
          <span className="text-lg">戻る</span>
        </button>
        <div>
          <IconButton
            aria-label="edit"
            size="large"
            color="primary"
            onClick={handleEditButtonClick}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={handleDeleteButtonClick}
          >
            <DeleteIcon fontSize="inherit" className="text-red-500" />
          </IconButton>
        </div>
      </div>

      <div className="flex justify-between py-5 border-b border-blue-100">
        {detail ? (
          <>
            <p className="text-2xl">{detail.category_name}</p>
            <p className="text-2xl">{detail.income}円</p>
          </>
        ) : (
          <>
            <Skeleton variant="rectangular" className="h-8 w-1/3" />
            <Skeleton variant="rectangular" className="h-8 w-1/3" />
          </>
        )}
      </div>
      <div className="flex justify-between py-5 border-b border-blue-100">
        <div>
          <p>作成者</p>
          {detail ? (
            <p className="text-xl">{detail.name}</p>
          ) : (
            <Skeleton variant="rectangular" className="h-7 w-full" />
          )}
        </div>
        <div>
          <p>作成日</p>
          {detail ? (
            <p className="text-xl">{detail.regist_date}</p>
          ) : (
            <Skeleton variant="rectangular" className="h-7 w-full" />
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
      {loading && <AjaxLoading />}
    </div>
  );
};

const style = makeStyles(() => ({
  comment: {
    minHeight: "128px",
  },
}));

export default IncomeDetail;
