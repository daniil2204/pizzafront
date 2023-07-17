'use client'
import { BucketCardProps } from "@/types";
import { FC, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/services/reduxHook";
import { removePizzaFromBucket,changeCount } from "@/redux/store/pizzaSlice";
import styles from "./bucketCard.module.scss";

const BucketCard:FC<BucketCardProps> = ({pizza,initialCount}) => {

    const dispatch = useAppDispatch(); 

    const[count,setCount] = useState<number>(initialCount);

    const removePizza = (_id:string,size:number,type:string) => {
        dispatch(removePizzaFromBucket({_id,size,type,count}));
    }

    const changePizzaCount = (_id:string,type:string,size:number,count:number,operation: 1 | -1) => {
        if (count === 1 && operation === -1) {
            removePizza(_id,size,type);
        }else{
            dispatch(changeCount({_id,type,size,operation}));
        }    
        setCount(count + operation);   
    }

    return(
        <li className={styles.list__card}>
            <div className={styles.list__info}>
                <Image src="/pizza.svg" alt="pizza" width="80" height="80"/>
                <p>
                    {pizza.name}<br/>
                    <span>{pizza.type} тісто, {pizza.size} см.</span>
                </p>
            </div>
            <div className={styles.list__setings}>
                <div className={styles.list__count}>
                    <button onClick={() => changePizzaCount(pizza._id,pizza.type,pizza.size,count,-1)}><Image src="/remove.svg" alt="remove" height="32" width="32"/></button>
                    <p>{count}</p>
                    <button onClick={() => changePizzaCount(pizza._id,pizza.type,pizza.size,count,1)}><Image src="/addCircle.svg" alt="add" height="32" width="32"/></button>
                </div>
                <p className={styles.list__price}>
                    {pizza.price * pizza.count} грн 
                </p>
                <button onClick={() => removePizza(pizza._id,pizza.size,pizza.type)}>
                    <Image src="/delete.svg" alt="delete" height="32" width="32"/>
                </button>
            </div>
        </li>                  
    )
}

export default BucketCard;