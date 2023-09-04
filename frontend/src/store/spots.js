
import { csrfFetch } from "./csrf";
// import { useParams } from "react-router-dom";

const initialState = {
   allSpots: {},
   singleSpot: {}
}

const LOAD_SPOTS = "spots/loadSpots"
const USER_SPOTS = "spots/userSpots"
const SINGLE_SPOT = "spots/singleSpot"
const CREATE_SPOT = "spots/createSpot"
const CREATE_SPOT_IMG = "spots/createSpotImg"

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

const createSpot = (spot) => {
   return {
      type: CREATE_SPOT,
      spots: spot
   }
}

const createImg = (img) => {
   return {
      type: CREATE_SPOT_IMG,
      img: img
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

export const getSingleSpot = (spotId) => async (dispatch) => {
   const res = await fetch(`/api/spots/${spotId}`, {
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

export const createUserSpot = (spot) => async (dispatch) => {
   const {
      address,
      city,
      state,
      country,
      name,
      description,
      price } = spot
   const res = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         address,
         city,
         state,
         lat: 11.1111111,
         lng: 11.1111111,
         country,
         name,
         description,
         price
      })
   })
   const data = await res.json()

   dispatch(createSpot(data))
   return data
}

export const createSpotImg = (spotId, img) => async (dispatch) => {
   console.log("Create thunk: ", spotId, img)

}


const spotReducer = (state = initialState, action) => {
   let newState;
   switch (action.type) {
      case LOAD_SPOTS:
         newState = { ...state, allSpots: { ...action.spots } };
         return newState;
      case SINGLE_SPOT:
         newState = { ...state, singleSpot: { ...action.spot } }
         return newState;
      case CREATE_SPOT:
         newState = { ...state, allSpots: { ...state.allSpots, [action.spot.id]: { ...action.spot } } }
         return newState;
      default:
         return state
   }
}

export default spotReducer;
