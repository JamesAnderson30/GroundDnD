import { csrfFetch } from "./csrf";

const LOAD_SPOT = "spot/LOAD_SPOT";
const LOAD_SPOTS = "spot/LOAD_SPOTS";
const LOAD_USER_SPOTS = "spot/LOAD_USER_SPOTS";
const UNLOAD_SPOTS = "spot/UNLOAD_SPOTS";
const DELETE_SPOT = "spot/DELETE_SPOT"



export const unloadSpots = () =>{
  return{
    type: UNLOAD_SPOTS
  }
}

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

export const deleteSpotState = (spot) =>{
  return{
    type:DELETE_SPOT,
    spot
  }
}

export const loadUserSpots = (spots) =>{
  return {
    type: LOAD_USER_SPOTS,
    spots
  }
}

export const fetchSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const spot = await response.json();
  dispatch(loadSpot(spot))
}

export const fetchUserSpots = () => async (dispatch) =>{
  const response = await csrfFetch("/api/spots/current");
  const spots = await response.json();
  dispatch(loadUserSpots(spots));
}

export const fetchAllSpots = () => async (dispatch) =>{
  const response = await csrfFetch('/api/spots/');
  const spots = await response.json();
  console.log("spots: ", spots);
  dispatch(loadSpots(spots));
}

export const deleteSpot = (id) => async (dispatch) =>{
  console.log("id: ", id);
  await csrfFetch(`/api/spots/${id}`, {
    method:"DELETE",
    headers: {
        "Content-Type": "application/json",
      }
  })

  dispatch(deleteSpotState(id))
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
  const id = spot.id;

  const uploadImage = async (url, preview)=>{
    await csrfFetch(`/api/spots/${id}/images`, {
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

  dispatch(fetchSpot(id));

  return id;
}

export const putSpot = (body, images, spotId) => async (dispatch)=>{
  console.log("body: ", body);
  let errors = false;

    let response = await csrfFetch(`/api/spots/${spotId}`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body
    }).catch(async error=>{errors = (await error.json())});
  if(errors){
    return errors;
  }
  const spot = await response.json();
  console.log("spot: ", spot);
  const id = spot.id;


  dispatch(fetchSpot(spotId));

  return id;
}

const initialState = { userSpots: {isLoaded:false}, spots: {loadedAll: false, all:[], byId:{}}};

const spotsReducer = (state = initialState, action) => {
  let all = JSON.parse(JSON.stringify(state.spots.all));
  let byId = JSON.parse(JSON.stringify(state.spots.byId));
  let userSpots = JSON.parse(JSON.stringify(state.userSpots));
  let stateCopy = JSON.parse(JSON.stringify(state));
      let spotId = action.spot;
  let loadedAll = state.spots.loadedAll;
  let newById = {};

  // console.log("all: ", all);
  switch (action.type) {
    //DELETE SPOT------------------------------------
    case DELETE_SPOT:

      userSpots = userSpots.filter((userSpot)=>{
        return userSpot.id !== spotId;
      })

      return {...state, userSpots}
    //LOAD SPOT--------------------------------------
    case LOAD_SPOT:

      //
      if(all.findIndex((value)=>{
        return value.id === action.spot.id
      }) === -1){
        all.push(action.spot);
      }

      byId[action.spot.id] = action.spot

      return { ...state, spots:{all, byId}} ;
    //LOAD_SPOTS ----------------------------------
    case LOAD_SPOTS:


      for(let spot of action.spots.Spots){

        newById[spot.id] = spot;
      }

      loadedAll = true;

      all = action.spots.Spots;


      return {...state, spots:{all, byId: newById, loadedAll}}
    // LOAD_USER_SPOTS --------------------------
    case LOAD_USER_SPOTS:

      console.log("load_user_spots: ", action);
      stateCopy["userSpots"] = action.spots;
      return stateCopy;
    case UNLOAD_SPOTS:
      console.log("UNLOAD");
      return {...state, spots:{all, byId, loadedAll:false}}
    default:

      return state;
  }
};

export default spotsReducer;
