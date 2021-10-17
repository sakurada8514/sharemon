import React from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
} from "@mui/material";
import LoadingButton from "../Atoms/Buttons/LoadingButton";

type BudgetFormProps = {
  errors: any;
  category: number;
  budget: string;
  handleChangeCategory: (e: any) => void;
  categoryList: any;
  handleChangeBudget: (e: any) => void;
  loading: boolean;
  buttonText: string;
  apiMethod: () => Promise<void>;
};
const BudgetForm: React.FC<BudgetFormProps> = React.memo(
  ({
    apiMethod,
    errors,
    category,
    budget,
    handleChangeBudget,
    handleChangeCategory,
    categoryList,
    loading,
    buttonText,
  }) => {
    return (
      <>
        <div className="p-3">
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
          {typeof errors.category_id !== "undefined" && (
            <p className="text-red-600 text-xs mx-3">{errors.category_id}</p>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="budget"
            label="予算"
            name="budget"
            autoComplete="budget"
            autoFocus
            value={budget}
            onChange={handleChangeBudget}
            error={typeof errors.budget !== "undefined"}
            helperText={errors.budget}
            InputProps={{
              endAdornment: <InputAdornment position="end">円</InputAdornment>,
            }}
            className="mb-6"
          />
          <LoadingButton
            handleButtonClick={apiMethod}
            loading={loading}
            text={buttonText}
            color={"secondary"}
            fullWidth={true}
          />
        </div>
      </>
    );
  }
);

export default BudgetForm;
