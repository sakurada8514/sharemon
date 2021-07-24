/** @jsxImportSource @emotion/react */

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createRoom as createRoomApi } from "../../api/Room/createRoom";
import { setUser } from "../../stores/auth";
import { OK, VALIDATION } from "../../constant";
import RegistRoomForm from "../../components/Form/RegistRoomForm";

export default function RoomRegist() {
    const [roomName, setRoomName] = useState("");
    const [modalShow, setModalShow] = useState(false);

    const handleChangeRoomName = (e) => setRoomName(e.target.value);

    const history = useHistory();
    const dispatch = useDispatch();

    async function createRoom(e) {
        e.preventDefault();
        const response = await createRoomApi(roomName);

        if (response.status === OK) {
            dispatch(setUser(response.data.user));
            history.push("/mypage");
        } else if (response.status === VALIDATION) {
            setModalShow(true);
        } else {
            history.push("/error");
        }
    }

    function pushRegist() {
        history.push("/regist");
    }

    function pushMypage() {
        history.push("/mypage");
    }

    return (
        <RegistRoomForm
            createRoom={createRoom}
            roomName={roomName}
            handleChangeRoomName={handleChangeRoomName}
            modalShow={modalShow}
        />
    );
}
