import { usersOrders } from "@/types";

export const getAllOrders = async () : Promise<Array<usersOrders>> => {
    const token = localStorage.getItem('token');
    const responce = await fetch("http://localhost:4444/order", {
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
}