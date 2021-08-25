import React from "react";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Home() {
    const classes = useStyles();
    return (
        <div>
            <Grid container>
                <Grid className={classes.topRoomNameArea} item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        ルーム名
                    </Typography>
                    <Box
                        display="flex"
                        alignItems="center"
                        className={classes.objectiveArea}
                    >
                        <Button
                            // onClick={props.registExpense}
                            type="button"
                            variant="contained"
                            color="secondary"
                            size={"large"}
                            className={classes.button}
                        >
                            目標設定
                        </Button>
                        <div>
                            <p>目標を設定できます。</p>
                            <p>
                                目標を設定しモチベーションを向上させましょう。
                            </p>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom>
                        ルームメンバー
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={6}></Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    topRoomNameArea: {},
    objectiveArea: {
        "& > button": {
            marginRight: "16px",
        },
    },
}));
