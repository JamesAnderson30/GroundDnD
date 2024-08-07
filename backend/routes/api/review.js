const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//const { restoreUser } = require("../../utils/auth.js");
const {restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, Image, ReviewImages, User, SpotImages } = require('../../db/models');
const Models = require("../../db/models");
const review = require('../../db/models/review');

const router = express.Router();
//////console.log(Models);

// get currently logged in user's reviews
/*
{
  "Reviews": [
    {
      "id": 1,
      "userId": 1,
      "spotId": 1,
      "review": "This was an awesome spot!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
      "User": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      },
      "Spot": {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "price": 123,
        "previewImage": "image url"
      },
      "ReviewImages": [
        {
          "id": 1,
          "url": "image url"
        }
      ]
    }
  ]
}
*/


router.get("/current", restoreUser, requireAuth, async(req, res)=>{
    const id = req.user.dataValues.id;

    let reviews = await Review.findAll({
        include:[
            {
                model: Spot,
                required: false,
                attributes:{exclude: ["createdAt", "updatedAt", "description"]}
            },
            {
                model: Image,
                through: ReviewImages,
                required:false
            },
            {
                model: User,
                attributes:["id", "firstName", "lastName"]
            }
        ]
    })
//res.json(reviews);

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

        //reformat spots

        let spotId = rev.dataValues.spotId;

        let previewImg = "https://i.ibb.co/ws1B0r9/not-found.png";

        let spotImgs = await Spot.findByPk(spotId, {
            attributes:[],
            include: {
                model: Image,
                through: SpotImages,
                where:{
                    preview:true
                }
            },
            order: [
                ["id", "DESC"]
            ]
        });

        if(spotImgs){
            previewImg = spotImgs["Images"][0].dataValues.url;
        }

        //res.json(spotImgs);
        rev.dataValues.Spot.dataValues["previewImage"] = previewImg;
        //////console.log("!!! Data Values: ",rev.dataValues.Spot.dataValues)


    }
    //////console.log(reviews);
    res.json({reviews:reviews});
})




router.post("/:reviewId/images", requireAuth, restoreUser, async (req, res)=>{
    let reviewId = req.params.reviewId;

    //////console.log(reviewId);

    let {url, preview} = req.body;

    //error handling
    let review = await Review.findByPk(reviewId);
    if(!review){
        res.statusCode = 404;
        res.json({message:"Review couldn't be found"});
        return;
    }

    let existingImageCount = await ReviewImages.findAll({where: {reviewId:parseInt(reviewId)}, raw:true});
    let allExistingImage = await ReviewImages.findAll({raw:true});

    //existingImageCount = existingImageCount.get({plain:true});

 // ////console.log("!!!existingImageCount: ", existingImageCount);
 // ////console.log("!!!allExistingImage: ", allExistingImage);

    if(existingImageCount.length >= 10){
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


const validateEditReview = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
        .exists({checkFalsy: true})
        .isInt({min:0, max:5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
  ];

router.put("/:reviewId", restoreUser, requireAuth, validateEditReview, async (req, res)=>{
    const {review, stars} = req.body;

    let reviewId = req.params.reviewId;

    let reviewExist = await Review.findByPk(reviewId);
    if(!reviewExist){
        res.statusCode = 404;
        res.json({message:"review couldn't be found"});
        return;
    }


  if(!req.user.dataValues.id || reviewExist.dataValues.userId != req.user.dataValues.id){
    res.statusCode = 403;
    res.json({message:"Authentication required", errors:[{message:"Authentication required"}]});
    return;
  }

    reviewExist.set({
        review:review,
        stars:stars
    });

    await reviewExist.save();

    res.json(reviewExist);
});

router.delete("/:reviewId", restoreUser, requireAuth, async(req, res)=>{
    let reviewId = req.params.reviewId;

    let review = await Review.findByPk(reviewId);
    //let userId = req.user.dataValues.id;

    if(!review){
        res.statusCode = 404;
        res.json({message:"Review couldn't be found"});
        return;
    }

    if(!req.user.dataValues.id){
        res.statusCode = 403;
        res.json({message:"Authentication required"});
        return;
    }

    if(review.dataValues.userId != req.user.dataValues.id){
      res.statusCode = 403;
      res.json({message:"Authentication required"});
      return;
    }
    //res.json({reviewid:reviewId, review:review});


    await review.destroy();


        res.json({message:"Successfully deleted"})

})

module.exports = router;
