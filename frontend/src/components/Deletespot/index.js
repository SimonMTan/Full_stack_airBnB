import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deletespot } from "../../store/spots";

const Deletespot = () =>{
    const dispatch = useDispatch()
    const {spotId} = useParams()
    console.log('this is delete id',spotId)

    useEffect(() =>{
        dispatch(deletespot(spotId))
    },[dispatch])
    return (
    <div>
        <h1>Successfully Deleted</h1>
        <span >
            <NavLink to={'/account'}>
                <u>return to Account</u>
            </NavLink>
        </span>
    </div>)
    }

export default Deletespot
