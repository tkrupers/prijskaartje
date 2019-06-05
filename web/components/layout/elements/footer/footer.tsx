import * as React from 'react';

const i18n = require('./i18n.json');

const Footer: React.FC = () => (
    <footer className="footer">
        <div className="content has-text-centered">
            <span>🚀 {i18n.name} ©️ 2019</span>
        </div>
    </footer>
);

export default Footer;
