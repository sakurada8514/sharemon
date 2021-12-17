import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import { useHistory, useParams } from "react-router";
import { DatePickerProps } from "@material-ui/pickers";
import { AlertProps } from "@material-ui/lab";

import BackButton from "components/Base/Buttons/BackButton";
import IncomeForm from "components/Form/IncomeForm";
import AjaxLoading from "components/Base/Loading/AjaxLoading";
import { OK, VALIDATION } from "utils/constant";

import { getCategoryList as getCategoryListApi } from "api/Income/category";
import { editIncome as editIncomeApi } from "api/Income/regist";
import { fetcherApi } from "api/fetcher";

type IncomeEditRouteParams = {
  id: string;
};
type EditIncomeProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<
    React.SetStateAction<AlertProps["severity"]>
  >;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

const EditIncome: React.FC<EditIncomeProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
}) => {
  const history = useHistory();
  const { id } = useParams<IncomeEditRouteParams>();

  const [income, setIncome] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(1);
  const [repetition, setRepetition] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ajaxLoading, setAjaxLoading] = useState(true);

  const { data: categoryList, error: categoryListError } = useSWR(
    "/incomecategory",
    getCategoryListApi,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (categoryListError) {
    history.push("/error");
  }

  useEffect(() => {
    getIncomeDetail();
  }, []);

  const getIncomeDetail = async () => {
    const response = await fetcherApi("/expense/" + id);

    if (response.status === OK) {
      setIncome(response.data.detail.expense);
      setDate(response.data.detail.regist_date);
      setCategory(response.data.detail.category_id);
      setComment(
        response.data.detail.comment ? response.data.detail.comment : ""
      );
      setRepetition(response.data.detail.repetition_flg);
    } else {
      history.push("/error");
    }
    setAjaxLoading(false);
  };

  const handleChangeIncome = (e: any) => setIncome(e.target.value);
  const handleChangeCategory = (e: any) => setCategory(e.target.value);
  const handleChangeComment = (e: any) => setComment(e.target.value);
  const handleToggleRepetition = () => {
    setRepetition(!repetition);
  };
  const handleChangeDate: DatePickerProps["onChange"] = (date: any) => {
    setDate(date);
  };

  async function registIncome() {
    setLoading(true);
    const response = await editIncomeApi(
      id,
      income,
      date,
      category,
      comment,
      repetition
    );

    if (response.status === OK) {
      handleAlertOpen();
      setAlertMessage("正常に収入を編集しました");
      history.goBack();
    } else if (response.status === VALIDATION) {
      setErrors(response.data.errors);
    } else {
      handleAlertOpen();
      setAlertSeverity("error");
      setAlertMessage(
        "何かしらのエラーが発生しました。時間をおいてから再度お試しください。"
      );
    }
    setLoading(false);
  }

  return (
    <div className="px-4 pt-2">
      <BackButton />
      <IncomeForm
        apiMethod={registIncome}
        income={income}
        date={date}
        category={category}
        comment={comment}
        repetition={repetition}
        categoryList={categoryList}
        loading={loading}
        errors={errors}
        buttonText="収入編集"
        setDate={handleChangeDate}
        handleChangeIncome={handleChangeIncome}
        handleChangeCategory={handleChangeCategory}
        handleChangeComment={handleChangeComment}
        handleToggleRepetition={handleToggleRepetition}
      />
      {ajaxLoading && <AjaxLoading />}
    </div>
  );
};
export default EditIncome;
