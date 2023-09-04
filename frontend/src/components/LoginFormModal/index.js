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

   return (
      <div className="login-modal">
         <h1>Log In</h1>
         <form onSubmit={handleSubmit}>
            <div className="login-form">
               <div>
                  <input
                     type="text"
                     value={credential}
                     onChange={(e) => setCredential(e.target.value)}
                     required
                     placeholder="Username or Email"
                  />
               </div>
               <div>
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
                     <p>{errors.credential}</p>
                  )}
               </div>
            </div>
            <div id="submit-button">
               <button type="submit">Log In</button>
            </div>
         </form>
      </div >
   );
}

export default LoginFormModal;
