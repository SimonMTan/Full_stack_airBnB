import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getspotdetail } from "../../store/spots";
import Getreview from "../Review/Getreview_spot";

const Getspot = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams()

    const allspots = useSelector((state) =>state.allSpots)
    // console.log('AAA',allspots)
    const spotimg = allspots.singleSpot.SpotImages
    const spotDetail = allspots.singleSpot
    // console.log('BBB',spotDetail)
    const owner = spotDetail.Owner
    // console.log('CCC',owner)

    useEffect(() =>{
        dispatch(getspotdetail(spotId))
    },[dispatch])
    if(!allspots)return null

    return (
        <>
        <div>
            <div>{spotDetail.name}</div>
            <span>
                ★{spotDetail.numReviews === 0 ? "New" : spotDetail.avgStarRating} {'  '}
                <u>{spotDetail.numReviews} {spotDetail.numReviews < 2 ? 'review':'reviews'}</u>
                · <u>{spotDetail.city},{spotDetail.state},{spotDetail.country}</u>
            </span>
            <div>
                {/* may be i can use foreach when i have more than 1, preview and use filter */}
                {spotimg?.map(spot => (
                <div>
                    <img src={spot?.url} alt={spot.id} key={spot.id}/>
                </div>
                ))}
                {/* {spotimg.map(spot => (
                <div>
                    <img src={spot?.url[2]}></img>
                    <img src={spot?.url[3]}></img>
                    <img src={spot?.url[4]}></img>
                    <img src={spot?.url[5]}></img>
                </div>
                 ))} */}
            </div>
            <div>
                 Hosting By {owner?.firstName} {owner?.lastName}
            </div>
            <div>{spotDetail.description}</div>
            <div>★{spotDetail.numReviews === 0 ? "New" : spotDetail.avgStarRating} {'  '}
                {spotDetail.numReviews} {spotDetail.numReviews<2 ? 'review':'reviews'}
            </div>
            <div>
                'Review info - need review reducers to find the info.(need review that is for this spot as well as name of the reviewer and review'
            </div>
            <Getreview />
        </div>
        </>
    )
}

export default Getspot;
