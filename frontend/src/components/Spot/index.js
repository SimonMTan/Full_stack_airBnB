import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getspotdetail } from "../../store/spots";

const Getspot = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams()
    const allspots = useSelector((state) =>state.allSpots)
    // const user = useSelector((state) =>state.session)
    // console.log(user, '<<<<user')
    console.log('AAA',allspots)
    const spotimg = allspots.singleSpot.SpotImages
    const spotDetail = allspots.singleSpot
    useEffect(() =>{
        dispatch(getspotdetail(spotId))
    },[dispatch,spotId])

    return (
        <>
        <div>
            <div>{spotDetail.name}</div>
            <span>
                ★{spotDetail.numReviews === 0 ? "New" : spotDetail.avgStarRating} {'  '}
                <u>{spotDetail.numReviews} {spotDetail.numReviews<2 ? 'review':'reviews'}</u>
                · <u>{spotDetail.city},{spotDetail.state},{spotDetail.country}</u>
            </span>
            <div>
                {/* may be i can use foreach when i have more than 1 */}
                {spotimg.map(spot => (
                <div>
                    <img src={spot?.url} alt={spot.id} key={spot.id}/>
                </div>
                ))}
                {/* {spotimg.map(spot => (
                <div>
                    <img src={spot[1]?.url}></img>
                    <img src={spot[2]?.url}></img>
                    <img src={spot[3]?.url}></img>
                    <img src={spot[4]?.url}></img>
                </div>
                 ))} */}
            </div>
            <div></div>
        </div>
        </>
    )
}

export default Getspot;
