import { NextFC } from 'next';
import * as React from 'react';
import { useState, useCallback } from 'react';
import { useLogin } from '../../services/auth.service';
import Router from 'next/router';

const i18n = require('./i18n.json');

const LoginForm: NextFC = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const mayLogin = useCallback(() => {
        return (
            values.email &&
            values.email.length > 3 &&
            (values.password && values.password.length > 3)
        );
    }, [values]);

    const handleLogin = useCallback(() => {
        const { email, password } = values;
        useLogin({ email, password })
            .then(result => {
                if (result.loggedIn) {
                    Router.push('/dashboard');
                }
            })
            .catch(error => setError(error.message));
    }, [values]);

    const handleChange = useCallback(
        ({ target }: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = target;
            setError('');
            setValues({ ...values, [name]: value });
        },
        [values],
    );

    const handleKeyPress = useCallback(
        ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
            if (key === 'Enter') {
                handleLogin();
            }
        },
        [values],
    );

    return (
        <React.Fragment>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder={i18n.email}
                        onKeyPress={handleKeyPress}
                        onChange={handleChange}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope" />
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder={i18n.password}
                        onKeyPress={handleKeyPress}
                        onChange={handleChange}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock" />
                    </span>
                </p>
            </div>

            <div className="field">
                <p className="control">
                    <button
                        className="button is-success"
                        onClick={handleLogin}
                        disabled={!mayLogin()}
                    >
                        {i18n.button}
                    </button>
                </p>
            </div>
            {error}
        </React.Fragment>
    );
};

export default LoginForm;
