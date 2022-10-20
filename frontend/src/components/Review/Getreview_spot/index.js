import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { getreview , deletereview } from "../../../store/reviews";

const Getreview = ({spotId}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const allreviews = useSelector((state) => state.spotReviews)
    const currentUser = useSelector((state) => state.session)
    const arrayreviews = Object.values(allreviews)

    useEffect(() =>{
        dispatch(getreview(spotId))
    },[dispatch,spotId])

    const deletereviewhandle = (spotId) => async(e) => {
        e.preventDefault()
        const response = await deletereview(id)
        if(response.ok)alert('Your review has been deleted')
        history.push(`/spots/${spotId}`)
    }

       return (
        <>
            <div>
                {arrayreviews?.map(review => (
                    <div>
                        <div>
                            {review?.User?.id !== review?.User?.id (
                                <NavLink to={`/spots/${spotId}/newreview`}>
                                    <div > Leave A Review? </div>
                                </NavLink>
                            )}
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
