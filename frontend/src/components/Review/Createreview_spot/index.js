import { useEffect, useState } from "react";
import { createreview } from "../../../store/reviews";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import './index.css'

const Createreview = () => {
    const { spotId } = useParams()
    console.log(spotId)
    const dispatch = useDispatch();
    const history = useHistory()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const err = []
        if (!review || review.length<10 || review.length>255) err.push('Please provide review with less than 10 or more than 255 characters')
        if (!stars) err.push('Please provide rating before submit')
        setErrors(err)
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const info = { review, stars: +stars }

        const data = await dispatch(createreview(info, +spotId)).catch(
            async (res) => {
                const response = res.json()
                if (response.errors) {
                    setErrors(response.errors)
                }
            }
        )
        if(errors.length>0){return}
        alert("Your review has been created")
        history.push(`/spots/${spotId}`)

    }
    return (
        <div className="createreviewform">
            <div className="reviewform">
                <form onSubmit={handleSubmit}>
                    {errors.length > 0 && (
                        <div className="error-createreview">
                            {errors.map((error, idx) => (
                                <div key={idx}>·{error}</div>
                            ))}
                        </div>
                    )}
                    <h2 className="title-review">Review
                        <div className='charactercount'>{` ${255-review.length} chars. remaining`}</div>
                    </h2>
                    <textarea className="textarea" value={review} onChange={(e) => setReview(e.target.value)} />
                    <h3 className="title-rating">Rating</h3>
                    <div className="radiox">
                        <label>
                            <div></div>
                            <input
                            className="radio"
                                type='radio'
                                value={1}
                                name='stars'
                                checked={stars == 1}
                                onChange={(e) => setStars(e.target.value)}
                            />
                            ★
                        </label>
                        <label>
                            <input
                            className="radio"
                                type='radio'
                                value={2}
                                checked={stars == 2}
                                onChange={(e) => setStars(e.target.value)}
                            ></input>
                            ★★
                        </label>
                        <label>
                            <input
                            className="radio"
                                type='radio'
                                value={3}
                                checked={stars == 3}
                                onChange={(e) => setStars(e.target.value)}
                            ></input>
                            ★★★
                        </label>
                        <label>
                            <input
                            className="radio"
                                type='radio'
                                value={4}
                                checked={stars == 4}
                                onChange={(e) => setStars(e.target.value)}
                            ></input>
                            ★★★★
                        </label>
                        <label>
                            <input
                            className="radio"
                                type='radio'
                                value={5}
                                checked={stars == 5}
                                onChange={(e) => setStars(e.target.value)}
                            ></input>
                            ★★★★★
                        </label>
                    </div>
                    {/* <div clssName='submitbut'> */}
                    <button className='submitbut' type="submit">Submit</button>
                    {/* </div> */}
                </form>
            </div>
        </div>
    )
}

export default Createreview
