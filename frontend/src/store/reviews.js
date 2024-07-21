import { csrfFetch } from "./csrf";
import { fetchSpot } from "./spots";
import { fetchAllSpots } from "./spots";

const LOAD_REVIEWS = "review/LOAD_REVIEWS";
const ADD_REVIEW = "review/ADD_REVIEW";

export const addReview = (review) =>{
    return {
        type: ADD_REVIEW,
        review
    }
}

export const loadReviews = (reviews)=>{
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const fetchReviewsBySpot=(spotId) => async (dispatch)=>{
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    dispatch(loadReviews(reviews.Reviews))
}

export const postReview=(payload) => async (dispatch)=>{
    let body = JSON.stringify(payload);
   await csrfFetch(`/api/spots/${payload.spotId}/reviews`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body
    })

    dispatch(fetchSpot(payload.spotId));
}

export const deleteReview=(reviewId, spotId)=> async (dispatch)=>{
    console.log("reviewId: ", reviewId);
    console.log("spotId: ", spotId);
    await csrfFetch(`/api/reviews/${reviewId}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              }
            }
        )

    dispatch(fetchAllSpots(spotId))
}


const initialState = {reviews: {all:[], byId:{}}}

const reviewReducer = (state = initialState, action)=>{
    let all = JSON.parse(JSON.stringify(state.reviews.all));
    let byId = JSON.parse(JSON.stringify(state.reviews.byId));

    switch (action.type){

        case ADD_REVIEW:
            all.push(action.review);

            return {...state, reviews:{byId, all}}
        case LOAD_REVIEWS:
            for(let review of action.reviews){
                byId[review.id] = review
                all.push(review);
            }
            return {...state, reviews:{all, byId}}
        default:
            return state;
    }
}

export default reviewReducer;
