/** @jsxImportSource @emotion/react */

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";

import { createRoom as createRoomApi } from "../../api/Room/createRoom";
import { setUser } from "../../stores/auth";
import { OK, VALIDATION } from "../../constant";
import Modal from "../../components/Modal";
import { formStyles } from "../Auth/Login";

const RoomRegist = () => {
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

    function button() {
        return (
            <button css={formStyles.button} onClick={pushMypage}>
                マイページへ移動
            </button>
        );
    }
    function modalText() {
        return (
            <>
                <p>既にルームが設定されています。</p>
                <p css={styles.modalText}>マイページへ移動してください</p>
            </>
        );
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
                <button css={formStyles.button} type="submit">
                    ルーム作成
                </button>
                <p css={formStyles.link} onClick={pushRegist}>
                    ルームとは？
                </p>
            </form>
            <Modal
                modalShow={modalShow}
                button={button()}
                content={modalText()}
            ></Modal>
        </div>
    );
};

const styles = {
    modalText: css({
        marginBottom: "15px",
    }),
};

export default RoomRegist;
