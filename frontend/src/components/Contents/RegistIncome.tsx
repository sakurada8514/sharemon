import React, { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { DatePickerProps } from "@material-ui/pickers";

import RegistIncomeForm from "../Form/RegistIncomeForm";
import { OK, VALIDATION } from "../../utils/constant";

import { getCategoryList as getCategoryListApi } from "../../api/Income/category";
import { registIncome as registIncomeApi } from "../../api/Income/regist";

type RegistIncomeProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: Dispatch<SetStateAction<string>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

const RegistIncome: React.FC<RegistIncomeProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
}) => {
  const history = useHistory();

  const [income, setIncome] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(1);
  const [repetition, setRepetition] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCategoryList() {
      const response = await getCategoryListApi();

      if (response.status === OK) {
        setCategoryList(response.data.categoryList);
        setCategory(1);
      } else {
        history.push("/error");
      }
    }
    getCategoryList();
  }, []);

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
    const response = await registIncomeApi(
      income,
      date,
      category,
      comment,
      repetition
    );

    if (response.status === OK) {
      handleAlertOpen();
      setAlertMessage("正常に収入を作成しました");
      setIncome("");
      setDate(new Date());
      setCategory(1);
      setComment("");
      setRepetition(false);
      setErrors([]);
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
    <RegistIncomeForm
      registIncome={registIncome}
      income={income}
      date={date}
      category={category}
      comment={comment}
      repetition={repetition}
      categoryList={categoryList}
      loading={loading}
      errors={errors}
      setDate={handleChangeDate}
      handleChangeIncome={handleChangeIncome}
      handleChangeCategory={handleChangeCategory}
      handleChangeComment={handleChangeComment}
      handleToggleRepetition={handleToggleRepetition}
    />
  );
};
export default RegistIncome;
