import { csrfFetch } from "./csrf";

const initialState = {
   user: {},
   spot: {}
}

const USER_BOOKINGS = "reviews/userBookingss"
const SPOT_BOOKINGS = "reviews/spotBookings"

const userBookings = (bookings) => {
   return {
      type: USER_BOOKINGS,
      bookings: bookings
   }
}

const spotBookings = (bookings) => {
   return {
      type: SPOT_BOOKINGS,
      spot: bookings
   }
}

export const getBookings = () => async (dispatch) => {
   const res = await csrfFetch("/api/bookings/current", {
      method: 'GET'
   });
   const data = await res.json();

   dispatch(userBookings({ ...data.Bookings }))
   return res;
}

export const getSingleSpotBookings = () => async (dispatch) => {

   const res = await fetch(`/api/spots/1/bookings`, {
      method: 'GET'
   });
   const data = await res.json();

   dispatch(spotBookings({ ...data }))
   return res;
}

const bookingReducer = (state = initialState, action) => {
   let newState;
   switch (action.type) {

      case USER_BOOKINGS:
         newState = { ...state, user: { ...action.bookings } };
         return newState;

      case SPOT_BOOKINGS:
         newState = { ...state, spot: { ...action.spot } }
         return newState;

      default:
         return state
   }
}

export default bookingReducer;
