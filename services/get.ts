import { pizzaType } from "@/types";


export const getAllPizzas = async () : Promise<Array<pizzaType>> => {
    const responce = await fetch("http://localhost:5000/pizzas", {
        next: {
            revalidate: 60,
        }
    });
    if (!responce.ok) {
        throw new Error('Server Error');
    }
    return await responce.json();
}