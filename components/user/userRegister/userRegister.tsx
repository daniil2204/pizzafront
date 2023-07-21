'use client'
import styles from "./userRegister.module.scss";
import { Field, Formik } from "formik";
import InputField from "@/components/fields/inputField";
import { registerUserType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/services/reduxHook";
import { createUser } from "@/redux/store/userSlice";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/formik/Shemas";
import { registerArray,titleRegisterObj,initRegister } from "@/formik/registerData";


const UserRegister = () => {

    const isAuth = useAppSelector(state => state.user.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [check,setCheck] = useState<Boolean>(false);
    const [error,setError] = useState<Boolean>(false);

    useEffect(() => {
        if (isAuth) {
            router.push('/');
        }
    },[check]);

    return(
        <div className={styles.userRegister}>
            <Formik onSubmit={ async (data, {resetForm}) => {
                const {name,surname,fatherName,email,password} = data;
                const fullName = `${name} ${fatherName} ${surname}`;
                const userData:registerUserType = {
                    fullName,
                    password,
                    email,
                }
                const res = await dispatch(createUser(userData));
                setError(false);
                if(res.payload) {
                    console.log('work');
                    resetForm();   
                    setCheck(!check); 
                }else{
                    setError(true);
                }
            }} 
            initialValues={initRegister}
            validationSchema={RegisterSchema}
            >
                {({errors,touched, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>Реєстрація
                        {registerArray.map(item => (
                            <div key={item} className={styles.userRegister__inputWrapper}>
                                <p className={styles.userRegister__title}>{titleRegisterObj[`${item}`]}*</p>
                                <Field name={item} component={InputField} />
                                {errors[`${item}`] && touched[`${item}`] ? (
                                    <div className={styles.error}>{errors[`${item}`]}</div>) : null
                                }
                                <p style={{background: 'gray', opacity: '0.25', width:'100%', height:'1px'}}></p>
                            </div>
                        ))}
                        {error ? <p className={styles.error}>Почтова скринька вже використовується</p> : null}
                        <button type="submit">
                            Зареєструватися
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
};

export default UserRegister;