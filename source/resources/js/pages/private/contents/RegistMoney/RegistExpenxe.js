import React from "react";
import { useRef, useState } from "react";

import RegistExpenseForm from "../../../../components/Form/RegistExpenseForm";

export default function RegistExpense() {
    const [expense, setExpense] = useState("");
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState("");
    const [repetition, setRepetition] = useState(false);
    const [comment, setComment] = useState("");
    const [receiptImg, setReceiptImg] = useState("");
    const [errors, setErrors] = useState([]);

    const fileInput = useRef(null);

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
                setReceiptImg(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleFileReset = () => {
        fileInput.current.value = "";
        setReceiptImg("");
    };

    return (
        <RegistExpenseForm
            expense={expense}
            date={date}
            category={category}
            comment={comment}
            repetition={repetition}
            fileInput={fileInput}
            receiptImg={receiptImg}
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
