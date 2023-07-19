import { Metadata } from "next";
import { Props, pizzaType } from "@/types";
import PizzaChange from '@/components/pizzaChange/pizzaChange'




async function getData(_id:string) {
    const res = await fetch(`https://pizzabackend-ames.onrender.com/pizza/${_id}`)
    if (!res.ok) {
        
        throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export async function generateMetadata({ params : {_id}} : Props) : Promise<Metadata> {
    const pizza:pizzaType = await getData(_id);
    return {
        title: pizza.name,
    };
}

const Pizza = async ({ params : {_id}} : Props) => {
    const pizza:pizzaType = await getData(_id);
    return(
        <PizzaChange pizza={pizza} title='Редагування'/>
    )
}

export default Pizza;