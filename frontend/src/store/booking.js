import { csrfFetch } from "./csrf";

const GET_BOOKING = 'booking/getbooking'
const CREATE_BOOKING = 'booking/createbooking'
const EDIT_BOOKING = 'booking/editbooking'
const DELETE_BOOKING = 'booking/deletebooking'
const GET_USER_BOOKING = 'booking/getuserbooking'


const get_booking = (info) => {
    return {
        type:GET_BOOKING,
        payload:info
    }
}

const create_booking = (info) => {
    return {
        type:CREATE_BOOKING,
        payload:info
    }
}

const edit_booking = (info) =>{
    return {
        type:EDIT_BOOKING,
        payload:info
    }
}

const delete_booking = () => {
    return{
        type:DELETE_BOOKING,
    }

}

const get_user_booking = (info) => {
    return {
        type:GET_USER_BOOKING,
        payload:info
    }
}

// ... THUNK action ...
export const getbooking = (bookingId) => async dispatch =>{
    const response = await fetch(`/api/bookings/${bookingId}`)
    if(response.ok){
        const data = await response.json()
        // console.log(data, 'getbooking thunk')
        const newData = data.Bookings
        // console.log(newData, typeof newData,'THUNK1211')
        dispatch(get_booking(newData))
        return data
    }
}

export const getbookingforuser = () => async dispatch =>{
    const response = await fetch ('/api/bookings/current')
    if(response.ok){
        const data = await response.json()
        const dataarr = data.Bookings
        // console.log(dataarr, typeof dataarr, 'THUNKTHUNK')
        dispatch(get_user_booking(dataarr))
        return dataarr
    }
}
export const createbooking = (info) => async dispatch =>{
    const {spotId,userId,startDate,endDate} = info
    // console.log(info, 'this is info inside thunk')
    const response = await csrfFetch(`/api/bookings/${spotId}`,{
        method:'POST',
        body:JSON.stringify({
            spotId,userId,startDate,endDate
        })
    })
    if(response.ok){
        const data = await response.json()
        // console.log('this is the response ', data)
        dispatch(create_booking(data))
        return data
    }
}

export const editbooking = (info,spotId) => async dispatch =>{
    const {startDate,endDate,bookingId} = info
    const response = await csrfFetch(`/api/bookings/${spotId}`,{
        method:'PUT',
        body:JSON.stringify({
            startDate,endDate,bookingId
        })
    })
    if(response.ok){
        let data = await response.json()
        dispatch(edit_booking(data))
        return data
    }
}
export const deletebooking = (spotId) => async dispatch=> {
    const response = await csrfFetch(`/api/bookings/${spotId}`,{
        method:"DELETE"
    })
    if(response.ok){
        let data = await response.json()
        const deletedata = data.deletedId
        dispatch(delete_booking(deletedata))
        return
        // let data = await response.json()
        // return data
    }
}

const initState = {}
const bookingReducer = (state = initState,action) =>{
    let newState
    switch(action.type){
        case GET_BOOKING:
            newState = {}
            // console.log(action.payload, 'actionpayload reducer')
            action.payload.forEach(booking => newState[booking.id] = booking)
            return newState;

        case GET_USER_BOOKING:
            newState = {}
            action.payload.forEach(booking => newState[booking.id] = booking)
            return newState;

        case CREATE_BOOKING:
            newState = {...state, [action.payload.id]: action.payload}
            return newState

        case EDIT_BOOKING:
            newState = {...state, [action.payload.id]: action.payload}
            return newState

        case DELETE_BOOKING:
            newState = {...state}
            delete newState[action.payload]
            return newState

        default:
            return state
    }

}

export default bookingReducer

// const GET_BOOKING = 'booking/getbooking'
// const CREATE_BOOKING = 'booking/createbooking'
// const EDIT_BOOKING = 'booking/editbooking'
// const DELETE_BOOKING = 'booking/deletebooking'
