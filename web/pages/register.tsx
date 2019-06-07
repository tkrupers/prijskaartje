import { NextFC } from 'next';
import Layout from '../components/layout/layout';
import { HeadMeta } from '../types/meta';

export interface Props {
    headMeta: HeadMeta;
}

const Register: NextFC<Props> = ({ headMeta }) => (
    <Layout {...headMeta}>
        <h1>Register</h1>
    </Layout>
);

Register.getInitialProps = async () => ({
    headMeta: {
        canonical: '',
        description: '',
        title: `${process.env.APP_NAME} | Log in`,
    },
});

export default Register;
