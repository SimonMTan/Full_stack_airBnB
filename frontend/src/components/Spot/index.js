import React,{ useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

import Calendar from 'react-calendar';

import { getspotdetail } from "../../store/spots";
import { getbooking } from "../../store/booking";
import { clear_spot } from "../../store/spots";
import { createbooking } from "../../store/booking";

import Getreview from "../Review/Getreview_spot";
import './spotdetail.css'

const Getspot = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const {spotId} = useParams()
    const allspots = useSelector((state) =>state.allSpots)
    const user = useSelector((state) =>state.session.user)
    const bookinglist = useSelector((state) => state.booking)
    const bookingarray = Object.values(bookinglist)

    let today = new Date()
    let tomorrow =  new Date()
    tomorrow.setDate(today.getDate() + 1)
    const [date, setDates] = useState(tomorrow)
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const [dayDiff,setDayDiff] = useState()
    const [errors, setErrors] = useState([]);
    const [showError, setShowError] = useState(false)

    const spotDetail = allspots.singleSpot
    const owner = allspots.singleSpot.Owner
    const bigPic = allspots?.singleSpot?.SpotImages?.filter(pic => pic?.preview == true)
    const smallPic = allspots?.singleSpot?.SpotImages?.filter(pic => pic?.preview == false )
    // console.log(owner, 'this is owner')
    // console.log(user, 'this is user')
    const tileDisabled = ({ activeStartDate, date, view }) => {
        const bookedDay = bookingarray.filter(day => date >= new Date(day.startDate) && date <= new Date(day.endDate))
        if(bookedDay.length){
            return true
        }
        return date < new Date()
     }


    useEffect(() =>{
    if(date.length === 1){
        setStartDate(date[0].toDateString())
    }
    if(date.length === 2){
        setStartDate(date[0].toDateString())
        setEndDate(date[1].toDateString())
        setDayDiff(Math.floor((date[1]-date[0])/(24 * 60 * 60 * 1000)))
        }
    },[date])

    useEffect(() => {
        const err = []
        if(!user) err.push('Please log in or signup to book')
        // console.log(user.id,'hello', spotDetail?.ownerId,'are they the same?')
        // if(user.id == spotDetail.ownerId) err.push("You owned this place")
        if(user){
            if(dayDiff == 0) err.push('1 night minimum')
            if(dayDiff > 7) err.push('7 nights maximum')
        }
        setErrors(err)
    },[user,dayDiff])

    useEffect(() =>{
        dispatch(getspotdetail(spotId))
        dispatch(getbooking(spotId))
        // console.log(date,'this is date')
        // console.log(Math.floor((date[1]-date[0])/(24 * 60 * 60 * 1000)))
        return () => dispatch(clear_spot())
    },[dispatch,date])
    //this stop from preloading the material on the page and let page hit use-effect
    if(Object.values(allspots.singleSpot).length == 1)return null



    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('step1')
        if(errors.length > 0){
            setShowError(true)
            return
        }
        console.log('step2')
        let info = {spotId,userId:user.id,startDate,endDate}
        console.log(info, 'this is info from frontend')
        const data = await dispatch(createbooking(info))
        alert(`Booked from ${data.startDate} to ${data.endDate} for ${Math.floor((new Date(data.startDate)-new Date(data.endDate))/(24 * 60 * 60 * 1000))} nights`)
        await dispatch(getbooking(spotId))
        history.push(`/account`)
        return
    }
    return (
        <>
        <div className="spotdetail-container">
            <h1 className="spotname">{spotDetail.name}</h1>
            <span className="spotinfo">
                ★{spotDetail.numReviews === 0 ? "New" : spotDetail.avgStarRating} {'  '}
                <u>{spotDetail.numReviews} {spotDetail.numReviews < 2 ? 'review':'reviews'}</u>
                · <u>{spotDetail.city },{spotDetail.state},{spotDetail.country}</u>
            </span>
            <div className="pic-wrapper">
                <div className="bigpicwrapper">
                    <img className="bigPic" src={bigPic[0]?.url} alt={bigPic[0]?.id} key={bigPic[0]?.id}/>
                </div>
                {smallPic?.length > 0 && (
                 <div className="smallPics">
                    <img className='smallpic left-top' src={smallPic[0]?.url}/>
                    <img className='smallpic right-top' src={smallPic[1]?.url}/>
                    <img className='smallpic left-bot' src={smallPic[2]?.url}/>
                    <img className='smallpic right-bot' src={smallPic[3]?.url}/>
                </div>
                )}
                {smallPic?.length === 0 && (
                    <div className="smallPics">
                       <img className='smallpic left-top' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYyQeO7Ku3ECYBURBAMPVJ-GlzQq7dwlFxAz9VMU&s'}/>
                       <img className='smallpic right-top' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYyQeO7Ku3ECYBURBAMPVJ-GlzQq7dwlFxAz9VMU&s'}/>
                       <img className='smallpic left-bot' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYyQeO7Ku3ECYBURBAMPVJ-GlzQq7dwlFxAz9VMU&s'}/>
                       <img className='smallpic right-bot' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYyQeO7Ku3ECYBURBAMPVJ-GlzQq7dwlFxAz9VMU&s'}/>
                   </div>
                )}

            </div>
            <div className="middle">
                <div className="middle-left">
                    <div className="hostby">
                        Hosting By {owner?.firstName} {owner?.lastName}
                    </div>
                    <div className="guests">4 guests · 2 beds · 1 bath</div>
                    <div className="block3">
                        <div className="icon-x"><i className="fa-regular fa-map"></i></div>
                        <div >
                            <div className='static-info'>Great location</div>
                            <div className="static-info2">95% of recent guests gave the location a 5-star rating.</div>
                        </div>
                    </div>
                    <div className="block2">
                        <i className="fa-regular fa-calendar-check"></i>
                        <div className='static-info'>Great check-in experience</div>
                    </div>
                    <div className="block22">
                        <i className="fa-solid fa-xmark"></i>
                        <div className='static-info lastone'>Free cancellation before 48 hours</div>
                    </div>

                    <div className="spot-desc">{spotDetail?.description}</div>
                </div>
                <div className="middle-right">
                    <div className='middle-rightinfo-big'>${spotDetail.price} night</div>
                    <div className='checkin_box'>
                        <div className="checkin_box1">
                            <div>CHECK-IN</div>
                            <div>{startDate}</div>
                        </div>
                        <div className="checkin_box2">
                            <div>CHECK-OUT</div>
                            <div>{endDate}</div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='app'>
                            <div className='calendar-container'>
                                <Calendar
                                onChange={setDates}
                                value={date}
                                selectRange={true}
                                tileDisabled={tileDisabled}
                                defaultValue={null}
                                />
                            </div>
                            {date.length > 0 ? (
                                <p className='text-center'>
                                <span className='bold'>Start:</span>{' '}
                                {date[0].toDateString()}
                                &nbsp;|&nbsp;
                                <span className='bold'>End:</span> {date[1].toDateString()}
                                </p>
                            ) : (
                                <p className='text-center'>
                                <span className='bold'>Default selected date:</span>{' '}
                                {date.toDateString()}
                                </p>
                            )}
                        </div>
                        {showError && errors.length > 0 && (
                            <div className="">Error:
                                {errors.map((error, idx) => (
                                    <div className="" key={idx}>{error}</div>
                                ))}
                            </div>
                        )}
                        <div className="reserve_button">
                            <button type='submit' className="reserve_button1">Reserve</button>
                        </div>
                    </form>
                    {dayDiff > 1 ?
                    <div>
                    <div className='middle-rightinfo'><div>${`${spotDetail.price} `} x {dayDiff} nights</div> <div>${spotDetail.price*dayDiff}</div></div>
                    <div className='middle-rightinfo'><div>Cleaning fee</div> <div>$20</div></div>
                    <div className='middle-rightinfo-last'><div>Service fee</div> <div>$200</div></div>
                    <div className="total"><div>Total before taxes</div> <div>${(spotDetail.price*dayDiff)+20+200}</div></div>
                    </div>:<div className='middle-rightinfo'></div>}
                </div>
            </div>
            <div className="reviewtitle">★{spotDetail?.numReviews === 0 ? "New" : spotDetail.avgStarRating} &emsp; {' '} &emsp; {' '}
                {spotDetail?.numReviews} {spotDetail?.numReviews<2 ? 'review':'reviews'}
            </div>
            <Getreview />
        </div>
        </>
    )
}

export default Getspot;
