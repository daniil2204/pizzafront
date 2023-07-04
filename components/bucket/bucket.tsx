'use client'
import styles from "./bucket.module.scss";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/services/reduxHook";
import { setBucketToStore } from '@/redux/store/pizzaSlice';
import { selectPizzaType } from "@/types";
import Link from "next/link";
import { FC } from 'react';
import BucketCard from "../bucketCardItem/bucketCard";
import EmptyBucket from "../emptyBucket/emptyBucket";


const Bucket:FC = () => {

    const bucketFromRedux = useAppSelector(state => state.pizza.bucket);
    const bucketLength = useAppSelector(state => state.pizza.bucketLength);
    const totalPrice = useAppSelector(state => state.pizza.totalPrice);
    const dispatch = useAppDispatch();


  

    const clearBucket = () => {
        const newBucket:selectPizzaType[] = [];
        const count:number = 0;
        const totalPrice:number = 0;
        dispatch(setBucketToStore({newBucket,count,totalPrice}));
    }

    return(
        <>
            {bucketFromRedux.length > 0 ? 
            <div className={styles.bucket}>
                <div className={styles.header}>
                    <p>
                        <Image src="/cart.svg" alt="market cart" width="29" height="29"/>
                        <span>Корзина</span>
                    </p>
                    <button className={styles.header__button} onClick={clearBucket}>
                        <Image src="/trash.svg" alt="trach" width="12" height="17"/>
                        Очистити <span>корзину</span>
                    </button>     
                </div>
                
                <p style={{background: 'gray', opacity: '0.25', width:'100%', height:'1px', marginTop:'40px'}}></p>
    
                <ul className={styles.list}>
                    {bucketFromRedux.map((pizza:selectPizzaType) => (
                        <BucketCard key={pizza.id + Math.floor(Math.random() * (1000 - 10 + 1) + 10)} pizza={pizza} initialCount={pizza.count}/>
                    ))}               
                </ul>
    
                <div className={styles.footer}>
                    <div className={styles.footer__section}>
                        <p>Усього піц: <b>{bucketLength} шт.</b></p>
                        <button>
                            <Link href="/"> <span style={{color:'#CACACA'}}>{`<`}</span> Повернутися <span style={{color:'#CACACA'}}>назад</span></Link>
                        </button>
                    </div>
                    <div className={styles.footer__section}>
                        <p>Сума замовлення: <span><b>{totalPrice} грн</b></span></p>
                        <button style={{background:"#FE5F1E",color:'white',position:'absolute',bottom:'0',right:'0'}}>
                            Оплатити <span style={{color:'white'}}>зараз</span>
                        </button>
                    </div>
                </div>
            </div> 
            : 
            <EmptyBucket/>}
        </>
    )
    
}

export default Bucket;