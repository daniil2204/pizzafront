import { orderInterface } from "@/types";

export const initOrder:orderInterface = {
    phone:'',
    location:'',
    additionalInfo:'',
}


export const titleOrderObj:orderInterface = {
    phone:'Номер телефону*',
    location:'Адреса доставки*',
    additionalInfo:"Додаткова інфомарція*(не обов'язково)",
}

export const orderArray = ['phone','location','additionalInfo']


