const express = require('express')
const router = express.Router();
const { Spot,Review,SpotImage,sequelize,User,ReviewImage ,Booking} = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');

// Get all of the Current User's Bookings
router.get('/current',requireAuth,async(req,res,next) =>{
    
})

module.exports = router;
