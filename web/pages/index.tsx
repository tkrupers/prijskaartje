import * as React from 'react';
import { NextFC } from 'next';
import Layout from '../components/layout/layout';
import '../style.css';
import { HeadMeta } from '../types/meta';

const i18n = require('./i18n.json');

export type Props = {
    headMeta: HeadMeta;
}

const Home: NextFC<Props> = ({ headMeta }) => (
    <Layout {...headMeta}>
        <h1>{i18n.title}</h1>
    </Layout>
);

Home.getInitialProps = async () => ({
    headMeta: {
        canonical: '',
        description: '',
        title: `${process.env.APP_NAME} | ${i18n.title}`,
    },
});

export default Home;
