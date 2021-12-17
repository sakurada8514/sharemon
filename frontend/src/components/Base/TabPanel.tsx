import React from "react";

type tabPanelProps = {
  children: JSX.Element;
  index: number;
  value: number;
};
function TabPanel(props: tabPanelProps) {
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
export default TabPanel;
