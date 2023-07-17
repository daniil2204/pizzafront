'use client'
import styles from "./bucket.module.scss";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/services/reduxHook";
import Link from "next/link";
import { FC } from 'react';
import BucketCard from "../bucketCardItem/bucketCard";
import EmptyBucket from "../emptyBucket/emptyBucket";
import Button from "../button/button";
import { clearBucket } from "@/services/clearBucket";


const Bucket:FC = () => {

    const bucketFromRedux = useAppSelector(state => state.pizza.bucket);
    const bucketLength = useAppSelector(state => state.pizza.bucketLength);
    const totalPrice = useAppSelector(state => state.pizza.totalPrice);
    const dispatch = useAppDispatch();


    return(
        <>
            {bucketFromRedux.length > 0 ? 
            <div className={styles.bucket}>
                <div className={styles.header}>
                    <p>
                        <Image src="/cart.svg" alt="market cart" width="29" height="29"/>
                        <span>Корзина</span>
                    </p>
                    <Button background="#FFFFFF" border="1px solid #D3D3D3" width="211px" height="55px" color="#CACACA" fontSize="16px" fontWeight="400" lineHeight="19px"  callBack={() => clearBucket(dispatch)}>
                        <Image src="/trash.svg" alt="trach" width="12" height="17" style={{marginRight:'12px'}}/>
                        Очистити <span>корзину</span>             
                    </Button>     
                </div>
                
                <p style={{background: 'gray', opacity: '0.25', width:'100%', height:'1px', marginTop:'40px'}}></p>
    
                <ul className={styles.list}>
                    {bucketFromRedux.map((pizza) => (
                        <BucketCard key={pizza._id + Math.floor(Math.random() * (1000 - 10 + 1) + 10)} pizza={pizza} initialCount={pizza.count}/>
                    ))}               
                </ul>
    
                <div className={styles.footer}>
                    <div className={styles.footer__section}>
                        <p>Усього піц: <b>{bucketLength} шт.</b></p>
                        <Button background="#FFFFFF" border="1px solid #D3D3D3" margin="40px 0 0 0" width="211px" height="55px" color="#CACACA">
                            <Link href="/"> <span style={{color:'#CACACA'}}>{`<`}</span> Повернутися <span style={{color:'#CACACA'}}>назад</span></Link>
                        </Button>
                    </div>
                    <div className={styles.footer__section}>
                        <p>Сума замовлення: <span><b>{totalPrice} грн</b></span></p>
                        <Button background="#FE5F1E" color='white' position='absolute' bottom='0' right='0' width="211px" height="55px">
                            <Link href="/order" >Оплатити <span style={{color:'white'}}>зараз</span></Link>
                        </Button>
                    </div>
                </div>
            </div> 
            : 
            <EmptyBucket/>}
        </>
    )
    
}

export default Bucket;