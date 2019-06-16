import { NextFC } from 'next';
import Layout from '../../components/layout/layout';
import { HeadMeta } from '../../types/meta';
import RegistrationForm from '../../components/registration-form/registration-form';

const i18n = require('./i18n.json');

export interface Props {
    headMeta: HeadMeta;
}

const Register: NextFC<Props> = ({ headMeta }) => (
    <Layout {...headMeta}>
        <h1>{i18n.title}</h1>

        <RegistrationForm />
    </Layout>
);

Register.getInitialProps = async () => ({
    headMeta: {
        canonical: '',
        description: '',
        title: `${process.env.APP_NAME} | ${i18n.title}`,
    },
});

export default Register;
