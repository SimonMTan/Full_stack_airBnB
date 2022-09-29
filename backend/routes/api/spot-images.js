const express = require('express')
const router = express.Router();
const { Spot,Review,SpotImage,sequelize,User,ReviewImage ,Booking} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

// Delete a Spot Image
router.delete('/:imageId',requireAuth,async(req,res,next) =>{
    const {imageId} = req.params
    const {id} = req.user
    const spotImage = await SpotImage.findByPk(imageId)
    if(!spotImage){
        res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
          })
    }
    const owner = await Spot.findByPk(spotImage.spotId)
    if(owner.ownerId !== id ){
        res.status(403).json("Current user must be owner of the Spot")
    }
    if(owner.ownerId === id){
        await spotImage.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})
module.exports = router;
