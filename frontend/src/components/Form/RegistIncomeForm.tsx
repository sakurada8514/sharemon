import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  InputAdornment,
  Typography,
  Box,
} from "@material-ui/core";
import { DatePickerProps } from "@material-ui/pickers";

import MyDatePicker from "../Atoms/Form/DatePicker";
import LoadingButton from "../Atoms/Buttons/LoadingButton";
import { BACK_COLOR_GREEN } from "../../utils/constant";

type RegistIncomeFormProps = {
  registIncome: () => Promise<void>;
  income: string;
  date: Date;
  category: number;
  comment: string;
  repetition: boolean;
  categoryList: any;
  errors: any;
  loading: boolean;
  setDate: DatePickerProps["onChange"];
  handleChangeIncome: (e: any) => void;
  handleChangeCategory: (e: any) => void;
  handleChangeComment: (e: any) => void;
  handleToggleRepetition: () => void;
};

const RegistIncomeForm: React.FC<RegistIncomeFormProps> = ({
  registIncome,
  income,
  date,
  category,
  comment,
  repetition,
  categoryList,
  errors,
  loading,
  setDate,
  handleChangeIncome,
  handleChangeCategory,
  handleChangeComment,
  handleToggleRepetition,
}) => {
  return (
    <Box className="bg-gray-50">
      <Box>
        <Box>
          <Typography className="pt-4 text-gray-400">*は必須です</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="income"
            label="収入金額"
            name="income"
            autoComplete="income"
            autoFocus
            value={income}
            onChange={handleChangeIncome}
            error={typeof errors.income !== "undefined"}
            helperText={errors.income}
            InputProps={{
              endAdornment: <InputAdornment position="end">円</InputAdornment>,
            }}
          />

          <MyDatePicker date={date} setDate={setDate} errors={errors} />
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
              {categoryList.map(
                (data: { category_id: string; category_name: string }) => {
                  return (
                    <MenuItem key={data.category_id} value={data.category_id}>
                      {data.category_name}
                    </MenuItem>
                  );
                }
              )}
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
                <Switch
                  checked={repetition}
                  onChange={handleToggleRepetition}
                />
              }
              label="繰り返し登録（固定収入等）"
              labelPlacement="start"
            />
          </Box>
          <Box className="mt-6 w-full">
            <LoadingButton
              handleButtonClick={registIncome}
              loading={loading}
              text={"支出作成"}
              color={"secondary"}
              fullWidth={true}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistIncomeForm;
