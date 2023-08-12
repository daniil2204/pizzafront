'use client'

import styles from "./header.module.scss"
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/services/reduxHook";
import { changeBucket } from "@/redux/store/userSlice";
import Button from "../button/button";
import { useEffect } from "react";
import { getBucketFromLocalOrDB } from "@/services/getBucketFromLocalOrDB";

const Header = () => {
    const count = useAppSelector(state => state.pizza.bucketLength);
    const totalPrice = useAppSelector(state => state.pizza.totalPrice);
    const auth = useAppSelector(state => state.user.auth);
    const bucket = useAppSelector(state => state.pizza.bucket);
    const initStore = useAppSelector(state => state.user.initialStore);
    let token;
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        token = localStorage.getItem('token');
        if(initStore){
            getBucketFromLocalOrDB(dispatch,token);
        }else{
            if (token) {
                dispatch(changeBucket({token,bucket,count,totalPrice}));
            }
        }
    },[initStore,count,auth])


    return (
        <header>
            <div className={styles.header}>
                <div className={styles.header__icon}>
                    <Image src="/icon.svg" alt="pizzaIcon" width="38" height="38"></Image>
                    <div className={styles.header__icon__text}>
                        <p>NEXT PIZZA</p>
                        <span>найсмачніша піца у всесвіті</span>
                    </div>
                </div>
                <Button width="150px" height="50px" background="#FE5F1E" color="#FFFFFF" padding="0 23px">
                    <Link href="/bucket" style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
                        <p>{totalPrice} грн</p>
                        <span style={{background: 'white', opacity: '0.25', width:'1px', height:'25px'}}/>
                        <Image src="/bucket.svg" alt="bucket" width="16" height="16" className={styles.header__bucket__icon}></Image>
                        <span>{count}</span>                                     
                    </Link>
                </Button>
            </div>
            <p style={{background: 'gray', opacity: '0.25', width:'100%', height:'1px', marginTop:'40px'}}></p>
            <div className={styles.userLink}>
                <Button width="100%" height="100%" color="white">
                    <Link href={`${auth ? '/user' : '/login'}`}>{typeof window !== 'undefined' ? window.innerWidth > 900 ? 'Особистий кабінет' : <Image src={'/user.svg'} alt="userLink" width="40" height="40"/> : 'Особистий кабінет'}</Link>
                </Button>
            </div>
        </header>
    )
} 

export default Header;