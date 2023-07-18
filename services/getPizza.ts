import { pizzaType } from "@/types";

export const getAllPizzas = async () : Promise<Array<pizzaType>> => {
    const responce = await fetch("https://pizzabackend-ames.onrender.com/pizza", {
        next: {
            revalidate: 60,
        }
    });
    if (!responce.ok) {
        throw new Error('Server Error');
    }
    return await responce.json();
}