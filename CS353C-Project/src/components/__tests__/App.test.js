import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure, render} from 'enzyme';

import App from '../App';
configure({adapter: new Adapter()});

describe('<App />', () => {
  it('should render without throwing an error', () => {
    const component = shallow(<App />);
    expect(component).toHaveLength(1);
  });
});
