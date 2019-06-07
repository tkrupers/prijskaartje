import * as React from 'react';
import Layout from '../components/layout/layout';
import { HeadMeta } from '../types/meta';

export interface RegisterProps {
    headMeta: HeadMeta;
}

const Register: React.FC<RegisterProps> = ({ headMeta }) => (
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
