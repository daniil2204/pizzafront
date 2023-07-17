import PizzaChange from '@/components/pizzaChange/pizzaChange'
import { pizzaType } from '@/types'
import { Metadata } from "next";


export async function generateMetadata() : Promise<Metadata> {
    return {
        title: 'Create Pizza',
    };
}

const basePizza:pizzaType = {
    _id:'',
    imageUrl:'',
    name:'test',
    sizes: [26],
    types: [0],
    price: 0,
    rating: 0,
    category: ['test'],
}

const CreatePizza = () => {
    return (
        <PizzaChange pizza={basePizza} title='Створити'/>
    )
}

export default CreatePizza;