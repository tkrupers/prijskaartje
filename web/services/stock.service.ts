import { getFetch, isomorphicEndpoint, handleResponse } from '../utils/fetch';

export const useGetDailyStock = async (ticker: string) => {
    const result = await getFetch(isomorphicEndpoint(`/stock/daily/${ticker}`), {
        method: 'GET',
    });

    return await handleResponse(result);
};