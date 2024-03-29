import React from "react";
import MediaQuery from "react-responsive";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  Button,
  InputAdornment,
  Typography,
  Box,
} from "@material-ui/core";
import { DatePickerProps } from "@material-ui/pickers";

import ReceiptIcon from "@material-ui/icons/Receipt";
import ClearIcon from "@material-ui/icons/Clear";

import MyDatePicker from "../Base/Form/DatePicker";
import LoadingButton from "../Base/Buttons/LoadingButton";

type RegistExpenseFormProps = {
  apiMethod: () => Promise<void>;
  expense: string;
  date: Date;
  category: number;
  comment: string;
  repetition: boolean;
  fileInput: React.MutableRefObject<null>;
  receiptImgPreview: any;
  categoryList: any;
  errors: any;
  loading: boolean;
  buttonText: string;
  setDate: DatePickerProps["onChange"];
  handleChangeExpense: (e: any) => void;
  handleChangeCategory: (e: any) => void;
  handleChangeComment: (e: any) => void;
  handleToggleRepetition: () => void;
  handleChangeFile: (e: any) => void;
  handleClickFileInput: () => void;
  handleFileReset: () => void;
};

const ExpenseForm: React.FC<RegistExpenseFormProps> = ({
  apiMethod,
  expense,
  date,
  category,
  comment,
  repetition,
  fileInput,
  receiptImgPreview,
  categoryList,
  errors,
  loading,
  buttonText,
  setDate,
  handleChangeExpense,
  handleChangeCategory,
  handleChangeComment,
  handleToggleRepetition,
  handleChangeFile,
  handleClickFileInput,
  handleFileReset,
}) => {
  return (
    <Box className="bg-gray-50 lg:flex">
      <Box className="lg:w-1/2">
        <Typography className="pt-4 text-gray-400">*は必須です</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="expense"
          label="支出金額"
          name="expense"
          autoComplete="expense"
          autoFocus
          value={expense}
          onChange={handleChangeExpense}
          error={typeof errors.expense !== "undefined"}
          helperText={errors.expense}
          InputProps={{
            endAdornment: <InputAdornment position="end">円</InputAdornment>,
          }}
        />

        <MyDatePicker
          date={date}
          setDate={setDate}
          views={["year", "month", "date"]}
          format="yyyy/MM/dd"
          openTo="date"
        />
        <FormControl
          variant="outlined"
          fullWidth
          required
          margin="normal"
          error={typeof errors.category_id !== "undefined"}
        >
          <InputLabel id="select-outlined-label">カテゴリー</InputLabel>
          <Select
            labelId="select-outlined-label"
            id="select-outlined"
            value={category}
            onChange={handleChangeCategory}
            label="カテゴリー"
          >
            {categoryList &&
              categoryList.map((data: any) => {
                return (
                  <MenuItem key={data.category_id} value={data.category_id}>
                    {data.category_name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          id="comment"
          label="利用場所/用途"
          multiline
          rows={5}
          value={comment}
          onChange={handleChangeComment}
          fullWidth
          margin="normal"
          error={typeof errors.comment !== "undefined"}
          helperText={errors.comment}
        />
        <Box>
          <FormControlLabel
            control={
              <Switch checked={repetition} onChange={handleToggleRepetition} />
            }
            label="繰り返し登録（固定費等）"
            labelPlacement="start"
          />
        </Box>
        <MediaQuery query="(min-width: 1024px)">
          <Box className="flex justify-center mt-6">
            <LoadingButton
              handleButtonClick={apiMethod}
              loading={loading}
              text={"支出作成"}
              color={"secondary"}
              fullWidth={true}
            />
          </Box>
        </MediaQuery>
      </Box>
      <Box className="flex flex-col items-center w-full mt-4 lg:w-1/2 lg:pl-8 lg:pt-8">
        <Box className="w-full">
          <input
            id="myInput"
            type="file"
            accept="image/*"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleChangeFile}
          />
          <Button
            variant="outlined"
            color="primary"
            size={"large"}
            fullWidth
            startIcon={<ReceiptIcon />}
            className="py-1 px-12 text-lg w-full"
            onClick={handleClickFileInput}
          >
            レシートアップロード
          </Button>
        </Box>
        <Box className="w-full mt-4 flex justify-center">
          <img className="w-4/5 h-auto" src={receiptImgPreview} />
        </Box>
        {receiptImgPreview && (
          <Button
            variant="outlined"
            color="inherit"
            size={"small"}
            startIcon={<ClearIcon />}
            className="mt-4"
            onClick={handleFileReset}
          >
            リセット
          </Button>
        )}
      </Box>
      <MediaQuery query="(max-width: 960px)">
        <Box className="mt-6 w-full">
          <LoadingButton
            handleButtonClick={apiMethod}
            loading={loading}
            text={buttonText}
            color={"secondary"}
            fullWidth={true}
          />
        </Box>
      </MediaQuery>
    </Box>
  );
};

export default ExpenseForm;
