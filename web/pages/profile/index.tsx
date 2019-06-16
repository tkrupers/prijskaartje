import { NextFC } from 'next';
import Layout from '../../components/layout/layout';
import { HeadMeta } from '../../types/meta';
import ProfileDetails from '../../components/profile-details/profile-details';
import { withAuth } from '../../services/auth.service';
import { User } from '../../types/user';

export interface Props {
    headMeta: HeadMeta;
    user?: User;
}

const i18n = require('./i18n.json');

const Profile: NextFC<Props> = ({ headMeta, user }) => (
    <Layout {...headMeta}>
        <h1>{i18n.title}</h1>

        <ProfileDetails user={user} />
    </Layout>
);

Profile.getInitialProps = async () => ({
    headMeta: {
        canonical: '',
        description: '',
        title: `${process.env.APP_NAME} | ${i18n.title}`,
    },
});

export default withAuth(Profile);
