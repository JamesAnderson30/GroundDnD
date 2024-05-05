const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//const { restoreUser } = require("../../utils/auth.js");
const {restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, Image, ReviewImages, User, SpotImages, Booking } = require('../../db/models');
const Models = require("../../db/models");
const review = require('../../db/models/review');

const router = express.Router();

router.delete("/:imageId", restoreUser, requireAuth, async(req, res)=>{
    let img = await Image.findByPk(req.params.imageId);

    if(!img){
        res.statusCode = 404;
        res.json({message:"Spot Image couldn't be found"});
        return;
    }

    let spotJoin = await SpotImages.findOne({
        where:{
            imgId: req.params.imageId
        }
    })

    //spotJoin.destroy();
    img.destroy();


        res.json({message:"Successfully Deleted"});

})

module.exports = router
