import { NextFC } from 'next';
import Layout from '../components/layout/layout';
import { HeadMeta } from '../types/meta';
import LoginForm from '../components/login-form/login-form';
import { testFetch } from '../services/auth.service';
export interface Props {
    headMeta: HeadMeta;
    result?: any;
}

const Login: NextFC<Props> = ({ headMeta, result }) => (
    <Layout {...headMeta}>
        <h1>Login</h1>
        {result}
        <LoginForm />
    </Layout>
);

Login.getInitialProps = async () => {
    const defaultProps = {
        headMeta: {
            canonical: '',
            description: '',
            title: `${process.env.APP_NAME} | Log in`,
        },
    };

    try {
        const result = await testFetch();

        return {
            result,
            ...defaultProps,
        };
    } catch (error) {
        console.log(error);
        return {
            ...defaultProps,
            result: error.message,
        };
    }
};

export default Login;
