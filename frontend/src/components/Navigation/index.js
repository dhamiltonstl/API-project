import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
   const sessionUser = useSelector(state => state.session.user);

   return (
      <ul className='nav-container'>
         <li>
            <NavLink exact to="/">
               <img src='https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo-500x281.png' className='logo' />
            </NavLink>
         </li>
         {isLoaded && (
            <li>
               <ProfileButton user={sessionUser} />
            </li>
         )}
      </ul>
   );
}

export default Navigation;
