import { ReactNode } from "react"

export type pizzaType = {
    _id:string,
    imageUrl:string,
    name:string,
    types:Array<number>,
    sizes:Array<number>,
    price:number,
    category:string[],
    rating:number,
}

export type selectPizzaType = {
    _id:string,
    imageUrl:string,
    name:string,
    type:string,
    size:number,
    price:number,
    category:string[],
    rating:number,
    count:number,
}

export type countSelestPizza = {
    _id: string,
    count: number,
}

export type PizzaCardProps = {
    pizza: pizzaType
}

export type BucketCardProps = {
    pizza: selectPizzaType,
    initialCount: number,
}

export type pizzaState = {
    pizzas: pizzaType[],
    bucket: selectPizzaType[],
    loading: boolean,  
    bucketLength: number,
    totalPrice:number,
    category:string,
    sort:string,
}

export type userData = {
    _id:string,
    fullName:string,
    passwordHash:string,
    email:string,
    role: string,
    token:string,
    bucket:selectPizzaType[],
    bucketLenght:number,
    totalPrice:number,
}

export type userState = {
    data: userData | null,
    status:string,
    auth: boolean,
    initialStore: boolean,
}

export type loginUserType = {
    email:string,
    password:string,
}

export type registerUserType = {
    fullName:string,
    email:string,
    password:string,
}

export type changePizzaCountType = {
    _id:string,
    size:number,
    type:string,
    operation: 1 | -1,
}

export type setBucketToStoreType = {
    newBucket: selectPizzaType[],
    count: number,
    totalPrice: number,
}

export type removePizzaFromBucketType = {
    _id:string,
    size:number,
    type:string,
    count:number,
}

export type Props = {
    params: {
        _id: string
    }
}

export type PizzaPageProps = {
    pizza:pizzaType,
    title?:string,
}

export type changeBucketProps = {
    bucket:Array<selectPizzaType>,
    count:number,
    totalPrice:number,
    token:string,
}

export type makeOrderType = {
    bucket:Array<selectPizzaType>,
    phone:string,
    location:string,
    additionalInfo?:string,
    totalPrice:number,
    userId?:string,
    fullName?:string,
}

export type usersOrders = {
    phone:string,
    location:string,
    fullName:string,
    totalPrice:string,
    bucket:Array<selectPizzaType>,
    additionalInfo:string,
    _id:string,
}

export type deletePizzaType = {
    _id:string,
    token:string,
}

export type removeOrderType = {
    _id:string,
    token:string,
}


export interface pizzaChange {
    [key: string]: string | Array<string> | Array<number> | number | undefined,
    _id:string,
    imageUrl:string,
    name: string,
    types: string | Array<number>,
    sizes: string | Array<number>,
    price: number,
    rating: number,
    category: Array<string> | string,
    token?: string,
}

export interface pizzaCreate {
    [key: string]: string | Array<string> | Array<number> | number | undefined,
    imageUrl:string,
    name: string,
    types: string | Array<number>,
    sizes: string | Array<number>,
    price: number,
    rating: number,
    category: string[] | string,
    token?: string,
}

export interface registerInterface {
    [key: string]: string,
    name:string,
    surname:string,
    fatherName:string,
    email:string,
    password:string,
}

export interface loginInterface {
    [key: string]: string,
    email:string,
    password:string,
}

export interface ButtonProps {
    title?:string,
    width?:string,
    height?:string,
    color?:string,
    background?:string,
    callBack?:() => void,
    border?:string,
    children?:ReactNode,
    padding?:string,
    position?: 'absolute' | 'fixed' | 'relative'
    bottom?:string,
    right?:string,
    margin?:string,
    fontWeight?:string,
    fontSize?:string,
    lineHeight?:string,
    letterSpacing?:string,
    zIndex?:number,
}

export interface orderInterface {
    [key: string]: string,
    phone:string,
    location:string,
    additionalInfo:string,
}