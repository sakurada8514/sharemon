import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { AlertProps } from "@material-ui/lab";

import RegistExpense from "../../../components/Contents/RegistExpense";
import RegistIncome from "../../../components/Contents/RegistIncome";
import TransitionMotion from "../../../components/Route/Motion";
import TabPanel from "../../../components/Atoms/TabPanel";

type RegistMoneyProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<
    React.SetStateAction<AlertProps["severity"]>
  >;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

const RegistMoney: React.FC<RegistMoneyProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  return (
    <TransitionMotion>
      <div className="p-3">
        <AppBar
          position="static"
          className="bg-gray-50 text-black shadow-none "
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="regist money"
            className="flex justify-center"
          >
            <Tab
              className="text-xl w-1/2"
              label="支出"
              id="tab-0"
              aria-controls="tabpanel-0"
            />
            <Tab
              className="text-xl w-1/2"
              label="収入"
              id="tab-1"
              aria-controls="tabpanel-1"
            />
          </Tabs>
        </AppBar>

        <TabPanel value={tabValue} index={0}>
          <RegistExpense
            handleAlertOpen={handleAlertOpen}
            setAlertSeverity={setAlertSeverity}
            setAlertMessage={setAlertMessage}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <RegistIncome
            handleAlertOpen={handleAlertOpen}
            setAlertSeverity={setAlertSeverity}
            setAlertMessage={setAlertMessage}
          />
        </TabPanel>
      </div>
    </TransitionMotion>
  );
};

export default RegistMoney;
