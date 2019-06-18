import { NextFC } from 'next';

type Props = {
    title: string;
    color?:
        | 'primary'
        | 'info'
        | 'success'
        | 'warning'
        | 'danger'
        | 'light'
        | 'dark';
    subtitle?: string;
    size?: 'small' | 'medium' | 'large' | 'fullheight';
    gradient?: boolean;
};

const Hero: NextFC<Props> = ({ title, subtitle, color, gradient, size }) => {
    return (
        <section
            className={`hero ${color ? `is-${color}` : ''} ${
                gradient ? 'is-bold' : ''
            } ${size ? `is-${size}` : ''}`}
        >
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">{title}</h1>
                    {subtitle && <h2 className="subtitle">{subtitle}</h2>}
                </div>
            </div>
        </section>
    );
};

export default Hero;
