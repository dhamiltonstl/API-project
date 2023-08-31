// import { csrfFetch } from "./csrf"

const initialState = {
   allSpots: {},
   spotDetails: {}
}

const LOAD_SPOTS = "spots/loadSpots"

const loadSpots = (spots) => {
   return {
      type: LOAD_SPOTS,
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

const spotReducer = (state = initialState, action) => {
   let newState;
   switch (action.type) {

      case LOAD_SPOTS:
         newState = { ...state, allSpots: { ...action.spots } };
         return newState

      default:
         return state
   }
}

export default spotReducer;
