import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Auth = (props) => {
    return props.children;
};

function getUser() {
    axios.get("/api/user").then((res) => {
        if (res.status === 200) {
            console.log("iii");
            return true;
        } else {
            return false;
        }
    });
}

export default Auth;
