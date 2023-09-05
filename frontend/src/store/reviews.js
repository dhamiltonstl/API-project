import { csrfFetch } from "./csrf";

const initialState = {
   spot: {},
   user: {}
}

const USER_REVIEWS = "reviews/userReviews"
const SPOT_REVIEW = "reviews/spotReview"
const CREATE_REVIEW = "reviews/createReview"
const DELETE_REVIEW = "reviews/deleteReview"

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

const deleteReview = (review) => {
   return {
      type: DELETE_REVIEW,
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

export const deleteUserReview = (review) => async (dispatch) => {
   const reviewId = review.id
   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
   })
   const data = await res.json()
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
      case DELETE_REVIEW:
         newState = { ...state, user: { ...state.reviews } }
         delete newState.user[action.review]
         return newState
      default:
         return state
   }
}

export default reviewReducer;
