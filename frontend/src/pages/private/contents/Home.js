import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { getMember as getMemberApi } from "../../../api/Room/room";

import { OK } from "../../../utils/constant";

export default function Home() {
  const classes = useStyles();
  const [member, setMember] = useState([]);

  useEffect(() => {
    async function getMemberList() {
      const response = await getMemberApi();

      if (response.status === OK) {
        setMember(response.data.memberList);
      } else {
        window.location.href("/error");
      }
    }
    getMemberList();
  }, []);
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
              <p>目標を設定しモチベーションを向上させましょう。</p>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            ルームメンバー
          </Typography>
          <Box display="flex" flexWrap="wrap">
            {member.map((data) => {
              return (
                <Box display="flex" alignItems="center" key={data.name}>
                  <AccountCircleIcon />
                  <p>{data.nickname === null ? data.name : data.nikcname}</p>
                </Box>
              );
            })}
          </Box>
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
