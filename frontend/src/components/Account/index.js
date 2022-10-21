import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { getallspots, getspotdetail } from "../../store/spots";
import { NavLink } from "react-router-dom";
import './Account.css'

const Account  = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const allspots = useSelector((state) =>state.allSpots)
    const x = allspots.allSpots
    const y = Object.values(x)
    const imgs = y.filter(img => img.ownerId === sessionUser.id)

    console.log('sessionUser',sessionUser)
    // console.log('allspots', allspots)
    // console.log(x)
    // console.log(y)
    // console.log('these are imgs',imgs)
 //..
    const [isloaded, setIsloaded] = useState(0)
    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        setIsloaded(1)
    },[dispatch])

    useEffect(() =>{
        dispatch(getallspots())
    },[dispatch])

    return (
        <div>
            <h1 className="account-title">
                Welcome Back!
            </h1>
            {/* <div> */}
            <div className="spot-detail">
                {imgs?.map((spot) => (
                    <span key={spot?.id}>
                        <img className='account-pic' src={spot?.previewImage[0]}></img>
                        <div className="account-button-container">
                            <button className="account-button">
                                <NavLink to={`edit/spots/${spot?.id}`}>
                                    Edit
                                </NavLink>
                            </button>
                            <button className="account-button">
                                <NavLink to={`delete/spots/${spot?.id}`}>
                                    Delete
                                </NavLink>
                            </button>
                        </div>
                    </span>

                ))}
            </div>
                {/* <div className="">
                {imgs?.map((spot) => (

                ))}
                </div>
                <div className="">
                {imgs?.map((spot) => (

                ))}
                </div>
            </div> */}

        </div>
    )
}

export default Account
