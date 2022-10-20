import  { useEffect, useState } from "react";
import { createreview } from "../../../store/reviews";
import { useParams, useHistory} from "react-router-dom";
import { useDispatch} from "react-redux";

const Createreview = () =>{
    const {spotId} = useParams()
    const dispatch = useDispatch();
    const history = useHistory()
    const [review,setReview] = useState('')
    const [stars,setStars] = useState(0)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const err = []
        if(!review)err.push('Please provide review')
        if(!stars)err.push('Please provide valid ').
        setErrors(err)
    },[review,stars])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrors([])
        const info = {review,stars}
        const data = await dispatch(createreview({info,spotId}))
        if(data.errors){
            setErrors(data.errors)
            return
        }
        if(data.ok)
        alert("Your review has been created")
        history.push(`/spots/${spotId}`)

    }
    return (
    <form
    onSubmit={handleSubmit}
    >
        <textarea value={review} onChange={(e) => setReview(e.target.value)} />
        <h3>Rating</h3>
        <label>
            <input
            type='radio'
            value={1}
            name='radio'
            checked = {stars===1}
            onChange={(e) => setStars(e.target.value)}
            ></input>
            ★
        </label>
        <label>
            <input
            type='radio'
            value={2}
            checked = {stars===2}
            onChange={(e) => setStars(e.target.value)}
            ></input>
            ★★
        </label>
        <label>
            <input
            type='radio'
            value={3}
            checked = {stars===3}
            onChange={(e) => setStars(e.target.value)}
            ></input>
            ★★★
        </label>
        <label>
            <input
            type='radio'
            value={4}
            checked = {stars===4}
            onChange={(e) => setStars(e.target.value)}
            ></input>
            ★★★★
        </label>
        <label>
            <input
            type='radio'
            value={5}
            checked = {stars===5}
            onChange={(e) => setStars(e.target.value)}
            ></input>
            ★★★★★
        </label>
        <button type="submit"> Submit!</button>
    </form>
    )
}

export default Createreview
