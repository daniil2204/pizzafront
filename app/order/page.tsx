import OrderPage from "@/components/orderPage/orderPage";
import { Metadata } from "next";


export async function generateMetadata() : Promise<Metadata> {
    return {
        title: 'Order Page',
    };
}

const User = () => {
    return(
        <OrderPage />
    )
}

export default User;