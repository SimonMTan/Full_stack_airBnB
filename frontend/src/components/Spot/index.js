import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getspotdetail } from "../../store/spots";
import Getreview from "../Review/Getreview_spot";
import { clear_spot } from "../../store/spots";

import './spotdetail.css'
const Getspot = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams()
    const allspots = useSelector((state) =>state.allSpots)

    const spotDetail = allspots.singleSpot
    const owner = allspots.singleSpot.Owner
    const bigPic = allspots?.singleSpot?.SpotImages?.filter(pic => pic?.preview == true)
    const smallPic = allspots?.singleSpot?.SpotImages?.filter(pic => pic?.preview == false )

    // console.log('AAA',allspots)
    // console.log(spotimg,' <<<<<<img')
    // console.log('BBB',spotDetail)
    // console.log('CCC',owner)
    // console.log('bigpic', bigPic[0].url)

    useEffect(() =>{
        dispatch(getspotdetail(spotId))
        return () => dispatch(clear_spot())
    },[dispatch])
    //this stop from preloading the material on the page and let page hit use-effect
    if(Object.values(allspots.singleSpot).length == 1)return null

    return (
        <>
        <div className="spotdetail-container">
            <h1 className="spotname">{spotDetail.name}</h1>
            <span className="spotinfo">
                ★{spotDetail.numReviews === 0 ? "New" : spotDetail.avgStarRating} {'  '}
                <u>{spotDetail.numReviews} {spotDetail.numReviews < 2 ? 'review':'reviews'}</u>
                · <u>{spotDetail.city},{spotDetail.state},{spotDetail.country}</u>
            </span>
            <div className="pic-wrapper">
                <div >
                    <img className="bigPic" src={bigPic[0]?.url} alt={bigPic[0]?.id} key={bigPic[0]?.id}/>
                </div>

                 <div className="smallPics">
                    <img className='smallpic left-top' src={smallPic[0]?.url}/>
                    <img className='smallpic right-top' src={smallPic[1]?.url}/>
                    <img className='smallpic left-bot' src={smallPic[2]?.url}/>
                    <img className='smallpic right-bot' src={smallPic[3]?.url}/>
                </div>
            </div>
            <div className="middle">
                <div className="middle-left">
                    <div className="hostby">
                        Hosting By {owner?.firstName} {owner?.lastName}
                    </div>
                    <div className="guests">4 guests · 2 beds · 1bath</div>
                    <div className='static-info'>Great location</div>
                    <div>95% of recent guests gave the location a 5-star rating.</div>
                    <div className='static-info'>Great check-in experience</div>
                    <div className='static-info lastone'>Free cancellation before 48 hours</div>

                    <div className="spot-desc">{spotDetail?.description}</div>
                </div>
                <div className="middle-right">
                    <div className='middle-rightinfo-big'>${spotDetail.price} night</div>
                    <div className='middle-rightinfo'>${`${spotDetail.price} `} x 5 nights = ${spotDetail.price*5}</div>
                    <div className='middle-rightinfo'>Cleaning fee ={` `}$20</div>
                    <div className='middle-rightinfo-last'>Service fee ={` `}$200</div>
                    <div className="total">Total before taxes = ${(spotDetail.price*5)+20+200}</div>
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
