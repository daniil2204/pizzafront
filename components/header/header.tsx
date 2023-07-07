'use client'

import styles from "./header.module.scss"
import Image from "next/image";
import Link from "next/link";

import { useAppSelector } from "@/services/reduxHook";

const Header = () => {
    const count = useAppSelector(state => state.pizza.bucketLength);
    const totalPrice = useAppSelector(state => state.pizza.totalPrice);
    const auth = useAppSelector(state => state.user.auth);
    const role = useAppSelector(state => state.user.data?.role);

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
                <button className={styles.header__bucket}>
                    <Link href="/bucket">
                        <p>{totalPrice} грн</p>
                        <span style={{background: 'white', opacity: '0.25', width:'1px', height:'25px'}}/>
                        <Image src="/bucket.svg" alt="bucket" width="16" height="16" className={styles.header__bucket__icon}></Image>
                        <span>{count}</span>                                     
                    </Link>
                </button>
            </div>
            <p style={{background: 'gray', opacity: '0.25', width:'100%', height:'1px', marginTop:'40px'}}></p>
            <div className={styles.userLink}>
                <Link href={`${auth ? '/user' : '/login'}`}>Особистий кабінет</Link>
            </div>
            {
                role === 'admin' ? 
                <div className={styles.userLink}  style={{'bottom':'90px'}}>
                    <Link href='/create'>Додати нову піцу</Link>
                </div>
                : 
                null
            }
        </header>
    )
} 

export default Header;