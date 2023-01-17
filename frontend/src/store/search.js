const search = 'spots/search'

//action
const searchaction = (searchresult) => ({
    type:search,
    payload:searchresult
})

//thunk
export const searchthunk = (searchterm) => async(dispatch) =>{
    // console.log(searchterm, 'this is search term from thunk')
    const response = await fetch(`/api/spots/search/${searchterm}`)
    // console.log(response,"this is response from thunk")
    if(response.ok){
        const data = await response.json()
        // console.log(data,'data inside search thunk')
        // dispatch(searchaction(data))
        return data
    }
    return
}

// const searchreducer = (state = {},action) =>{
//     let newState
//     switch(action.type){
//         case search:
//             console.log(action.payload, "payload")
//             action.payload.forEach(user => {
//                 console.log(user, 'this is each inside payload')
//                 newState[user.id] = user
//             })
//             return newState
//         default:
//             return state;
//     }
// }

// export default searchreducer
