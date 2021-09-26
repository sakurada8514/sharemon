import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { AlertProps } from "@material-ui/lab";

import RegistExpense from "../../../components/Contents/RegistExpense";
import RegistIncome from "../../../components/Contents/RegistIncome";
import TransitionMotion from "../../../components/Route/Motion";
import { TEXT_COLOR_BLACK, BACK_COLOR_GREEN } from "../../../utils/constant";

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
  const classes = styles();
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
            <Tab className="text-xl w-1/2" label="支出" {...a11yProps(0)} />
            <Tab className="text-xl w-1/2" label="収入" {...a11yProps(1)} />
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

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    fontSize: "1.25em",
  },
}));
export default RegistMoney;
