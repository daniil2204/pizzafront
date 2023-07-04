'use client'
import styles from "./userRegister.module.scss";
import { Field, Formik } from "formik";
import InputField from "@/components/fields/inputField";
import * as Yup from 'yup';
import { registerInterface, registerUserType } from "@/types";


const init:registerInterface = {
    name:'',
    surname: '',
    fatherName: '',
    email:'',
    password:'',
}

const titleObj:registerInterface = {
    name:"Ім'я",
    surname:"Прізвище",
    fatherName:"Ім'я по батькові",
    email:"Email",
    password:"Пароль",
}

const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
    surname: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
    fatherName: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
    email: Yup.string().email('Невірний формат Email').required("Обов'язково для заповнення"),
    password: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
})

const registerArray = ['name','surname','fatherName','email','password'];

const UserRegister = () => {
    return(
        <div className={styles.userRegister}>
            <Formik onSubmit={ async (data, {resetForm}) => {
                const {name,surname,fatherName,email,password} = data;
                const fullName = `${name} ${fatherName} ${surname}`;
                const userData = {
                    fullName,
                    password,
                    email,
                }
                console.log(JSON.stringify(userData));
                resetForm();
            }} 
            initialValues={init}
            validationSchema={RegisterSchema}
            >
                {({errors,touched, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>Реєстрація
                        {registerArray.map(item => (
                            <div key={item} className={styles.userRegister__inputWrapper}>
                                <p className={styles.userRegister__title}>{titleObj[`${item}`]}*</p>
                                <Field name={item} component={InputField} />
                                {errors[`${item}`] && touched[`${item}`] ? (
                                    <div className={styles.error}>{errors[`${item}`]}</div>) : null
                                }
                                <p style={{background: 'gray', opacity: '0.25', width:'100%', height:'1px'}}></p>
                            </div>
                        ))}
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