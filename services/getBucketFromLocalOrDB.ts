'use client'
import { getMe, setInitStore } from "@/redux/store/userSlice";
import { setBucketToStore } from "@/redux/store/pizzaSlice";
import { getBucketFromLocal,getBucketLengthFromLocal,getBucketPriceFromLocal } from "@/services/getFromLocal";;



export const getBucketFromLocalOrDB = async (dispatch:any,token?:string | null) => {
    let newBucket;
    let count;
    let totalPrice;
    if(token){
        const res = await dispatch(getMe(token));
        newBucket = res.payload.bucket;
        count = res.payload.bucketLenght;
        totalPrice = res.payload.totalPrice;
    }else{
        newBucket = getBucketFromLocal();
        count = getBucketLengthFromLocal();
        totalPrice = getBucketPriceFromLocal();
    }       
    dispatch(setBucketToStore({newBucket,count,totalPrice}));
    dispatch(setInitStore(false));
}