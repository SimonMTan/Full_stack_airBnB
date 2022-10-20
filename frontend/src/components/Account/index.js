import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { getallspots, getspotdetail } from "../../store/spots";
import { NavLink } from "react-router-dom";

const Account  = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    // console.log('sessionUser',sessionUser)
    const allspots = useSelector((state) =>state.allSpots)
    // console.log('allspots', allspots)
    const x = allspots.allSpots
    const y = Object.values(x)
    // console.log(x)
    // console.log(y)
    const imgs = y.filter(img => img.ownerId ===sessionUser.id)
    // console.log('these are imgs',imgs)
    const [isloaded, setIsloaded] = useState(0)
    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        setIsloaded(1)
    },[dispatch])

    useEffect(() =>{
        dispatch(getallspots())
    },[dispatch])
    // if(!isloaded) return null
//     const correction = []
//    for (let i = 0 ;i < imgs.length ;i ++ ){
//     const spot = dispatch(getspotdetail(imgs[i].id))
//     correction.push(spot)
//    }
//    console.log('correction',correction)

    return (
        <>
            <h1>
                Welcome Back
            </h1>
            <div>

                {imgs?.map((spot) => (
                    <span key={spot?.id}>
                        <img src={spot?.previewImage[0]}></img>
                    </span>
                ))}

                {imgs?.map((spot) => (

                    <NavLink to={`edit/spots/${spot?.id}`}>
                    Edit
                    </NavLink>))}

                {imgs?.map((spot) => (
                    <NavLink to={`delete/spots/${spot?.id}`}>
                    Delete
                    </NavLink>
                    ))}

            </div>
            <div>probally get all reviews by user here</div>
        </>
    )
}

export default Account
