import { selectPizzaType } from "@/types";
import { setBucketToStore } from '@/redux/store/pizzaSlice';


export const clearBucket = (dispatch:any) => {
    const newBucket:selectPizzaType[] = [];
    const count:number = 0;
    const totalPrice:number = 0;
    dispatch(setBucketToStore({newBucket,count,totalPrice}));
}
