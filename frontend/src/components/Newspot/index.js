import { useDispatch } from "react-redux"
import { createspot, spotimg } from "../../store/spots";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import './Newspot.css'

const Newspot = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const allspots = useSelector((state) => state.allSpots)
    const sessionUser = useSelector((state) => state.session.user);

    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')
    const [errors, setErrors] = useState([]);
    const [errorsDisplay, setErrorDisplay] = useState(false)


    useEffect(() => {
        const err = {}
        if (!name || name.length >15) err.name = 'Please provide name with less than 15 chars'
        if (!address) err.address = 'Please provide address with less than 30 chars'
        if (!city) err.city = 'Please provide city with less than 15 chars'
        if (!state) err.state = 'Please provide state with less than 15 chars'
        if (!country) err.country = 'Please provide country with less than 15 chars'
        if (!lat || !((lat>=0) || (lat <0)) || ( lat < -90) || (lat > 90)) err.lat = 'Please provide latitude between -90 and 90'
        if (!lng || !((lng>=0) || (lng <0)) || ( lng < -180) || (lng > 180)) err.lng = 'Please provide longitude  between -180 and 180'
        if (!description || description.length >255) err.description = 'Please provide description with less than 255 chars'
        if (!price || !(price > 0) || (price>100000000000)) err.price = 'Please provide valid price'
        if (!img || (!img.endsWith('.png') && !img.endsWith('.jpg') && !img.endsWith('.jpeg')) || (img.length>255)) err.img = 'Please provide valid image link with .png/.jpg'
        setErrors(err)
    }, [address, city, state, country, lat, lng, name, description, price, img])

    // useEffect(() =>{
    //     dispatch(createspot({city,state,country,lat,lng,name,description,price}))
    // },[dispatch])

    // if (!sessionUser) return Error('need to signup or login')
    const handleSubmit = async (e) => {
        e.preventDefault()

        // setErrors([]);
        let arrerr = Object.values(errors)
        if (arrerr.length > 0) {
            setErrorDisplay(true)
            return
        }
        if(arrerr.length == 0){
        const data = await dispatch(createspot({ address, city, state, country, lat, lng, name, description, price, img }))
            if (data.errors) {
                let errs = {};
                if(data.errors.address) errs.address = "Please provide valid address"
                if(data.errors.city) errs.city = "Please provide valid city"
                if(data.errors.state) errs.state = "Please provide valid state"
                if(data.errors.country) errs.country = "Please provide valid country"
                if(data.errors.lat) errs.lat = "Please provide valid lat"
                if(data.errors.lng) errs.lng = "Please provide valid lng"
                if(data.errors.name) errs.name = "Please provide valid name"
                if(data.errors.description) errs.description = "Please provide valid description"
                if(data.errors.price) errs.price = "Please provide valid price"
                setErrors(errs)
                setErrorDisplay(true)
                return
            };
        setErrorDisplay(false)
        history.push('/account')
        return
        }
    }
    return (
        <div className="createspotform">
            <h1 className="title">Let host a special spot for Adventures</h1>
            <div className='spotform'>
                <form onSubmit={handleSubmit}>
                    {/* {errorsDisplay && errors.name > 0 && (
                        <div className="error-createspot">
                            {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))}
                        </div>
                    )} */}
                    <label >
                        <div className="info">Name</div>
                        <input
                            className="input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Name...">
                        </input>
                    </label>
                    {errorsDisplay && errors.name && (
                        <div className="error-createspot">
                            {/* {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))} */}
                            {errors.name}
                        </div>
                    )}
                    <label >
                        <div className="info">Address</div>
                        <input
                            className="input"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="Address...">
                        </input>
                    </label>
                    {errorsDisplay && errors.address && (
                        <div className="error-createspot">
                            {/* {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))} */}
                            {errors.address}
                        </div>
                    )}
                    <label >
                        <div className="info">City</div>
                        <input
                            className="input"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder="City...">
                        </input>
                    </label>
                    {errorsDisplay && errors.city && (
                        <div className="error-createspot">
                            {/* {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))} */}
                            {errors.city}
                        </div>
                    )}
                    <label >
                        <div className="info">State</div>
                        <input
                            className="input"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            placeholder="State...">
                        </input>
                    </label>
                    {errorsDisplay && errors.state && (
                        <div className="error-createspot">
                            {/* {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))} */}
                            {errors.state}
                        </div>
                    )}
                    <label >
                        <div className="info">Country</div>
                        <input
                            className="input"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            placeholder="Country...">
                        </input>
                    </label>
                    {errorsDisplay && errors.country && (
                        <div className="error-createspot">
                            {/* {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))} */}
                            {errors.country}
                        </div>
                    )}
                    <label >
                        <div className="info"> longitude</div>
                        <input
                            className="input"
                            type="text"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            // required
                            placeholder="longitude...">
                        </input>
                    </label>
                    {errorsDisplay && errors.lng && (
                        <div className="error-createspot">
                            {/* {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))} */}
                            {errors.lng}
                        </div>
                    )}
                    <label >
                        <div className="info">latitude</div>
                        <input
                            className="input"
                            type="text"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            required
                            placeholder="latitude...">
                        </input>
                    </label>
                    {errorsDisplay && errors.lat && (
                        <div className="error-createspot">
                            {/* {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))} */}
                            {errors.lat}
                        </div>
                    )}
                    <label >
                        <div className="info">Description</div>
                        <input
                            className="input"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Please provide descriptive as possible">
                        </input>
                    </label>
                    {errorsDisplay && errors.description && (
                        <div className="error-createspot">
                            {/* {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))} */}
                            {errors.description}
                        </div>
                    )}
                    <label >
                        <div className="info">Price</div>
                        <input
                            className="input"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder="$...">
                        </input>
                    </label>
                    {errorsDisplay && errors.price && (
                        <div className="error-createspot">
                            {/* {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))} */}
                            {errors.price}
                        </div>
                    )}
                    <label >
                        <div className="info">Image Link</div>
                        <input
                            className="input"
                            type="text"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            required
                            placeholder="Image Link here...">
                        </input>
                    </label>
                    {errorsDisplay && errors.img && (
                        <div className="error-createspot">
                            {/* {errors.map((error, idx) => (
                                <div className="error-createspot" key={idx}>·{error}</div>
                            ))} */}
                            {errors.img}
                        </div>
                    )}
                    <button className='submit' type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Newspot
