import { useDispatch } from "react-redux"
import { editspot, getspotdetail } from "../../store/spots";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import './index.css'


const Editspot = () => {

    const { spotId } = useParams()
    // console.log(spotId)
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const olddata = useSelector((state) => state.allSpots.singleSpot)
    // console.log(sessionUser)
    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
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
        // if (!img || (!img.endsWith('.png') && !img.endsWith('.jpg') && !img.endsWith('.jpeg')) || (img.length>255)) err.img = 'Please provide valid image link with .png/.jpg'
        setErrors(err)
    }, [address, city, state, country, lat, lng, name, description, price])

    useEffect(() => {
        dispatch(getspotdetail(spotId))
    }, [dispatch])

    useEffect(() => {
        setAddress(olddata.address)
        setName(olddata.name)
        setCity(olddata.city)
        setState(olddata.state)
        setCountry(olddata.country)
        setLat(olddata.lat)
        setLng(olddata.lng)
        setDescription(olddata.description)
        setPrice(olddata.price)
    }, [olddata])

    // useEffect(() =>{
    //     // let info = {address,city,state,country,lat,lng,name,description,price}
    //     dispatch(editspot({address,city,state,country,lat,lng,name,description,price},spotId))
    // },[address,city,state,country,lat,lng,name,description,price])

    const handleSubmit = (e) => {
        e.preventDefault()
        // setErrors([])
        // const err = []
        // if(!address)err.push('Please provide address')
        // if(!city)err.push('Please provide city')
        // if(!state)err.push('Please provide state')
        // if(!country)err.push('Please provide country')
        // if(!lat )err.push('Please provide correct latitude')
        // if(!lng )err.push('Please provide correct longitude')
        // if(!name)err.push('Please provide name')
        // if(!description)err.push('Please provide description')
        // if(!price || price <= 0)err.push('Please provide valid price')
        // setErrors(err)
        let arrerr = Object.values(errors)
        if (arrerr.length > 0) {
            setErrorDisplay(true)
            return
        }
        if(arrerr.length == 0){
            let info = { address, city, state, country, lat, lng, name, description, price }
            return dispatch(editspot(info, spotId)).catch(
                async (res) => {
                    const data = await res.json();
                    if(data && data.errors){
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
                    }
                    if(data && !data.errors)
                        history.push(`/spots/${spotId}`)
                        setErrorDisplay(false)
                    }
                );
        }
    };
    return (
        <div className="editspotform">
            <div className='editspot'>
                <div className='editspotformwrapper'>
                    <form  onSubmit={handleSubmit}>
                    <label>
                        <div className="info">Name</div>
                        <input
                        className="input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Name for spot...">
                        </input>
                    </label>
                    {errorsDisplay && errors.name && (
                        <div className="error-createspot">
                            {errors.name}
                        </div>
                    )}
                    <label>
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
                            {errors.address}
                        </div>
                    )}
                    <label>
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
                            {errors.city}
                        </div>
                    )}
                    <label>
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
                            {errors.state}
                        </div>
                    )}
                    <label>
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
                            {errors.country}
                        </div>
                    )}
                    <label>
                        <div className="info"> longitude</div>
                        <input
                        className="input"
                            type="text"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            required
                            placeholder="longitude...">
                        </input>
                    </label>
                    {errorsDisplay && errors.lng && (
                        <div className="error-createspot">
                            {errors.lng}
                        </div>
                    )}
                    <label>
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
                            {errors.lat}
                        </div>
                    )}
                    <label>
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
                            {errors.description}
                        </div>
                    )}
                    <label>
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
                            {errors.price}
                        </div>
                    )}
                    <button className='submit' disabled={!!errors.length} type="submit">Submit</button>
                </form>
                    </div>
            </div>
        </div>
    )
}

export default Editspot
