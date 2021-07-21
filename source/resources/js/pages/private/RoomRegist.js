/** @jsxImportSource @emotion/react */

import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { formStyles } from "../Auth/Login";

import { createRoom as createRoomApi } from "../../api/Room/createRoom";
import { OK, VALIDATION } from "../../constant";
import Modal from "../../components/Modal";
import { css } from "@emotion/react";

const RoomRegist = () => {
    const [roomName, setRoomName] = useState("");
    const [errors, setErrors] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const handleChangeRoomName = (e) => setRoomName(e.target.value);

    const history = useHistory();

    async function createRoom(e) {
        e.preventDefault();
        const response = await createRoomApi(roomName);

        if (response.status === OK) {
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
