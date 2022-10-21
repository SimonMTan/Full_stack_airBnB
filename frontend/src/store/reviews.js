import { csrfFetch } from "./csrf";

const GET_REVIEW_SPOT = 'reviews/allreview'
const CREATE_REVIEW = 'reviews/newreview'
const DELETE_REVIEW = 'reviews/deletereview'

//--ACTION--

const get_review_spot = (info) => {
    return {
        type:GET_REVIEW_SPOT,
        payload:info
    }
}

const create_review_spot = (info) =>{
    return {
        type:CREATE_REVIEW,
        payload:info
    }
}

const delete_review_spot = (info) =>{
    return {
        type:DELETE_REVIEW,
        payload:info
    }
}
//...Thunk action...
export const getreview = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    console.log(response,'fetch return')
    if(response.ok){
        let data = await response.json()
        const newdata = data.Reviews
        console.log(newdata)
        dispatch(get_review_spot(newdata))
        return newdata
    }
}

export const createreview = (info,spotId) => async dispatch =>{
    const {review , stars} = info
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method:'POST',
        body:JSON.stringify({
            review,stars
        })
    })
    if(response.ok){
        const data = await response.json()
        // dispatch(create_review_spot(data))
        return data
    }
}

export const deletereview = (reviewId) => async dispatch =>{
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method:'DELETE'
    })
    if(response.ok){
        dispatch(delete_review_spot(reviewId))
        return;
    }
}

const initState = {spotReviews:{}}
const reviewReducer = (state = initState,action) =>{
    let newState = {...state}
    switch(action.type){
        case GET_REVIEW_SPOT:
            const allreview = {}
            console.log('payload',action.payload)
            action.payload.forEach((review) => {
                allreview[review.id] = review
            })
            newState.spotReviews = allreview
            return newState

        // case CREATE_REVIEW:
        //     newState[action.payload.id]=action.payload
        //     return newState

        case DELETE_REVIEW:
            delete newState.spotReviews[action.payload]
            return newState

        default:
            return state
    }
}

export default reviewReducer
