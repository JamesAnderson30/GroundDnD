import { csrfFetch } from "./csrf";

const LOAD_SPOT = "spot/loadOne";



export const loadSpot = (spot) =>{
    return {
        type: LOAD_SPOT,
        spot
    }
}

export const fetchSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const spot = await response.json();
  dispatch(loadSpot(spot))
}


const initialState = { spots: {all:[], byId:{}}};

const spotsReducer = (state = initialState, action) => {
  let all = state.spots.all;
      let byId = state.spots.byId;
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
    default:

      return state;
  }
};

export default spotsReducer;
