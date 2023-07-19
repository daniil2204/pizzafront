import { Metadata } from "next";
import { Props, pizzaType } from "@/types";
import PizzaPage from '@/components/pizzaPage/pizzaPage'




async function getData(id:string) {
    const res = await fetch(`https://pizzabackend-ames.onrender.com/pizza/${id}`)
    
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
        <PizzaPage pizza={pizza}/>
    )
}

export default Pizza;