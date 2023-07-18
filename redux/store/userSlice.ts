'use client'
import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { userState,userData,loginUserType,registerUserType,changeBucketProps,makeOrderType,removeOrderType } from '@/types'
import axios from 'axios';




const initialState:userState = {
    data: null,
    status: 'loading',
    auth: false,
    initialStore: true,
}



export const fetchUserData = createAsyncThunk('user/fetchUserData' ,async (params:loginUserType) => {
    const { data } = await axios.post('https://pizzabackend-ames.onrender.com/auth/login',params);
    localStorage.setItem('token',data.token);
    return data;
})

export const createUser = createAsyncThunk('user/createUser',async (params: registerUserType) => {
    const { data } = await axios.post('https://pizzabackend-ames.onrender.com/auth/register',params);
    localStorage.setItem('token',data.token);
    return data;
})

export const getMe = createAsyncThunk('user/getMe',async (token: string) => {
    const { data } = await axios.get('https://pizzabackend-ames.onrender.com/auth/me', {headers:
        { 'Authorization': `Basic ${token}`}
    });
    return data;
})

export const changeBucket = createAsyncThunk('user/changeBucket',async (params:changeBucketProps) => {
    const { data } = await axios.post('https://pizzabackend-ames.onrender.com/bucket',params ,{headers:
        { 'Authorization': `Basic ${params.token}`}
    });
    return data;
})

export const makeOrder = createAsyncThunk('user/makeOrder',async (params:makeOrderType) => {
    const { data } = await axios.post('https://pizzabackend-ames.onrender.com/order',params);
    return data;
})

export const removeOrder = createAsyncThunk('user/removeOrder',async (params:removeOrderType) => {
    const { data } = await axios.delete(`https://pizzabackend-ames.onrender.com/order/${params._id}` ,{headers:
        { 'Authorization': `Basic ${params.token}`}
    });
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
        setInitStore(state,action: PayloadAction<boolean>) {
            state.initialStore = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.status = 'loading';
            state.initialStore = true;
        }),
        builder.addCase(fetchUserData.fulfilled, (state, action:PayloadAction<userData>) => {
            state.data = action.payload;
            state.status = 'loaded';
            state.initialStore = true;
            state.auth = true;
        }),
        builder.addCase(fetchUserData.rejected, (state) => {
            state.status = 'error';
        }),
        builder.addCase(createUser.pending, (state) => {
            state.status = 'loading';
        }),
        builder.addCase(createUser.fulfilled, (state, action:PayloadAction<userData>) => {
            state.data = action.payload;
            state.initialStore = true;
            state.status = 'loaded';
            state.auth = true;
        }),
        builder.addCase(createUser.rejected, (state) => {
            state.status = 'error';
        }),
        builder.addCase(getMe.pending, (state) => {
            state.status = 'loading';
        }),
        builder.addCase(getMe.fulfilled, (state, action:PayloadAction<userData>) => {
            state.data = action.payload;
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('bucket',JSON.stringify(state.data.bucket));
                localStorage.setItem('price',JSON.stringify(state.data.totalPrice));
                localStorage.setItem('bucketLength',JSON.stringify(state.data.bucketLenght));
            }
            state.status = 'loaded';
            state.auth = true;
        }),
        builder.addCase(getMe.rejected, (state) => {
            state.status = 'error';
        }),
        builder.addCase(changeBucket.pending, (state) => {
            state.status = 'loading';
        }),
        builder.addCase(changeBucket.fulfilled, (state) => {
            state.status = 'loaded';
            state.auth = true;
        }),
        builder.addCase(changeBucket.rejected, (state) => {
            state.status = 'error';
        }),
        builder.addCase(makeOrder.pending, (state) => {
            state.status = 'loading';
        }),
        builder.addCase(makeOrder.fulfilled, (state) => {
            state.status = 'loaded';
        }),
        builder.addCase(makeOrder.rejected, (state) => {
            state.status = 'error';
        }),
        builder.addCase(removeOrder.pending, (state) => {
            state.status = 'loading';
        }),
        builder.addCase(removeOrder.fulfilled, (state) => {
            state.status = 'loaded';
        }),
        builder.addCase(removeOrder.rejected, (state) => {
            state.status = 'error';
        })
      },
});

export const { logOut,setInitStore } = userSlice.actions;
export default userSlice.reducer;