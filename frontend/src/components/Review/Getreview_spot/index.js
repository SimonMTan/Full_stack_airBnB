import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { getreview , deletereview } from "../../../store/reviews";
import {useParams} from 'react-router-dom'
import { getspotdetail } from "../../../store/spots";
import Deletereview from "../Deletereview_spot";
import './getreview.css'

const Getreview = ({}) =>{
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const arrayreviews = useSelector((state) => Object.values(state.spotReviews.spotReviews))
    const currentUser = useSelector((state) => state.session.user)
    const notowner = useSelector((state) =>state.allSpots.singleSpot.Owner)
    const filteruserid = arrayreviews?.filter(review => review?.User?.id == currentUser?.id )
    // console.log(spotId)
    // console.log('allreviews from createreviewspot',arrayreviews)
    // console.log(currentUser.id, 'currentUser')
    // console.log(currentUser.id , " is user id")
    // const arrayreviews = Object.values(allreviews.spotReviews)
    // console.log('arrayreviews',arrayreviews)
    // console.log(arrayreviews[0].User.id , '$$$$$id')
    // console.log(filteruserid , ' filter user id')
    useEffect(() =>{
        dispatch(getreview(spotId))
    },[dispatch])

        return (
        <>
            <div >
                {!filteruserid.length && currentUser && notowner?.id !== currentUser?.id &&(
                    <div>
                    <NavLink to={`/spots/${spotId}/newreview`}>
                        <div > Leave A Review? </div>
                    </NavLink>
                </div>
                )}
            </div>
            <div>
                {arrayreviews?.map(review => (
                <div className="reviewbox">
                    <div className="review-name">{review?.User?.firstName} {review?.User?.lastName}</div>
                    <div className="review-time">{review?.createdAt?.slice(5,7)}-{review?.createdAt?.slice(0,4)}</div>
                    <div className="review-detail">{review?.review}</div>

                    <div className="deletereview">
                    {currentUser?.id === review?.User?.id && (

                    <Deletereview reviewId={review?.id} spotId={spotId} />
                        )}
                    </div>
                </div>
                ))}
            </div>
        </>
    )
}

export default Getreview
