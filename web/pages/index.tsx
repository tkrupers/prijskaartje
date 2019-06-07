import * as React from 'react';
import Layout from '../components/layout/layout';
import '../style.css';
import { HeadMeta } from '../types/meta';

export interface HomeProps {
    headMeta: HeadMeta;
}

const Home: React.FC<HomeProps> = ({ headMeta }) => (
    <Layout {...headMeta}>
        <h1>Nieuwe app jo</h1>
    </Layout>
);

Home.getInitialProps = async () => ({
    headMeta: {
        canonical: '',
        description: '',
        title: `${process.env.APP_NAME} | Home`,
    },
});

export default Home;
