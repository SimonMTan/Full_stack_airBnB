import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import * as sessionActions from "../../store/session";
import { getallspotscurrentuser } from "../../store/spots";

const Account  = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    console.log('sessionUser',sessionUser)
    const allspots = useSelector((state) =>state.allSpots)
    console.log('allspots', allspots)
    useEffect(() => {
        dispatch(sessionActions.restoreUser())
    },[dispatch,])

    useEffect(() =>{
        dispatch(getallspotscurrentuser())
    },[dispatch,sessionUser])

    return (
        <h1>
            Welcome Back 
        </h1>
    )
}

export default Account
