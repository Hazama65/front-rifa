
import { createSlice } from '@reduxjs/toolkit';



interface UserNumber {
    id_user: number,
    register_number: string,
    status: string
}

export type UserStateNumbers = {
    userNumbers: UserNumber[],
}

const initialState = {
    userNumbers: [{
        id_user: 0,
        register_number: '',
        status: '0'
    }],
}

export const registerNumberSlice = createSlice({
    name: 'userNumbers',
    initialState: initialState,
    reducers: {
        onSetNumbers: ( state: UserStateNumbers, {payload}) => {
            state.userNumbers = payload
        },

    }
});

export const { onSetNumbers } = registerNumberSlice.actions;

