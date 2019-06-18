import * as React from 'react';
import Head from 'next/head';
import Header from './elements/header/header';
import Footer from './elements/footer/footer';
import { HeadMeta } from '../../types/meta';

export interface LayoutProps extends HeadMeta {
    children?: any;
}

const Layout: React.FC<LayoutProps> = ({
    title,
    description,
    canonical,
    children,
}) => (
    <React.Fragment>
        <Head>
            <meta
                key="viewport"
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={description} key="description" />
            <link rel="canonical" href={canonical} key="canonical"/>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
            />
            <script
                defer
                src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
            />
            <title>{title}</title>
        </Head>
        <Header />
        <section className="section">
            <div className="container">{children}</div>
        </section>

        <Footer />
    </React.Fragment>
);

export default Layout;
