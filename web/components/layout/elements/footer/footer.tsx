import * as React from 'react';

const i18n = require('./i18n.json');

const Footer: React.FC = () => (
    <footer>
        <div className="container">🚀 {i18n.name} ©️ 2019</div>
    </footer>
);

export default Footer;
