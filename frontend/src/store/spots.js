
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
const DELETE_SPOT = "spots/deleteSpot"
const UPDATE_SPOT = "spots/updateSpot"
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

const deleteSpot = (spot) => {
   return {
      type: DELETE_SPOT,
      spot: spot
   }
}

const updateSpot = (spot) => {
   return {
      type: UPDATE_SPOT,
      spot: spot
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

export const createUserSpot = (spot, imgs) => async (dispatch) => {
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
   await dispatch(createSpotImg(data, imgs))
   // console.log('Create data: ', data)
   dispatch(createSpot(data))
   return data
}

export const deleteUserSpot = (spot) => async (dispatch) => {
   const spotId = spot.id;
   const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
   })
   const data = await res.json()

   dispatch(deleteSpot(data))
   return data
}

export const updateUserSpot = (spot) => async (dispatch) => {
   const {
      spotId,
      address,
      city,
      state,
      country,
      name,
      description,
      price } = spot
   const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
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
   // console.log('Create data: ', data)
   dispatch(createSpot(data))
   return data
}

export const createSpotImg = (spot, imgs) => async (dispatch) => {

   imgs.map(async (img) => {
      await csrfFetch(`/api/spots/${spot.id}/images`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(img)
      })

   })
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
         newState = { ...state, allSpots: { ...action.spot } }
         return newState;
      case DELETE_SPOT:
         newState = { ...state, allSpots: { ...state.allSpots } }
         delete newState.allSpots[action.spot]
         return newState;
      case UPDATE_SPOT:
         newState = { ...state, allSpots: { ...action.spot } }
         return newState
      case USER_SPOTS:
         newState = { ...state, allSpots: { ...action.spots } }
         return newState;
      case CREATE_SPOT_IMG:
         newState = { ...state, singleSpot: { SpotImages: { ...action.img } } }
      default:
         return state
   }
}

export default spotReducer;
