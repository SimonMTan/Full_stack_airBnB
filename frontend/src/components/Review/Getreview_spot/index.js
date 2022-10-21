import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { getreview , deletereview } from "../../../store/reviews";
import {useParams} from 'react-router-dom'
import { getspotdetail } from "../../../store/spots";
import Deletereview from "../Deletereview_spot";

const Getreview = ({}) =>{
    const {spotId} = useParams()
    console.log(spotId)
    const dispatch = useDispatch()
    const history = useHistory()
    const arrayreviews = useSelector((state) => Object.values(state.spotReviews.spotReviews))
    console.log('allreviews from createreviewspot',arrayreviews)
    const currentUser = useSelector((state) => state.session.user)
    console.log(currentUser.id, 'currentUser')
    // console.log(currentUser.id , " is user id")
    // const arrayreviews = Object.values(allreviews.spotReviews)
    // console.log('arrayreviews',arrayreviews)
    // console.log(arrayreviews[0].User.id , '$$$$$id')
    const filteruserid = arrayreviews.filter(review => review.User.id == currentUser.id )
    console.log(filteruserid , ' filter user id')
    useEffect(() =>{
        dispatch(getreview(spotId))
    },[dispatch])

        return (
        <>
            <div>
                {!filteruserid.length && (
                    <div>
                    <NavLink to={`/spots/${spotId}/newreview`}>
                        <div > Leave A Review? </div>
                    </NavLink>
                </div>
                )}
            </div>
            <div>
                {arrayreviews?.map(review => (
                <div>
                    {/* <div>
                    {currentUser.id !== review?.User?.id && (
                    <div>
                        <NavLink to={`/spots/${spotId}/newreview`}>
                            <div > Leave A Review? </div>
                        </NavLink>

                    </div>
                    )}
                    </div> */}
                    <div>{review?.User?.firstName} {review?.User?.lastName}</div>
                    <div>{review?.createdAt?.slice(5,7)}-{review?.createdAt?.slice(0,4)}</div>
                    <div>{review?.review}</div>


                    {currentUser.id === review?.User?.id && (

                    <Deletereview reviewId={review.id} spotId={spotId} />
                        )}

                </div>
                ))}
            </div>
        </>
    )
}

export default Getreview
