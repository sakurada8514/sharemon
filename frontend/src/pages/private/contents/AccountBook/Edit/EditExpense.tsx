import React, { useGlobal, useRef, useState, useEffect } from "reactn";
import useSWR from "swr";
import { useHistory, useParams } from "react-router";
import { DatePickerProps } from "@material-ui/pickers";
import { AlertProps } from "@material-ui/lab";
import { Dispatch, SetStateAction } from "react";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import ExpenseForm from "components/Form/ExpenseForm";
import AjaxLoading from "components/Atoms/Loading/AjaxLoading";
import { OK, VALIDATION } from "utils/constant";

import { getCategoryList as getCategoryListApi } from "api/Expense/category";
import { editExpense as editExpenseApi } from "api/Expense/regist";
import { fetcherApi } from "api/fetcher";

type EditExpenseProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<
    React.SetStateAction<AlertProps["severity"]>
  >;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

type ExpenseEditRouteParams = { id: string };

const EditExpense: React.FC<EditExpenseProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
}) => {
  const history = useHistory();
  const { id } = useParams<ExpenseEditRouteParams>();

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
  const [ajaxLoading, setAjaxLoading] = useState(true);

  const { data: categoryList, error: categoryListError } = useSWR(
    "/expensecategory",
    getCategoryListApi
  );

  useEffect(() => {
    getExpenseDetail();
  }, []);

  const getExpenseDetail = async () => {
    const response = await fetcherApi("/expense/" + id, "detail");

    setExpense(response.expense);
    setDate(response.regist_date);
    setCategory(response.category_id);
    setComment(response.comment ? response.comment : "");
    setRepetition(response.repetition_flg);
    setReceiptImgPreview(response.img_url);
    setAjaxLoading(false);
  };

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

  async function editExpense() {
    setLoading(true);
    const response = await editExpenseApi(
      id,
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
      history.goBack();
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

  const handleBackClick = () => [history.goBack()];

  return (
    <div className="px-2 pt-2">
      <button className="flex items-center py-2" onClick={handleBackClick}>
        <NavigateBeforeIcon className="w-7 h-7" />
        <span className="text-lg">戻る</span>
      </button>
      <ExpenseForm
        apiMethod={editExpense}
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
        buttonText="支出編集"
        setDate={handleChangeDate}
        handleChangeExpense={handleChangeExpense}
        handleChangeCategory={handleChangeCategory}
        handleChangeComment={handleChangeComment}
        handleToggleRepetition={handleToggleRepetition}
        handleChangeFile={handleChangeFile}
        handleClickFileInput={handleClickFileInput}
        handleFileReset={handleFileReset}
      />
      {ajaxLoading && <AjaxLoading />}
    </div>
  );
};
export default EditExpense;
