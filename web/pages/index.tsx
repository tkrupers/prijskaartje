import * as React from 'react';
import { NextFC } from 'next';
import Layout from '../components/layout/layout';
import '../style.css';
import { HeadMeta } from '../types/meta';

export type Props = {
    headMeta: HeadMeta;
}

const Home: NextFC<Props> = ({ headMeta }) => (
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
