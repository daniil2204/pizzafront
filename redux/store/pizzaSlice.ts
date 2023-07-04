import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { pizzaState, selectPizzaType, changePizzaCountType, setBucketToStoreType,removePizzaFromBucketType } from "@/types";



const initialState: pizzaState = {
    pizzas: [],
    bucket: [],
    loading: false,
    initialStore: true,
    bucketLength: 0,
    totalPrice: 0,
    category: 'Всі',
    sort:'популярності',
}

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
            console.log(action.payload);
            state.bucket = state.bucket.filter(pizza => {
                if (pizza.id === action.payload.id && pizza.size === action.payload.size && pizza.type === action.payload.type) {
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
        setInitStore(state,action: PayloadAction<boolean>) {
            state.initialStore = action.payload;
        },
        changeCount(state,action: PayloadAction<changePizzaCountType>) {
            state.bucketLength = state.bucketLength + action.payload.operation;
            state.bucket = state.bucket.map((item) => {
                if (item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type) {
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
})


export const { addPizzaToBucket, removePizzaFromBucket, setBucketToStore, setInitStore, changeCount, setCategory, setSort } = pizzaSlice.actions;
export default pizzaSlice.reducer;