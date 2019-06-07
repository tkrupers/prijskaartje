import * as React from 'react';
import Layout from '../components/layout/layout';
import { HeadMeta } from '../types/meta';

export interface LoginProps {
    headMeta: HeadMeta;
}

const Login: React.FC<LoginProps> = ({ headMeta }) => (
    <Layout {...headMeta}>
        <h1>Login</h1>
    </Layout>
);

Login.getInitialProps = async () => ({
    headMeta: {
        canonical: '',
        description: '',
        title: `${process.env.APP_NAME} | Log in`,
    },
});

export default Login;
