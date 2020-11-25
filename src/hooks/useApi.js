import { useState } from 'react';

export const useApi = (apiFunc) => {
    const [error, setError] = useState(false);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        setError(false);
        setData(null);
        const response = await apiFunc(...args);
        setLoading(false);
        console.log('response', response);
        if (!response.ok)
            return setError(response.data?.message[0]?.messages[0]?.message);
        setError(false);
        setData(response.data);
        return response;
    };

    return { error, loading, data, request };
};
