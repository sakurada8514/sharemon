import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import RegistIncomeForm from "../../../../components/Form/RegistIncomeForm";
import { OK, VALIDATION } from "../../../../Const/constant";

import { getCategoryList as getCategoryListApi } from "../../../../api/Income/category";
import { registIncome as registIncomeApi } from "../../../../api/Income/regist";

export default function RegistIncome(props) {
    const history = useHistory();

    const [income, setIncome] = useState("");
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState("");
    const [repetition, setRepetition] = useState(false);
    const [comment, setComment] = useState("");
    const [receiptImgPreview, setReceiptImgPreview] = useState("");
    const [errors, setErrors] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

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

    const handleChangeIncome = (e) => setIncome(e.target.value);
    const handleChangeCategory = (e) => setCategory(e.target.value);
    const handleChangeComment = (e) => setComment(e.target.value);
    const handleToggleRepetition = () => {
        setRepetition(!repetition);
    };

    async function registIncome() {
        const response = await registIncomeApi(
            income,
            date,
            category,
            comment,
            repetition
        );

        if (response.status === OK) {
            props.handleAlertOpen();
            props.setAlertMessage("正常に収入を作成しました");
            setIncome("");
            setDate(new Date());
            setCategory(1);
            setComment("");
            setRepetition(false);
            setErrors([]);
        } else if (response.status === VALIDATION) {
            setErrors(response.data.errors);
        } else {
            props.setAlertOpen(true);
            props.setAlertSeverity("error");
            props.setAlertMessage(
                "何かしらのエラーが発生しました。時間をおいてから再度お試しください。"
            );
        }
    }

    return (
        <RegistIncomeForm
            registIncome={registIncome}
            income={income}
            date={date}
            category={category}
            comment={comment}
            repetition={repetition}
            receiptImgPreview={receiptImgPreview}
            categoryList={categoryList}
            errors={errors}
            setDate={setDate}
            handleChangeIncome={handleChangeIncome}
            handleChangeCategory={handleChangeCategory}
            handleChangeComment={handleChangeComment}
            handleToggleRepetition={handleToggleRepetition}
        />
    );
}
