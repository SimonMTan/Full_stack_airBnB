import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deletespot } from "../../store/spots";
import './deletespot.css';
const Deletespot = () =>{
    const dispatch = useDispatch()
    const {spotId} = useParams()
    // console.log('this is delete id',spotId)

    useEffect(() =>{
        dispatch(deletespot(spotId))
    },[dispatch])
    return (
    <div>
        <h1>Successfully Deleted</h1>
        <span >
            <NavLink to={'/account'}>
                <div className="returntoaccount"><u>return to Account</u></div>
            </NavLink>
        </span>
    </div>)
    }

export default Deletespot
