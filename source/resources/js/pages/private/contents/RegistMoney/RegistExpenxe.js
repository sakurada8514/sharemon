import React from "react";

import { useRef, useState } from "react";
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

import ReceiptIcon from "@material-ui/icons/Receipt";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

import MyDatePicker from "../../../../components/Parts/FormParts/DatePicker";

export default function RegistExpense() {
    const classes = useStyles();

    const [expense, setExpense] = useState("");
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState("");
    const [repetition, setRepetition] = useState(false);
    const [comment, setComment] = useState("");

    const fileInput = useRef(null);
    const handleFileInputClick = () => {
        fileInput.current.click();
    };

    const handleToggleRepetition = () => {
        setRepetition(!repetition);
    };
    const handleChangeExpense = (e) => setExpense(e.target.value);
    const handleChangeComment = (e) => setComment(e.target.value);

    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <div noValidate>
                    <Typography className={classes.instructions}>
                        *は必須です
                    </Typography>
                    <TextField
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
                        // error={
                        //     typeof props.errors.email !== "undefined" ||
                        //     typeof props.errors.auth !== "undefined"
                        // }
                        // helperText={props.errors.email}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    円
                                </InputAdornment>
                            ),
                        }}
                    />

                    <MyDatePicker date={date} setDate={setDate} />
                    <FormControl
                        // variant="outlined"
                        // className={classes.formControl}
                        fullWidth
                        required
                        margin="normal"
                    >
                        <InputLabel id="select-outlined-label">
                            カテゴリー
                        </InputLabel>
                        <Select
                            labelId="select-outlined-label"
                            id="select-outlined"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            label="カテゴリー"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="test">Ten</MenuItem>
                            <MenuItem value="test">Twenty</MenuItem>
                            <MenuItem value="test">Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="comment"
                        label="コメント"
                        multiline
                        rows={5}
                        value={comment}
                        onChange={handleChangeComment}
                        // variant="filled"
                        fullWidth
                        margin="normal"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={repetition}
                                onChange={handleToggleRepetition}
                            />
                        }
                        fullWidth
                        label="繰り返し登録（固定費等）"
                        labelPlacement="start"
                    />
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
                        fullWidth
                        startIcon={<ReceiptIcon />}
                        className={classes.receiptButton}
                        onClick={handleFileInputClick}
                    >
                        レシートアップロード
                    </Button>
                    {/* <Typography variant="subtitle1">or</Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        size={"large"}
                        fullWidth
                        startIcon={<CameraAltIcon />}
                        className={classes.receiptButton}
                        onClick={handleFileInputClick}
                    >
                        レシート撮影
                    </Button> */}
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
                    支出作成
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
        color: "red",
    },
}));
