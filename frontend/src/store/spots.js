import { csrfFetch } from "./csrf";

const GET_AllSPOTS = 'spots/all'
const GET_SPOTDETAIL = 'spots/detail'
const CREATE_SPOT = 'spots/create'
const EDIT_SPOT = 'spots/edit'
const DELETE_SPOT = 'spots/delete'
// const CURRENTUSER_SPOT = 'spots/userspots'

//...ACTIONS...

const get_allspots = (info) =>{
    // console.log('this is info from get_allspots',info)
    return {
        type:GET_AllSPOTS,
        payload:info
    }
}

const get_spotdetail = (info) =>{
    return {
        type:GET_SPOTDETAIL,
        payload:info
    }
}

const create_spot = (info) =>{
    return {
        type:CREATE_SPOT,
        payload:info
    }
}

const edit_spot = (info) =>{
    return {
        type:EDIT_SPOT,
        payload:info
    }
}

const delete_spot = (id) =>{
    return {
        type:DELETE_SPOT,
        payload:id
    }
}

// const get_allspots_currentuser = (data) =>{
//     return {
//         type:CURRENTUSER_SPOT,
//         payload:data
//     }
// }

//...Thunk action...
export const getallspots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    if(response.ok){
    let data = await response.json()
    // console.log("getallspotdata",data)
    const newdata = data.Spots
    // console.log("getallspotdata2",newdata)
    dispatch(get_allspots(newdata))
    return newdata
}}

export const getspotdetail = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if(response.ok){
    const data = await response.json()
    console.log("getallspotdata",data)
    dispatch(get_spotdetail(data))
    return data
}}

export const createspot = (info) => async dispatch =>{
    const {address,city,state,country,lat,lng,name,description,price} = info
    const response = await csrfFetch('/api/spots', {
        method:'POST',
        body:JSON.stringify({
            address,city,state,country,lat,lng,name,description,price
        })
    })
    if(response.ok){
    const data = await response.json()
    dispatch(create_spot(data))
    return data
}}

export const editspot = (info,spotId) => async dispatch =>{
    const {address,city,state,country,lat,lng,name,description,price} = info
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method:'PUT',
        body:JSON.stringify({
            address,city,state,country,lat,lng,name,description,price
        })
    })
    if(response.ok){
    const data = await response.json()
    dispatch(edit_spot(data))
    return data
}}

export const deletespot = (spotId) => async dispatch =>{
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
      });
      if(response.ok){
      dispatch(delete_spot(spotId));
      return
    }};

// export const getallspotscurrentuser = () => async dispatch => {
//     const response = await csrfFetch('/api/spots/current')
//     if(response.ok){
//         const data = await response.json()
//         dispatch(get_allspots_currentuser(data))
//         return data
//     }
// }


//...reducer...
const initState = {allSpots:{},singleSpot:{SpotImages:[]}}
const spotReducer = (state = initState,action) =>{
    let newState = {...state}
    switch(action.type){
        case GET_AllSPOTS:
        // newState.allSpots = {...state.allSpots}
        // console.log('newstate1',newState.allSpots)
        action.payload.forEach(spot => newState.allSpots[spot.id] = spot)
        // console.log('newstate2',newState.allSpots)
        return newState;

        case GET_SPOTDETAIL:
        // let newinfo = {...action.payload}
        newState.singleSpot = {...action.payload}
        // newState.singleSpot.SpotImages = [...state.singleSpot.SpotImages]
        action.payload.SpotImages.forEach((img,idx) => newState.singleSpot.SpotImages[idx] = img)
        return newState;


        case CREATE_SPOT:
        const newspot = {...action.payload}
        newState.allSpots = {...state.allSpots,newspot}
        return newState

        case EDIT_SPOT:
        const spotnewInfo = {...action.payload}
        newState.singleSpot = spotnewInfo
        return newState

        case DELETE_SPOT:
        delete newState.allSpots[action.payload]
        return newState

        // case CURRENTUSER_SPOT:
        // // newState.ownerSpots = {...action.payload}
        // return newState

        default:
        return state
    }
}

export default spotReducer
