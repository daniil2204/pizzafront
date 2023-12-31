import UserPage from '@/components/user/userPage/userPage';
import { Metadata } from "next";


export async function generateMetadata() : Promise<Metadata> {
    return {
        title: 'User Page',
    };
}

const User = () => {
    return(
        <UserPage />
    )
}

export default User;