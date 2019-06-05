import * as React from 'react';
import Link from 'next/link';

const i18n = require('./i18n.json');

export interface HeaderProps {
    isAuthorized?: boolean;
}

const logout = () => console.log('logout');

const Header: React.FC<HeaderProps> = ({ isAuthorized }) => (
    <header>
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        <a>{i18n.home}</a>
                    </Link>
                </li>
                <li>
                    <Link href="/register">
                        <a>{i18n.register}</a>
                    </Link>
                </li>

                {isAuthorized && (
                    <React.Fragment>
                        <li>
                            <Link href="/profiel">
                                <a>{i18n.profile}</a>
                            </Link>
                        </li>
                        <li>
                            <button onClick={logout}>
                                <a>{i18n.logout}</a>>
                            </button>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        </nav>
    </header>
);

export default Header;
