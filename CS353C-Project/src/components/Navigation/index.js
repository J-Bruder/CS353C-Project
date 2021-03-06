/**The Navigation component uses the Link component of React 
Router to enable navigation to different routes. These routes 
were defined previously in your constants file. Import all 
of them and give every Link component a specific route.*/

/**The Navigation component can be made aware of authenticated 
user to display different options. It should either show the 
available links for an authenticated user or a non authenticated 
user.*/

import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
/**the Navigation component uses the new context to consume the authenticated user*/
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import './navigation.css';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Favourites</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>My Account</Link>
    </li>
     <li>
      <Link to={ROUTES.PROFILE_PAGE}>Profile</Link>
    </li>
    <li>
      <Link to={ROUTES.SAVELINK_PAGE}>Save Links</Link>
    </li>
  
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton  to ='../SignOut'>Sign Out</SignOutButton>
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;