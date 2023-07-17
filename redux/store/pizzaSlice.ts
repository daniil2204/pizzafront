import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { pizzaState, selectPizzaType, changePizzaCountType, setBucketToStoreType,removePizzaFromBucketType,pizzaChange, pizzaCreate,deletePizzaType } from "@/types";
import axios from "axios";



const initialState: pizzaState = {
    pizzas: [],
    bucket: [],
    loading: false,
    bucketLength: 0,
    totalPrice: 0,
    category: 'Всі',
    sort:'популярності',
}

export const updatePizza = createAsyncThunk('pizza/updatePizza',async (params: pizzaChange) => {
    const { data } = await axios.patch(`http://localhost:4444/pizza/${params._id}`,params,
        {headers:
            { 'Authorization': `Basic ${params.token}`}
        })
    return data;
},)


export const createPizza = createAsyncThunk('pizza/createPizza',async (params: pizzaCreate) => {
    const { data } = await axios.post(`http://localhost:4444/pizza`,params,
        {headers:
            { 'Authorization': `Basic ${params.token}`}
        })
    return data;
},)


export const deletePizza = createAsyncThunk('pizza/deletePizza', async (params:deletePizzaType) => {
    const { data } = await axios.delete(`http://localhost:4444/pizza/${params._id}`,
        {headers:
            { 'Authorization': `Basic ${params.token}`}
        })
    return data;
}) 

const pizzaSlice = createSlice({
    name:'pizza',
    initialState,
    reducers: {
        addPizzaToBucket(state,action: PayloadAction<selectPizzaType>) {
            state.bucket.push({
                ...action.payload
            })
            state.bucketLength += 1;
            state.totalPrice += action.payload.price;
            localStorage.setItem('bucket',JSON.stringify(state.bucket));
            localStorage.setItem('bucketLength',JSON.stringify(state.bucketLength));
            localStorage.setItem('price',JSON.stringify(state.totalPrice));
        },
        removePizzaFromBucket(state,action: PayloadAction<removePizzaFromBucketType>) {
            state.bucket = state.bucket.filter(pizza => {
                if (pizza._id === action.payload._id && pizza.size === action.payload.size && pizza.type === action.payload.type) {
                    state.totalPrice -= pizza.price;
                    return false;
                }
                return true;
            });
            state.bucketLength -= action.payload.count;
            localStorage.setItem('bucket',JSON.stringify(state.bucket));
            localStorage.setItem('bucketLength',JSON.stringify(state.bucketLength));
            localStorage.setItem('price',JSON.stringify(state.totalPrice));
        },
        setBucketToStore(state,action: PayloadAction<setBucketToStoreType>) {
            state.bucket = action.payload.newBucket;
            state.bucketLength = action.payload.count;
            state.totalPrice = action.payload.totalPrice;
            localStorage.setItem('bucket',JSON.stringify(state.bucket));
            localStorage.setItem('bucketLength',JSON.stringify(state.bucketLength));
            localStorage.setItem('price',JSON.stringify(state.totalPrice));
        },
        changeCount(state,action: PayloadAction<changePizzaCountType>) {
            state.bucketLength = state.bucketLength + action.payload.operation;
            state.bucket = state.bucket.map((item) => {
                if (item._id === action.payload._id && item.size === action.payload.size && item.type === action.payload.type) {
                    item.count = item.count + action.payload.operation;
                    if (action.payload.operation === 1) {
                        state.totalPrice += item.price;
                    }else{
                        state.totalPrice -= item.price;
                    }
                    return item;
                }else{
                    return item
                }
            })   
            localStorage.setItem('bucket',JSON.stringify(state.bucket));
            localStorage.setItem('bucketLength',JSON.stringify(state.bucketLength)); 
            localStorage.setItem('price',JSON.stringify(state.totalPrice));
            
        },
        setCategory(state,action:PayloadAction<string>){
            state.category = action.payload;
        },
        setSort(state,action: PayloadAction<string>){
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updatePizza.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(updatePizza.fulfilled, (state) => {
            state.loading = false;
        }),
        builder.addCase(updatePizza.rejected, (state) => {
            state.loading = true;
        }),
        builder.addCase(createPizza.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(createPizza.fulfilled, (state) => {
            state.loading = false;
        }),
        builder.addCase(createPizza.rejected, (state) => {
            state.loading = true;
        })
    }
})


export const { addPizzaToBucket, removePizzaFromBucket, setBucketToStore, changeCount, setCategory, setSort } = pizzaSlice.actions;
export default pizzaSlice.reducer;