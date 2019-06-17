import fetch from 'isomorphic-unfetch';

export const isomorphicEndpoint = (path: string) =>
`${process.env.API_CLIENT_URL}/api${path}`;

export const handleResponse = (response: any): Promise<any> => {
if (!response.ok) {
    if (response.status === 400) {
        return response.json();
    }

    return response
        .json()
        .catch(() => {
            if (response.status === 401) {
                throw new Error('wrong email or password');
            }

            if (response.status === 403) {
                throw new Error('geen toegang');
            }

            if (response.status === 409) {
                throw new Error('email al in gebruik');
            }

            throw new Error(response.status);
        })
        .then(({ message }: { message: string }) => {
            throw new Error(message || response.status);
        });
}

return response.json();
};

export const getFetch = (path: string, init: any = {}) => {
const defaultInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};

const combinedInit = {
    ...defaultInit,
    ...init,
    headers: {
        ...defaultInit.headers,
        ...init.headers,
    },
};

return fetch(path, combinedInit);
};