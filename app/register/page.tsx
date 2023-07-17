import UserRegister from '@/components/user/userRegister/userRegister';
import { Metadata } from "next";


export async function generateMetadata() : Promise<Metadata> {
    return {
        title: 'Register',
    };
}

const Register = () => {
    return(
        <UserRegister />
    )
}

export default Register;