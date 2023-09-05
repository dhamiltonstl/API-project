import React from "react";
import { useDispatch } from "react-redux";
import { getUserSpots, deleteUserSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import "./DeleteSpot.css";

function DeleteSpotModal({ spot }) {
   const dispatch = useDispatch()
   const { closeModal } = useModal()
   const history = useHistory()

   const handleDelete = () => {
      dispatch(deleteUserSpot(spot))
      dispatch(getUserSpots())
      closeModal()
   }

   return (
      <div className="confirm-container">
         <h2>Confirm Delete</h2>
         <h4>Are you sure you want to remove this spot from the listings?</h4>
         <button
            id="yes-button"
            onClick={handleDelete}
            type="submit"
         >Yes (Delete Spot)</button>
         <button
            id="no-button"
            onClick={() => closeModal()}
         >No (Keep Spot)</button>
      </div>
   )
}
export default DeleteSpotModal
