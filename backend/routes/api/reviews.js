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
    //   if(sptImg.length === 1){
    //     urlJSON.Spot.previewImage = sptImg[0].url
    //     console.log(sptImg[0].url)
    //     }else if (sptImg.length > 1){
    //       let img = []
    //       for(let sptimg of sptimg)
    //       img.push(sptimg.url)
    //       url.Spot.previewImage = img
    //     }else{
    //      url.Spot.previewImage = null
    //     }
    urlJSON.Spot.previewImage = sptImg.url
    final.push(urlJSON)
}
    res.json({Review:final})
})
module.exports = router;
