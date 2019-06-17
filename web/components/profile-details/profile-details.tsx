import { NextFC } from 'next';
import * as React from 'react';
import { User } from '../../types/user';
import { usePatchProfile } from '../../services/user.service';

const { useState, useCallback } = React;

const i18n = require('./i18n.json');

export type Props = {
    user?: User;
};

const normalizeBirthday = (date: any) =>
    new Date(date).toISOString().substr(0, 10);

const ProfileDetails: NextFC<Props> = ({ user }) => {
    if (!user) return null;

    const { name, email, birth, emailPreferences } = user;
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState((name && name.firstName) || '');
    const [lastName, setLastName] = useState((name && name.lastName) || '');
    const [birthday, setBirthday] = useState(normalizeBirthday(birth) || '');
    const [emailPromotions, setEmailPromotions] = useState(
        (emailPreferences && emailPreferences.promotions) || true,
    );
    const [emailNews, setEmailNews] = useState(
        (emailPreferences && emailPreferences.news) || true,
    );

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Down') {
            e.preventDefault();
        }
    };

    const handleSave = useCallback(async () => {
        const userData = {
            birth: birthday,
            name: { firstName, lastName },
            emailPreferences: {
                promotions: emailPromotions,
                news: emailNews,
            },
        };

        try {
            const result = await usePatchProfile(userData);
            console.log(result);
        } catch (error) {
            setError(error.message);
        }
    }, [firstName, lastName, birthday, emailPromotions, emailNews]);

    const handleEmailRadioBox = useCallback(
        e => {
            const { value, name } = e.target;
            if (name === 'promotions') {
                return setEmailPromotions(value === 'yes');
            } else {
                return setEmailNews(value === 'yes');
            }
        },
        [emailPromotions],
    );

    const updateFirstName = useCallback(({ target }) => {
        setError('');
        setFirstName(target.value);
    }, []);

    const updateLastName = useCallback(({ target }) => {
        setError('');
        setLastName(target.value);
    }, []);

    const updateBirthday = useCallback(({ target }) => {
        setError('');
        setBirthday(target.value);
    }, []);

    return (
        <React.Fragment>
            <div>
                <h1>{i18n.title}</h1>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Email</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded has-icons-left has-icons-right">
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                disabled
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope" />
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-nomrmal">
                    <label className="label">Voornaam</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded">
                            <input
                                className="input"
                                type="text"
                                placeholder="Voornaam"
                                value={firstName}
                                onChange={updateFirstName}
                            />
                        </p>
                    </div>

                    <div className="field">
                        <p className="control is-expanded">
                            <input
                                className="input"
                                type="text"
                                placeholder="Achternaam"
                                value={lastName}
                                onChange={updateLastName}
                            />
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                ::-webkit-calendar-picker-indicator {
                    display: none;
                }
            `}</style>
            <div className="field is-horizontal">
                <div className="field-label is-nomrmal">
                    <label className="label">Verjaardag</label>
                </div>
                <div className="field-body">
                    <p className="control is-expanded">
                        <input
                            className="input date-picker"
                            type="date"
                            placeholder="Verjaardag"
                            name="birth"
                            value={birthday}
                            onChange={updateBirthday}
                            onKeyPress={handleKeyPress}
                        />
                    </p>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label">
                    <label className="label">Email voorkeuren</label>
                </div>

                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="field-label">
                            <label className="label">promoties</label>
                        </div>
                        <div className="control">
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="promotions"
                                    defaultChecked
                                    onChange={handleEmailRadioBox}
                                />
                                Ja
                            </label>
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="promotions"
                                    onChange={handleEmailRadioBox}
                                />
                                Nee
                            </label>
                        </div>
                    </div>
                    <div className="field is-narrow">
                        <div className="field-label">
                            <label className="label">nieuws</label>
                        </div>
                        <div className="control">
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="news"
                                    defaultChecked
                                    onChange={handleEmailRadioBox}
                                />
                                Ja
                            </label>
                            <label className="radio">
                                <input
                                    type="radio"
                                    name="news"
                                    onChange={handleEmailRadioBox}
                                />
                                Nee
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label" />
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <button
                                className="button is-primary"
                                onClick={handleSave}
                            >
                                Opslaan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProfileDetails;
