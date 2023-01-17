import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { getallspots, getspotdetail } from "../../store/spots";
import { NavLink } from "react-router-dom";
import './Account.css'
import { getbookingforuser } from "../../store/booking";

const Account  = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const allspots = useSelector((state) =>state.allSpots)
    const x = allspots.allSpots
    const y = Object.values(x)
    const imgs = y?.filter(img => img?.ownerId === sessionUser?.id)
    console.log('sessionUser',sessionUser)

    const [isloaded, setIsloaded] = useState(0)
    const [booking,setBooking] = useState()
    useEffect(() => {
        dispatch(sessionActions.restoreUser())
        setIsloaded(1)
    },[dispatch])

    useEffect(async() =>{
        dispatch(getallspots())
        const data = await dispatch(getbookingforuser())
        setBooking(data)
    },[dispatch])
     console.log(booking, 'this is booking')
    if(!sessionUser){return}
    return (
        <div>
            <h1 className="account-title">
                Welcome Back!
            </h1>
            {/* <div> */}
            <div className="spot-detail">Your spots
                {imgs?.map((spot) => (
                    <span className="ind-spot-detail-wrapper" key={spot?.id}>
                        <img className='account-pic' src={spot?.previewImage[0]}></img>
                        <div className="account-button-container">
                            <button className="account-button">
                                <NavLink to={`edit/spots/${spot?.id}`}>
                                    <div className="acc-button-detail">Edit</div>
                                </NavLink>
                            </button>
                            <button className="account-button">
                                <NavLink to={`delete/spots/${spot?.id}`}>
                                    <div className="acc-button-detail">Delete</div>
                                </NavLink>
                            </button>
                        </div>
                    </span>

                ))}
            </div>
            <div>Booking
                    {booking?.map((booked) => (<div key={booked?.id}>
                        <div>{booked.Spot.name}</div>
                        <div>Booking Start Date{booked.startDate}</div>
                        <div>Booking End Date{booked.endDate}</div>
                    </div>))}
            </div>
        </div>
    )
}

export default Account
