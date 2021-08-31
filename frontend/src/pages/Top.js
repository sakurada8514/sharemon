import React from "react";
import NavBar from "../components/Atoms/NavBar";
import TransitionMotion from "../components/Route/Motion";

const Top = () => {
  return (
    <TransitionMotion>
      <div>
        <NavBar></NavBar>
        Top
      </div>
    </TransitionMotion>
  );
};

export default Top;
