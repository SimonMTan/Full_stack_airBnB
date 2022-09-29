const express = require('express')
const router = express.Router();
const { Spot,Review,SpotImage,sequelize,User,ReviewImage ,Booking} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

//Delete a review Image
router.delete('/:imageId',requireAuth,async(req,res,next) =>{
    const {imageId} = req.params
    const {id} = req.user
    const reviewImage = await ReviewImage.findByPk(imageId)
    if(!reviewImage){
        res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
          })
    }

    const owner = await Review.findByPk(reviewImage.reviewId)
    if(owner.userId !== id ){
        res.status(403).json("Current user must be owner of the Spot")
    }
    if(owner.userId === id){
        await reviewImage.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})
module.exports = router;
