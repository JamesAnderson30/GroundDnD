const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//const { restoreUser } = require("../../utils/auth.js");
const {restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImages, Image } = require('../../db/models');
const Models = require("../../db/models");
const review = require('../../db/models/review');
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
                required:false,
                attributes: ["url"],
                where:{
                    preview:true
                }
            }
        ]
    });
    console.log(spots);
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

router.get("/:spotId/reviews", async (req, res)=>{
    let spotId = parseInt(req.params.spotId);
    const spotExists = await Spot.findOne({
        where: {
          id: spotId
        }
      });

    if(!spotExists){
        res.statusCode = 404;
        res.json({message:""})
    }

    let reviews = Spot.findAll({
        where:{
            spotId: spotId
        }
    })

    res.json(reviews);
})
//validate spot creation

const validateCreateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
        .exists({checkFalsy:true})
      .withMessage('State is required'),
    check('country')
        .exists({checkFalsy:true})
        .withMessage('Country is required'),
    check("lat")
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage('Latitude is not valid'),
    check("lng")
        .exists({checkFalsy: true})
        .isDecimal()
        .withMessage("Longitude is not valid"),
    check("name")
        .exists({checkFalsy:true})
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({checkFalsy:true})
        .withMessage("Description is required"),
    check("price")
        .exists({checkFalsy:true})
        .withMessage("Price per day is required"),
    handleValidationErrors
  ];

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
                attributes: ["id","url","preview"],
                through:{
                    attributes:[]
                }
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

router.post("/", restoreUser, requireAuth, validateCreateSpot,async (req, res)=>{
    const {ownerId, address, city, state, country,
        lat, lng, name, description, price} = req.body;



    let newSpot = await Spot.create({
        ownerId:ownerId,
        address:address,
        city: city,
        state: state,
        country: country,
        lat:lat,
        lng:lng,
        name:name,
        description:description,
        price:price
    });

    res.statusCode = 201;

    res.json(newSpot);
})

//create image for spot

router.post("/:spotId/images", restoreUser, requireAuth, async (req, res)=>{
    let spotId = req.params.spotId;

    let {url, preview} = req.body;

    //error handling
    let spot = await Spot.findByPk(spotId);
    if(!spot){
        res.statusCode = 404;
        res.json({message:"Spot couldn't be found"});
        return;
    }

    let existingImageCount = await SpotImages.findAll({where: parseInt(spotId)});

    if(existingImageCount >= 10){
        res.statusCode = 403;
        res.json({message: "Maximum number of images for this resource was reached"});
        return;
    }

    let newImage = await Image.create({
        url: url,
        preview: false
    })

    let newJoin = await SpotImages.create({
        imgId: newImage.id,
        spotId: spotId
    })


    res.json({id: newImage.id,url:url});
});

// Edit a spot

router.put("/:spotId", restoreUser, requireAuth, validateCreateSpot,async (req, res)=>{
    const {ownerId, address, city, state, country,
        lat, lng, name, description, price} = req.body;

    let spotId = req.params.spotId;

    let spot = await Spot.findByPk(spotId);
    if(!spot){
        res.statusCode = 404;
        res.json({message:"Spot couldn't be found"});
        return;
    }

    let oldSpot = await Spot.findByPk(req.params.spotId);
    oldSpot.set({
        ownerId:ownerId,
        address:address,
        city: city,
        state: state,
        country: country,
        lat:lat,
        lng:lng,
        name:name,
        description:description,
        price:price
    });

    await oldSpot.save();

    res.json(oldSpot);

});

router.delete("/:spotId", restoreUser, requireAuth, async(req, res)=>{
    let spotId = req.params.spotId;

    let spot = await Spot.findByPk(spotId);
    if(!spot){
        res.statusCode = 404;
        res.json({message:"Spot couldn't be found"});
        return;
    }

    await spot.destroy();

    let checkSpot = await Spot.findByPk(spotId);
    if(!checkSpot){
        res.json({message:"Successfully deleted"})
    }
})

module.exports = router;
