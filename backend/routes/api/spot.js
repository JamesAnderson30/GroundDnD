const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//const { restoreUser } = require("../../utils/auth.js");
const {restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review } = require('../../db/models');
const Models = require("../../db/models");
const review = require('../../db/models/review');
const Image = require('../../db/models/Image');
const router = express.Router();
//console.log(Models);

let avgSpotReviewsAndPreview = function(spots){
    let spotsArray = [];

    for(let spot of spots){
        let count = 0;
        let total = 0;
        let avg = 0;
        let previewImageUrl = "not-found.png";
        //console.log(spot);
        let images = spot.dataValues.Images;

        //console.log(images);

        if(images.length > 0){
            previewImageUrl = images[0].dataValues.url
        }

        if(spot.dataValues.Reviews.length > 0){
            //console.log("avg");
            for(let review of spot.dataValues.Reviews){
                //console.log("count");
                count++;
                total += review.dataValues.stars
            }
            avg = total / count;
        }

        delete spot.dataValues.Reviews
        delete spot.dataValues.Images

        spot.dataValues["previewImage"] = previewImageUrl;
        spot.dataValues["avgRating"] = avg;
        //console.log(spot.dataValues);
        spotsArray.push(spot);
    }
    return spotsArray;
}

router.get("/", async (req,res)=>{
    let spots = await Spot.findAll({
        include:[
            {
                model: Models.Review,
                attributes: ["stars"]
            },
            {
                model: Models.Image,
                attributes: ["url"],
                where:{
                    preview:true
                }
            }
        ]
    });

    let spotsArray = avgSpotReviewsAndPreview(spots)




    let returnObj = {};
    returnObj["Spots"] = spotsArray;
    res.json(returnObj);
});

router.get("/current", restoreUser, requireAuth, async (req,res)=>{
//console.log(req.user)
    const id = req.user.dataValues.id

    //console.log(Models);
    // res.contentType("text/plain")
    // console.log(Models.Review);
    // res.send(Models.models)
    //let userId = req.user
    //console.log("!!! -> id: ", id)

    let spots = await Spot.findAll({
        include:[
            {
                model: Models.Review,
                attributes: ["stars"],
            },
            {
                model: Models.Image,
                required: false,
                attributes: ["url"],
                where:{
                    preview:true
                }

            }
        ],
        where: {
            ownerId: id
        }
    });

    //debug
    let spotsArray = avgSpotReviewsAndPreview(spots);


    res.json(spotsArray);

    //console.log(test);
    //res.json(spots);
})

//get spot by id
router.get("/:spotId", async (req, res)=>{
    let id = req.params.spotId;

    let spot = await Spot.findByPk(id, {
        include:[
            {

                model: Models.Review,
                attributes: ["stars"],
            },
            {
                model: Models.Image,
                required: false,
                attributes: ["id","url","preview"]
            },
            {
                model: Models.User,
                attributes:["id", "firstName", "lastName"]
            }
        ]
    });
    //spot = avgSpotReviewsAndPreview(spot);

    res.json(spot);
})


module.exports = router;
