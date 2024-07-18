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
  dispatch(loadSpot(spot))
}

export const fetchAllSpots = () => async (dispatch) =>{
  const response = await csrfFetch('/api/spots/');
  const spots = await response.json();
  dispatch(loadSpots(spots));
}

// This needs to be refractored to be more dry
export const postSpot = (body, images) => async (dispatch)=>{
  let {preview, image1, image2, image3, image4} = images;
  let errors = false;

    let response = await csrfFetch("/api/spots",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body
    }).catch(async error=>{errors = (await error.json())});
  if(errors){
    return errors;
  }
  const spot = await response.json();
  console.log("errors: ",errors);
  const id = spot.id;

  const uploadImage = async (url, preview)=>{
    let previewRes = await csrfFetch(`/api/spots/${id}/images`, {
      body: JSON.stringify({url, preview}),
      method: "POST"
    })
  }



  if(preview){
    uploadImage(preview, true);
  }

  if(image1){
    uploadImage(image1, false);
  }

  if(image2){
    uploadImage(image2, false);
  }

  if(image3){
    uploadImage(image3, false);
  }

  if(image4){
    uploadImage(image4, false);
  }

  return id;
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
