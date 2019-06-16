import { NextFC } from 'next';
import * as React from 'react';
import { User } from '../../types/user';

const i18n = require('./i18n.json');

export type Props = {
    user?: User;
}

const ProfileDetails: NextFC<Props> = ({ user }) => {
    if (!user) return null;
    
    const { name, email } = user;

    return (
        <React.Fragment>
            <div>
                <h1>{i18n.title}</h1>
                <p>Welkom terug {name ? name.firstName : email}</p>
            </div>
        </React.Fragment>
    );
};

export default ProfileDetails;
