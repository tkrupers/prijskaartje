import { shallow } from 'enzyme';
import Header from './header';

describe('Header component', () => {
    const header = shallow(<Header />);

    it('should be defined', () => {
        expect(header).toBeDefined();
    });

    it('should render a nav bar with 2 links if not authorized', () => {
        expect(header.find('nav ul').children()).toHaveLength(2);
    });

    it('should render a nav bar with 4 links if authorized', () => {
        const authHeader = shallow(<Header isAuthorized={true} />);
        expect(authHeader.find('nav ul').children()).toHaveLength(4);
    });
});
