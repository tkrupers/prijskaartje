import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { useContext, createContext, Component } from 'react';
import { User } from '../types/user';
import * as Next from 'next';
import nextCookie from 'next-cookies';
import { isBrowser } from '../utils/browser';

type SignupProps = {
    email: string;
    password: string;
};

type LoginProps = SignupProps;

const isomorphicEndpoint = (path: string) =>
    `${process.env.API_CLIENT_URL}/api${path}`;

const handleResponse = (response: any): Promise<any> => {
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

    return fetch(path, combinedInit);
};

export const useSignUp = async ({ email, password }: SignupProps) => {
    const result = await getFetch(isomorphicEndpoint('/user'), {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    return await handleResponse(result);
};

export const useLogin = async ({ email, password }: LoginProps) => {
    const result = await getFetch(isomorphicEndpoint('/auth/login'), {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    return await handleResponse(result);
};

export const useSignOut = async () => {
    const result = await getFetch(isomorphicEndpoint('/auth/logout'), {
        method: 'POST',
    });

    document.cookie = `isSignedIn=;expires=${new Date(0)}`;
    document.location.href = '/login';
};

export const fetchMe = async () => {
    const result = await getFetch(isomorphicEndpoint(`/user`));

    return await handleResponse(result);
};

const MyContext = createContext<User | null>(null);

export const useMe = () => useContext(MyContext);

export const withAuth = (WrappedComponent: any) =>
    class extends Component {
        static async getInitialProps(ctx: Next.NextContext) {
            auth(ctx);

            const user = await fetchMe();

            const componentProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx));

            return {
                ...componentProps,
                user,
            };
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

export const auth = (ctx: Next.NextContext) => {
    if (isBrowser()) {
        return /isSignedIn=.+(;|$)/.test(document.cookie);
    }

    const { isSignedIn } = nextCookie(ctx);

    if (ctx.req && ctx.res && !isSignedIn) {
        ctx.res.writeHead(302, { Location: '/login' });
        ctx.res.end();
        return;
    }

    // We already checked for server. This should only happen on client.
    if (!isSignedIn) {
        Router.push('/login');
    }

    return isSignedIn;
};
