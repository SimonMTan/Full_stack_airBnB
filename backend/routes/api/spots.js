const express = require('express')
const router = express.Router();
const { Spot,Review,SpotImage,sequelize } = require('../../db/models');

// Get all Spots
router.get('/', async (req, res, next) => {

    let { size, page } = req.query
    let pagination = {}
    let emptyArray = []

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

    for (let spot of spots) {
      const ratings = await Review.findAll({
        raw: true,
        where: {
          spotId: spot.id
        },
        attributes: [
          [sequelize.fn("AVG", sequelize.col('stars')), "avg"],
        ],
      })

      let imageUrl = await SpotImage.findOne( {
        raw: true,
        where: {
            spotId: spot.id,
            preview: true
            },
        attributes: ['url']
      })

      let spotJson = spot.toJSON()
      spotJson.avgRating = Number(ratings[0].avg).toFixed(1),
      spotJson.previewImage = imageUrl.url

      emptyArray.push(spotJson)
    }

    res.json({
      Spots: emptyArray,
      page,
      size
    })
  });

// Get details of a Spot from an id




module.exports = router;
