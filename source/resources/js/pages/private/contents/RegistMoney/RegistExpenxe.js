import React from "react";

import { useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import jaLocale from "date-fns/locale/ja";

import ReceiptIcon from "@material-ui/icons/Receipt";

export default function RegistExpense() {
    const classes = useStyles();

    const [date, setDate] = useState(new Date());

    const fileInput = useRef(null);
    function handleFileInputClick() {
        fileInput.current.click();
    }
    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <div noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id=""
                        label="支出金額"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        // value={props.email}
                        // onChange={props.handleChangeEmail}
                        // error={
                        //     typeof props.errors.email !== "undefined" ||
                        //     typeof props.errors.auth !== "undefined"
                        // }
                        // helperText={props.errors.email}
                    />
                    <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        locale={jaLocale}
                    >
                        <DatePicker
                            label="日付*"
                            okLabel="決定"
                            cancelLabel="キャンセル"
                            value={date}
                            onChange={setDate}
                            format="yyyy/MM/dd"
                            animateYearScrolling
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </Grid>
            <Grid item xs={12} md={6} className={classes.receiptImageArea}>
                <div>
                    <input
                        id="myInput"
                        type="file"
                        ref={fileInput}
                        style={{ display: "none" }}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        size={"large"}
                        startIcon={<ReceiptIcon />}
                        className={classes.receiptButton}
                        onClick={handleFileInputClick}
                    >
                        レシートアップロード
                    </Button>
                </div>
                <div>プレビュー</div>
            </Grid>
            <Grid item xs={12} className={classes.buttonArea}>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size={"large"}
                    className={classes.button}
                >
                    作成
                </Button>
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
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    receiptButton: {
        padding: "2px 56px",
        fontSize: "1.25em",
        height: "70px",
    },
}));
