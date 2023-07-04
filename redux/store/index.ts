import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './pizzaSlice';
import userReducer from './userSlice';


const store = configureStore({
    reducer: {
        pizza:pizzaReducer,
        user:userReducer,
    },
});


export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;