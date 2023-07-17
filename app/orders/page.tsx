import UserOrdersPage from "@/components/userOrdersPage/userOrdersPage";
import { Metadata } from "next";


export async function generateMetadata() : Promise<Metadata> {
    return {
        title: 'User Orders Page',
    };
}

const OrdersPage = () => {
    return(
        <UserOrdersPage />
    )
}

export default OrdersPage;