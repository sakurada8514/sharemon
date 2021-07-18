import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import { logout as logoutApi } from "../../api/Auth/login";
import { OK } from "../../constant";
import { setUser } from "../../stores/auth";

const Mypage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    async function logout(e) {
        e.preventDefault();
        const response = await logoutApi();

        if (response === OK) {
            dispatch(setUser(null));
            history.push("/");
        } else {
            history.push("/error");
        }
    }

    return (
        <div>
            <p>mypage</p>
            <button onClick={logout}>logout</button>
        </div>
    );
};

export default Mypage;
