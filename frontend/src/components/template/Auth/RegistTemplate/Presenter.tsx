import React, { VFC } from "react";

type Props = {
  children: React.ReactNode;
};
const Presenter: VFC<Props> = (props) => {
  return <>{props.children}</>;
};

export default Presenter;
