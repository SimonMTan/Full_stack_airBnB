import { useDispatch } from "react-redux"
import { editspot,getspotdetail } from "../../store/spots";
import React,{ useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";


const Editspot = () =>{

    const {spotId} = useParams()
    // console.log(spotId)
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const olddata = useSelector((state) => state.allSpots.singleSpot)
    // console.log(sessionUser)
    const [address,setAddress] = useState(olddata.address)
    const [name,setName] = useState(olddata.name)
    const [city,setCity] = useState(olddata.city)
    const [state,setState] = useState(olddata.state)
    const [country,setCountry] = useState(olddata.country)
    const [lat,setLat] = useState(olddata.lat)
    const [lng,setLng] = useState(olddata.lng)
    const [description,setDescription] = useState(olddata.description)
    const [price,setPrice] = useState(olddata.price)
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        const err = []
        if(!address)err.push('Please provide address')
        if(!city)err.push('Please provide city')
        if(!state)err.push('Please provide state')
        if(!country)err.push('Please provide country')
        if(!lat )err.push('Please provide correct latitude')
        if(!lng )err.push('Please provide correct longitude')
        if(!name)err.push('Please provide name')
        if(!description)err.push('Please provide description')
        if(!price || price <= 0)err.push('Please provide valid price')
        setErrors(err)
    },[address,city,state,country,lat,lng,name,description,price])

    useEffect(() =>{
    dispatch(getspotdetail(spotId))
    },[dispatch])

    useEffect(() =>{
        setAddress(olddata.address)
        setName(olddata.name)
        setCity(olddata.city)
        setState(olddata.state)
        setCountry(olddata.country)
        setLat(olddata.lat)
        setLng(olddata.lng)
        setDescription(olddata.description)
        setPrice(olddata.price)
    },[olddata])

    useEffect(() =>{
        // let info = {address,city,state,country,lat,lng,name,description,price}
        dispatch(editspot({address,city,state,country,lat,lng,name,description,price},spotId))
    },[address,city,state,country,lat,lng,name,description,price])

    const handleSubmit = (e) =>{
        e.preventDefault()
        setErrors([]);
        history.push('/account')
        let info = {address,city,state,country,lat,lng,name,description,price}
        return dispatch(editspot(info,spotId)).catch(
          async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          }
        );
      };
    return (
    <>
    <form onSubmit={handleSubmit}>
        <div>
            {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
            ))}
        </div>
        <label>
            Name
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name for spot...">
            </input>
        </label>
        <label>
            Address
            <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Address...">
            </input>
        </label>
        <label>
            City
            <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="City...">
            </input>
        </label>
        <label>
            State
            <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            placeholder="State...">
            </input>
        </label>
        <label>
            Country
            <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder="Country...">
            </input>
        </label>
        <label>
            longitude
            <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
            placeholder="longitude...">
            </input>
        </label>
        <label>
            latitude
            <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
            placeholder="latitude...">
            </input>
        </label>
        <label>
            Description
            <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Please provide descriptive as possible">
            </input>
        </label>
        <label>
            Price
            <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="$...">
            </input>
        </label>
        <button type="submit">Submit</button>
        </form>
    </>
    )
    }

export default Editspot
