const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//const { restoreUser } = require("../../utils/auth.js");
const {restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImages, Image, User, ReviewImages, Booking } = require('../../db/models');
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


router.get("/current", restoreUser, requireAuth, async (req,res)=>{
//console.log(req.user)
    const id = req.user.dataValues.id

    if(!id){
        console.log("!!!!!!!!!!!!!!!!!!!!!!!\n\nNo Id \n\n !!!!!!!!!!!!!!!!!!");
    }

    console.log("!!!!!!!!!!!!!!!!!!!!!!!\n\nNid\n\n !!!!!!!!!!!!!!!!!!");

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

router.get("/:spotId/reviews",async (req, res)=>{

    let spotId = parseInt(req.params.spotId);

    const spotExists = await Spot.findByPk(spotId);

    if(!spotExists){
        res.statusCode = 404;
        res.json({message:"Spot couldn't be found"})
    }

    let reviews = await Review.findAll({
        include:[
            {
                model: User
            },
            {
                model: Image,
                through: ReviewImages
            }
        ],
        where:{
            spotId: spotId
        }
    })

    // Format Image Data
    for(let rev of reviews){

        //reformat images
        let imgArray = [];

        for(let img of rev.dataValues.Images){
            let imgObj = {};
            imgObj["id"] = img.dataValues.id;
            imgObj["url"] = img.dataValues.url;
            imgArray.push(imgObj);
        }
        rev.dataValues["reviewImages"] = imgArray;
        delete rev.dataValues["Images"]





        //res.json(spotImgs);

        //console.log("!!! Data Values: ",rev.dataValues.Spot.dataValues)


    }
    // !!!!!!!!!!!!!

    res.json({Reviews:reviews});
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
      .isFloat({min:-90, max:90})
      .withMessage('Latitude is not valid'),
    check("lng")
        .exists({checkFalsy: true})
        .isFloat({gt:-180, lt:180})
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
        .isFloat({gt:0})
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
    if(!spot){
        res.statusCode = 404;
        res.json({message:"Spot couldn't be located"});
        return;
    }

    res.json(spot);
})

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
    //console.log(spots);
    let spotsArray = avgSpotReviewsAndPreview(spots)




    let returnObj = {};
    returnObj["Spots"] = spotsArray;
    res.json(returnObj);
});




  const validateNewReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
        .exists({checkFalsy: true})
        .isInt({min:0, max:5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
  ];


router.post("/:spotId/reviews", restoreUser, requireAuth,validateNewReview, async(req,res)=>{
    //check if spot exists

    let spotId = req.params.spotId;
    let userId = req.user.dataValues.id;

    console.log(spotId);

    const spotExists = await Spot.findByPk(spotId);

      //console.log(spotExists);

    const reviewExists = await Review.findOne({
        where: {
            userId: userId
        }
    })

    //console.log(reviewExists);



    if(!spotExists){
        res.statusCode = 404;
        //res.json({message:"Spot couldn't be found"})
    }

    if(reviewExists){
        res.statusCode = 500;
        //res.json({message:"User already has a review for this spot"})
    }


    let {review, stars} = req.body;

    let newReview = await Review.create({
        spotId: spotId,
        userId: userId,
        review:review,
        stars:stars
    })
    res.statusCode = 201;
    console.log(newReview);
    res.json(newReview);

});

router.post("/", restoreUser, requireAuth, validateCreateSpot,async (req, res)=>{
    const {address, city, state, country,
        lat, lng, name, description, price} = req.body;

    let ownerId = req.user.dataValues.id;



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
    console.log(await Spot.findAll());

    res.json(newSpot);
})

//validation

const validateNewBooking = [
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
        .exists({checkFalsy: true})
        .isInt({min:0, max:5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
  ];

// get bookings for spot

router.get("/:spotId/bookings", restoreUser,async(req, res)=>{

    // If not logged in
    if(!req.user){


        let bookings = await Booking.findAll({
            where:{
                spotId:1
            },
            attributes:["spotId", "startDate", "endDate"]
        })

        res.json({Bookings:bookings});

        return;
    }

    let bookings = await Booking.findAll({
        attributes:{
            exclude:["SpotId"]
        },
        where:{
            spotId:1
        },
        include:[
            {
                model:User,
                attributes:["id", "firstName","lastName"]
            }
        ]
    });

    res.json({Bookings:bookings});
    return;

})

// Create booking for Spot


router.post("/:spotId/bookings", restoreUser, requireAuth, async (req, res)=>{
    let userId = parseInt(req.user.id);
    let spotId = req.params.spotId;

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! spot.findByPk ~~~~~~~~~~~~~~~~~~~~");
    let spot = await Spot.findByPk(spotId,{attributes:{exclude:["SpotId"]}});

    if(!spot){
        res.statusCode = 404;
        res.json({message:"Spot couldn't be found"});
        return;
    }

    let {startDate, endDate} = req.body;
    startDate = formatDate(startDate);
    endDate = formatDate(endDate);

    if(endDate <= startDate || endDate == startDate){
        res.statusCode = 400;
        res.json({message:"Bad Request", errors:{
            endDate: {
                "endDate": "endDate cannot be on or before startDate"
              }
        }})
        return;
    }
    //console.log("CONFLICTING DATES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    //Honestly this needs to be redone. Completely lol. It's the spirit of MVP. Terrible scale :c time complexity big bad
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! booking.findall ~~~~~~~~~~~~~~~~~~~~");
    let startConflict = await Booking.findAll({
        attributes:{
            exclude:["SpotId"]
        },
        where:{
            spotId: spotId
        }
    });

    for(let conflict of startConflict){
        let checkStart = formatDate(conflict.dataValues.startDate);
        let checkEnd = formatDate(conflict.dataValues.endDate);
        let startErr = false;
        let endErr = false;
        // console.log('\n\n', "check start: ", checkStart, " - startDate: ", startDate, '\n\n');
        // console.log('\n\n', "check end: ", checkEnd, " - endDate: ", endDate, '\n\n');
        if(checkStart == startDate){
           // errorMsg.push("Start date conflicts with an existing booking")
           startErr = true;
        }

        if(checkEnd == endDate){
            //errorMsg.push("End date conflicts with an existing booking")
            endErr = true;
        }
        console.log("startErr: ", startErr,"  endErr: ", endErr)
        if(startErr || endErr){
            res.statusCode = 403;
            let errors = {};
            if(startErr) errors["startDate"] = "Start date conflicts with an existing booking";
            if(endErr) errors["endDate"] = "End date conflicts with an existing booking";

            res.json({
                message:"Sorry, this spot is already booked for the specified dates", errors,
            });
            return

        }
    }

    let newBooking = await Booking.create({
        userId: userId,
        spotId: spotId,
        startDate: startDate,
        endDate: endDate
    }, {attributes:{exclude:["SpotId"]}, returning:false});

    let lastBooking = await Booking.findOne({
        where:{
            createdAt: newBooking.dataValues.createdAt
        },
        attributes:{
            exclude:["SpotId"]
        }
    })

    res.json(lastBooking);

    //console.log(newBooking.dataValues);
    console.log("-------!!!!!!!!!!!!!!!!!----------------")
    console.log(newBooking);
    newBooking.dataValues.startDate = formatDate(startDate);
    newBooking.dataValues.endDate = formatDate(endDate);
    newBooking.dataValues["id"] = newBooking.get()
    res.json(newBooking);
})

//create image for spot

router.post("/:spotId/images", restoreUser, requireAuth, async (req, res)=>{
    let spotId = req.params.spotId;

    let {url, preview} = req.body;

    let userId = req.user.dataValues.id;

    //error handling
    let spot = await Spot.findByPk(spotId);
    if(!spot){
        res.statusCode = 404;
        res.json({message:"Spot couldn't be found"});
        return;
    }

    let existingImageCount = await SpotImages.findAll({where: parseInt(spotId)});

    if(spot.dataValues.ownerId != userId){
        res.statusCode = 403;
        res.json({message:"Authorization required"});
        return;
    }

    if(existingImageCount >= 10){
        res.statusCode = 403;
        res.json({message: "Maximum number of images for this resource was reached"});
        return;
    }

    let newImage = await Image.create({
        url: url,
        preview: preview
    })

    let newJoin = await SpotImages.create({
        imgId: newImage.id,
        spotId: spotId
    })


    res.json({id: newImage.id,url:url,preview:preview});
});

router.delete("/:spotId", restoreUser, requireAuth, async(req, res)=>{
    let spotId = req.params.spotId;

    let spot = await Spot.findByPk(spotId);

    let userId = req.user.dataValues.id;

        if(spot.dataValues.ownerId != userId){
            res.statusCode = 403;
            res.json({message:"Authorization required"});
            return;
        }

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
});
// Edit a spot

router.put("/:spotId", restoreUser, requireAuth, validateCreateSpot,async (req, res)=>{
    const {ownerId, address, city, state, country,
        lat, lng, name, description, price} = req.body;



    let spotId = req.params.spotId;

    console.log(spotId);

    let spot = await Spot.findByPk(spotId);

    let userId = req.user.dataValues.id;

    if(spot.dataValues.ownerId != userId){
        res.statusCode = 403;
        res.json({message:"Authorization required"});
        return;
    }

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




let formatDate = (date)=>{
    return new Date(date).toISOString().split('T')[0];
}
module.exports = router;
