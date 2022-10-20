import { csrfFetch } from "./csrf";

const GET_REVIEW_SPOT = 'reviews/allreview'
const CREATE_SPOT = 'reviews/newreview'
const DELETE_SPOT = 'reviews/deletereview'

//--ACTION--

const get_review_spot = (info) => {
    return {
        type:GET_REVIEW_SPOT,
        payload:info
    }
}

const create_review_spot = (info) =>{
    return {
        type:CREATE_SPOT,
        payload:info
    }
}

const delete_review_spot = (info) =>{
    return {
        type:DELETE_SPOT,
        payload:info
    }
}
//...Thunk action...
export const getreview = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        let data = await response.json()
        const newdata = data.Reviews
        dispatch(get_review_spot(newdata))
        return newdata
    }
}

export const createreview = () => async dispatch =>{
    const response = await csrfFetch(``)
}
