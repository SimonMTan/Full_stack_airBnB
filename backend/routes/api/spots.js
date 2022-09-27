const express = require('express')
const router = express.Router();
const { Spot,Review,SpotImage } = require('../../db/models');

// Get all Spots
router.get('/',async(req,res) =>{
    const allSpots = await Spot.findAll({raw:true})
    for(let spot of allSpots){
        const avgRating = await Review.findAll({
            raw:true,
            where:{
                spotId:spot.id
            },
            attributes: {
                include: [
                    [
                      sequelize.fn("AVG", sequelize.col("stars")),
                      "avg"
                    ]
                ]
            }
        })
        const preview = await SpotImage.findAll({where:{spotId:spot.id}})
        spot = spot.toJSON()
        spot.avgRating = avgRating.avg
        spot.previewImage= preview.preview
    }
    res.status(200).json({allSpots})
})

module.exports = router;
