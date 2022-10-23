import { getreview , deletereview } from "../../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
// import {useParams} from 'react-router-dom'
import { getspotdetail } from "../../../store/spots";
import './review.css'

const Deletereview =({reviewId,spotId}) =>{
    const dispatch = useDispatch()

    const deletereviewhandle = async() => {
        await dispatch(deletereview(reviewId))
        // console.log(response , 'this is response')
        await dispatch(getspotdetail(spotId))
        await dispatch(getreview(spotId))
    }

    return(
        <button className='delete-can'type='button' onClick={deletereviewhandle}>
            <i className="fa-regular fa-trash-can"></i>
        </button>
    )

}

export default Deletereview
