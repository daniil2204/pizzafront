import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
    surname: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
    fatherName: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
    email: Yup.string().email('Невірний формат Email').required("Обов'язково для заповнення"),
    password: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
})

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Невірний формат Email').required("Обов'язково для заповнення"),
    password: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
})

export const pizzaChangeSchema = Yup.object().shape({
    imageUrl: Yup.string().min(3, "Too Short!").required("Обов'язково для заповнення"),
    name: Yup.string().min(3, "Too Short!").max(25,"Too long").required("Обов'язково для заповнення"),
    sizes: Yup.string(),
    types: Yup.string(),
    price: Yup.string(),
})

export const OrderSchema = Yup.object().shape({
    phone: Yup.string().matches(/^039|067|068|096|097|098|050|066|095|099|063|073|093|091|048\d{9}$/,{message:'Невірний телефон'}).required("Обов'язково для заповнення"),
    location: Yup.string().required("Обов'язково для заповнення"),
})