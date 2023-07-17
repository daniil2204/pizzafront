"use client"
import styles from './userOrdersPage.module.scss'
import { useRouter } from "next/navigation";
import { useAppSelector,useAppDispatch } from "@/services/reduxHook";
import { removeOrder } from "@/redux/store/userSlice";
import { getAllOrders } from "@/services/getOrders";
import useSWR from 'swr';
import { useEffect,useState } from 'react';
import Spinner from '../loader/loader';
import { usersOrders } from "@/types";
import Button from '../button/button';

const userOrdersPage = () => {

    const router = useRouter();
    const role = useAppSelector(state => state.user.data?.role);
    const token = useAppSelector(state => state.user.data?.token);
    const [orders,setOrders] = useState<usersOrders[]>();
    

    const emptyPage = () => {
        return <></>
    }

    useEffect(() => {
        if (role !== 'admin') {
            router.push('/');
            emptyPage();
        }
        getAllOrders().then(data => setOrders(data));
    },[])

    const dispatch = useAppDispatch();

    const deleteOrder = (_id:string) => {
        if (_id && token) {
            dispatch(removeOrder({_id,token}));   
            setOrders(orders?.filter(item => item._id !== _id))
        }
    }

    return(
        <>
            {!orders ? 
                <Spinner/>
                :
                <div className={styles.ordersPage}>
                    {orders?.map((item:usersOrders) => (
                        <div className={styles.ordersPage__order} key={item._id}>
                            {item.fullName ? <p>ФІО:{item.fullName}</p> : null}
                            <p>Телефон:{item.phone}</p>
                            <p>Адрес:{item.location}</p>
                            {item.additionalInfo ? <p>Додаткова інформація - {item.additionalInfo}</p> : null}
                            <p>Загальна ціна:{item.totalPrice} грн</p>
                            <p>Замовлення:</p>
                            {item.bucket.map(item => (
                                <p key={item._id+item.name+Math.random()}>{item.name}|{item.size}|{item.type}|{item.count}</p>
                            ))}
                            <Button width="150px" height="50px" background="#FE5F1E" color="#FFFFFF" padding="0 23px" margin='10px auto' callBack={() => deleteOrder(item._id)}>
                                Виконано
                            </Button>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}
export default userOrdersPage;