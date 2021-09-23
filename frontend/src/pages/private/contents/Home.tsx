import React, { useGlobal, useEffect, useState } from "reactn";
import useSWR from "swr";
import { Button, Box, Typography, Avatar } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { getMember as getMemberApi } from "../../../api/Room/room";

type HomeProps = {
  roomName: string;
};

const Home: React.FC<HomeProps> = ({ roomName }) => {
  const setError = useGlobal("error")[1];

  const { data: member, error: memberError } = useSWR("/member", getMemberApi);

  if (memberError) {
    setError(true);
  }

  return (
    <div className="pt-3">
      <Box className="w-full bg-white p-3 rounded shadow mb-6">
        {roomName ? (
          <Typography variant="h5" gutterBottom>
            {roomName}
          </Typography>
        ) : (
          <Skeleton className="w-1/2 h-8 mb-2" />
        )}
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {!member ? (
            <>
              <Box className="w-full justify-between flex-wrap">
                <Skeleton className="w-full h-9 mb-2" />
                <Skeleton className="w-full h-9" />
              </Box>
            </>
          ) : (
            member.map(
              (data: { name: string; nickname: string; id: number }) => {
                return (
                  <Box className="w-1/2 my-1 flex items-center" key={data.id}>
                    <Avatar className="w-8 h-8 mr-3">
                      <AccountCircleIcon className="w-8 h-8" />
                    </Avatar>
                    <Typography variant="subtitle1">
                      {data.nickname === null ? data.name : data.nickname}
                    </Typography>
                  </Box>
                );
              }
            )
          )}
        </Box>
      </Box>
      <Box className="w-full bg-white p-3 rounded shadow mb-6">
        <Typography variant="h5" gutterBottom>
          目標
        </Typography>
        <Box>
          <Button
            // onClick={props.registExpense}
            type="button"
            variant="contained"
            color="secondary"
            size={"large"}
            className="mb-3"
          >
            目標設定
          </Button>
          <div>
            <p>
              節約目標を設定することで毎月の予算から節約額を自動で算出します。
            </p>
          </div>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box className="w-full bg-white p-3 rounded shadow mb-6">
          <Typography variant="h5" gutterBottom>
            グラフ
          </Typography>
        </Box>
      </Box>
      <Box className="w-full bg-white p-3 rounded shadow mb-6">
        <Typography variant="h5" gutterBottom>
          今月の収支
        </Typography>
      </Box>
    </div>
  );
};
export default Home;
