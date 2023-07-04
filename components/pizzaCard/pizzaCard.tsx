'use client'

import styles from './pizzaCard.module.scss';
import Image from 'next/image';
import { selectPizzaType, PizzaCardProps } from '@/types';
import { FC,useEffect,useState } from 'react';
import { useAppDispatch,useAppSelector } from '@/services/reduxHook';
import { addPizzaToBucket,changeCount } from '@/redux/store/pizzaSlice';
import Link from 'next/link';



const PizzaCard:FC<PizzaCardProps> = ({pizza}) => {

    const dispatch = useAppDispatch();

    const bucket = useAppSelector(state => state.pizza.bucket);

    const {id,imageUrl,name,types,sizes,price,category,rating} = pizza;
    const [type,setType] = useState<string>(types[0] === 0 ? 'тонке' : 'традиційне');
    const [size,setSize] = useState<number>(sizes[0]);
    const [count,setCount] = useState<number>(0);

    const isActive = (array:Array<number>,item:number) : boolean => {
        return array.includes(item);
    }

    useEffect(() => {
        const pizzaCount = bucket.reduce((acc,cur) => {
            if (cur.id === id) {
                return acc += cur.count;
            }
            return acc;
        },0);
        if (pizzaCount) {
            setCount(pizzaCount);
        }
    },[])

    const setState = (item:string | number) => {
        typeof item === 'string' ? setType(item) : setSize(item); 
    }

    const addPizza = () => {      
        const selectPizza:selectPizzaType = {
            name,
            price,
            id,
            imageUrl,
            category,
            rating,
            type,
            size,
            count: 1,
        };
        if (bucket.some(item => item.id === id && item.size === size && item.type === type)) {
            const operation = 1;
            dispatch(changeCount({id,type,size,operation}))
        }else{
            dispatch(addPizzaToBucket(selectPizza));
        }       
        setCount(count + 1)     
    }


    return (
        <li className={styles.card}>
            <Image src={imageUrl} alt="pizza" width="260" height="260" style={{marginLeft:'20px'}}/>
            <Link href={`/pizza/${id}`}><p className={styles.card__title}>{name}</p></Link>
            <div className={styles.card__select}>
                {['тонке','традиційне'].map((item,index) => {
                    const active = isActive(types,index);

                    return <button 
                        key={index}
                        className={`${styles.card__select__var} ${active ? styles.active : ''} ${item === type ? styles.selected : ''}`}
                        onClick={active ? () => setState(item) : () => alert('disable')}
                        >
                        {item}
                    </button>
                })}


                {[26,30,40].map(item => {
                    const active = isActive(sizes,item);
                    return <button 
                        key={item}
                        className={`${styles.card__select__size} ${active ? styles.active : ''} ${size === item ? styles.selected : ''}`}
                        onClick={active ? () => setState(item) : () => alert('disable')}
                        >
                        {item} см.
                    </button>
                })}
            </div>
            <div className={styles.card__footer}>
                <p>{price} грн</p>
                <button onClick={addPizza}>
                    <Image src="/add.svg" alt="add" width="12" height="12"/>
                    <span>Додати</span>
                    <div className={styles.card__footer__counter} style={{display: count ? 'block' : 'none'}}>{count}</div>
                </button>
            </div>
        </li>
    )
}

export default PizzaCard;