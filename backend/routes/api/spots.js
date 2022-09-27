const express = require('express')
const router = express.Router();
const { Spot,Review,SpotImage,sequelize,User } = require('../../db/models');
const user = require('../../db/models/user');
const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

// Get all Spots
router.get('/', async (req, res, next) => {

    let { size, page } = req.query
    let pagination = {}

    if (!page) {page = 1}
    if (!size) {size = 20}
    page = parseInt(page);
    size = parseInt(size);

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

      let sptImg = await SpotImage.findAll( {
        raw: true,
        where: {
            spotId: spot.id,
            preview: true
            },
        attributes: ['url']
      })

      let spotJson = spot.toJSON()
      spotJson.avgRating = Number(review[0].avg).toFixed(1)
      spotJson.previewImage = sptImg[0].url

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
        raw:true,
        where:{
            ownerId:req.user.id
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

      let sptImg = await SpotImage.findAll( {
        raw: true,
        where: {
            spotId: spot.id,
            preview: true
            },
        attributes: ['url']
      })

      spot.avgRating = Number(review[0].avg).toFixed(1)
      spot.previewImage = sptImg[0].url

      emptyArray.push(spot)
    }
    res.json({
        Spots: emptyArray })

})

// Get details of a Spot from an id
router.get('/:spotId',async(req,res,next) =>{
    const {spotId} = req.params
    const spot = await Spot.findByPk(spotId,{raw:true})
    if(!spot){
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

      let sptImgs = await SpotImage.findAll( {
        raw: true,
        where: {
            spotId: spot.id,
            preview: true
            },
        attributes: ['id','url','preview']
      })

      let owner = await User.findByPk(spot.ownerId,{attributes:['id','firstName','lastName']})

    spot.numReviews = Number(review[0].count)
    spot.avgStarRating = Number(review[0].avg).toFixed(1)
    spot.SpotImages = sptImgs
    spot.Owner = owner

        res.json({
            Spots: spot })

})

// Create a Spot

module.exports = router;
