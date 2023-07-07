'use client'
import styles from "../userRegister/userRegister.module.scss";
import { Field, Formik } from "formik";
import InputField from "@/components/fields/inputField";
import * as Yup from 'yup';
import { loginInterface } from "@/types";
import { useAppDispatch,useAppSelector } from "@/services/reduxHook";
import { fetchUserData } from "@/redux/store/userSlice";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import Link from "next/link";

const init:loginInterface = {
    email:'',
    password:'',
}

const titleObj:loginInterface = {
    email:"Email",
    password:"Пароль",
}

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Невірний формат Email').required("Обов'язково для заповнення"),
    password: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
})

const loginArray = ['email','password'];

const UserLogin = () => {
    const isAuth = useAppSelector(state => state.user.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [check,setCheck] = useState<Boolean>(false);
    const [error,setError] = useState<Boolean>(false);

    useEffect(() => {
        if (isAuth) {
            router.push('/user');
        }
    },[check]);
   
    return(
        <div className={styles.userRegister}>
            <Formik onSubmit={async (data, {resetForm}) => {            
                const res = await dispatch(fetchUserData(data));
                setError(false);
                if(res.payload) {
                    resetForm();   
                    setCheck(!check); 
                }else{
                    setError(true);
                }
                  
            }} 
            initialValues={init}
            validationSchema={RegisterSchema}
            >
                {({errors,touched, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>Увійти
                        {loginArray.map(item => (
                            <div key={item} className={styles.userRegister__inputWrapper}>
                                <p className={styles.userRegister__title} onClick={() => console.log(isAuth)}>{titleObj[`${item}`]}*</p>
                                <Field name={item} component={InputField} />
                                {errors[`${item}`] && touched[`${item}`] ? (
                                    <div className={styles.error}>{errors[`${item}`]}</div>) : null
                                }
                                <p style={{background: 'gray', opacity: '0.25', width:'100%', height:'1px'}}></p>
                            </div>
                        ))}
                        {error ? <p className={styles.error}>Невірна почта або пароль</p> : null}
                        <button type="submit">
                            Увійти
                        </button>
                        <button>
                            <Link href="/register">Зареєструватися</Link>
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
};

export default UserLogin;