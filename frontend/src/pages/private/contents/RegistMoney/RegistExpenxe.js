import React from "react";
import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { motion } from "framer-motion";

import RegistExpenseForm from "../../../../components/Form/RegistExpenseForm";
import { OK, VALIDATION } from "../../../../utils/constant";

import { getCategoryList as getCategoryListApi } from "../../../../api/Expense/category";
import { registExpense as registExpenseApi } from "../../../../api/Expense/regist";

export default function RegistExpense(props) {
  const history = useHistory();

  const [expense, setExpense] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [repetition, setRepetition] = useState(false);
  const [comment, setComment] = useState("");
  const [receiptImg, setReceiptImg] = useState("");
  const [receiptImgPreview, setReceiptImgPreview] = useState("");
  const [errors, setErrors] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const fileInput = useRef(null);

  useEffect(() => {
    async function getCategoryList() {
      const response = await getCategoryListApi();

      if (response.status === OK) {
        setCategoryList(response.data.categoryList);
        setCategory(1);
      } else {
        window.location.href("/error");
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