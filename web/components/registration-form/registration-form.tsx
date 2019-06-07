import * as React from 'react';
import { NextFC } from 'next';
import { useState, useCallback } from 'react';
import { useSignUp } from '../../services/auth.service';
const i18n = require('./i18n.json');

const RegistrationForm: NextFC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const updateUsername = useCallback(({ target }) => {
        setError('');
        setUsername(target.value);
    }, []);

    const updatePassword = useCallback(({ target }) => {
        setError('');
        setPassword(target.value);
    }, []);

    const updatePasswordConfirm = useCallback(({ target }) => {
        setError('');
        setPasswordConfirm(target.value);
    }, []);

    const maySignUp = useCallback(() => {
        return !!(username && password && password === passwordConfirm);
    }, [username, password, passwordConfirm]);

    const handleSignup = useCallback(() => {
        useSignUp({ username, password }).then((result) => {
            console.log(result);
        }).catch(error => setError(error.message));
    }, [username, password]);

    return (
        <React.Fragment>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input
                        className="input"
                        type="email"
                        placeholder={i18n.username}
                        onChange={updateUsername}
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
                        placeholder={i18n.password}
                        onChange={updatePassword}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock" />
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input
                        className="input"
                        type="password"
                        placeholder={i18n.passwordConfirm}
                        onChange={updatePasswordConfirm}
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
                        onClick={handleSignup}
                        disabled={!maySignUp()}
                    >
                        {i18n.button}
                    </button>
                </p>
            </div>
            {error}
        </React.Fragment>
    );
};

export default RegistrationForm;
