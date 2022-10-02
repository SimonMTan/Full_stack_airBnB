const express = require('express')
const router = express.Router();
const { Spot, Review, SpotImage, sequelize, User, ReviewImage, Booking } = require('../../db/models');
const user = require('../../db/models/user');
const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');
const { Op } = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validatorReview = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isInt()
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors]
// const validatorSpot =[
// check('address')
// .exists({ checkFalsy: true })
// .notEmpty()
// .withMessage('Please provide a valid address'),
// check('city')
// .exists({ checkFalsy: true })
// .notEmpty()
// .withMessage('Please provide a valid city'),
// check('state')
// .exists({ checkFalsy: true })
// .notEmpty()
// .withMessage('Please provide a valid state'),
// check('country')
// .exists({ checkFalsy: true })
// .notEmpty()
// .withMessage('Please provide a valid country'),
// check('lat')
// .exists({ checkFalsy: true })
// .notEmpty()
// .withMessage('Please provide a valid latitude'),
// check('lng')
// .exists({ checkFalsy: true })
// .notEmpty()
// .withMessage('Please provide a valid longitude'),
// check('name')
// .exists({ checkFalsy: true })
// .notEmpty()
// .withMessage('Please provide a valid name'),
// check('description')
// .exists({ checkFalsy: true })
// .notEmpty()
// .withMessage('Please provide a description'),
// check('price')
// .exists({ checkFalsy: true })
// .notEmpty()
// .withMessage('Please provide a valid price'),
// handleValidationErrors]

// Get all Spots
router.get('/', async (req, res, next) => {

  let { size, page } = req.query
  let pagination = {}

  if (!page) { page = 1 }
  if (!size) { size = 20 }

  page = parseInt(page);
  size = parseInt(size);

  if( page <= 0 ){
    res.status(400).json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
          "page": "Page must be greater than or equal to 1"
        }
     })
  }

  if( size <= 0 ){
    res.status(400).json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
          "size": "size must be greater than or equal to 1"
        }
     })
  }
  if (page >= 1 && size >= 1) {
    pagination.limit = size
    pagination.offset = size * (page - 1)

  }

  const spots = await Spot.findAll({
    ...pagination
  })

  let emptyArray = []
  for (let spot of spots) {
    const review = await Review.findAll({
      raw: true,
      where: {
        spotId: spot.id
      },
      attributes: [
        [sequelize.fn("AVG", sequelize.col('stars')), "avg"],
      ],
    })

    let sptImg = await SpotImage.findAll({
      raw: true,
      where: {
        spotId: spot.id,
        preview: true
      },
      attributes: ['url']
    })

    let spotJson = spot.toJSON()
    spotJson.avgRating = Number(review[0].avg).toFixed(1)
    if (sptImg.length === 1) {
      spotJson.previewImage = sptImg[0].url
    } else if (sptImg.length > 1) {
      let img = []
      for (let sptimg of sptimg)
        img.push(sptimg.url)
      spotJson.previewImage = img
    } else {
      spotJson.previewImage = null
    }

    emptyArray.push(spotJson)
  }

  res.json({
    Spots: emptyArray,
    page,
    size
  })
});

//   Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    }
  })

  let emptyArray = []
  for (let spot of spots) {
    const review = await Review.findAll({
      raw: true,
      where: {
        spotId: spot.id
      },
      attributes: [
        [sequelize.fn("AVG", sequelize.col('stars')), "avg"],
      ],
    })

    let sptImg = await SpotImage.findAll({
      raw: true,
      where: {
        spotId: spot.id,
        preview: true
      },
      attributes: ['url']
    })

    let spotJson = spot.toJSON()
    spotJson.avgRating = Number(review[0].avg).toFixed(1)
    if (sptImg.length === 1) {
      spotJson.previewImage = sptImg[0].url
    } else if (sptImg.length > 1) {
      let img = []
      for (let sptimg of sptimg)
        img.push(sptimg.url)
      spotJson.previewImage = img
    } else {
      spotJson.previewImage = null
    }

    emptyArray.push(spotJson)
  }
  res.json({
    Spots: emptyArray
  })

})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
  const { spotId } = req.params
  const spot = await Spot.findByPk(spotId, { raw: true })
  if (!spot) {
    res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const review = await Review.findAll({
    raw: true,
    where: {
      spotId: spotId
    },
    attributes: [
      [sequelize.fn("AVG", sequelize.col('stars')), "avg"],
      [sequelize.fn("COUNT", sequelize.col('stars')), "count"],
    ],
  })

  let sptImgs = await SpotImage.findAll({
    raw: true,
    where: {
      spotId: spot.id,
      preview: true
    },
    attributes: ['id', 'url', 'preview']
  })

  let owner = await User.findByPk(spot.ownerId, { attributes: ['id', 'firstName', 'lastName'] })

  spot.numReviews = Number(review[0].count)
  spot.avgStarRating = Number(review[0].avg).toFixed(1)
  spot.SpotImages = sptImgs
  spot.Owner = owner

  res.json(spot)

})

// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
    res.status(400).json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
      }
    })
  }
  const { id } = req.user
  const newSpot = await Spot.create({
    ownerId: id,
    address, city, state, country, lat, lng, name, description, price
  })
  res.status(201).json(newSpot)
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', async (req, res, next) => {
  const { spotId } = req.params
  const spot = await Spot.findByPk(spotId)
  if (!spot) {
    res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const { url, preview } = req.body
  const newImage = await SpotImage.create({
    spotId, url, preview
  })
  res.json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview
  })
})

// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
  const { spotId } = req.params
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const editedSpot = await Spot.findByPk(spotId)
  if (!editedSpot) {
    res.status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }
  editedSpot.update({
    address, city, state, country, lat, lng, name, description, price
  })

  res.json(editedSpot)
})
// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const { spotId } = req.params
  const { id } = req.user
  const deletedSpot = await Spot.findByPk(spotId)
  if (!deletedSpot) {
    res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  if (deletedSpot.ownerId !== id) {
    res.status(403).json({
      "message": "Spot must belong to you",
      "statusCode": 403
    })
  }

  await deletedSpot.destroy()

  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const { spotId } = req.params
  const validatespot = await Spot.findByPk(spotId)
  if (!validatespot) {
    res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  if (validatespot.ownerId === req.user.id) {
    const bookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
    })
    res.json({ Bookings: bookings })
  }
  if (validatespot.ownerId !== req.user.id) {
    const bookings = await Booking.scope('notOwner').findAll({
      where: {
        spotId: spotId
      }
    })
    res.json({ Bookings: bookings })
  }
})
// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const { spotId } = req.params
  const { startDate, endDate } = req.body
  const validatespot = await Spot.findByPk(spotId)
  if (!validatespot) {                                //if we can't find certain spot
    res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  if (validatespot.ownerId === req.user.id) {          // if owner is desired spot owner
    res.status(403).json({
      "message": "Owner can't book their own spot",
      "statusCode": 403
    })
  }

  if (!startDate || !endDate || startDate >= endDate) {  //
    res.status(400).json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }

  const checkBooking = await Booking.findOne({where:{
    spotId,
    [Op.or]: [
      {
        startDate:{
        [Op.between]:[startDate,endDate]
          }
      },{
        endDate:{
        [Op.between]:[startDate,endDate]
        }
      },{
        startDate:startDate
      },{
        endDate:endDate
      },{
        startDate:endDate
      },{
        endDate:startDate
      },{
        startDate: {
          [Op.lte]: endDate,
          [Op.gte]: startDate
        }
      },{
        endDate: {
          [Op.lte]: endDate,
          [Op.gte]: startDate
        }
      }
    ]
  }})
   console.log(checkBooking)
  if(checkBooking){
    res.status(403).json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }

  if(!checkBooking){
    const newBooking = await Booking.create({
      spotId,userId:req.user.id,startDate,endDate
    })
    res.json(newBooking)
  }


})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
  const { spotId } = req.params
  const validatespot = await Spot.findByPk(spotId)
  if (!validatespot) {
    res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const review = await Review.findAll({
    where: {
      spotId: spotId
    },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: ReviewImage, attributes: ['id', 'url'] }]
  })

  res.json({ Reviews: review })
})
// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', validatorReview, async (req, res, next) => {
  const { review, stars } = req.body
  const { spotId } = req.params
  const userId = req.user.id
  const validateSpot = await Spot.findByPk(spotId)
  const validateReview = await Review.findOne({
    where: {
      spotId, userId
    }
  })
  if (!validateSpot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  if (validateReview) {
    return res.status(403).json({
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  }else{
  const newReview = await Review.create({
    spotId, userId, review, stars
  })
  res.status(201).json(newReview)
}
})
module.exports = router;
