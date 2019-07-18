import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render, configure } from 'enzyme';
import SignInPage from '../SignIn';
configure({adapter: new Adapter()});

// describe what we are testing
describe('Login Component', () => {

 // make our assertion and what we expect to happen
 it('should render without throwing an error', () => {
   const component = shallow(<SignInPage />);
    expect(component).toHaveLength(1);

})
})
