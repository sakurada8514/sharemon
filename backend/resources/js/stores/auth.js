import { createSlice } from "@reduxjs/toolkit";

import { currentUser } from "../api/Auth/login";

const initialState = {
    user: null,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return Object.assign({}, state, { user: action.payload });
        },
    },
});

export default slice.reducer;

export const { setUser } = slice.actions;

export const isAuthSelector = (state) => {
    return state.auth.user !== null;
};

export function setCurrentUser() {
    return async function (dispatch) {
        try {
            const user = await currentUser();
            dispatch(slice.actions.setUser(user));
        } catch (err) {}
    };
}
