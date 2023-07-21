'use client'
import styles from "./orderPage.module.scss";
import { useAppSelector,useAppDispatch } from "@/services/reduxHook";
import { Formik,Field } from "formik";
import InputField from "../fields/inputField";
import { useState } from "react";
import Link from "next/link";
import { clearBucket } from "@/services/clearBucket";
import { makeOrder } from "@/redux/store/userSlice";
import { OrderSchema } from "@/formik/Shemas";
import { initOrder,titleOrderObj,orderArray } from "@/formik/orderData";

const orderPage = () => {
    const totalPrice = useAppSelector(state => state.pizza.totalPrice);
    const bucket = useAppSelector(state => state.pizza.bucket);
    const fullName = useAppSelector(state => state.user.data?.fullName);
    const userId = useAppSelector(state => state.user.data?._id);

    const [showModal,setShowModal] = useState<boolean>(false);
    const [backToMain,setbackToMain] = useState<boolean>(false);
    const [modalText,setModalText] = useState<string>('');

    const dispatch = useAppDispatch();
    return(
        <div className={styles.orderPage}>
            {showModal ? 
                <div>
                    <div className={styles.modal}>
                        <p>{modalText}</p>
                    </div>
                    <div onClick={() => setShowModal(false)} className={styles.background}></div>
                </div>
                :
                null
            }
            <div className={styles.orderPage__header}>
                <p>Заповніть форму</p>
                <p>Сума: {backToMain ? 0 : totalPrice} грн</p>
            </div>
            <p style={{background: 'gray', opacity: '0.25', width:'100%', height:'1px'}}></p>
            <Formik 
                onSubmit={async (data,{resetForm}) => {
                    const res = await dispatch(makeOrder({bucket,...data,totalPrice,fullName,userId}))
                    if(res.payload){
                        clearBucket(dispatch);
                        setModalText('Дякуємо за Ваше замовлення, менеджер зателефонує Вам')
                        setShowModal(true)
                        setbackToMain(true); 
                    }else{
                        setShowModal(true)
                        setbackToMain(true); 
                        setModalText('Вибачте,сталася помилка');
                    }
                    resetForm();
                              
                }} 
                initialValues={initOrder}
                validationSchema={OrderSchema}
                >
            {({errors,touched, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    {orderArray.map(item => (
                        <div key={item} className={styles.orderPage__inputField}>
                            <p>{titleOrderObj[`${item}`]}</p>
                            <Field name={item} component={InputField} />
                            {errors[`${item}`] && touched[`${item}`] ? (
                                    <div style={{color:'red',fontSize:'12px'}}>{errors[`${item}`]}</div>) : null
                            }
                            <p style={{background: 'gray', opacity: '0.25', width:'100%', height:'1px'}}></p>
                        </div>
                        
                    ))}
                    {backToMain ? 
                    <button>
                        <Link href="/">На головну сторінку</Link>
                    </button>
                    :
                    <button type="submit">
                        Замовити
                    </button>
                    }
                </form>
            )}
            </Formik>
        </div>
    )
}

export default orderPage;