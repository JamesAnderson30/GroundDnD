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
    let img = await Image.findByPk(req.params.imageId,{
        include:{
            model:Spot
        }
    });

    let imgToDestroy = await Image.findByPk(req.params.imageId);

    if(!img){
        res.statusCode = 404;
        res.json({message:"Review Image couldn't be found"});
        return;
    }


    let imgData = img.get({plain:true});

    //////console.log("!!!ImgData: ",imgData);

    //if(!req.user.dataValues.id ||

    let userId = req.user.dataValues.id;

    if(!imgData.Reviews || imgData.Reviews[0].userId != userId){
        res.statusCode = 403;
        res.json({message:"Authorization required"});
        return;
    }

    //spotJoin.destroy();
    //res.json(img);
    imgToDestroy.destroy();


        res.json({message:"Successfully Deleted"});

})

module.exports = router
