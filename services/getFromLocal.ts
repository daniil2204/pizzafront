export const getBucketFromLocal = () => {
    let data = localStorage.getItem('bucket');
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

export const getBucketLengthFromLocal = () => {
    let data = localStorage.getItem('bucketLength');
    if (data) {
        return JSON.parse(data);
    }
    return 0;
}

export const getBucketPriceFromLocal = () => {
    let data = localStorage.getItem('price');
    if (data) {
        return JSON.parse(data);
    }
    return 0;
}