import { usersOrders } from "@/types";

export const getAllOrders = async () : Promise<Array<usersOrders>> => {
    if (typeof localStorage !== 'undefined') {
        //const token = localStorage.getItem('token');
        const token = '';
        const responce = await fetch("https://pizzabackend-ames.onrender.com/order", {
            next: {
                revalidate: 60,
            },
            headers:{
                'Authorization': `Basic ${token}`
            }
        });
        if (!responce.ok) {
            throw new Error('Server Error');
        }
        return await responce.json();
    }else return []
}