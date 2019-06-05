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
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
            />
            <script
                defer
                src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
            />
            <title>Nieuwe app!</title>
        </Head>
        <Header />
        <main className="section">
            <div className="container">{props.children}</div>
        </main>

        <Footer />
    </React.Fragment>
);

export default Layout;
