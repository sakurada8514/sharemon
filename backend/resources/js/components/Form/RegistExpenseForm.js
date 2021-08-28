import React from "react";
import { makeStyles } from "@material-ui/styles";
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
    Grid,
    InputAdornment,
    Typography,
} from "@material-ui/core";

import ReceiptIcon from "@material-ui/icons/Receipt";
import ClearIcon from "@material-ui/icons/Clear";

import MyDatePicker from "../Parts/FormParts/DatePicker";
export default function RegistExpenseForm(props) {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <div noValidate>
                    <Typography className={classes.instructions}>
                        *は必須です
                    </Typography>
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
                        value={props.expense}
                        onChange={props.handleChangeExpense}
                        error={typeof props.errors.expense !== "undefined"}
                        helperText={props.errors.expense}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    円
                                </InputAdornment>
                            ),
                        }}
                    />

                    <MyDatePicker
                        date={props.date}
                        setDate={props.setDate}
                        errors={props.errors}
                    />
                    <FormControl
                        variant="outlined"
                        // className={classes.formControl}
                        fullWidth
                        required
                        margin="normal"
                        error={typeof props.errors.category_id !== "undefined"}
                    >
                        <InputLabel id="select-outlined-label">
                            カテゴリー
                        </InputLabel>
                        <Select
                            labelId="select-outlined-label"
                            id="select-outlined"
                            value={props.category}
                            onChange={props.handleChangeCategory}
                            label="カテゴリー"
                        >
                            {props.categoryList.map((data) => {
                                return (
                                    <MenuItem
                                        key={data.category_id}
                                        value={data.category_id}
                                    >
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
                            label="繰り返し登録（固定費等）"
                            labelPlacement="start"
                        />
                    </div>
                    <MediaQuery query="(min-width: 960px)">
                        <Grid item xs={12} className={classes.buttonArea}>
                            <Button
                                onClick={props.registExpense}
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size={"large"}
                                className={classes.button}
                            >
                                支出作成
                            </Button>
                        </Grid>
                    </MediaQuery>
                </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.receiptImageArea}>
                <div>
                    <input
                        id="myInput"
                        type="file"
                        accept="image/*"
                        ref={props.fileInput}
                        style={{ display: "none" }}
                        onChange={props.handleChangeFile}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        size={"large"}
                        fullWidth
                        startIcon={<ReceiptIcon />}
                        className={classes.receiptButton}
                        onClick={props.handleClickFileInput}
                    >
                        レシートアップロード
                    </Button>
                </div>
                <div className={classes.imgArea}>
                    <img src={props.receiptImgPreview} />
                </div>
                {props.receiptImgPreview && (
                    <Button
                        variant="outlined"
                        color="inherit"
                        size={"small"}
                        startIcon={<ClearIcon />}
                        className={classes.fileResetButton}
                        onClick={props.handleFileReset}
                    >
                        リセット
                    </Button>
                )}
            </Grid>
            <MediaQuery query="(max-width: 960px)">
                <Grid item xs={12} className={classes.buttonArea}>
                    <Button
                        onClick={props.registExpense}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size={"large"}
                        className={classes.button}
                    >
                        支出作成
                    </Button>
                </Grid>
            </MediaQuery>
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
