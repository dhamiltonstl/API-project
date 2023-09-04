import React from "react";

function ReservationButton({ spot }) {
   console.log("spot: ", spot)
   return (
      <div className="reservation">
         <div className="res-details">
            <div className="res-price">
               <h2>{`$${spot.price}`}</h2>
               <h4>night</h4>
            </div>
            <div className="res-reviews">
               <i class="fa-solid fa-star"></i>
               <h4>{spot.avgRating !== 'NaN' ? spot.avgRating : 'New'}</h4>
               <h4 id="bullet">&bull;</h4>
               <h4>{`${spot.numReviews} reviews`}</h4>
            </div>
         </div>
         <div className="res-button">
            <button id="res-button">Reserve</button>
         </div>
      </div>
   )
}
export default ReservationButton;
