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


    useEffect(() => {
        const err = []
        if (!address || address.length >20 ) err.push('Please provide address with less than 20 chars')
        if (!city || city.length >15) err.push('Please provide city with less than 15 chars')
        if (!state || state.length >15) err.push('Please provide state with less than 15 chars')
        if (!country || country.length >15) err.push('Please provide country with less than 15 chars')
        if (!lat || !((lat>=0) || (lat <0)) || ( lat < -90) || (lat > 90)) err.push('Please provide correct latitude')
        if (!lng || !((lng>=0) || (lng <0)) || ( lng < -180) || (lng > 180)) err.push('Please provide correct longitude')
        if (!name || name.length>15) err.push('Please provide name with less than 15 chars')
        if (!description || description.length>255) err.push('Please provide descriptionwith less than 255 chars')
        if (!price || !(price > 0) || (price >100000000000)) err.push('Please provide valid price')
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
        if (errors.length > 0) { return }
        history.push(`/spots/${spotId}`)
        let info = { address, city, state, country, lat, lng, name, description, price }
        return dispatch(editspot(info, spotId)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };
    return (
        <div className="editspotform">
            <div className='editspot'>
                <div className='editspotformwrapper'>
                    <form  onSubmit={handleSubmit}>
                    {errors.length > 0 && (
                        <div className="error-editspot">
                            {errors.map((error, idx) => (
                                <div key={idx}>{error}</div>
                            ))}
                        </div>
                    )}
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
                    <button className='submit' disabled={!!errors.length} type="submit">Submit</button>
                </form>
                    </div>
            </div>
        </div>
    )
}

export default Editspot
