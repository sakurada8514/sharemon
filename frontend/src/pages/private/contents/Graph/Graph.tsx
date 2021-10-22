import React, { useEffect, useState } from "react";
import ExpenseChart from "components/Chart/ExpenseChart";

const Graph = () => {
  return <ExpenseChart datas={[12, 23]} labels={["test", "test2"]} />;
};
export default Graph;
