const express = require('express')
const router = express.Router();
const { Spot,Review,SpotImage,sequelize,User,ReviewImage } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

// Get all Reviews of the Current User
router.get('/current', requireAuth, async(req,res,next) =>{
    const {id} = req.user;
    let final = []
    const review = await Review.findAll({
        where:{
            userId:id
        },
    include:[
        {model:User, attributes:['id','firstName','lastName']},
        {model:Spot, attributes:['id', 'ownerId', 'address','city', 'state', 'country','lat', 'lng', 'name', 'price']},
        {model: ReviewImage, attributes: ['id', 'url']}]
    })

for (let url of review){
    let urlJSON = url.toJSON()
    let sptImg = await SpotImage.findAll( {
        raw: true,
        where: {
            spotId: url.spotId,
            preview: true
            },
        attributes: ['url']
      })
    //   console.log(sptImg)
    //   console.log(sptImg.length)
      if(sptImg.length === 1){
        urlJSON.Spot.previewImage = sptImg[0].url
        // console.log(sptImg[0].url)
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
    res.json({Review:final})
})

// Edit a Review
router.put('/:reviewId',requireAuth,async(req,res,next) =>{
    const {reviewId} = req.params
    const {id} = req.user
    const {review,stars} = req.body
    const validateUser = await Review.findByPk(reviewId)
    if(!validateUser){
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }
    if(validateUser.userId !== id ){
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }else{
        validateUser.update({review,stars})
        res.json(validateUser)
    }
})

//Delete a Review
router.delete('/:reviewId', requireAuth,async(req,res) =>{
    const {reviewId} = req.params
    const {id} = req.user
    const validateUser = await Review.findByPk(reviewId)
    if(!validateUser){
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }
    if(validateUser.userId !== id ){
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }else{
        await validateUser.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images',requireAuth,async(req,res) =>{
    const {reviewId} = req.params
    const {url} = req.body
    const {id} = req.user
    const validateUser = await Review.findByPk(reviewId)
    if(!validateUser){
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }

    if(validateUser.userId !== id ){
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }else{
        const count = await ReviewImage.count({where:{reviewId}})
        if(count >10){
            res.status(403).json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
              })
        }else{
            const newReviewImage = await ReviewImage.create({reviewId,url})
            res.json({id:newReviewImage.id,
                    url:newReviewImage.url})
        }
    }

})
module.exports = router;
