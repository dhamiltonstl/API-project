import React, { useState } from "react";
import './PostReviewModal.css'
import { useDispatch, useSelector } from "react-redux";
import { createSpotReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";


function PostReviewModal() {
   const dispatch = useDispatch()

   const [review, setReview] = useState("")
   const [stars, setStars] = useState(0)
   const [hover, setHover] = useState(0)
   const [errors, setErrors] = useState({})
   const { closeModal } = useModal();


   const spotId = useSelector((state) => state.spots.singleSpot.id)

   const handleSubmit = (e) => {
      // e.preventDefault()
      setErrors({})
      const data = {
         spotId,
         review,
         stars
      }
      return dispatch(createSpotReview(data))
         .then(closeModal)
         .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
               setErrors(data.errors)
            }
         })
   }

   return (
      <div className="post-review-modal">
         <form onSubmit={handleSubmit}>
            <div className="post-review-form">
               <h2>How was your stay?</h2>
               <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  id="review"
                  placeholder="Leave your review here..."
               />
               <div className="stars">
                  <i
                     className={(stars >= 1 || hover >= 1) ? "fa-solid fa-star" : "fa-regular fa-star"}
                     onClick={(e) => setStars(1)}
                     onMouseOver={(e) => setHover(1)}
                     onMouseLeave={(e) => setHover(0)}
                  ></i>
                  <i
                     className={(stars >= 2 || hover >= 2) ? "fa-solid fa-star" : "fa-regular fa-star"}
                     onClick={(e) => setStars(2)}
                     onMouseOver={(e) => setHover(2)}
                     onMouseLeave={(e) => setHover(0)}
                  ></i>
                  <i
                     className={(stars >= 3 || hover >= 3) ? "fa-solid fa-star" : "fa-regular fa-star"}
                     onClick={(e) => setStars(3)}
                     onMouseOver={(e) => setHover(3)}
                     onMouseLeave={(e) => setHover(0)}
                  ></i>
                  <i
                     className={(stars >= 4 || hover >= 4) ? "fa-solid fa-star" : "fa-regular fa-star"}
                     onClick={(e) => setStars(4)}
                     onMouseOver={(e) => setHover(4)}
                     onMouseLeave={(e) => setHover(0)}
                  ></i>
                  <i
                     className={(stars >= 5 || hover >= 5) ? "fa-solid fa-star" : "fa-regular fa-star"}
                     onClick={(e) => setStars(5)}
                     onMouseOver={(e) => setHover(5)}
                     onMouseLeave={(e) => setHover(0)}
                  ></i>
                  <h4>Stars</h4>
               </div>
               {errors.review && (
                  <p id="error">{errors.review}</p>
               )}
               {errors.stars && (
                  <p id="error">{errors.stars}</p>
               )}
               <button id="review-submit-button" type="submit">Submit Your Review</button>
            </div>
         </form>
      </div >
   )
}
export default PostReviewModal
