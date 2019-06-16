import * as React from 'react';
import Link from 'next/link';
import { NextFC } from 'next';
import * as Cookie from 'js-cookie';
import { isBrowser } from '../../../../utils/browser';
import { useSignOut } from '../../../../services/auth.service';
const { useState, useEffect, useCallback } = React;
const i18n = require('./i18n.json');

export interface HeaderProps {
    isAuthorized?: boolean;
}

const Header: NextFC<HeaderProps> = () => {
    const [active, setActive] = useState(false);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (isBrowser()) {
            const cookies = Cookie.get();
            const loggedIn = cookies.isSignedIn === 'true';
            setAuthorized(loggedIn);
        }
    });

    const logout = useCallback(() => {
        useSignOut();
    }, []);

    return (
        <header>
            <nav
                className="navbar is-transparent"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <Link href="/">
                        <a className="navbar-item">{i18n.app}</a>
                    </Link>
                    <a
                        role="button"
                        className={`navbar-burger burger ${
                            active ? 'is-active' : ''
                        }`}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbar-home"
                        onClick={() => setActive(!active)}
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>

                <div
                    id="navbar-home"
                    className={`navbar-menu ${active ? 'is-active' : ''}`}
                >
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {authorized ? (
                                    <React.Fragment>
                                        <Link href="/profile">
                                            <a className="button is-primary">
                                                {i18n.profile}
                                            </a>
                                        </Link>
                                        <a
                                            className="button is-light"
                                            onClick={logout}
                                        >
                                            {i18n.logout}
                                        </a>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Link href="/register">
                                            <a className="button is-primary">
                                                {i18n.register}
                                            </a>
                                        </Link>
                                        <Link href="/login">
                                            <a className="button is-light">
                                                {i18n.login}
                                            </a>
                                        </Link>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
