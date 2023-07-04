import { ReactNode } from "react"

export type pizzaType = {
    id:number,
    imageUrl:string,
    name:string,
    types:Array<number>,
    sizes:Array<number>,
    price:number,
    category:string[],
    rating:number,
}

export type selectPizzaType = {
    id:number,
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
    id: number,
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
    initialStore: boolean,    
    bucketLength: number,
    totalPrice:number,
    category:string,
    sort:string,
}

export type userData = {
    _id:string,
    fullName:string,
    passwordHash:string,
}

export type userState = {
    data: userData | null,
    status:string,
    auth: boolean,
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
    id:number,
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
    id:number,
    size:number,
    type:string,
    count:number,
}

export type Props = {
    params: {
        id: string
    }
}

export type PizzaPageProps = {
    pizza:pizzaType,
}

export type ButtonProps = {
    text: string,
    children?: ReactNode,
}


export interface registerInterface {
    [key: string]: string
    name:string,
    surname:string,
    fatherName:string,
    email:string,
    password:string,
}

export interface loginInterface {
    [key: string]: string
    email:string,
    password:string,
}