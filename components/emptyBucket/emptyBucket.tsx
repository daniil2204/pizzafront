import styles from "./emptyBucket.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "../button/button";

const EmptyBucket = () => {
    return (
        <div className={styles.emptyBucket}>
            <p className={styles.emptyBucket__title}>Кошик порожній 😕</p>
            <div className={styles.emptyBucket__textWrap}>
                <p>Найімовірніше, ви не замовляли ще піцу.</p>
                <p>Щоб замовити піцу, перейди на головну сторінку.</p>
            </div>
            <Image src="/emptyBucketCart.svg" alt="emptyBucketCart" width="300" height="255"/>
            <Button width="210px" height="46px" background="#282828" color="#FFF" fontSize="16px" fontWeight="700" margin="74px 0" letterSpacing="0.24px">
                <Link href="/">Повернутися назад</Link>
            </Button>
        </div>
    )
}

export default EmptyBucket;