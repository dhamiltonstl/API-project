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
            <button className="post-review-button">
               <OpenModalMenuItem
                  itemText="Post Your Review"
                  modalComponent={<PostReviewModal />}
               />
            </button>
            <p>Be the first to post a review!</p>
         </div>
      )
   }

   const reviewsArr = Object.values(reviews)
   const revReviewsArr = reviewsArr.reverse()

   const getDate = (review) => {
      console.log("HIT")
      const year = review.createdAt.slice(0, 4)
      const monthNum = review.createdAt.slice(5, 7)
      console.log(year, monthNum)
      const monthsObj = {
         "01": "Jan",
         "02": "Feb",
         "03": "Mar",
         "04": "Apr",
         "05": "May",
         "06": "Jun",
         "07": "Jul",
         "08": "Aug",
         "09": "Sep",
         "10": "Oct",
         "11": "Nov",
         "12": "Dec"
      }
      return (
         <h5>{monthsObj[monthNum]}, {year}</h5>
      )
   }

   return (
      <div>
         <div className="res-reviews">
            <i class="fa-solid fa-star fa-xl"></i>
            <h2>{spot.avgRating !== 'NaN' ? spot.avgRating : 'New'}</h2>
            <h4 id="bullet">&bull;</h4>
            <h2>{`${spot.numReviews}`} {spot.numReviews === 1 ? "Review" : "Reviews"}</h2>
         </div>
         <button className="post-review-button">
            <OpenModalMenuItem
               itemText="Post Your Review"
               modalComponent={<PostReviewModal />}
            />
         </button>
         {revReviewsArr.map((review) => {
            return (
               <div>
                  <h4>{review.User.firstName}</h4>
                  {getDate(review)}
                  <p>{review.review}</p>
               </div>
            )
         })}
      </div>
   )
}
export default SpotReviews
