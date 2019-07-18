import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {
  shallow,
  mount,
  render,
  configure
} from 'enzyme';
import AdminPage from '../Admin';
import renderer from 'react-test-renderer'

configure({
  adapter: new Adapter()
});

// describe what we are testing
describe('Login Component', () => {

  // make our assertion and what we expect to happen
  it('should render without throwing an error', () => {
    const component = shallow( < AdminPage / > );
    expect(component).toHaveLength(1);
  });
  it('matches the snapshot', () => {
    const tree = renderer.create( < AdminPage / > ).toJSON();
    expect(tree).toMatchSnapshot();

  })


})
