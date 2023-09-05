import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/spots";
import SpotCard from "../LandingPage/SpotCard";
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./ManageSpots.css"

function ManageSpotsPage() {
   const dispatch = useDispatch()
   const spots = useSelector((state) => state.spots.allSpots)

   useEffect(() => {
      dispatch(getUserSpots())
   }, [dispatch])

   if (Object.keys(spots).length === 0) {
      return null;
   }


   const spotsArr = Object.values(spots)

   return (
      <div className='spot-card-page'>

         <div className='card-container'>
            {spotsArr.map((spot) => (
               <div>
                  <SpotCard className='spot-card' spot={spot} />
                  <div className="manage-buttons">
                     <Link to={`/spots/${spot.id}/edit`}>
                        <button>Update</button>
                     </Link>
                     <button className="delete-button">
                        <OpenModalMenuItem
                           itemText="Delete"
                           modalComponent={<DeleteSpotModal spot={spot} />}
                        />
                     </button>
                  </div>
               </div>
            ))}
         </div>

      </div>
   )
}
export default ManageSpotsPage
