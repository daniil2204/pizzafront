import UserLogin from '@/components/user/userLogin/userLogin';
import { Metadata } from "next";


export async function generateMetadata() : Promise<Metadata> {
    return {
        title: 'Login',
    };
}

const Login = () => {
    return(
        <UserLogin />
    )
}

export default Login;