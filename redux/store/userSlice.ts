import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { userState,userData,loginUserType,registerUserType } from '@/types'
import axios from 'axios';




const initialState:userState = {
    data: null,
    status: 'loading',
    auth: false,
}



export const fetchUserData = createAsyncThunk('user/fetchUserData' ,async (params:loginUserType) => {
    const { data } = await axios.post('http://localhost:4444/auth/login',params);
    localStorage.setItem('token',data.token);
    return data;
})

export const createUser = createAsyncThunk('user/createUser',async (params: registerUserType) => {
    const { data } = await axios.post('http://localhost:4444/auth/register',params);
    localStorage.setItem('token',data.token);
    return data;
})

export const getMe = createAsyncThunk('user/getMe',async (token: string) => {
    const { data } = await axios.get('http://localhost:4444/auth/me', {headers:
        { 'Authorization': `Basic ${token}`}
    });
    console.log(data);
    return data;
})



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut(state) {
            state.data = null;
            state.auth = false;
        },
    },
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
        }),
        builder.addCase(createUser.pending, (state) => {
            state.data = null;
            state.status = 'loading';
            state.auth = false;
        }),
        builder.addCase(createUser.fulfilled, (state, action:PayloadAction<userData>) => {
            state.data = action.payload;
            state.status = 'loaded';
            state.auth = true;
        }),
        builder.addCase(createUser.rejected, (state) => {
            state.data = null;
            state.status = 'error';
            state.auth = false;
        }),
        builder.addCase(getMe.pending, (state) => {
            state.data = null;
            state.status = 'loading';
            state.auth = false;
        }),
        builder.addCase(getMe.fulfilled, (state, action:PayloadAction<userData>) => {
            state.data = action.payload;
            state.status = 'loaded';
            state.auth = true;
        }),
        builder.addCase(getMe.rejected, (state) => {
            state.data = null;
            state.status = 'error';
            state.auth = false;
        })
      },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;