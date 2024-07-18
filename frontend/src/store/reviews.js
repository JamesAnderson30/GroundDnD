import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "review/LOAD_REVIEWS";

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
    const response = await csrfFetch(`/api/spots/${payload.spotId}/reviews`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body
    })
    const responseJson = await response.json();
    console.log("responseJson: ", responseJson)
}

const initialState = {reviews: {all:[], byId:{}}}

const reviewReducer = (state = initialState, action)=>{
    let all = state.reviews.all;
    let byId = state.reviews.byId;

    switch (action.type){
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
