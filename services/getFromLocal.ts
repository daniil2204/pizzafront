export const getBucketFromLocal = () => {
    if (typeof window !== 'undefined') {
        let data = localStorage.getItem('bucket');
        if (data) {
            return JSON.parse(data);
        }
        return [];
    }
}

export const getBucketLengthFromLocal = () => {
    if (typeof window !== 'undefined') {
        let data = localStorage.getItem('bucketLength');
        if (data) {
            return JSON.parse(data);
        }
        return 0;
    }
}

export const getBucketPriceFromLocal = () => {
    if (typeof window !== 'undefined') {
        let data = localStorage.getItem('price');
        if (data) {
            return JSON.parse(data);
        }
        return 0;
    }
}