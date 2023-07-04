import { Metadata } from "next";
import { Props, pizzaType } from "@/types";
import PizzaPage from '@/components/pizzaPage/pizzaPage'




async function getData(id:string) {
    const res = await fetch(`http://localhost:5000/pizzas/${id}`)
    
    if (!res.ok) {
        
        throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export async function generateMetadata({ params : {id}} : Props) : Promise<Metadata> {
    const pizza:pizzaType = await getData(id);
    return {
        title: pizza.name,
    };
}

const Pizza = async ({ params : {id}} : Props) => {
    const pizza:pizzaType = await getData(id);
    return(
        <PizzaPage pizza={pizza}/>
    )
}

export default Pizza;