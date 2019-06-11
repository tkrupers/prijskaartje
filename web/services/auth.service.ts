import fetch from 'isomorphic-unfetch';

type SignupProps = {
    username: string;
    password: string;
};

type LoginProps = SignupProps;

const isomorphicEndpoint = (path: string) => `${process.env.API_CLIENT_URL}/api${path}`;

const handleResponse = (response: any): Object | Error => {
    if (!response.ok) {
        return response
            .json()
            .catch(() => {
                if (response.status === 401) {
                    throw new Error('wrong username or password');
                }

                if (response.status === 403) {
                    throw new Error('geen toegang');
                }

                throw new Error(response.status);
            })
            .then(({ message }: { message: string }) => {
                throw new Error(message || response.status);
            });
    }

    return response.json();
};


export const getFetch = (path: string, init: any = {}, jwtToken?: string) => {
    const defaultInit = {
        method: 'GET',
        credentials: 'include',
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

    return fetch(path, combinedInit)
}

export const useSignUp = async ({ username, password }: SignupProps) => {
    const result = await getFetch(isomorphicEndpoint('/user'), {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

    return await handleResponse(result);
};

export const useLogin = async ({ username, password }: LoginProps) => {
    const result = await getFetch(isomorphicEndpoint('/auth/login'), {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

    return await handleResponse(result);
};


export const testFetch = async () => {
    const result = await getFetch(isomorphicEndpoint('/auth/test'));

    return await handleResponse(result);
};
