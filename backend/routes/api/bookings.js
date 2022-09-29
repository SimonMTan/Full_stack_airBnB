const express = require('express')
const router = express.Router();
const { Spot,Review,SpotImage,sequelize,User,ReviewImage ,Booking} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');
const { Op } = require("sequelize");

// Get all of the Current User's Bookings
router.get('/current',requireAuth,async(req,res,next) =>{
    const {id} = req.user
    let final = []
    const bookings = await Booking.findAll({
        where:{
            userId:id
        },
        include:[
            {model:Spot, attributes:['id', 'ownerId', 'address','city', 'state', 'country','lat', 'lng', 'name', 'price']}]
    })
    for (let url of bookings){
        let urlJSON = url.toJSON()
        let sptImg = await SpotImage.findAll( {
            raw: true,
            where: {
                spotId: url.spotId,
                preview: true
                },
            attributes: ['url']
          })
          console.log(sptImg)
        //   console.log(sptImg.length)
          if(sptImg.length === 1){
            urlJSON.Spot.previewImage = sptImg[0].url
            console.log(sptImg[0].url)
            }else if (sptImg.length > 1){
              let img = []
              for(let sptimg of sptimg)
              img.push(sptimg.url)
              url.Spot.previewImage = img
            }else{
              url.Spot.previewImage = null
            }
        // urlJSON.Spot.previewImage = sptImg[0].url
        final.push(urlJSON)
    }
    res.json({Bookings:final})
})
//Edit a Booking
router.put('/:bookingId',requireAuth,async(req,res,next) =>{
    const {bookingId} = req.params
    const validateBooking = await Booking.findByPk(bookingId)
    if(!validateBooking){
        res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    const {startDate,endDate} = req.body
    if(startDate >= endDate ){
        res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
          })
    }
    if(validateBooking.endDate < new Date ()){
        res.status(403).json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
          })
    }

    const booking = await Booking.findAll({where:{
        spotId:validateBooking.spotId,
        startDate:{
        [Op.lte]: endDate,
        [Op.gte]: startDate
        },
        endDate:{
        [Op.lte]: endDate,
        [Op.gte]: startDate
        }
    }})
    if(booking.length){
        res.status(403).json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
            }
          }
          )
    }
    if(!booking.length){
        validateBooking.update({
            startDate,endDate
        })
        res.json(validateBooking)
    }
})

// Delete a Booking
router.delete('/:bookingId',requireAuth,async(req,res) =>{
    const {bookingId} = req.params
    const validateBooking = await Booking.findByPk(bookingId)
    if(!validateBooking){
        res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }

    if(validateBooking.startDate >= new Date()){
        res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    }

    await validateBooking.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})
module.exports = router;
