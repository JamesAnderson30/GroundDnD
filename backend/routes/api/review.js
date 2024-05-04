const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//const { restoreUser } = require("../../utils/auth.js");
const {restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, Image, ReviewImages } = require('../../db/models');
const Models = require("../../db/models");
const review = require('../../db/models/review');
const router = express.Router();
//console.log(Models);

router.post("/:reviewId/images", requireAuth, restoreUser, async (req, res)=>{
    let reviewId = req.params.reviewId;

    let {url, preview} = req.body;

    //error handling
    let review = await Review.findByPk(reviewId);
    if(!review){
        res.statusCode = 404;
        res.json({message:"Review couldn't be found"});
        return;
    }

    let existingImageCount = await ReviewImages.findAll({where: parseInt(reviewId)});

    if(existingImageCount >= 10){
        res.statusCode = 403;
        res.json({message: "Maximum number of images for this resource was reached"});
        return;
    }

    let newImage = await Image.create({
        url: url,
        preview: false
    })

    let newJoin = await ReviewImages.create({
        imgId: newImage.id,
        reviewId: reviewId
    })


    res.json({id: newImage.id,url:url});
})

module.exports = router;
