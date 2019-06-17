import Router from 'next/router';
import { useContext, createContext, Component } from 'react';
import { User } from '../types/user';
import * as Next from 'next';
import nextCookie from 'next-cookies';
import { isBrowser } from '../utils/browser';
import { getFetch, isomorphicEndpoint, handleResponse } from '../utils/fetch';

type SignupProps = {
    email: string;
    password: string;
};

type LoginProps = SignupProps;


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
            const componentProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx));

            try {
                const user = await fetchMe();

                return {
                    ...componentProps,
                    user,
                };
            } catch (error) {
                console.log(error.message);
                return {
                    ...componentProps,
                };
            }
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
