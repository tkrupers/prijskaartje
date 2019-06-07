import { NextFC } from 'next';
import Layout from '../components/layout/layout';
import { HeadMeta } from '../types/meta';
import LoginForm from '../components/login-form/login-form';
export interface Props {
    headMeta: HeadMeta;
}

const Login: NextFC<Props> = ({ headMeta }) => (
    <Layout {...headMeta}>
        <h1>Login</h1>

        <LoginForm />
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
