import PizzaChange from '@/components/pizzaChange/pizzaChange'
import { pizzaType } from '@/types'

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