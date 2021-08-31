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
  Button,
  Grid,
  InputAdornment,
  Typography,
} from "@material-ui/core";

import MyDatePicker from "../Atoms/Form/DatePicker";
export default function RegistIncomeForm(props) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <div noValidate>
          <Typography className={classes.instructions}>*は必須です</Typography>
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
            value={props.income}
            onChange={props.handleChangeIncome}
            error={typeof props.errors.income !== "undefined"}
            helperText={props.errors.income}
            InputProps={{
              endAdornment: <InputAdornment position="end">円</InputAdornment>,
            }}
          />

          <MyDatePicker
            date={props.date}
            setDate={props.setDate}
            errors={props.errors}
          />
          <FormControl
            variant="outlined"
            fullWidth
            required
            margin="normal"
            error={typeof props.errors.category_id !== "undefined"}
          >
            <InputLabel id="select-outlined-label">カテゴリー</InputLabel>
            <Select
              labelId="select-outlined-label"
              id="select-outlined"
              value={props.category}
              onChange={props.handleChangeCategory}
              label="カテゴリー"
            >
              {props.categoryList.map((data) => {
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
            value={props.comment}
            onChange={props.handleChangeComment}
            fullWidth
            margin="normal"
            error={typeof props.errors.comment !== "undefined"}
            helperText={props.errors.comment}
          />
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={props.repetition}
                  onChange={props.handleToggleRepetition}
                />
              }
              label="繰り返し登録（固定収入等）"
              labelPlacement="start"
            />
          </div>
          <Grid item xs={12} className={classes.buttonArea}>
            <Button
              onClick={props.registIncome}
              type="submit"
              variant="contained"
              color="secondary"
              size={"large"}
              className={classes.button}
            >
              収入作成
            </Button>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles((thema) => ({
  buttonArea: {
    display: "flex",
    justifyContent: "center",
    marginTop: "24px",
  },
  button: {
    padding: "2px 56px",
    fontSize: "1.25em",
  },
  receiptImageArea: {
    padding: "16px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  receiptButton: {
    padding: "2px 56px",
    fontSize: "1.25em",
    height: "56px",
  },
  instructions: {
    marginTop: "16px",
    color: "#ababab",
  },
  imgArea: {
    width: "100%",
    marginTop: "16px",
    display: "flex",
    justifyContent: "center",
    "& > img": {
      width: "80%",
      height: "auto",
    },
  },
  fileResetButton: {
    marginTop: "16px",
  },
}));
