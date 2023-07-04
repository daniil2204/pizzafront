import styles from "./emptyBucket.module.scss";
import Image from "next/image";
import Link from "next/link";

const EmptyBucket = () => {
    return (
        <div className={styles.emptyBucket}>
            <p className={styles.emptyBucket__title}>Кошик порожній 😕</p>
            <div className={styles.emptyBucket__textWrap}>
                <p>Найімовірніше, ви не замовляли ще піцу.</p>
                <p>Щоб замовити піцу, перейди на головну сторінку.</p>
            </div>
            <Image src="/emptyBucketCart.svg" alt="emptyBucketCart" width="300" height="255"/>
            <button>
                <Link href="/">Повернутися назад</Link>
            </button>
        </div>
    )
}

export default EmptyBucket;