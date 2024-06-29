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
  switch (action.type) {
    case LOAD_SPOT:
      all.push(action.spot);
      byId[action.spot.id] = action.spot
      return { ...state, spots:{all, byId}} ;
    default:
      return state;
  }
};

export default spotsReducer;
