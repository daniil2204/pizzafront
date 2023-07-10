import { registerInterface } from "@/types";
export const initRegister:registerInterface = {
    name:'',
    surname: '',
    fatherName: '',
    email:'',
    password:'',
}

export const titleRegisterObj:registerInterface = {
    name:"Ім'я",
    surname:"Прізвище",
    fatherName:"Ім'я по батькові",
    email:"Email",
    password:"Пароль",
}


export const registerArray = ['name','surname','fatherName','email','password'];