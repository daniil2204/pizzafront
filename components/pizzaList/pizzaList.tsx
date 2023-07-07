"use client"
import PizzaCard from "../pizzaCard/pizzaCard";
import styles from "./pizzaList.module.scss";
import { pizzaType } from "@/types";
import { getAllPizzas } from "@/services/get";
import { useAppSelector, useAppDispatch } from "@/services/reduxHook";
import { useState,useEffect } from 'react';
import useSWR from 'swr';
import { getBucketFromLocal,getBucketLengthFromLocal,getBucketPriceFromLocal } from "@/services/getFromLocal";
import { setBucketToStore,setInitStore } from "@/redux/store/pizzaSlice";
import { getMe } from "@/redux/store/userSlice";
import Spinner from '../loader/loader'




const PizzaList = () => {

    const { data,isLoading } = useSWR('pizzas', getAllPizzas);

    const dispatch = useAppDispatch();
    
    const initStore = useAppSelector(state => state.pizza.initialStore);
    
    useEffect(() => {
        if (initStore) {
            const newBucket = getBucketFromLocal();
            const count = getBucketLengthFromLocal();
            const totalPrice = getBucketPriceFromLocal();
            dispatch(setBucketToStore({newBucket,count,totalPrice}));
            dispatch(setInitStore(false));
            const token = localStorage.getItem('token')
            if (token) {
                dispatch(getMe(token));
            }        
        }
    },[])

    const category = useAppSelector(state => state.pizza.category);

    const sort = useAppSelector(state => state.pizza.sort);

    const [value,setValue] = useState<string>('');

    return(
        <div className={styles.list}>
            <div className={styles.header}>
                <p className={styles.list__text}>{category} піци</p>
                <input placeholder="Знайти піцу" value={value} onChange={(e) => setValue(e.target.value)}/>
            </div>
            {isLoading ? 
                <Spinner/>
                :
                <ul className={styles.list__cards}>
                {         
                    value ? 
                    data?.filter(item => item.name.toLowerCase().includes(value.toLowerCase())).sort((a,b) => sort === 'за ціною' ? a.price - b.price : sort === 'популярності' ? b.rating - a.rating : a.name > b.name ? 1 : -1).map((pizza: pizzaType) => {
                        return category === 'Всі' ? <PizzaCard key={pizza._id} pizza={pizza} /> : pizza.category.includes(category) ? <PizzaCard key={pizza._id} pizza={pizza} /> : null
                    }) 
                    :
                    data?.sort((a,b) => sort === 'за ціною' ? a.price - b.price : sort === 'популярності' ? b.rating - a.rating : a.name > b.name ? 1 : -1).map((pizza: pizzaType) => {
                        return category === 'Всі' ? <PizzaCard key={pizza._id} pizza={pizza} /> : pizza.category.includes(category) ? <PizzaCard key={pizza._id} pizza={pizza} /> : null
                    }) 
                }
                </ul>
            }
            
        </div>
    )
}

export default PizzaList;




