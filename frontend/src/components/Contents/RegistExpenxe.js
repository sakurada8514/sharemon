import React, { useGlobal, useRef, useState, useEffect } from "reactn";
import { useHistory } from "react-router";

import RegistExpenseForm from "../Form/RegistExpenseForm";
import { OK, VALIDATION } from "../../utils/constant";

import { getCategoryList as getCategoryListApi } from "../../api/Expense/category";
import { registExpense as registExpenseApi } from "../../api/Expense/regist";

export default function RegistExpense(props) {
  const history = useHistory();
  const setError = useGlobal("error")[1];

  const [expense, setExpense] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(1);
  const [repetition, setRepetition] = useState(false);
  const [comment, setComment] = useState("");
  const [receiptImg, setReceiptImg] = useState("");
  const [receiptImgPreview, setReceiptImgPreview] = useState("");
  const [errors, setErrors] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fileInput = useRef(null);

  useEffect(() => {
    async function getCategoryList() {
      const response = await getCategoryListApi();

      if (response.status === OK) {
        setCategoryList(response.data.categoryList);
        setCategory(1);
      } else {
        // history.push("/error");
        setError(true);
      }
    }
    getCategoryList();
  }, []);

  const handleChangeExpense = (e) => setExpense(e.target.value);
  const handleChangeCategory = (e) => setCategory(e.target.value);
  const handleChangeComment = (e) => setComment(e.target.value);
  const handleToggleRepetition = () => {
    setRepetition(!repetition);
  };

  const handleClickFileInput = () => {
    fileInput.current.click();
  };
  const handleChangeFile = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setReceiptImgPreview(e.target.result);
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
      props.handleAlertOpen();
      props.setAlertMessage("正常に支出を作成しました");
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
      props.handleAlertOpen(6000);
      props.setAlertSeverity("error");
      props.setAlertMessage(
        "何かしらのエラーが発生しました。時間をおいてから再度お試しください。"
      );
    }
    setLoading(false);
  }

  return (
    <RegistExpenseForm
      registExpense={registExpense}
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
      setDate={setDate}
      handleChangeExpense={handleChangeExpense}
      handleChangeCategory={handleChangeCategory}
      handleChangeComment={handleChangeComment}
      handleToggleRepetition={handleToggleRepetition}
      handleChangeFile={handleChangeFile}
      handleClickFileInput={handleClickFileInput}
      handleFileReset={handleFileReset}
    />
  );
}