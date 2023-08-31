
import { csrfFetch } from "./csrf";
// import { useParams } from "react-router-dom";

const initialState = {
   allSpots: {},
   singleSpot: {}
}

const LOAD_SPOTS = "spots/loadSpots"
const USER_SPOTS = "spots/userSpots"
const SINGLE_SPOT = "spots/singleSpot"

const loadSpots = (spots) => {
   return {
      type: LOAD_SPOTS,
      spots: spots
   }
}

const singleSpot = (spot) => {
   return {
      type: SINGLE_SPOT,
      spot: spot
   }
}

const userSpots = (spots) => {
   return {
      type: USER_SPOTS,
      spots: spots
   }
}

export const getSpots = () => async (dispatch) => {
   const res = await fetch("/api/spots", {
      method: 'GET'
   });
   const data = await res.json();

   dispatch(loadSpots({ ...data.Spots }));
   return res;
};

export const getSingleSpot = () => async (dispatch) => {

   const res = await fetch(`/api/spots/1`, {
      method: 'GET'
   });
   const data = await res.json();

   dispatch(singleSpot({ ...data }))
   return res;
}

export const getUserSpots = () => async (dispatch) => {
   const res = await csrfFetch("/api/spots/current", {
      method: 'GET'
   });
   const data = await res.json();

   dispatch(userSpots({ ...data.Spots }));
   return res;
};



const spotReducer = (state = initialState, action) => {
   let newState;
   switch (action.type) {

      case LOAD_SPOTS:
         newState = { ...state, allSpots: { ...action.spots } };
         return newState;

      case SINGLE_SPOT:
         newState = { ...state, singleSpot: { ...action.spot } }
         return newState;
      // case USER_SPOTS:
      //    newState
      //    return newState

      default:
         return state
   }
}

export default spotReducer;
