import React from "react";
import { Fab, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

type BudgetFormProps = {
  errors: any;
  category: number;
  handleChangeCategory: (e: any) => void;
  categoryList: any;
};
const BudgetForm: React.FC<BudgetFormProps> = React.memo(
  ({ errors, category, handleChangeCategory, categoryList }) => {
    console.log("form");

    return (
      <div>
        <div>
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
        </div>
      </div>
    );
  }
);

export default BudgetForm;
