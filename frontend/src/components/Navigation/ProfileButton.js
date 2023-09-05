import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Route, Switch, Link } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = useState(false);
   const ulRef = useRef();

   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
         if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
         }
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
   }, [showMenu]);

   const closeMenu = () => setShowMenu(false);

   const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      closeMenu();
   };

   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

   return (
      <>
         <button className="profile-button" onClick={openMenu}>
            <i className="fa-solid fa-bars fa-lg" />
            <i class="fa-solid fa-circle-user fa-2xl"></i>
         </button>
         <ul className={ulClassName} ref={ulRef}>
            {user ? (
               <>
                  <li id="greeting">Hello, {user.username}</li>
                  <li>{user.email}</li>
                  <li id="manage-link">
                     <Link exact to="/spots/current" onClick={closeMenu}>Manage Spots</Link></li>
                  <li>
                     <button id="logout-button" onClick={logout}>Log Out</button>
                  </li>
               </>
            ) : (
               <>
                  <li className="menu-item">
                     <OpenModalMenuItem
                        itemText="Log In"
                        onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                     />
                  </li>
                  <li className="menu-item">
                     <OpenModalMenuItem
                        itemText="Sign Up"
                        onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                     />
                  </li>
               </>
            )}
         </ul>
      </>
   );
}

export default ProfileButton;
