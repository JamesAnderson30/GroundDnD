import { csrfFetch } from "./csrf";

const LOAD_SPOT = "spot/LOAD_SPOT";
const LOAD_SPOTS = "spot/LOAD_SPOTS";

export const loadSpot = (spot) =>{
    return {
        type: LOAD_SPOT,
        spot
    }
}

export const loadSpots = (spots) =>{
  return {
    type: LOAD_SPOTS,
    spots
  }
}

export const fetchSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const spot = await response.json();
  console.log("SPOTSsingle: ", spot);
  dispatch(loadSpot(spot))
}

export const fetchAllSpots = () => async (dispatch) =>{
  const response = await csrfFetch('/api/spots/');
  const spots = await response.json();
  console.log("SPOTS: ",spots);
  dispatch(loadSpots(spots));

}


const initialState = { spots: {loadedAll: false, all:[], byId:{}}};

const spotsReducer = (state = initialState, action) => {
  let all = state.spots.all;
  let byId = state.spots.byId;
  let loadedAll = state.spots.loadedAll;
  // console.log("all: ", all);
  switch (action.type) {
    case LOAD_SPOT:

      //
      if(all.findIndex((value,idx)=>{
        return value.id === action.spot.id
      }) === -1){
        all.push(action.spot);
      }
      byId[action.spot.id] = action.spot
      // console.log("second all: ", all);
      // console.log("action: ", action.spot);
      return { ...state, spots:{all, byId}} ;
    case LOAD_SPOTS:
      all = action.spots.Spots;

      for(let spot of all){
        byId[spot.id] = spot;
      }

      loadedAll = true;
      return {...state, spots:{all, byId, loadedAll}}
    default:

      return state;
  }
};

export default spotsReducer;
