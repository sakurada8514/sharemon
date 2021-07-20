/** @jsxImportSource @emotion/react */

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { formStyles } from "../Auth/Login";

import { createRoom as createRoomApi } from "../../api/Room/createRoom";
import { OK, VALIDATION } from "../../constant";

const RoomRegist = () => {
    const [roomName, setRoomName] = useState("");
    const [errors, setErrors] = useState([]);

    const handleChangeRoomName = (e) => setRoomName(e.target.value);

    const history = useHistory();

    async function createRoom(e) {
        e.preventDefault();
        const response = await createRoomApi(roomName);

        if (response.status === OK) {
            history.push("/mypage");
        } else if (response.status === VALIDATION) {
            setErrors(response.data.errors);
        } else {
            history.push("/error");
        }
    }

    function pushRegist() {
        history.push("/regist");
    }

    return (
        <div css={formStyles.allWrapper}>
            <form onSubmit={createRoom} css={formStyles.form}>
                <input
                    css={formStyles.input}
                    type="text"
                    required
                    value={roomName}
                    onChange={handleChangeRoomName}
                    placeholder="ルーム名"
                />
                {typeof errors.room_name !== "undefined" && (
                    <p css={formStyles.error}>{errors.room_name}</p>
                )}
                <button css={formStyles.button} type="submit">
                    ルーム作成
                </button>
                <p css={formStyles.link} onClick={pushRegist}>
                    ルームとは？
                </p>
            </form>
        </div>
    );
};

export default RoomRegist;
