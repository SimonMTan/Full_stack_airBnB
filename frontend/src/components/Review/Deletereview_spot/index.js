import { getreview , deletereview } from "../../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
// import {useParams} from 'react-router-dom'
import { getspotdetail } from "../../../store/spots";

const Deletereview =({reviewId,spotId}) =>{
    const dispatch = useDispatch()

    const deletereviewhandle = async() => {
        await dispatch(deletereview(reviewId))
        // console.log(response , 'this is response')
        await dispatch(getspotdetail(spotId))
        await dispatch(getreview(spotId))
    }

    return(
        <button type='button' onClick={deletereviewhandle}>
            {/* <i class="fa-light fa-trash"></i> */}
            Delete
        </button>
    )

}

export default Deletereview
