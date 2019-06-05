import * as React from 'react';
import Head from 'next/head';
import Header from './elements/header/header';
import Footer from './elements/footer/footer';

export interface LayoutProps {
    children?: any;
}

const Layout: React.FC<LayoutProps> = props => (
    <React.Fragment>
        <Head>
            <title>Nieuwe app!</title>
        </Head>
        <Header />
        <main>
            <div className="container">{props.children}</div>
        </main>

        <Footer />
    </React.Fragment>
);

export default Layout;
