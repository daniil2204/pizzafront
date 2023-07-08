'use client'
import styles from "./userPage.module.scss";
import { useAppSelector,useAppDispatch } from "@/services/reduxHook";
import Link from "next/link";
import { logOut } from "@/redux/store/userSlice";
import Button from "@/components/button/button";

const UserPage = () => {
    const user = useAppSelector(state => state.user.data);
    const fullName = user?.fullName.split(" ");

    const dispatch = useAppDispatch();

    const userLogOut = () => {
        dispatch(logOut());
        localStorage.removeItem('token');
    }

    const role = useAppSelector(state => state.user.data?.role);

    return(
        <div className={styles.userPage}>
            <p>Особиста інформація</p>
            <div>
                <p>Ім'я - {fullName ? fullName[0] : null}</p>
                <p>Побатькові - {fullName ? fullName[2] : null}</p>
                <p>Прізвище - {fullName ? fullName[1] : null}</p>
                <p>Почтова скринька - {user?.email}</p>
            </div>
            <Button title="На головну" width={"155px"} height={"40px"} color="#EB5A1E" background="#FFFFFF" border="1px solid #EB5A1E" margin="20px 0 0">
                <Link href="/">На головну</Link>
            </Button>
            <Button callBack={userLogOut} title="Вийти" width={"155px"} height={"40px"} color="#EB5A1E" background="#FFFFFF" border="1px solid #EB5A1E" margin="20px 0 0">
                <Link href="/">Вийти</Link>
            </Button>
            {
                role === 'admin' ? 
                <Button width={"155px"} height={"40px"} color="#EB5A1E" background="#FFFFFF" border="1px solid #EB5A1E" margin="20px 0 0">
                    <Link href='/create'>Додати нову піцу</Link>
                </Button>
                : 
                null
            }
        </div>
    )
};

export default UserPage;