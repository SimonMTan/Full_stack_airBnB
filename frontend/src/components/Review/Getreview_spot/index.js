import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { getreview , deletereview } from "../../../store/reviews";
import {useParams} from 'react-router-dom'
const Getreview = ({}) =>{
    const {spotId} = useParams()
    console.log(spotId)
    const dispatch = useDispatch()
    const history = useHistory()
    const allreviews = useSelector((state) => state.spotReviews)
    console.log('allreviews from createreviewspot',allreviews)
    const currentUser = useSelector((state) => state.session.user)
    console.log(currentUser, 'currentUser')
    console.log(currentUser.id , " is user id")
    const arrayreviews = Object.values(allreviews.spotReviews)
    console.log('arrayreviews',arrayreviews)
    console.log(arrayreviews['0'] , 'review')
    useEffect(() =>{
        dispatch(getreview(spotId))
    },[dispatch])

    const deletereviewhandle = (spotId) => async(e) => {
        e.preventDefault()
        const response = await deletereview(spotId)
        if(response.ok)alert('Your review has been deleted')
        history.push(`/spots/${spotId}`)
    }

       return (
        <>
            <div>
                {arrayreviews?.map(review => (
                    <div>
                        <div>
                            (!(review?.User?.id == currentUser?.id) ?
                                <NavLink to={`/spots/${spotId}/newreview`}>
                                    <div > Leave A Review? </div>
                                </NavLink> : null
                            )
                        </div>
                        <div>
                            <span>{review?.User?.firstName} {review?.User?.lastName}</span>
                            <span>{review?.createdAt?.slice(6,7)}-{review?.createdAt?.slice(0,4)}</span>
                            <span>{review?.review}</span>

                            {currentUser.id === review?.User?.id (
                            <span>
                                <div>
                                <span onClick={deletereviewhandle(review.id)}><i class="fa-light fa-trash"></i> Delete</span>
                                </div>
                            </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Getreview
