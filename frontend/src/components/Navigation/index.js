import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Switch, Link, Route } from 'react-router-dom';

function Navigation({ isLoaded }) {
   const sessionUser = useSelector(state => state.session.user);

   return (
      <div className='nav'>
         <ul className='nav-container'>
            <li>
               <NavLink exact to="/">
                  <img src='https://1000logos.net/wp-content/uploads/2023/01/Airbnb-logo-500x281.png' className='logo' />
               </NavLink>
            </li>

            {isLoaded && (
               <li id='profile-button'>
                  <Link exact to="/new-spot">
                     Create a Spot
                  </Link>
                  <ProfileButton user={sessionUser} />
               </li>
            )}
         </ul>
      </div>
   );
}

export default Navigation;
