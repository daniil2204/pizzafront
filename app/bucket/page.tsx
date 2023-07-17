import Bucket from "@/components/bucket/bucket";
import { Metadata } from "next";


export async function generateMetadata() : Promise<Metadata> {
    return {
        title: 'Pizza Bucket',
    };
}

const BucketPage = () => {
    return(
        <Bucket />
    )
}

export default BucketPage;