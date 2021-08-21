import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import RegistExpense from "./RegistExpenxe";
import RegistIncome from "./RegistIncome";
import {
    TEXT_COLOR_BLACK,
    BACK_COLOR_GREEN,
    BACK_COLOR_WHITE,
} from "../../../../Const/styleConstant";

export default function RegistMoney(props) {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.tabVar}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="regist money"
                >
                    <Tab
                        className={classes.tab}
                        label="支出"
                        {...a11yProps(0)}
                    />
                    <Tab
                        className={classes.tab}
                        label="収入"
                        {...a11yProps(1)}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
                <RegistExpense
                    handleAlertOpen={props.handleAlertOpen}
                    setAlertSeverity={props.setAlertSeverity}
                    setAlertMessage={props.setAlertMessage}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <RegistIncome
                    handleAlertOpen={props.handleAlertOpen}
                    setAlertSeverity={props.setAlertSeverity}
                    setAlertMessage={props.setAlertMessage}
                />
            </TabPanel>
        </div>
    );
}

function TabPanel(props) {
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

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabVar: {
        backgroundColor: BACK_COLOR_GREEN,
        color: TEXT_COLOR_BLACK,
        boxShadow: "none",
    },
    tab: {
        fontSize: "1.25em",
    },
}));
