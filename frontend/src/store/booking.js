import { csrfFetch } from "./csrf";

const GET_BOOKING = 'booking/getbooking'
const CREATE_BOOKING = 'booking/createbooking'
const EDIT_BOOKING = 'booking/editbooking'
const DELETE_BOOKING = 'booking/deletebooking'


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

// ... THUNK action ...
export const getbooking = (bookingId) => async dispatch =>{
    const response = await fetch(`/api/bookings/${bookingId}`)
    if(response.ok){
        const data = await response.json()
        console.log(data, 'getbooking thunk')
        const newData = data.Bookings
        dispatch(get_booking(newData))
        return data
    }
}

export const getbookingforuser = () => async dispatch =>{
    const response = await fetch ('/api/bookings/current')
    if(response.ok){
        const data = await response.json()
        const dataarr = data.Bookings
        console.log(dataarr, 'THUNKTHUNK')
        return dataarr
    }
}
export const createbooking = (info) => async dispatch =>{
    const {spotId,userId,startDate,endDate} = info
    console.log(info, 'this is info inside thunk')
    const response = await csrfFetch(`/api/bookings/${spotId}`,{
        method:'POST',
        body:JSON.stringify({
            spotId,userId,startDate,endDate
        })
    })
    if(response.ok){
        const data = await response.json()
        console.log('this is the response ', data)
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
        const deletedata = data.deleted
        dispatch(delete_booking(deletedata))
        return
        // let data = await response.json()
        // return data
    }
}

const initState = {}
const bookingReducer = (state = initState,action) =>{
    let newState = {...state}
    switch(action.type){
        case GET_BOOKING:
        console.log(action.payload, 'actionpayload reducer')
        action.payload.forEach(booking => newState[booking.id] = booking)
        return newState;

        case CREATE_BOOKING:
        newState[action.payload.id] = action.payload

        case EDIT_BOOKING:
        newState[action.payload.id] = action.payload

        case DELETE_BOOKING:
        delete newState[action.payload.id]
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
