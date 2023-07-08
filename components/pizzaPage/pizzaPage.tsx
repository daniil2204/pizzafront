import { FC } from "react";
import { PizzaPageProps } from "@/types";
import styles from "./pizzaPage.module.scss"
import Image from "next/image";
import Link from "next/link";
import Button from "../button/button";


const PizzaPage:FC<PizzaPageProps> = ({pizza}) => {
    const {_id,imageUrl,name,types,sizes,price,category,rating} = pizza;

    return(
        <div className={styles.pizzaPage}>
            <Image src={imageUrl} alt={`${name} pizza`} width="300" height="300"/>
            <div className={styles.info}>
                <p>Назва - {name}</p>
                <p>Тісто : {types.map((item) => item === 0 ? 'тонке, ' : 'традиційне')}</p>
                <p>Розміри : {sizes.map((item) => `${item} см, `)}</p>
                <p>Ціна : {price} грн</p>
                <p>Категорії : {category.map((item,index) => ` ${item} ${index === category.length - 1 ? '' : '|'}`)}</p>
                <p>Рейтинг : {rating}/10</p>
            </div>
            <button>
                <Link href="/">Повернутися</Link>
            </button>
        </div>
    )
}

export default PizzaPage;