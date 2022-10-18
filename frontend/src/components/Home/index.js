import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getallspots } from "../../store/spots";

const Getallspots = () => {
    const dispatch = useDispatch();

    const allspots = useSelector((state) =>state.allSpots)
    console.log('allspot ---->',allspots)
    const arrspots = Object.values(allspots.allSpots)
    console.log(' should be array allSpots',arrspots )

    useEffect(() =>{
        dispatch(getallspots())
    },[dispatch])

    return (
        <>
         <div>
                {arrspots.map(spot => (
                    <NavLink to={`/spots/${spot.id}`}>
                        <div >
                            <img src={spot.previewImage} alt ={spot.previewImage}/>
                            <div >
                                <span><b>{spot.name}</b></span>
                                <span><b>★ {spot.avgRating > 0 ? spot.avgRating : 'New'}</b></span>
                            </div>
                            <div >{spot.city}, {spot.state}</div>
                            <div >{spot.country}</div>
                            <div ><b>${spot.price}</b> per night</div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default Getallspots;
