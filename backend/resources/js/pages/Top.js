import React from "react";
import NavBar from "../components/Parts/NavBar";
import TransitionMotion from "../components/Route/Motion";

const Top = () => {
    return (
        <TransitionMotion
            contents={
                <div>
                    <NavBar></NavBar>
                    Top
                </div>
            }
        />
    );
};

export default Top;
