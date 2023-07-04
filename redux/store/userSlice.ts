import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { userState,userData,loginUserType,registerUserType } from '@/types'
import axios from 'axios';


const initialState:userState = {
    data: null,
    status: 'loading',
    auth: false,
}



export const fetchUserData = createAsyncThunk('user/fetchUserData' ,async (params:loginUserType) => {
    const { data } = await axios.post('http://localhost:4444/auth/login',params)
    return data;
})

export const createUser = createAsyncThunk('user/createUser',async (params: registerUserType) => {
    const { data } = await axios.post('http://localhost:4444/auth/register',params)
    return data;
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.data = null;
            state.status = 'loading';
            state.auth = false;
        }),
        builder.addCase(fetchUserData.fulfilled, (state, action:PayloadAction<userData>) => {
            state.data = action.payload;
            state.status = 'loaded';
            state.auth = true;
        }),
        builder.addCase(fetchUserData.rejected, (state) => {
            state.data = null;
            state.status = 'error';
            state.auth = false;
        })
      },
});


export default userSlice.reducer;