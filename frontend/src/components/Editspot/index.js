import { useDispatch } from "react-redux"
import { editspot } from "../../store/spots";
import React,{ useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {  useParams } from "react-router-dom";

const Editspot = () =>{

    const {spotId} = useParams()
    console.log(spotId)
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    console.log(sessionUser)
    const [address,setAddress] = useState('')
    const [name,setName] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [country,setCountry] = useState('')
    const [lat,setLat] = useState(0)
    const [lng,setLng] = useState(0)
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
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
        // let info = {address,city,state,country,lat,lng,name,description,price}
        dispatch(editspot({address,city,state,country,lat,lng,name,description,price}))
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
        <ul>
            {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
        </ul>
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
