import React, { useGlobal, useRef, useState, useEffect } from "reactn";
import useSWR from "swr";
import { useHistory } from "react-router";
import { DatePickerProps } from "@material-ui/pickers";
import { AlertProps } from "@material-ui/lab";

import ExpenseForm from "components/Form/ExpenseForm";
import { OK, VALIDATION } from "utils/constant";

import { getCategoryList as getCategoryListApi } from "api/Expense/category";
import { registExpense as registExpenseApi } from "api/Expense/regist";
import { Dispatch, SetStateAction } from "react";

type RegistMoneyProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<
    React.SetStateAction<AlertProps["severity"]>
  >;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

const RegistExpense: React.FC<RegistMoneyProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
}) => {
  const history = useHistory();

  const [expense, setExpense] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(1);
  const [repetition, setRepetition] = useState(false);
  const [comment, setComment] = useState("");
  const [receiptImg, setReceiptImg] = useState("");
  const [receiptImgPreview, setReceiptImgPreview] = useState<
    string | ArrayBuffer | null
  >("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: categoryList, error: categoryListError } = useSWR(
    "/expensecategory",
    getCategoryListApi
  );
  if (categoryListError) {
    history.push("/error");
  }

  const fileInput = useRef(null);

  const handleChangeExpense = (e: any) => setExpense(e.target.value);
  const handleChangeCategory = (e: any) => setCategory(e.target.value);
  const handleChangeComment = (e: any) => setComment(e.target.value);
  const handleToggleRepetition = () => {
    setRepetition(!repetition);
  };
  const handleChangeDate: DatePickerProps["onChange"] = (date: any) => {
    setDate(date);
  };
  const handleClickFileInput = () => {
    fileInput.current.click();
  };
  const handleChangeFile = (e: any) => {
    const files = e.target.files;

    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setReceiptImgPreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);

      setReceiptImg(file);
    }
  };
  const handleFileReset = () => {
    fileInput.current.value = "";
    setReceiptImg("");
    setReceiptImgPreview("");
  };

  async function registExpense() {
    setLoading(true);
    const response = await registExpenseApi(
      expense,
      date,
      category,
      comment,
      repetition,
      receiptImg
    );

    if (response.status === OK) {
      handleAlertOpen();
      setAlertMessage("正常に支出を作成しました");
      setExpense("");
      setDate(new Date());
      setCategory(1);
      setComment("");
      setRepetition(false);
      setErrors([]);
      handleFileReset();
    } else if (response.status === VALIDATION) {
      setErrors(response.data.errors);
    } else {
      handleAlertOpen(6000);
      setAlertSeverity("error");
      setAlertMessage(
        "何かしらのエラーが発生しました。時間をおいてから再度お試しください。"
      );
    }
    setLoading(false);
  }

  return (
    <ExpenseForm
      apiMethod={registExpense}
      expense={expense}
      date={date}
      category={category}
      comment={comment}
      repetition={repetition}
      fileInput={fileInput}
      receiptImgPreview={receiptImgPreview}
      categoryList={categoryList}
      errors={errors}
      loading={loading}
      buttonText="支出作成"
      setDate={handleChangeDate}
      handleChangeExpense={handleChangeExpense}
      handleChangeCategory={handleChangeCategory}
      handleChangeComment={handleChangeComment}
      handleToggleRepetition={handleToggleRepetition}
      handleChangeFile={handleChangeFile}
      handleClickFileInput={handleClickFileInput}
      handleFileReset={handleFileReset}
    />
  );
};
export default RegistExpense;
