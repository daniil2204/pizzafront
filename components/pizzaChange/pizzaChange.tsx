'use client'
import { FC } from "react";
import { PizzaPageProps } from "@/types";
import styles from "../user/userRegister/userRegister.module.scss"
import Image from "next/image";
import Link from "next/link";
import { Field, Formik } from "formik";
import * as Yup from 'yup';
import { pizzaChange } from "@/types";
import InputField from "../fields/inputField";
import { useAppDispatch, useAppSelector } from "@/services/reduxHook";
import { updatePizza, createPizza } from "@/redux/store/pizzaSlice";
import { useState } from "react";
import { pizzaChangeSchema } from "@/formik/Shemas";
import { changePizzaArray,sizesPizzaOptions,typesPizzaOptions } from "@/formik/pizzaChangeData";


const PizzaChange:FC<PizzaPageProps> = ({pizza,title}) => {
    const {_id,imageUrl,name,types,sizes,price,category,rating} = pizza;

    const dispatch = useAppDispatch();

    const token = useAppSelector(state => state.user.data?.token);

    const basePizza:pizzaChange = {
        _id,
        imageUrl,
        name,
        sizes: sizes.join(" "),
        types: types.join(" "),
        price,
        rating,
        category,
        token,
    }

    const [error,setError] = useState<string>('');
    const [msg,setMsg] = useState<string>('');


    return(
        <div className={styles.userRegister}>
            {imageUrl !== '' ? <Image src={imageUrl} alt={`${name} pizza`} width="300" height="300"/> : null}
                <Formik onSubmit={async (data) => {
                    let pizzaChange = {...data};
                    if(Array.isArray(pizzaChange.category)){
                        pizzaChange.category = pizzaChange.category.join(',');
                    }
                    if (typeof pizzaChange.sizes === 'string' && typeof pizzaChange.types === 'string' && typeof pizzaChange.category === 'string') {
                        
                        pizzaChange.sizes = pizzaChange.sizes.split(' ').map(item => Number(item));
                        pizzaChange.types = pizzaChange.types.split(' ').map(item => Number(item));
                        pizzaChange.category = pizzaChange.category.split(',');
                        pizzaChange.rating = Number(pizzaChange.rating);
                    }
                    if (token) {
                        let res;
                        if (title === 'Редагування') {
                            res = await dispatch(updatePizza({...pizzaChange,token}))
                        }else{
                            const {_id,...createdPizza} = pizzaChange;
                            res = await dispatch(createPizza({...createdPizza,token}))
                        }
                        if (res.type.includes('/rejected')) {
                            return setError('Помилка при заповнені даних')
                        }
                        return setMsg('Дані відправлено');
                        
                    }

                    }} 
                    initialValues={basePizza}
                    validationSchema={pizzaChangeSchema}
                    >
                        {({errors,touched, handleSubmit}) => (
                            <form onSubmit={handleSubmit}>{title}
                                {changePizzaArray.map(item => (
                                    <div key={item} className={styles.userRegister__inputWrapper}>
                                        <p className={styles.userRegister__title}>{item}</p>
                                        {item === 'sizes' || item === 'types' ? 
                                            <Field as="select" name={item}>
                                                {   
                                                    (item === 'sizes' ? sizesPizzaOptions : typesPizzaOptions).map((item) => (
                                                        <option key={item.join(" ")} value={item.join(" ")}>{item.join(" ")}</option>
                                                    ))
                                                }
                                            </Field>
                                            : 
                                            <Field name={item} component={InputField} />
                                        }
                                        {errors[`${item}`] && touched[`${item}`] ? (
                                            <div className={styles.error}>{errors[`${item}`]}</div>) : null
                                        }
                                        <p style={{background: 'gray', opacity: '0.25', width:'100%', height:'1px'}}></p>
                                    </div>
                                ))}
                                <button type="submit">
                                    Відправити
                                </button>
                                {error ? <p className={styles.error}>{error}</p> : null}
                                {msg ? <p className={styles.error} style={{color:"green"}}>{msg}</p> : null}
                            </form>
                        )}
                </Formik>
            <button>
                <Link href="/">Повернутися</Link>
            </button>
        </div>
    )
}

export default PizzaChange;
