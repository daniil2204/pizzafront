import { FieldProps } from "formik";
import styles from "./inputField.module.scss";
import { registerInterface } from "@/types";

const placeholder:registerInterface = {
    name:"ім'я",
    surname:"прізвище",
    fatherName:"ім'я по батькові",
    email:"email",
    password:"пароль",
}


const InputField = ({field} :FieldProps) => {
    let title = '';
    let type = field.name === 'password' ? 'password' : field.name === 'email' ? 'email' : 'text';
    if (field.name in placeholder) {
        title = placeholder[`${field.name}`]
    }
    

    return(
        <input className={styles.inputField} placeholder={`Введіть ${title}`} {...field} type={type}/>
    )
}

export default InputField;