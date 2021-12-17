import React from "react";
import NavBar from "../components/Base/NavBar";
import TransitionMotion from "../components/Route/Motion";

const Top = () => {
  return (
    <TransitionMotion>
      <div className="flex justify-center items-center flex-col mt-20">
        <NavBar></NavBar>
        <p className="text-2xl mt-6"> LP Coming Soon...</p>
      </div>
    </TransitionMotion>
  );
};

export default Top;
