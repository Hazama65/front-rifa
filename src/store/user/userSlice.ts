
import { createSlice } from '@reduxjs/toolkit';

export enum Status {
    active = 'active',
    inactive = 'inactive',
    checking = 'checking'
}

interface User {
    id_user: number;
    email: string;
    register_number: string;
}

export type UserState = {
    status: Status,
    user: User,
    errorMessage: string | undefined
}

const initialState: UserState = {
    status: Status.checking,
    user: {
        id_user: 0,
        email: '',
        register_number: '',
    },
    errorMessage: undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        onChecking: ( state: UserState ) => {
            state.status = Status.checking;
            state.errorMessage = undefined;
            state.user = initialState.user
        },
        onLogin: ( state: UserState, {payload}) => {
            state.status = Status.active;
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: ( state: UserState, {payload}) => {
            state.status = Status.inactive;
            state.user = initialState.user;
            state.errorMessage = payload
        },
        clearErrorMessage: (state ) => {
            state.errorMessage = undefined;
        }

    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = userSlice.actions;

