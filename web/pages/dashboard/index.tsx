import { NextFC } from 'next';
import Layout from '../../components/layout/layout';
import { HeadMeta } from '../../types/meta';
import { withAuth } from '../../services/auth.service';
import { User } from '../../types/user';
import LineGraph from '../../components/graph/line/line-graph';

export interface Props {
    headMeta: HeadMeta;
    user?: User;
}

const i18n = require('./i18n.json');

const Dashboard: NextFC<Props> = ({ headMeta }) => (
    <Layout {...headMeta}>
        <div style={{height: '500px'}}>
            <LineGraph />
        </div>
    </Layout>
);

Dashboard.getInitialProps = async () => ({
    headMeta: {
        canonical: '',
        description: '',
        title: `${process.env.APP_NAME} | ${i18n.title}`,
    },
});

export default withAuth(Dashboard);
