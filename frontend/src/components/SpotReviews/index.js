import React, { useEffect } from "react";
import { getSingleSpotReviews } from "../../store/reviews";
import { useDispatch, useSelector } from 'react-redux'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import PostReviewModal from "../PostReviewModal";

function SpotReviews({ spot }) {
   const dispatch = useDispatch()

   const reviews = useSelector(state => state.reviews.spot)

   useEffect(() => {
      dispatch(getSingleSpotReviews(spot.id))
   }, [dispatch, spot])

   if (Object.keys(reviews).length === 0 || !reviews) {
      return (
         <div>
            <div className="res-reviews">
               <i class="fa-solid fa-star fa-xl"></i>
               <h2>{spot.avgRating !== 'NaN' ? spot.avgRating : 'New'}</h2>
            </div>
            <p>Be the first to post a review!</p>
         </div>
      )
   }

   const reviewsArr = Object.values(reviews)

   return (
      <div>
         <div className="res-reviews">
            <i class="fa-solid fa-star fa-xl"></i>
            <h2>{spot.avgRating !== 'NaN' ? spot.avgRating : 'New'}</h2>
            <h4 id="bullet">&bull;</h4>
            <h2>{`${spot.numReviews}`} {spot.numReviews === 1 ? "Review" : "Reviews"}</h2>
         </div>
         <button>
            <OpenModalMenuItem
               itemText="Post Your Review"
               modalComponent={<PostReviewModal />}
            />
         </button>
         {reviewsArr.map((review) => {
            return (
               <div>
                  <h4>{review.User.firstName}</h4>
                  <h5>Month, 20##</h5>
                  <p>{review.review}</p>
               </div>
            )
         })}
      </div>
   )
}
export default SpotReviews
