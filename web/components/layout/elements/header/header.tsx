import * as React from 'react';
import Link from 'next/link';

const i18n = require('./i18n.json');

export interface HeaderProps {
    isAuthorized?: boolean;
}

const logout = () => console.log('logout');

const Header: React.FC<HeaderProps> = ({ isAuthorized }) => {
    const [active, setActive] = React.useState(false);

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
                                {isAuthorized ? (
                                    <React.Fragment>
                                        <li>
                                            <Link href="/profiel">
                                                <a>{i18n.profile}</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <button>
                                                <a
                                                    className="button is-light"
                                                    onClick={logout}
                                                >
                                                    {i18n.logout}
                                                </a>
                                                >
                                            </button>
                                        </li>
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
