'use client'
import styles from "./userPage.module.scss";
import { useAppSelector,useAppDispatch } from "@/services/reduxHook";
import Link from "next/link";
import { logOut } from "@/redux/store/userSlice";

const UserPage = () => {
    const user = useAppSelector(state => state.user.data);
    const fullName = user?.fullName.split(" ");

    const dispatch = useAppDispatch();

    const userLogOut = () => {
        dispatch(logOut());
        localStorage.removeItem('token');
    }

    return(
        <div className={styles.userPage}>
            <p>Особиста інформація</p>
            <div>
                <p>Ім'я - {fullName ? fullName[0] : null}</p>
                <p>Побатькові - {fullName ? fullName[2] : null}</p>
                <p>Прізвище - {fullName ? fullName[1] : null}</p>
                <p>Почтова скринька - {user?.email}</p>
            </div>
            <button>
                <Link href="/">На головну</Link>
            </button>
            <button onClick={userLogOut}>
                <Link href="/">Вийти</Link>
            </button>
        </div>
    )
};

export default UserPage;