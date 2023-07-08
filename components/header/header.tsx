'use client'

import styles from "./header.module.scss"
import Image from "next/image";
import Link from "next/link";

import { useAppSelector } from "@/services/reduxHook";
import Button from "../button/button";

const Header = () => {
    const count = useAppSelector(state => state.pizza.bucketLength);
    const totalPrice = useAppSelector(state => state.pizza.totalPrice);
    const auth = useAppSelector(state => state.user.auth);

    return (
        <header>
            <div className={styles.header}>
                <div className={styles.header__icon}>
                    <Image src="/icon.svg" alt="pizzaIcon" width="38" height="38"></Image>
                    <div className={styles.header__icon__text}>
                        <p>REACT PIZZA</p>
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
                    <Link href={`${auth ? '/user' : '/login'}`}>{window.innerWidth > 900 ? 'Особистий кабінет' : <Image src={'/user.svg'} alt="userLink" width="40" height="40"/>}</Link>
                </Button>
            </div>
        </header>
    )
} 

export default Header;