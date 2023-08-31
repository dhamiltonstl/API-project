// import { csrfFetch } from "./csrf";

const initialState = {
   spot: {},
   user: {}
}

const USER_REVIEWS = "reviews/userReviews"

const userReviews = (reviews) => {
   return {
      type: USER_REVIEWS,
      reviews: reviews
   }
}

export const getReviews = () => async (dispatch) => {
   const res = await fetch("/api/reviews/current", {
      method: 'GET'
   });
   const data = await res.json();

   dispatch(userReviews({ ...data.Reviews }))
   return res;
}

const reviewReducer = (state = initialState, action) => {
   let newState;
   switch (action.type) {

      case USER_REVIEWS:
         newState = { ...state, user: { ...action.reviews } };
         return newState;

      // case SINGLE_REVIEW:
      //    newState = { ...state, singleSpot: { ...action.spot } }
      //    return newState;
      // case USER_SPOTS:
      //    newState
      //    return newState

      default:
         return state
   }
}

export default reviewReducer;
