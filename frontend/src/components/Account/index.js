import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { getallspots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import './Account.css'
import { getbookingforuser } from "../../store/booking";
import { deletebooking } from "../../store/booking";

const Account  = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const allspots = useSelector((state) =>state.allSpots)
    const userbooking = useSelector((state) =>state.booking)
    // console.log(userbooking,' userbooking')
    const data = Object.values(userbooking)
    // console.log(data,'this is data?')
    const x = allspots.allSpots
    const y = Object.values(x)
    const imgs = y?.filter(img => img?.ownerId === sessionUser?.id)
    // const [booking,setBooking] = useState()

    useEffect(() => {
        dispatch(sessionActions.restoreUser())
    },[dispatch])

    useEffect(() =>{
        dispatch(getallspots())
        dispatch(getbookingforuser())
    },[dispatch])


    if(!sessionUser){return}

    return (
        <div>
            <h1 className="account-title">
                Welcome Back!
            </h1>
            {/* <div> */}
            <div className="title123">Spots</div>
            <div className="spot-detail">
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
            <div className="title123">Booking</div>
            <div className='bookingwrapper'>
                    {data?.map((booked) => (
                    <div key={booked?.id}>
                        <div className="bookingdetail">{booked?.Spot?.name}</div>
                        <div className="bookingdetail">Booking Start Date:&nbsp;{booked.startDate}</div>
                        <div className="bookingdetail">Booking End Date:&nbsp;{booked.endDate}</div>
                        <button className='yesbutton' onClick={async() => await dispatch(deletebooking(booked.id)).then(async() =>await dispatch(getbookingforuser()))}> Delete</button>
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default Account
