import { getFetch, isomorphicEndpoint, handleResponse } from '../utils/fetch';
import { User } from '../types/user';

export const usePatchProfile = async (values: Partial<User>) => {
    const result = await getFetch(isomorphicEndpoint('/user'), {
        method: 'PATCH',
        body: JSON.stringify(values),
    });

    return await handleResponse(result);
};