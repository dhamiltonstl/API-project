import { csrfFetch } from "./csrf";

const initialState = {
   spot: {},
   user: {}
}

const USER_REVIEWS = "reviews/userReviews"
const SPOT_REVIEW = "reviews/spotReview"

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

export const getReviews = () => async (dispatch) => {
   const res = await csrfFetch("/api/reviews/current", {
      method: 'GET'
   });
   const data = await res.json();

   dispatch(userReviews({ ...data.Reviews }))
   return res;
}

export const getSingleSpotReview = () => async (dispatch) => {

   const res = await fetch(`/api/spots/1/reviews`, {
      method: 'GET'
   });
   const data = await res.json();

   dispatch(spotReview({ ...data.Reviews }))
   return res;
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
      // case USER_SPOTS:
      //    newState
      //    return newState

      default:
         return state
   }
}

export default reviewReducer;
