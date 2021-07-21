import { createSlice } from "@reduxjs/toolkit";
import { currentRoom } from "../api/Room/room";

const initialState = {
    roomName: null,
};

const slice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoomName: (state, action) => {
            return Object.assign({}, state, { roomName: action.payload });
        },
    },
});

export default slice.reducer;

export const { setRoomName } = slice.actions;

export const isSetRoomSelector = (state) => {
    return state.auth.roomName !== null;
};

export function setRoomName() {
    return async function (dispatch) {
        try {
            const roomName = await currentRoom();
            dispatch(slice.actions.setRoomName(roomName));
        } catch (err) {}
    };
}
