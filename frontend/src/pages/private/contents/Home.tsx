import React, { useGlobal } from "reactn";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { BACK_COLOR_WHITE } from "../../../utils/constant";

import { getMember as getMemberApi } from "../../../api/Room/room";

import { OK } from "../../../utils/constant";

export default function Home() {
  const classes = useStyles();
  const setError = useGlobal("error")[1];

  const [member, setMember] = useState(null);

  useEffect(() => {
    getMemberList();
  }, []);

  async function getMemberList() {
    const response = await getMemberApi();

    if (response.status === OK) {
      setMember(response.data.memberList);
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.topArea}
      >
        <Box className={classes.objectiveArea}>
          <Typography variant="h5" gutterBottom>
            目標
          </Typography>
          <Box
          // className={classes.objectiveArea}
          >
            <Button
              // onClick={props.registExpense}
              type="button"
              variant="contained"
              color="secondary"
              size={"large"}
            >
              目標設定
            </Button>
            <div>
              <p>目標を設定できます。</p>
              <p>目標を設定しモチベーションを向上させましょう。</p>
            </div>
          </Box>
        </Box>
        <Box className={classes.membersArea}>
          <Typography variant="h5" gutterBottom>
            ルームメンバー
          </Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {member === null && (
              <>
                <Box className="w-full justify-between flex-wrap">
                  <Skeleton className="w-full h-12 mb-2" />
                  <Skeleton className="w-full h-12" />
                </Box>
              </>
            )}
            {member &&
              member.map((data: { name: string; nickname: string }) => {
                return (
                  <Box
                    display="flex"
                    alignItems="center"
                    className={classes.member}
                    key={data.name}
                  >
                    <Avatar className="w-8 h-8 mr-3">
                      <AccountCircleIcon className="w-8 h-8" />
                    </Avatar>
                    <Typography variant="subtitle1">
                      {data.nickname === null ? data.name : data.nickname}
                    </Typography>
                  </Box>
                );
              })}
            {/* {member.map((data: { name: string; nickname: string }) => {
              return (
                <Box
                  display="flex"
                  alignItems="center"
                  className={classes.member}
                  key={data.name}
                >
                  <AccountCircleIcon className={classes.memberIcon} />
                  <Typography variant="h6">
                    {data.nickname === null ? data.name : data.nickname}
                  </Typography>
                </Box>
              );
            })} */}
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box className={classes.recentlyArea}>
          <Typography variant="h5" gutterBottom>
            最近の記録
          </Typography>
        </Box>
        <Box className={classes.graphArea}>
          <Typography variant="h5" gutterBottom>
            グラフ
          </Typography>
        </Box>
      </Box>
      <Box className="mt-6 bg-white p-3 w-full h-20 rounded-md">
        <Typography variant="h5" gutterBottom>
          今月の収支
        </Typography>
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  topArea: {
    marginBottom: theme.spacing(3),
  },
  objectiveArea: {
    width: "65%",
    backgroundColor: BACK_COLOR_WHITE,
    padding: theme.spacing(3),
    marginRight: theme.spacing(1.5),
    borderRadius: "6px",
    boxShadow: "0px 2px 5px -1px rgb(50 50 93 / 2%)",
    "& button": {
      marginBottom: "16px",
    },
  },
  membersArea: {
    width: "35%",
    backgroundColor: BACK_COLOR_WHITE,
    padding: theme.spacing(3),
    marginLeft: theme.spacing(1.5),
    borderRadius: "6px",
    boxShadow: "0px 2px 5px -1px rgb(50 50 93 / 2%)",
    height: "195px",
  },
  member: {
    width: "49%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  memberIcon: {
    width: "35px",
    height: "35px",
    // marginRight: theme.spacing(1),
  },
  recentlyArea: {
    width: "49%",
    height: "400px",
    backgroundColor: BACK_COLOR_WHITE,
    padding: theme.spacing(3),
    marginRight: theme.spacing(1.5),
    borderRadius: "6px",
    boxShadow: "0px 2px 5px -1px rgb(50 50 93 / 2%)",
  },
  graphArea: {
    width: "49%",
    height: "400px",
    backgroundColor: BACK_COLOR_WHITE,
    padding: theme.spacing(3),
    marginLeft: theme.spacing(1.5),
    borderRadius: "6px",
    boxShadow: "0px 2px 5px -1px rgb(50 50 93 / 2%)",
  },
  skeletonArea: {
    width: "100%",
    "& span": {
      width: "48%",
      height: "30px",
      margin: theme.spacing(1.5),
    },
  },
  skeleton: {
    width: "48%",
  },
}));
