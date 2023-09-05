import { csrfFetch } from "./csrf";

const initialState = {
   spot: {},
   user: {}
}

const USER_REVIEWS = "reviews/userReviews"
const SPOT_REVIEW = "reviews/spotReview"
const CREATE_REVIEW = "reviews/createReview"

const userReviews = (reviews) => {
   return {
      type: USER_REVIEWS,
      reviews: reviews
   }
}

const spotReview = (review) => {
   return {
      type: SPOT_REVIEW,
      spot: review
   }
}

const createReview = (review) => {
   return {
      type: CREATE_REVIEW,
      review: review
   }
}

export const getReviews = () => async (dispatch) => {
   const res = await csrfFetch("/api/reviews/current", {
      method: 'GET'
   });
   const data = await res.json();

   dispatch(userReviews({ ...data.Reviews }))
   return res;
}

export const getSingleSpotReviews = (spotId) => async (dispatch) => {

   const res = await fetch(`/api/spots/${spotId}/reviews`, {
      method: 'GET'
   });
   const data = await res.json();

   dispatch(spotReview({ ...data.Reviews }))
   return res;
}

export const createSpotReview = (spotReview) => async (dispatch) => {

   const { review, stars, spotId } = spotReview;

   const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         review,
         stars
      })
   })
   const data = await res.json()

   dispatch(createReview(data))
   return data
}

const reviewReducer = (state = initialState, action) => {
   let newState;
   switch (action.type) {

      case USER_REVIEWS:
         newState = { ...state, user: { ...action.reviews } };
         return newState;

      case SPOT_REVIEW:
         newState = { ...state, spot: { ...action.spot } }
         return newState;
      case CREATE_REVIEW:
         newState = { ...state, spot: { ...action.review } }
      default:
         return state
   }
}

export default reviewReducer;
