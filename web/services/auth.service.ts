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

                throw new Error(response.status);
            })
            .then(({ message }: { message: string }) => {
                throw new Error(message || response.status);
            });
    }

    return response.json();
};

export const useSignUp = async ({ username, password }: SignupProps) => {
    const result = await fetch(isomorphicEndpoint('/user'), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    return await handleResponse(result);
};

export const useLogin = async ({ username, password }: LoginProps) => {
    const result = await fetch(isomorphicEndpoint('/auth/login'), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    return await handleResponse(result);
};
