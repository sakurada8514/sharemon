import React from "react";
import { useHistory } from "react-router";

import { logout as logoutApi } from "../../api/login";
import { OK } from "../../constant";

const Mypage = () => {
    const history = useHistory();

    async function logout(e) {
        e.preventDefault();
        const response = await logoutApi();

        if (response === OK) {
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
