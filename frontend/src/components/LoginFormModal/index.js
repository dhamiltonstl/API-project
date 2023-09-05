import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
   const dispatch = useDispatch();
   const [credential, setCredential] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState({});
   const { closeModal } = useModal();

   const handleSubmit = (e) => {
      e.preventDefault();
      setErrors({});
      return dispatch(sessionActions.login({ credential, password }))
         .then(closeModal)
         .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
               setErrors(data.errors);
            }
         });
   };

   const demoUser = (e) => {
      e.preventDefault();
      return dispatch(
         sessionActions.login({
            credential: "Demo-lition",
            password: "password",
         })
      ).then(closeModal);
   };

   return (
      <div className="login-modal">
         <h1>Log In</h1>
         <form onSubmit={handleSubmit}>
            <div className="login-form">
               <div id="user-name">
                  <input
                     type="text"
                     value={credential}
                     onChange={(e) => setCredential(e.target.value)}
                     required
                     placeholder="Username or Email"
                  />
               </div>
               <div id="password">
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     placeholder="Password"
                  />
               </div>
               <div>
                  {errors.credential && (
                     <p id="error">{errors.credential}</p>
                  )}
               </div>
            </div>
            <div className="submit-button">
               <button
                  id="submit-button"
                  type="submit"
                  disabled={credential.length < 4 || password.length < 6}
               >Log In</button>
            </div>
         </form>
         <h3
            onClick={demoUser}
            id="demo-login"
         >
            Demo User
         </h3>
      </div >
   );
}

export default LoginFormModal;
